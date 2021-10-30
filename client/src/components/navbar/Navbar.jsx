import './navbar.css'
import Notification from '../../img/notification.svg'
import Message from '../../img/message.svg'
import Settings from '../../img/settings.svg'
import { useEffect, useState } from 'react'

const Navbar = ({ socket }) => {
    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.on('getNotification', (data) => {
            setNotifications(prev => [...prev, data])
        }, [socket])
    })

    // console.log(notifications)

    const displayNotification = ({ senderName, type, i }) => {
        let action

        action = (type === 1) ? "liked" : (type === 2) ? "commented" : (type === 3 ) ? "shared" : null

        return (
            <span className="notification" key={i}>{`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([])
        setOpen(false)
    }
    return (
        <div className="navbar">
            <span className="logo">Noty App</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} alt="" className="iconImg" />
                    {
                        notifications.length > 0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div className="icon">
                    <img src={Message} alt="" className="iconImg" />
                    <div className="counter">2</div>
                </div>
                <div className="icon">
                    <img src={Settings} alt="" className="iconImg" />
                    <div className="counter">2</div>
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((notification, i) => displayNotification({...notification, i}))}
                    <button className="markRead" onClick={handleRead}>Mark as read</button>
                </div>
            )}
        </div>
    )
}

export default Navbar
