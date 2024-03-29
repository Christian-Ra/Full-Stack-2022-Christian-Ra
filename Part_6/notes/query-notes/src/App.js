import { useQuery, useMutation, useQueryClient } from "react-query";
import { getNotes, createNote, updatenote } from "./requests";
// import axios from "axios";

const App = () => {
  const queryClient = useQueryClient();

  //! The method of invalidating queries works fine for simplicity sake, however upon
  //! completion, a GET request is made after each put/post request. in cases where the amount
  //! of data retrieved is large, this may lead to strain to the server
  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueriesData("notes");
      console.log("notes query", notes);
      queryClient.setQueryData("notes", notes[0][1].concat(newNote));
      // queryClient.invalidateQueries("notes");
    },
  });

  const updateNoteMutation = useMutation(updatenote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    console.log("toggle importance of", note.id);
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  const result = useQuery("notes", getNotes, { refetchOnWindowFocus: false });
  console.log(result);

  if (result.isLoading) {
    return <div>loading data</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
