import {List, ListItem,Box, ListItemText,Drawer,Divider,Typography} from "@mui/material";
import {User, Room} from "../model/common";
import {CustomError} from "../model/CustomError";
import { green } from '@mui/material/colors';
import {JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState} from "react";
import {getAllUsers, getAllRooms} from "./users_sidebar_api";
import {useDispatch} from "react-redux";
import {setUser} from "../Redux/Actions/userActions";



function UserList() {
    const [error, setError] = useState({} as CustomError);
    const [users, setUsers] = useState([] as User[]);
    const [rooms, setRooms] = useState([] as Room[]);

    function userClick(user: any){
      alert(JSON.stringify(user))
    }

    function roomClick(room: any){
      alert(JSON.stringify(room))
    }

   getAllUsers((result: User[]) => {
        setUsers(result);
    }, (error: CustomError) => {
        setError(error);
    });

    getAllRooms((result: Room[]) => {
      setRooms(result);
  }, (error: CustomError) => {
      setError(error);
  });


  return (
    <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: 240, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
    >
      <Box sx={{ bgcolor: green[500], color: 'white', padding: 2 }}>
            <Typography variant="h6">Rooms</Typography>
        </Box>
        <List>
            {rooms.map((room) => (
                <ListItem button key={room.room_id} onClick={() => roomClick(room)}>
                    <ListItemText primary={room.name} />
                </ListItem>
            ))}
        </List>
        <Box sx={{ bgcolor: green[500], color: 'white', padding: 2 }}>
            <Typography variant="h6">Utilisateurs</Typography>
        </Box>
        <Divider />
        <List>
            {users.map((user) => (
                <ListItem button key={user.user_id} onClick={() => userClick(user)}>
                    <ListItemText primary={user.username} secondary={user.last_login} />
                </ListItem>
            ))}
        </List>
        <Divider />
    </Drawer>
  );
}


export default UserList;