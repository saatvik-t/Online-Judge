import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createProblem, getProblems, deleteProblem, updateProblem } from '../services/problemService'
import Navbar from "./Navbar"

const ProblemsPage = () => {

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newProblemTitle, setNewProblemTitle] = useState('')
    const [newProblemDescription, setNewProblemDescription] = useState('')
    const [problems, setProblems] = useState([])

    const [editProblemId, setEditProblemId] = useState(null);
    const [editProblemTitle, setEditProblemTitle] = useState('')
    const [editProblemDescription, setEditProblemDescription] = useState('')

    const handleToggleForm = () => {
        setShowCreateForm(!showCreateForm);
    };

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const problemsData = await getProblems()
                console.log("Problems Data : ", problemsData)
                setProblems(problemsData)
            } catch (error) {
                console.error('Error while fetching problems :', error)
            }
        }
        fetchProblems()
    }, [])

    const handleCreateProblem = async () => {
        try {
            const newProblem = await createProblem({ title: newProblemTitle, description: newProblemDescription })
            if (newProblem) {
                setProblems((prevProblems) => [...prevProblems, newProblem]);
                setNewProblemTitle('');
                setNewProblemDescription('');
                setShowCreateForm(false);
            }
        } catch (error) {
            console.error('Error while creating problem:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteProblem(id)
            console.log(response)
            setProblems((prevProblems) => prevProblems.filter((problem) => problem._id !== id))
        } catch (error) {
            console.error('Error while deleting problem:', error)
        }
    }

    const handleEdit = (problem) => {
        setEditProblemId(problem._id);
        setEditProblemTitle(problem.title);
        setEditProblemDescription(problem.description);
    }

    const handleUpdate = async () => {
        try {
            const updatedProblem = await updateProblem(editProblemId, { title: editProblemTitle, description: editProblemDescription });
            setProblems((prevProblems) =>
                prevProblems.map((problem) => (problem._id === editProblemId ? updatedProblem : problem))
            );
            setEditProblemId(null);
            setEditProblemTitle('');
            setEditProblemDescription('');
        } catch (error) {
            console.error('Error while updating problem:', error);
        }
    }

    const handleCloseEditForm = () => {
        setEditProblemId(null);
        setEditProblemTitle('');
        setEditProblemDescription('');
    };

    return (
        <>
            <div className='min-h-screen flex flex-col'>
                < Navbar />
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Problems</h1>

                    {/* Button to toggle the create form */}
                    <button
                        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
                        onClick={handleToggleForm}
                    >
                        {showCreateForm ? 'Hide Form' : 'Create New Problem'}
                    </button>

                    {/* Create problem form */}
                    {showCreateForm && (
                        <div className="mb-6 p-4 border border-gray-300 rounded">
                            <h2 className="text-xl font-semibold mb-2">Create New Problem</h2>
                            <input
                                type="text"
                                value={newProblemTitle}
                                onChange={(e) => setNewProblemTitle(e.target.value)}
                                placeholder="Problem Title"
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <textarea
                                value={newProblemDescription}
                                onChange={(e) => setNewProblemDescription(e.target.value)}
                                placeholder="Problem Description"
                                className="block w-full mb-4 p-2 border border-gray-300 rounded"
                            />
                            <button
                                onClick={handleCreateProblem}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Create Problem
                            </button>
                        </div>
                    )}

                    {/* List of problems */}
                    {Array.isArray(problems) && problems.length === 0 ? (
                        <p className="text-center text-gray-500">No problems available. Please create a new problem.</p>
                    ) : (
                        <ul className="space-y-4">
                            {Array.isArray(problems) && problems.map((problem) => (
                                <li key={problem._id} className="p-4 border border-gray-300 rounded">
                                    <h2 className="text-xl font-semibold mb-2 break-words">
                                        <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
                                    </h2>
                                    <p className='break-words'>{problem.description}</p>
                                    <div className="mt-4 flex space-x-2">
                                        <button onClick={() => handleEdit(problem)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                                        <button onClick={() => handleDelete(problem._id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                                    </div>
                                    {editProblemId === problem._id && (
                                        <div className="mt-4 p-4 border border-gray-300 rounded">
                                            <h2 className="text-xl font-semibold mb-2">Edit Problem</h2>
                                            <input
                                                type="text"
                                                value={editProblemTitle}
                                                onChange={(e) => setEditProblemTitle(e.target.value)}
                                                placeholder="Problem Title"
                                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                                            />
                                            <textarea
                                                value={editProblemDescription}
                                                onChange={(e) => setEditProblemDescription(e.target.value)}
                                                placeholder="Problem Description"
                                                className="block w-full mb-4 p-2 border border-gray-300 rounded"
                                            />
                                            <div className="flex space-x-4">
                                                <button
                                                    onClick={handleUpdate}
                                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                                >
                                                    Update Problem
                                                </button>
                                                <button
                                                    onClick={handleCloseEditForm}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProblemsPage;