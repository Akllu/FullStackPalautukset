import { useState, useEffect } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscriptions'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import Notification from './components/Notification'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUserToken = localStorage.getItem('library-user-token')
    if (loggedUserToken) setToken(loggedUserToken)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      setNotification({ message: `${addedBook.title} added`, type: 'success' })
      setTimeout(() => setNotification(null), 5000)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </> 
        : <button onClick={() => setPage('login')}>login</button> 
        }         
      </div>
      <Notification notification={notification} />
      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setNotification={setNotification} />

      <Recommend show={page === 'recommend'} />

      <LoginForm 
        show={page === 'login'} 
        setNotification={setNotification} 
        setToken={setToken} 
      />
    </div>
  )
}

export default App
