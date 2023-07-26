import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifs);
  const style = {
    border: "solid",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
  };
  return (
    <div style={notification ? style : { display: "none" }}>{notification}</div>
  );
};

export default Notification;
