const Notification = ({ notification, successAction }) => {
  const successAlert = {
    color: "green",
    background: "lightgrey",
    fontsize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const failDeleteAlert = {
    color: "red",
    background: "lightgrey",
    fontsize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (notification === null) {
    return null;
  }
  return (
    <div
      className="notif"
      style={successAction ? successAlert : failDeleteAlert}
    >
      {notification}
    </div>
  );
};

export default Notification;
