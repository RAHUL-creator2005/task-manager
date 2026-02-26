import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, ListItemButton, Avatar, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ open, variant, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Login', icon: <LoginIcon />, path: '/login' },
    ];

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const user = {
        name: storedUser?.name || 'User Name',
        email: storedUser?.email || 'user@example.com'
    };

    const getInitials = (name) => {
        if (!name) return 'UN'; // Default initials
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#0f172a', // Deep slate/navy
                    color: '#f8fafc',
                    borderRight: 'none',
                    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.05)'
                },
            }}
            variant={variant}
            anchor="left"
            open={open}
            onClose={onClose}
        >
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                    sx={{
                        width: 64,
                        height: 64,
                        margin: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                        boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}
                >
                    {getInitials(user.name)}
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#f8fafc' }}>
                    {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    {user.email}
                </Typography>
            </Box>
            <Divider sx={{ mx: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
            <List sx={{ mt: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{
                                color: '#94a3b8',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    color: 'primary.main',
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.main',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    color: '#f8fafc',
                                    '& .MuiListItemIcon-root': {
                                        color: '#f8fafc',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : '#64748b' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}

                <Divider sx={{ mx: 2, my: 1, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            color: '#94a3b8',
                            '&:hover': {
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                '& .MuiListItemIcon-root': {
                                    color: '#ef4444',
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#64748b' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
