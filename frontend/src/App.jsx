import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/Authors";
import GenresPage from "./pages/Genres";
import GenreDetailsPage from "./pages/GenreDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "./pages/dashboardPage";
//admin page part heres
import AdminDashboardPage from "./pages/admin/DashboardPage";
//genres routes infos
import AdminGenresListPage from './pages/admin/genres/GenresListPage';
import AdminGenresViewPage from './pages/admin/genres/GenresViewPage';

import AdminCreateGenrePage from "./pages/admin/genres/CreateGenrePage";
import AdminEditGenrePage from "./pages/admin/genres/EditGenrePage";

//author routes info
import AdminAuthorsListPage from './pages/admin/authors/ListPage';
import AdminAuthorsViewPage from './pages/admin/authors/ViewPage';

import AdminCreateAuthorPage from "./pages/admin/authors/CreatePage";
import AdminEditAuthorPage from "./pages/admin/authors/EditPage";
//book admin routes
import AdminbooksListPage from './pages/admin/books/ListPage';
import AdminCreateBookPage from "./pages/admin/books/CreatePage";
import AdminEditBookPage from "./pages/admin/books/EditPage";
import AdminBooksViewPage from './pages/admin/books/viewPage';
//admin routes for the reviews
import AdminreviewsListPage from './pages/admin/reviews/listPage';
import AdminCreateReviewPage from './pages/admin/reviews/CreatePage';
import AdminEditReviewPage   from "./pages/admin/reviews/EditPage";
import AdminReviewsViewPage  from "./pages/admin/reviews/ViewPage";
//setting admin routes 
import AdminSettingsListPage from "./pages/admin/settings/ListPage";
import AdminCreateSettingPage from './pages/admin/settings/CreatePage';
import AdminEditSettingPage from './pages/admin/settings/EditPage';

import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import LogoutPage from "./pages/LogoutPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import SecureRoutes from "./routes/SecureRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Sidebar from "./components/Sidebar";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/genres" element={<GenresPage />} />

        <Route path="/genres/:id" element={<GenreDetailsPage />} />
        <Route path="/authors/:id" element={<AuthorDetailsPage />} />

        <Route path="/books/:id" element={<BookDetailPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/resetpassword/:resettoken" element={<ResetPasswordPage />} />

        <Route path="/" element={<SecureRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/" element={<Sidebar />}>
            <Route path="/admin" element={<PrivateRoutes />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />              
                <Route path="genres" element=''>
                  <Route path=":id" element={<AdminGenresViewPage />} />
                  <Route path="edit/:id" element={<AdminEditGenrePage />} />
                  <Route path="create" element={<AdminCreateGenrePage />} />
                  <Route index element={<AdminGenresListPage />} />
                </Route>

                <Route path="authors" element=''>
                  <Route path=":id" element={<AdminAuthorsViewPage />} />
                  <Route path="edit/:id" element={<AdminEditAuthorPage />} />
                  <Route path="create" element={<AdminCreateAuthorPage />} />
                  <Route index element={<AdminAuthorsListPage />} />
                </Route>
                <Route path="books" element=''>
                  <Route path=":id" element={<AdminBooksViewPage />} /> 
                  <Route path="edit/:id" element={<AdminEditBookPage />} />
                  <Route path="create" element={<AdminCreateBookPage />} />
                  <Route index element={<AdminbooksListPage />} />
                </Route>
                <Route path="reviews" element=''>
                  <Route path=":id" element={<AdminReviewsViewPage />} />
                  <Route path="edit/:id" element={<AdminEditReviewPage   />} />
                  <Route path="create" element={<AdminCreateReviewPage />} /> 
                  <Route index element={<AdminreviewsListPage />} />
                </Route>

                <Route path="settings" element=''>
                  {/* <Route path=":id" element={<AdminReviewsViewPage />} />*/} 
                  <Route path="edit/:id" element={<AdminEditSettingPage   />} />
                  <Route path="create" element={<AdminCreateSettingPage />} /> 
                  <Route index element={<AdminSettingsListPage />} />
                </Route>
                
              {/* <Route path='/lectures' element={<LecturesPage />} />
                        <Route path='/lectures/add' element={<AddLecturesPage />} />
                        <Route path='/lectures/:id' element={<EditLecturesPage />} />
                        <Route path='/courses/add' element={<CourseAddPage />} />
                        <Route path='/courses/:id' element={<EditCoursesPage />} />

                        <Route path='/sections' element={<SectionPage />} />
                        <Route path='/sections/add' element={<SectionAddPage />} />
                        <Route path='/sections/:id' element={<EditSectionsPage />} /> */}
            </Route>
          </Route>
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
