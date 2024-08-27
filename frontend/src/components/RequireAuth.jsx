import { useEffect, useState } from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { validateToken, logout } from "../services/authService"

const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async () => {
            try {
                console.log('Inside try block');
                const response = await validateToken();
                console.log(response);
                if (response.user) {
                    console.log('Token is valid in Context');
                    setAuth({ user: response.user });
                } else {
                    console.log('Token is invalid in Context', response);
                    await logout();
                    setAuth({});
                }
            } catch (error) {
                console.log('Inside catch block');
                await logout();
                setAuth({});
            } finally {
                setLoading(false);
            }
        }
        check();
    }, [setAuth])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (auth && auth.user) {
        console.log('hen', auth);
        console.log('henbm', auth.user);
        return <Outlet />
    } else {
        console.log('jhrgh', auth);
        return <Navigate to='/login' state={{ from: location }} replace />
    }
}
export default RequireAuth