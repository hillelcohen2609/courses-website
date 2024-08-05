import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import Layout from "./component/Layout";
import Login from "./pages/loginPage/Login";
import SignIn from "./pages/loginPage/SignIn";
import CoursePage from "./pages/courses/CoursePage";
import theme from "./theme/them";
import ErrorPage from "./pages/errorPage/ErrorPage";
import CourseInfoPage from "./pages/courseInfoPage/CourseInfoPage";
import AdminPageUsers from "./pages/admin/AdminPageUsers";
import { useContext } from "react";
import { UserContext } from "./context/Context";
import AdminAddCourse from "./pages/admin/AdminAddCourse";

function App() {
  const { userId, isAdmin } = useContext(UserContext);
  console.log(userId);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="signin" element={<SignIn />} />
            {userId && (
              <>
                <Route path="courses" element={<CoursePage />} />
                <Route path="course" element={<CourseInfoPage />} />
                {isAdmin && (
                  <>
                    <Route path="all-users" element={<AdminPageUsers />} />
                    <Route path="add-course" element={<AdminAddCourse />} />
                  </>
                )}
              </>
            )}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
