/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter) {
            return anecdotes.filter(anecdote => anecdote.content.includes(filter))
        }

        return anecdotes        
    })

    const addVote = (anecdote) => {
        dispatch(vote(anecdote))

        // add notification, then remove notification after 5 seconds
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        [...anecdotes]
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => addVote(anecdote)}
                />
            )
    )

}

export default AnecdoteList