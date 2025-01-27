import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const BulkUploadStudents = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [preview, setPreview] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);

        if (!file) return;

        const fileType = file.name.split('.').pop().toLowerCase();

        if (fileType === 'csv') {
            Papa.parse(file, {
                complete: (results) => {
                    const headers = results.data[0];
                    const rows = results.data.slice(1).map(row => {
                        let obj = {};
                        headers.forEach((header, index) => {
                            obj[header] = row[index];
                        });
                        return obj;
                    });
                    setPreview(rows.slice(0, 5));
                },
                header: false
            });
        } else if (fileType === 'xlsx' || fileType === 'xls') {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                setPreview(data.slice(0, 5));
            };
            reader.readAsBinaryString(file);
        } else {
            setError('Please upload a valid CSV or Excel file');
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:5000/api/students/bulk-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Students uploaded successfully!');
            setFile(null);
            setPreview([]);
            // Reset file input
            e.target.reset();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload students');
        } finally {
            setLoading(false);
        }
    };

    const downloadTemplate = () => {
        const template = [
            {
                usn: 'Example: 1XX21XX000',
                adm_no: 'Example: ADM2021001',
                batch: 'Example: 2021-25',
                semester: 'Example: 1',
                section: 'Example: A',
                lab_batch: 'Example: B1',
                'name.first': 'Example: John',
                'name.middle': 'Example: M',
                'name.last': 'Example: Doe',
                branch: 'Example: CSE',
                'exams.kcet': 'Example: 10000',
                'exams.comedk': 'Example: 20000',
                'exams.jee': 'Example: 30000',
                'personal.nationality': 'Example: Indian',
                'personal.date_of_admission': 'Example: 2021-08-01',
                'personal.dob': 'Example: 2003-01-01',
                'personal.place_of_birth': 'Example: Bangalore',
                'personal.gender': 'Example: Male',
                'contact.mobile': 'Example: 9876543210',
                'contact.email': 'Example: student@example.com',
                'documents.aadhar': 'Example: 1234 5678 9012',
                'documents.pan_card': 'Example: ABCDE1234F',
                'caste_details.category': 'Example: GM',
                'caste_details.caste': 'Example: General',
                'caste_details.annual_income': 'Example: 500000',
                'address.present.state': 'Example: Karnataka',
                'address.present.district': 'Example: Bangalore',
                'address.present.house_no': 'Example: #123',
                'address.present.post_village': 'Example: MG Road',
                'address.present.pincode': 'Example: 560001',
                'address.permanent.state': 'Example: Karnataka',
                'address.permanent.district': 'Example: Bangalore',
                'address.permanent.house_no': 'Example: #123',
                'address.permanent.post_village': 'Example: MG Road',
                'address.permanent.pincode': 'Example: 560001'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Template');
        XLSX.writeFile(wb, 'student_upload_template.xlsx');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Bulk Upload Students</h2>

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

            <div className="mb-6">
                <button
                    onClick={downloadTemplate}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Download Template
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload File</label>
                    <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileUpload}
                        className="mt-1 block w-full"
                        required
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Upload an Excel (.xlsx, .xls) or CSV file with the required columns
                    </p>
                </div>

                {preview.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">Preview (First 5 rows)</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {Object.keys(preview[0]).map((header) => (
                                            <th
                                                key={header}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {preview.map((row, idx) => (
                                        <tr key={idx}>
                                            {Object.values(row).map((cell, cellIdx) => (
                                                <td
                                                    key={cellIdx}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Uploading...' : 'Upload Students'}
                </button>
            </form>
        </div>
    );
};

export default BulkUploadStudents; 