import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <Stack textAlign={"center"} marginTop={"40vh"} spacing={4}>
        <Typography variant="h2" fontWeight={"bold"}>
            ברוך הבא לאתר הקורסים👋
        </Typography>
        <Link style={{textDecoration:"none"}} to={"/login"}><Typography sx={{color:"white"}} variant="h4">להתחברות👉</Typography></Link>
    </Stack>
  )
}
