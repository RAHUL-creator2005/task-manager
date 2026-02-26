import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component
 * It checks if a token exists in localStorage.
 * If yes, it allows the user to see the page (children).
 * If no, it redirects the user to the Login page.
 */
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login if there is no token
        return <Navigate to="/login" replace />;
    }

    // Return the protected component (e.g., Dashboard) if token exists
    return children;
};

export default ProtectedRoute;
