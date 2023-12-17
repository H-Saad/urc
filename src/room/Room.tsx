import {Box, Button, Divider, TextField, Typography} from "@mui/material";
import React from "react";
import UserList from "../components/users_sidebar";
import { MessageBox } from "../components/msg_box";
import Navbar from '../components/navbar';


 function Room() {
    return (
        <>
        <Navbar></Navbar>
        <Box display="flex" height="100vh">
            <UserList />
            <Divider orientation="vertical" flexItem />
            <Box width="60%" display="flex" flexDirection="column">
                <Box display="flex" justifyContent="center">
                    <Typography variant="h5">Messages</Typography>
                </Box>
                <Box flexGrow={1} overflow="auto">
                    {/* Content of messages goes here */}
                </Box>
                <MessageBox />
            </Box>
        </Box>
        </>
    );
}



export default Room;