import { Button, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/logInController/loginController";
import { UserContext } from "../../context/Context";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    userId,
    isAdmin,
    login: loginContext,
    adminLogin,
    logout,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const submit = () => {
    login({ name: username, password: password, mail: "dfdfdsf" })
      .then((res) => {
        console.log(res);
        if (res.data && res && res.data.id) {
          if (res.data.name === "admin" && res.data.password === "1234") {
            adminLogin();
          }
          loginContext(res.data.id);
          navigate("/courses");
        } else {
          console.log("here");
          setPassword("");
          alert("שם משתמש או סיסמא שגויים");
        }
      })
      .catch((err) => {
        console.log("catch");
        setPassword("");
        alert("שם משתמש או סיסמא שגויים");
      });
  };

  return (
    <Stack
      textAlign={"center"}
      width={"25vw"}
      margin={"auto"}
      marginTop={"30vh"}
    >
      <Stack width={"90%"} margin={"auto"} paddingBottom={"2vh"}>
        <Typography variant="h4" marginBottom={"2vh"}>
          התחבר
        </Typography>
        <TextField
          placeholder="שם משתמש"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          placeholder="הכנס סיסמא"
          value={password}
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button
          disabled={!username || !password}
          size="large"
          variant="contained"
          onClick={submit}
        >
          התחבר
        </Button>
      </Stack>
      <Stack alignItems={"center"} marginTop={"2vh"}>
        <Stack direction={"row"} spacing={1.5}>
          <Link
            to={"/signin"}
            style={{ textDecoration: "none", color: "blue" }}
          >
            <Typography variant="body1">לעמוד הרשמה</Typography>
          </Link>
          <Typography variant="body1">?עוד לא נרשמתם</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
