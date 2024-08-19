import { useNotificationDispatch, useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notificationDispatch = useNotificationDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue()

  // remove notification after 5 seconds
  setTimeout(() => {
    notificationDispatch({ type: 'RESET', payload: null })
  }, 5000)

  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
