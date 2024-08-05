import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function ErrorPage() {
  return (
    <Stack sx={{color:"white"}} textAlign={"center"} spacing={"2"} marginTop={"40vh"}>
        <Typography fontWeight={"bold"} variant="h3" paddingBottom={"5vh"}>שגיאה 404 העמוד לא נמצא 😬</Typography>
        <Link to="/" style = {{textDecoration:"none" , color:"blue"}}><Typography variant="h5">חזרה לעמוד הבית 👉</Typography></Link>
    </Stack>
  )
}
