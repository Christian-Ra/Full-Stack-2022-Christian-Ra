const User = ({ user }) => {
  if (!user) {
    return <div>Cannot find user data</div>
  }
  console.log('User object: ', user)
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <div>
        {user.blogs.map((b) => (
          <ul key={b.id}>
            <li>{b.title}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default User
