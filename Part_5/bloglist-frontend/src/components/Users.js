import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h1> Users </h1>
      <h4> blogs created</h4>
      {users.map((u) => (
        <ul key={u.id}>
          <Link to={`/users/${u.id}`}>{u.name}</Link>: {u.blogs.length}
        </ul>
      ))}
    </div>
  )
}

export default Users
