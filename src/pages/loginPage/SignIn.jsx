import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../../api/logInController/loginController";
import { UserContext } from "../../context/Context";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reapeatPassword, setReapeatPassword] = useState("");
  const [mail, setMail] = useState("");

  const { userId, isAdmin, login, adminLogin, logout } =
    useContext(UserContext);

  const navigate = useNavigate();

  const submit = () => {
    //send to the backend and verify
    if (password === reapeatPassword) {
      addNewUser({ name: username, password: password, mail: mail })
        .then((res) => {
          if (res.data.id) {
            login(res.data.id);
            navigate("/courses");
          } else {
            setUsername("");
            alert("אנא בחרי שם משתמש אחר");
          }
        })
        .catch((err) => {
          setUsername("");
          setMail("");
          alert("אנא בחרי שם משתמש ומייל שונים");
        });
    } else {
      alert("הסיסמאות אינן תואמות");
      setPassword("");
      setReapeatPassword("");
    }
  };

  return (
    <Stack
      textAlign={"center"}
      width={"20vw"}
      margin={"auto"}
      marginTop={"30vh"}
    >
      <Typography variant="h4" marginBottom={"2vh"}>
        הירשם
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
      <TextField
        placeholder="הכנס שוב סיסמא"
        value={reapeatPassword}
        type="password"
        onChange={(event) => {
          setReapeatPassword(event.target.value);
        }}
      />
      <TextField
        placeholder="הכנס אימייל"
        type="email"
        value={mail}
        onChange={(event) => setMail(event.target.value)}
      />
      <Button
        size="large"
        variant="contained"
        disabled={!password || !username || !reapeatPassword || !mail}
        onClick={submit}
      >
        הירשם
      </Button>
      <Stack alignItems={"center"} marginTop={"2vh"}>
        <Stack direction={"row"} spacing={1.5}>
          <Link to={"/login"} style={{ textDecoration: "none", color: "blue" }}>
            <Typography variant="body1">לעמוד התחברות</Typography>
          </Link>
          <Typography variant="body1">?כבר רשומים</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
