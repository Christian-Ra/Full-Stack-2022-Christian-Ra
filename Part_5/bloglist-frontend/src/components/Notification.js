import "../index.css";

const Notification = ({ message, successAction }) => {
  if (message === null) {
    return null;
  }

  const successAlert = {
    color: "green",
  };
  const failAlert = {
    color: "red",
  };

  return (
    <div className='notif' style={successAction ? successAlert : failAlert}>
      {message}
    </div>
  );
};

export default Notification;
