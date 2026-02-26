import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Box,
    IconButton,
    Stack,
    Alert,
    Snackbar,
    TextField,
    Tooltip,
    InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import API from '../api';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    // 1. States for tasks and notifications
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // 2. Function to fetch tasks from backend
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get('/api/tasks', {
                headers: { 'x-auth-token': token }
            });
            setTasks(response.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    // Fetch tasks when the page loads
    useEffect(() => {
        fetchTasks();
    }, []);

    // 3. Handle Submit function for creating a task
    const handleSubmit = async (status = 'pending') => {
        if (!newTaskTitle.trim()) {
            setError('Please enter a task title');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await API.post('/api/tasks',
                {
                    title: newTaskTitle,
                    description: 'New task created from Dashboard',
                    status
                },
                { headers: { 'x-auth-token': token } }
            );

            setMessage('Task created successfully!');
            setNewTaskTitle(''); // Clear the input field
            fetchTasks(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating task');
        }
    };

    // 4. Handle Delete function
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            const token = localStorage.getItem('token');
            await API.delete(`/api/tasks/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setMessage('Task deleted successfully!');
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting task');
        }
    };

    // 5. Handle Update (Move) function
    const handleUpdate = async (task, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await API.put(`/api/tasks/${task._id}`,
                { ...task, status: newStatus },
                { headers: { 'x-auth-token': token } }
            );
            fetchTasks(); // Refresh to show in new column
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating task');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 4 }} alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
                    Task Overview
                </Typography>

                <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                    <TextField
                        placeholder="What needs to be done?"
                        size="small"
                        fullWidth
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit('pending')}
                        InputProps={{
                            endAdornment: newTaskTitle && (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => setNewTaskTitle('')}>
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'white'
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ borderRadius: 2, px: 3, fontWeight: 'bold', textTransform: 'none', whiteSpace: 'nowrap' }}
                        onClick={() => handleSubmit('pending')}
                    >
                        Add Task
                    </Button>
                </Box>
            </Stack>

            {/* Success and Error Alerts */}
            {message && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage('')}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

            <TableContainer sx={{ backgroundColor: 'white', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                            <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0', py: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    To-Do
                                    <IconButton size="small" color="primary" onClick={() => handleSubmit('pending')}>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0', py: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    In-Progress
                                    <IconButton size="small" color="primary" onClick={() => handleSubmit('in-progress')}>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #e2e8f0', py: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    Done
                                    <IconButton size="small" color="primary" onClick={() => handleSubmit('completed')}>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.length === 0 ? (
                            <TableRow>
                                <TableCell align="center" sx={{ py: 4, borderRight: '1px solid #e2e8f0', borderBottom: 'none' }}>
                                    <Button size="small" startIcon={<AddIcon />} sx={{ textTransform: 'none' }} onClick={() => handleSubmit('pending')}>Add Task</Button>
                                </TableCell>
                                <TableCell align="center" sx={{ py: 4, borderRight: '1px solid #e2e8f0', borderBottom: 'none' }}>
                                    <Button size="small" startIcon={<AddIcon />} sx={{ textTransform: 'none' }} onClick={() => handleSubmit('in-progress')}>Add Task</Button>
                                </TableCell>
                                <TableCell align="center" sx={{ py: 4, borderBottom: 'none' }}>
                                    <Button size="small" startIcon={<AddIcon />} sx={{ textTransform: 'none' }} onClick={() => handleSubmit('completed')}>Add Task</Button>
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Group tasks by status for the columns
                            <TableRow>
                                <TableCell sx={{ borderRight: '1px solid #e2e8f0', verticalAlign: 'top', pb: 2 }}>
                                    {tasks.filter(t => t.status === 'pending').map(t => (
                                        <Box key={t._id} sx={{ p: 1, mb: 1, bgcolor: '#f1f5f9', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">{t.title}</Typography>
                                            <Box>
                                                <IconButton size="small" color="primary" onClick={() => handleUpdate(t, 'in-progress')}>
                                                    <ArrowForwardIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton size="small" color="error" onClick={() => handleDelete(t._id)}>
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    ))}
                                    <Button
                                        fullWidth
                                        size="small"
                                        startIcon={<AddIcon />}
                                        onClick={() => handleSubmit('pending')}
                                        sx={{ mt: 1, color: 'text.secondary', justifyContent: 'flex-start', textTransform: 'none' }}
                                    >
                                        Add Task
                                    </Button>
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid #e2e8f0', verticalAlign: 'top', pb: 2 }}>
                                    {tasks.filter(t => t.status === 'in-progress').map(t => (
                                        <Box key={t._id} sx={{ p: 1, mb: 1, bgcolor: '#eff6ff', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton size="small" color="primary" onClick={() => handleUpdate(t, 'pending')}>
                                                    <ArrowBackIcon fontSize="inherit" />
                                                </IconButton>
                                                <Typography variant="body2">{t.title}</Typography>
                                            </Box>
                                            <Box>
                                                <IconButton size="small" color="primary" onClick={() => handleUpdate(t, 'completed')}>
                                                    <ArrowForwardIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton size="small" color="error" onClick={() => handleDelete(t._id)}>
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    ))}
                                    <Button
                                        fullWidth
                                        size="small"
                                        startIcon={<AddIcon />}
                                        onClick={() => handleSubmit('in-progress')}
                                        sx={{ mt: 1, color: 'text.secondary', justifyContent: 'flex-start', textTransform: 'none' }}
                                    >
                                        Add Task
                                    </Button>
                                </TableCell>
                                <TableCell sx={{ verticalAlign: 'top', pb: 2 }}>
                                    {tasks.filter(t => t.status === 'completed').map(t => (
                                        <Box key={t._id} sx={{ p: 1, mb: 1, bgcolor: '#f0fdf4', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton size="small" color="primary" onClick={() => handleUpdate(t, 'in-progress')}>
                                                    <ArrowBackIcon fontSize="inherit" />
                                                </IconButton>
                                                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>{t.title}</Typography>
                                            </Box>
                                            <IconButton size="small" color="error" onClick={() => handleDelete(t._id)}>
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Button
                                        fullWidth
                                        size="small"
                                        startIcon={<AddIcon />}
                                        onClick={() => handleSubmit('completed')}
                                        sx={{ mt: 1, color: 'text.secondary', justifyContent: 'flex-start', textTransform: 'none' }}
                                    >
                                        Add Task
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Dashboard;
