/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'CREATED':
            return `anecdote '${action.payload}' created`
        case 'VOTED':
            return `anecdote '${action.payload}' voted`
        case 'ERROR':
            return action.payload
        default:
            return null
    }
}

// context
const NotificationContext = createContext()

// extract notification value
export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

// extract notification dispatch
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)    
    return notificationAndDispatch[1]

    // another solution:
    // const dispatch = notificationAndDispatch[1]

    // return (type, payload) => {
    //     dispatch({ type, payload })
    //     setTimeout(() => {
    //         dispatch({ type: 'CLEAR', payload: null })
    //     }, 5000)
    // }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext