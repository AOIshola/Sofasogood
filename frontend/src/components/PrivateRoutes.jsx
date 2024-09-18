import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoutes() {
    // const navigate = useNavigate()
    const { currentUser } = useAuth()
    // const user = false
    return (
        currentUser ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes