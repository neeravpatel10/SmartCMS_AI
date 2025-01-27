import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubject = () => {
    const [subject, setSubject] = useState({
        sub_name: '',
        sub_code: '',
        branch: '',
        sem: '',
        sub_category_id: '',
        scheme: ''
    });

    const [subCategories, setSubCategories] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, branchesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/sub_categories'),
                    axios.get('http://localhost:5000/api/branches')
                ]);
                setSubCategories(categoriesRes.data);
                setBranches(branchesRes.data);
            } catch (err) {
                setError(`Failed to fetch data: ${err.message}`);
                console.error('Error details:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (subject.scheme) {
            const filtered = subCategories.filter(
                category => category.scheme.toString() === subject.scheme
            );
            setFilteredCategories(filtered);
            setSubject(prev => ({
                ...prev,
                sub_category_id: ''
            }));
        }
    }, [subject.scheme, subCategories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post('http://localhost:5000/api/subjects/add', subject);
            setSuccess('Subject added successfully!');
            setSubject({
                sub_name: '',
                sub_code: '',
                branch: '',
                sem: '',
                sub_category_id: '',
                scheme: ''
            });
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => radio.checked = false);
            
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add subject');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSubject({ ...subject, [e.target.name]: e.target.value });
    };

    const successMessageStyle = success ? "opacity-100 transition-opacity duration-500" : "opacity-0";

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Subject</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 ${successMessageStyle}`}>
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                    <input
                        type="text"
                        name="sub_name"
                        value={subject.sub_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Code</label>
                    <input
                        type="text"
                        name="sub_code"
                        value={subject.sub_code}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Scheme</label>
                    <select
                        name="scheme"
                        value={subject.scheme}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Scheme</option>
                        <option value="18">2018</option>
                        <option value="21">2021</option>
                        <option value="22">2022</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                    <select
                        name="branch"
                        value={subject.branch}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                            <option key={branch._id} value={branch.code}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                    <select
                        name="sem"
                        value={subject.sem}
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Category</label>
                    <div className="space-y-2">
                        {filteredCategories.map((category) => (
                            <div key={category._id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={category._id}
                                    name="sub_category_id"
                                    value={category._id}
                                    onChange={handleChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    required
                                />
                                <label htmlFor={category._id} className="ml-2 block text-sm text-gray-700">
                                    {category.name} 
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Subject'}
                </button>
            </form>
        </div>
    );
};

export default AddSubject; 