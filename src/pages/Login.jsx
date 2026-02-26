import { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Avatar, Link, Stack, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
    const navigate = useNavigate();

    // 1. Create state to hold our form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // 2. Create state for success or error messages
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // 3. Function to update state when user types
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 4. Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setMessage('');
        setError('');

        try {
            // Call the backend API
            const response = await API.post('/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // If successful, store the token and user info
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setMessage(response.data.message);

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            // If there's an error, show it to the user
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3
            }}
        >
            <Container maxWidth="xs" sx={{ m: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Sign In
                    </Typography>

                    {/* Show Success or Error Messages */}
                    {message && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{message}</Alert>}
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: 45, fontWeight: 'bold' }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Forgot password?
                            </Typography>
                            <Link component={RouterLink} to="/signup" color="primary" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <PersonAddIcon sx={{ mr: 0.5, fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Sign Up</Typography>
                            </Link>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
