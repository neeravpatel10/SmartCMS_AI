import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
        } catch (err) {
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Students</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">USN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.usn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {`${student.name.first} ${student.name.middle} ${student.name.last}`.trim()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.branch}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.semester}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.section}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageStudents; 