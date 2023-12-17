import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const nav = useNavigate();
    const username = sessionStorage.getItem('username');

    function handleLogout() {
        sessionStorage.clear();
        nav('/login');
    }

    function home(){
        nav('/login');
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: green[500] }}>
            <Toolbar>
                <Typography onClick={home} variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', cursor: 'pointer' }}>
                    Saad Chat
                </Typography>
                {username && (
                    <Typography variant="body1" sx={{ color: 'white', marginRight: 2 }}>
                        {`Bienvenue, ${username}`}
                    </Typography>
                )}
                {username && (
                    <Box sx={{ display: 'flex' }}>
                        <Button onClick={handleLogout} color="inherit">
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;