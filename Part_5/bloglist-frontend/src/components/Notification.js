import { useNotifValue } from '../NotificationContext'
import '../index.css'

const Notification = ({ successAction }) => {
  const notif = useNotifValue()
  // if (message === null) {
  // return null
  // }

  const successAlert = {
    color: 'green',
  }
  const failAlert = {
    color: 'red',
  }

  if (!notif) return null

  return (
    <div className="notif" style={successAction ? successAlert : failAlert}>
      {notif}
    </div>
  )
}

export default Notification
