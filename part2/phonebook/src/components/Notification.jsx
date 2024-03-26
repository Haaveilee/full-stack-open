const Notification = ({ message, messageClass }) => {
    if (message === null) {
        return null
    } else if (messageClass === 'error') {
        return (
            <div className='error' >
                {message}
            </div>
            )
    } else if (messageClass === 'eventMessage') {
        return (
            <div className='eventMessage' >
                {message}
            </div>
        )
    }
}

export default Notification