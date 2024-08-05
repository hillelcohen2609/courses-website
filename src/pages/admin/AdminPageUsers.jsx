import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers } from '../../api/admin/users'
import { Button, Stack, Typography } from '@mui/material';

export default function AdminPageUsers() {
  const [users,setUsers] = useState([])

  const init = ()=>{
    getAllUsers().then(res=>setUsers(res)).catch(err=>console.log(err));
  }

  const deleteUserById = (id)=>{
    deleteUser(id).then(res=>{
      if (res===204) {
          init();
      }
    })
                

  }

  useEffect(()=>{
    init();
  },[])
  return (
    <Stack>
      {
        users&&<table>
          {
            users.map(user=>{
              return(
                <tr key={user.id} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                  <td><Typography variant='h4' textAlign={"center"} color={"black"}>{user.name}</Typography></td>
                  <td><Typography variant='h4' textAlign={"center"} color={"black"}>{user.password}</Typography></td>
                  <td><Typography variant='h4' textAlign={"center"} color={"black"}>{user.mail}</Typography></td>
                  <td><Button variant='contained' onClick={()=>{
                   deleteUserById(user.id)
                  }}>מחק משתמש</Button></td>
                </tr>
              )
            })
          }
        </table>
      }
      
    </Stack>
    
  )
}
