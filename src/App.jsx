import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from "./pages/HomePage"
import Layout from "./component/Layout"
import Login from "./pages/loginPage/Login"
import SignIn from "./pages/loginPage/SignIn"
import CoursePage from "./pages/courses/CoursePage"
import theme from "./theme/them";
import ErrorPage from "./pages/errorPage/ErrorPage";
import CourseInfoPage from "./pages/courseInfoPage/CourseInfoPage";
import AdminPageUsers from "./pages/admin/AdminPageUsers";


function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login/>}/>
          <Route path="signin" element={<SignIn/>}/>
          {
            localStorage.getItem("id")&&
            <>
               <Route path="courses" element={<CoursePage/>}/>
               <Route path="course" element={<CourseInfoPage/>}/>
               {
                localStorage.getItem("admin")&&
                <>
                <Route path="admin" element={<AdminPageUsers/>}/>
                </>
               }
            </>
          }
          <Route path="*" element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
