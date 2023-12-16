import {Box, Button, Divider, TextField,Stack} from "@mui/material";
import React from "react";
import UserList from "../components/users_sidebar";

export function MessageBox() {

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        console.log(data.get('message'));
    };
    return (
        <Box component="form" onSubmit={sendMessage} noValidate autoComplete="off" p={1}>
            <Stack spacing={2}>
                <TextField
                    label="Message"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="message"
                />
                <Button variant="contained" type="submit" fullWidth sx={{backgroundColor: '#4CAF50', color: 'white', '&:hover': {
                                backgroundColor: '#45a049'
                            } }}>
                    Envoyer
                </Button>
            </Stack>
        </Box>
    );
}