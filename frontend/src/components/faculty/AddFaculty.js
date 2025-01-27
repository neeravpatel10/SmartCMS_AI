import React, { useState } from 'react';
import axios from 'axios';

const AddFaculty = () => {
    const [faculty, setFaculty] = useState({
        name: '',
        email: '',
        employeeId: '',
        department: '',
        designation: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/faculty/add', faculty);
            setSuccess('Faculty added successfully!');
            setFaculty({
                name: '',
                email: '',
                employeeId: '',
                department: '',
                designation: '',
                phone: ''
            });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add faculty');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFaculty({ ...faculty, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Add Faculty</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={faculty.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={faculty.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={faculty.employeeId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        name="department"
                        value={faculty.department}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="CSE">Computer Science</option>
                        <option value="ISE">Information Science</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="MECH">Mechanical</option>
                        <option value="CIVIL">Civil</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <select
                        name="designation"
                        value={faculty.designation}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="HOD">Head of Department</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={faculty.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Faculty'}
                </button>
            </form>
        </div>
    );
};

export default AddFaculty; 