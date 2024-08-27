import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getSubmissions } from "../services/submissionService";
import Navbar from "./Navbar";
import Spinner from "./Spinner";

export const SubmissionsPage = () => {
    const { auth } = useAuth();
    const [submissions, setSubmissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await getSubmissions();
                setSubmissions(response);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(submissions.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className='min-h-screen flex flex-col'>
                < Navbar />
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Problem Title</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Verdict</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Runtime (ms)</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Language</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-3 px-4 text-gray-500">
                                            No submissions available for {auth.user?.firstName} {auth.user?.lastName}
                                        </td>
                                    </tr>
                                ) : (
                                    currentItems.map((submission) => (
                                        <tr key={submission._id} className="hover:bg-gray-100">
                                            <td className="text-left py-3 px-4">{submission.problemTitle}</td>
                                            <td className="text-left py-3 px-4">{submission.verdict}</td>
                                            <td className="text-left py-3 px-4">{submission.runtime}</td>
                                            <td className="text-left py-3 px-4">{submission.language}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <span className="text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SubmissionsPage;