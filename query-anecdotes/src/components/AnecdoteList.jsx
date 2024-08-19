import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const updatedAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            // update the anecdotes list
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
                anecdote.id !== updatedAnecdote.id
                    ? anecdote
                    : updatedAnecdote
            ))
        }
    })

    const handleVote = (anecdote) => {
        updatedAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1
        })

        notificationDispatch({ type: 'VOTED', payload: anecdote.content })
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false,
        retry: 2
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data
    return (
        <div>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList