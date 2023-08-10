import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthorsPage from './pages/Authors'
import GenresPage from './pages/Genres'
import GenreDetailsPage from './pages/GenreDetailsPage'
import AuthorDetailsPage from './pages/AuthorDetailsPage'
import BookDetailPage from './pages/BookDetailPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardPage from './pages/dashboardPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import LogoutPage from './pages/LogoutPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import SecureRoutes from './routes/SecureRoutes';
import PrivateRoutes from './routes/PrivateRoutes'
import Sidebar from './components/Sidebar'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/authors' element={<AuthorsPage />} />
          <Route path='/genres' element={<GenresPage />} />

          <Route path='/genres/:id' element={<GenreDetailsPage />} />
          <Route path='/authors/:id' element={<AuthorDetailsPage />} />

          <Route path='/books/:id' element={<BookDetailPage />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgetpassword' element={<ForgetPasswordPage />} />
          <Route path='/resetpassword/:resettoken' element={<ResetPasswordPage />} />
          
          <Route path='/' element={<SecureRoutes />}>
                <Route path='/' element={<Sidebar />}>
                    <Route path='/dashboard' element={<DashboardPage />} />
                      <Route path='/' element={<PrivateRoutes />} >
                        {/* <Route path='/lectures' element={<LecturesPage />} />
                        <Route path='/lectures/add' element={<AddLecturesPage />} />
                        <Route path='/lectures/:id' element={<EditLecturesPage />} />
                        <Route path='/courses/add' element={<CourseAddPage />} />
                        <Route path='/courses/:id' element={<EditCoursesPage />} />

                        <Route path='/sections' element={<SectionPage />} />
                        <Route path='/sections/add' element={<SectionAddPage />} />
                        <Route path='/sections/:id' element={<EditSectionsPage />} /> */}
                      </Route>                    
                    <Route path='/logout' element={<LogoutPage />} />
              </Route>
            </Route>
          
          
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
