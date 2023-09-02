import '../index.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifs)
  if (notification.content === null || !notification) {
    return null
  }

  const successAlert = {
    color: 'green',
  }
  const failAlert = {
    color: 'red',
  }

  return (
    <div className="notif" style={notification.type ? successAlert : failAlert}>
      {notification.content}
    </div>
  )
}

export default Notification
