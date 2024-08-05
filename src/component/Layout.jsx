
import {
    AppBar,
    Avatar,
    Box,
    Stack,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { Link, Outlet, useNavigate } from "react-router-dom";
  
  export default function Layout() {
    const logout = ()=>{
        localStorage.clear();
        navigate("/")
    }
    const navigate = useNavigate();
    return (
      <>
        
          
         <div style={{marginBottom:"20vh"}}>
         <AppBar position="fixed" sx={{ width: "100%", margin: 0 }}>
              <Toolbar>
                <Stack width={"100%"} direction={"row"} color={"white"} alignItems={"center"} justifyContent={"space-between"} spacing={2}>
                <Typography variant="button">
                  <Link to="/courses" style={{textDecoration:"none",color:"white"}}>קורסים</Link>
                </Typography>
                <Typography variant="button">
                  <Link style={{textDecoration:"none",color:"white"}} to="/login">התחבר</Link>
                </Typography>
                {
                  localStorage.getItem("admin")&&<Typography variant="button">
                  <Link style={{textDecoration:"none",color:"white"}} to="/admin">מנהל</Link>
                </Typography>
                }
                <Typography variant="button" onClick = {logout} sx={{backgroundColor:"white",color:"blue", padding:"3px", borderRadius:"6px",cursor:"pointer"}} >
                  התנתק
                </Typography>
                </Stack>
              </Toolbar>
            </AppBar>
         </div>
        <Outlet />
      </>
    );
  }