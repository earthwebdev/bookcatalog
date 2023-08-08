import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthorsPage from './pages/Authors'
import GenresPage from './pages/Genres'
import GenreDetailsPage from './pages/GenreDetailsPage'
import AuthorDetailsPage from './pages/AuthorDetailsPage'
import BookDetailPage from './pages/BookDetailPage'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/authors' element={<AuthorsPage />} />
        <Route path='/genres' element={<GenresPage />} />

        <Route path='/genres/:id' element={<GenreDetailsPage />} />
        <Route path='/authors/:id' element={<AuthorDetailsPage />} />

        <Route path='/books/:id' element={<BookDetailPage />} />
    </Routes>
  )
}

export default App
