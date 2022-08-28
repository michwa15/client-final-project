import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SettingsIcon from '@mui/icons-material/Settings';
import { StyledEngineProvider } from '@mui/material/styles';
import { isAuthenticated, logout } from '../../helpers/auth';
import './NavBar.css';

let pages = ['Products', 'ReadMe', 'Login', 'Register', 'MyStore'];

const settings = ['My Cart', 'Checkout', 'Logout'];

export const NavBar = () => {
    const navigate = useNavigate();
    
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    const toggleSettingsMenu = () => {
        setIsMenuOpen(isMenuOpen => !isMenuOpen);
    };

    const handleNavigate = (page) => {
        switch(page) {
            case 'Products': 
                navigate('/products');
                break;
            case 'ReadMe':
                navigate('/read-me');
                break;
            case 'Login':
                navigate('/sign-in');
                break;
            case 'Register':
                navigate('/register');
                break;
            case 'MyStore':
                navigate('/admin-settings');
                break;
            default: 
                return;
        }
    };

    const handleSettingsMenu = (action) => {
        if(!isAuthenticated()) {
            navigate('/sign-in');
            return;
        }
        switch(action) {
            case 'Logout':
                handleLogout();
                break;
            case 'My Cart':
                navigate('/cart');
                break;
            case 'Checkout':
                navigate('/checkout');
                break;
            default :
                console.log('No act');
        }
    };

    const handleLogout = async () => {
        try {
            const user = isAuthenticated();
            await logout(user);
            navigate('/sign-in');
        } catch (err) {
            console.log('Signout Error', err);
        }
    };

    return (
        <StyledEngineProvider injectFirst>
            <AppBar position="static">
                <Container maxWidth='100vw'>
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 8,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Shoes on!
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            {pages.map((page) => (
                                <Button 
                                    key={page}
                                    onClick={() => handleNavigate(page)}
                                    sx={{ my: 2, color: 'white', display: 'block', letterSpacing: '.1rem' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={toggleSettingsMenu} sx={{ p: 0 }}>
                                    <SettingsIcon sx={{color: 'white'}}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={isMenuOpen}
                                onClick={toggleSettingsMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleSettingsMenu(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </StyledEngineProvider>
    );
};
