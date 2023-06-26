const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form on onSubmit={handleSubmit}>
        <div>
          Username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          Password
          <input value={password} onChange={handlePasswordChange} />
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};
export default LoginForm;
