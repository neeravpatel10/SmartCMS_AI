import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacultySubjectMapping = () => {
    const [mapping, setMapping] = useState({
        subject_id: '',
        faculty_id: '',
        section: '',
        academic_year: '',
        semester: ''
    });

    const [subjects, setSubjects] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subjectsRes, facultiesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/subjects'),
                    axios.get('http://localhost:5000/api/faculty')
                ]);
                setSubjects(subjectsRes.data);
                setFaculties(facultiesRes.data);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post('http://localhost:5000/api/mapping/assign-faculty', mapping);
            setSuccess('Faculty assigned successfully!');
            setMapping({
                subject_id: '',
                faculty_id: '',
                section: '',
                academic_year: '',
                semester: ''
            });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to assign faculty');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setMapping({ ...mapping, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Assign Faculty to Subject</h2>

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
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <select
                        name="subject_id"
                        value={mapping.subject_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject._id} value={subject._id}>
                                {subject.sub_name} ({subject.sub_code})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Faculty</label>
                    <select
                        name="faculty_id"
                        value={mapping.faculty_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Faculty</option>
                        {faculties.map((faculty) => (
                            <option key={faculty._id} value={faculty._id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Section</label>
                    <select
                        name="section"
                        value={mapping.section}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                    <input
                        type="text"
                        name="academic_year"
                        value={mapping.academic_year}
                        onChange={handleChange}
                        placeholder="2023-24"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                    <select
                        name="semester"
                        value={mapping.semester}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                            <option key={sem} value={sem}>{sem}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Assigning...' : 'Assign Faculty'}
                </button>
            </form>
        </div>
    );
};

export default FacultySubjectMapping; 