import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes' //can extract backend communication into a seperate module
import loginService from './services/login'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import './index.css'
import Togglable from './components/Togglable'

//best place to store notes is in
//the App components state

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2023
      </em>
    </div>
  )
}

const App = () => {
  // const [notes, setNotes] = useState([]); if state initially empty, no need to pass props
  const noteFormRef = useRef()

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      console.log(user.token)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //* vvv Following function is executed immediately after rendering. The executions of the function results in
  //* effect being printed to the console, and the command axios.get initiates the fecthing of the data from
  //* the server as well as registers the following function as an event handler for the operation
  useEffect(() => {
    console.log('effect')
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  // If user info found from previous session in local storage, use those credentials to log user in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  console.log('render', notes.length, 'notes')

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id) //find the specific note requested
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const noteForm = () => (
    <Togglable buttonLabel={'Create new Note'} ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  //! Forms can be extracted into own component
  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //       <input
  //         type='text'
  //         value={username}
  //         name='Username'
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //       <input
  //         type='text'
  //         value={password}
  //         name='Password'
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type='submit'>login</button>
  //   </form>
  // );

  // setNotes(notes.concat(noteObject));
  // setNewNote("");

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <h2>Notes</h2>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
