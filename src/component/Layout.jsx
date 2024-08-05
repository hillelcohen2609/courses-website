import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Context";
import { getUserById } from "../api/admin/users";

export default function Layout() {
  const { userId, isAdmin, login, adminLogin, logout } =
    useContext(UserContext);
  const clear = () => {
    logout();
    navigate("/");
  };
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((res) => {
        console.log(res);
        setUserName(res.name);
      });
    }
  }, [userId]);

  const navigate = useNavigate();
  return (
    <>
      <div style={{ marginBottom: "20vh" }}>
        <AppBar position="fixed" sx={{ width: "100%", margin: 0 }}>
          <Toolbar>
            <Stack
              width={"100%"}
              direction={"row"}
              color={"white"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={2}
            >
              {userId && userName && (
                <Typography variant="button">{userName}</Typography>
              )}
              <Typography variant="button">
                <Link
                  to="/courses"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  קורסים
                </Link>
              </Typography>

              {isAdmin && (
                <>
                  <Typography variant="button">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/all-users"
                    >
                      משתמשים
                    </Link>
                  </Typography>
                  <Typography variant="button">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/add-course"
                    >
                      הוספת קורס
                    </Link>
                  </Typography>
                </>
              )}
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="button">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/login"
                  >
                    התחבר
                  </Link>
                </Typography>
                <Typography
                  variant="button"
                  onClick={clear}
                  sx={{
                    backgroundColor: "white",
                    color: "blue",
                    padding: "3px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  התנתק
                </Typography>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
      <Outlet />
    </>
  );
}
