import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { All_Books, BOOKADDED } from './queries'

const updateCache = (cache, query, addedBook) => {
  const uniquebooks = (books) => {
    let seen = new Set()
    return books.filter((book) => {
      let bookTitle = book.title
      return seen.has(bookTitle) ? false : seen.add(bookTitle)
    })
  }
  cache.updateQuery(query, ({allBooks}) => {
    return {
      allBooks: uniquebooks(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOKADDED, {
    onData: ({data, client}) => {
      const addedBook =  data.data.bookAdded
      updateCache(client.cache, {query: All_Books}, addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        }
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage} />
      
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
