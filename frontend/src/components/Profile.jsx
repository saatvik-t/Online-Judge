import { useAuth } from "../hooks/useAuth"
import Navbar from "./Navbar";

const Profile = () => {
    const { auth } = useAuth();

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-semibold mb-4">Profile</h1>
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-lg font-medium">First Name:</p>
                        <p className="text-gray-700">{auth.user?.firstName}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-lg font-medium">Last Name:</p>
                        <p className="text-gray-700">{auth.user?.lastName}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-lg font-medium">Email:</p>
                        <p className="text-gray-700">{auth.user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile