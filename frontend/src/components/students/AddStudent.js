import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudent = () => {
    const [student, setStudent] = useState({
        usn: '',
        adm_no: '',
        batch: '',
        semester: '',
        section: '',
        lab_batch: 'NONE',
        name: {
            first: '',
            middle: '',
            last: ''
        },
        branch: '',
        exams: {
            kcet: '',
            comedk: '',
            jee: ''
        },
        personal: {
            nationality: '',
            date_of_admission: '',
            dob: '',
            place_of_birth: '',
            gender: ''
        },
        contact: {
            mobile: '',
            email: ''
        },
        documents: {
            aadhar: '',
            pan_card: ''
        },
        caste_details: {
            category: '',
            caste: '',
            annual_income: ''
        },
        address: {
            present: {
                state: '',
                district: '',
                house_no: '',
                post_village: '',
                pincode: ''
            },
            permanent: {
                state: '',
                district: '',
                house_no: '',
                post_village: '',
                pincode: ''
            }
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/students/add', student);
            setSuccess('Student added successfully!');
            // Reset form
            setStudent({
                // ... reset all fields
            });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add student');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e, section, subsection) => {
        if (section && subsection) {
            setStudent(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [subsection]: e.target.value
                }
            }));
        } else if (section) {
            setStudent(prev => ({
                ...prev,
                [section]: e.target.value
            }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Add Student</h2>
            {/* Form implementation */}
        </div>
    );
};

export default AddStudent; 