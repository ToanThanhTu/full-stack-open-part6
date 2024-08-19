import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
    return dispatch => {
        dispatch(addNotification(text))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer