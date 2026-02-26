import { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Avatar, Link, Alert } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import API from '../api';

const Signup = () => {
    const navigate = useNavigate();

    // 1. Create state to hold our form data
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await API.post('/api/auth/register', {
                name: formData.username,
                email: formData.email,
                password: formData.password
            });

            // If successful, store the token and student info
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setMessage(response.data.message);

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            // If there's an error, show it to the user
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
                        <PersonAddOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Join us to manage your tasks efficiently
                    </Typography>

                    {/* Show Success or Error Messages */}
                    {message && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{message}</Alert>}
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                    <Box component="form" noValidate sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Full Name"
                            name="username"
                            autoComplete="name"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            autoComplete="new-password"
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
                            Sign Up
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign In
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Signup;
