import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../api/admin/users";
import { Button, Stack, Typography } from "@mui/material";

export default function AdminPageUsers() {
  const [users, setUsers] = useState([]);

  const init = () => {
    getAllUsers()
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  };

  const deleteUserById = (id) => {
    deleteUser(id).then((res) => {
      if (res === 204) {
        init();
      }
    });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Stack>
      <Typography variant="h3" textAlign={"center"}>
        ניהול משתמשים
      </Typography>
      {users && (
        <table
          style={{
            border: "1px solid black",
            borderCollapse: "collapse",
            margin: "3rem",
          }}
        >
          <tr
            style={{
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              {" "}
              שם משתמש
            </th>
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              סיסמא
            </th>
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              {" "}
              מייל
            </th>
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              מחק
            </th>
          </tr>
          {users.map((user) => {
            return (
              <tr
                key={user.id}
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <Typography variant="h6" textAlign={"center"} color={"black"}>
                    {user.name}
                  </Typography>
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <Typography variant="h6" textAlign={"center"} color={"black"}>
                    {user.password}
                  </Typography>
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <Typography variant="h6" textAlign={"center"} color={"black"}>
                    {user.mail}
                  </Typography>
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      deleteUserById(user.id);
                    }}
                  >
                    מחק משתמש
                  </Button>
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </Stack>
  );
}
