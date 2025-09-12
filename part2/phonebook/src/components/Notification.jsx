const Notification = ({ message, type }) => {
    const baseStyle = {
        borderRadius: '5px',
        padding: '0.5em',
        background: 'lightgrey',
        marginBottom: '0.83em'
    }

    const successfulOperationStyle = {
        ...baseStyle,
        border: '3px solid green',
        color: 'green'
    }

    const unsuccessfulOperationStyle = {
        ...baseStyle,
        border: '3px solid red',
        color: 'red'
    }

    const notificationStyle = type ? successfulOperationStyle : unsuccessfulOperationStyle

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification