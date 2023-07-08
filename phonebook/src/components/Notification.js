const Notification = ({notification}) => {
    const notificationStyle = {
        color: notification.color,
        border: "solid",
        paddingLeft: 4,
        fontSize: 16
      }
    if (notification.message === null){
        return null
    }
    return (
        <div style={notificationStyle}>
            <p>{notification.message}</p>
        </div>
    )
}

export default Notification