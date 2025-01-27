import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/subjects');
            setSubjects(response.data);
        } catch (err) {
            setError('Failed to fetch subjects');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Subjects</h2>
            {/* Table implementation */}
        </div>
    );
};

export default ManageSubjects; 