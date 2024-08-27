import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
import Navbar from "./Navbar";
import Spinner from "./Spinner";

const WelcomePage = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logoff = async () => {
        setLoading(true);
        try {
            await logout();
            setAuth({});
            navigate('/');
        } catch (error) {
            console.error('Error during logout ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='min-h-screen flex flex-col'>
                <Navbar />
                <main className='flex-grow p-8'>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <h1 className='text-3xl font-bold'>
                                Welcome, {auth.user?.firstName}
                            </h1>
                            <p className='mt-2 text-lg'>You are logged in!</p>
                            <br />
                        </>
                    )}
                </main>
            </div>
        </>
    );
};

export default WelcomePage;