import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AddSubject from './components/AddSubject';
import FacultySubjectMapping from './components/FacultySubjectMapping';
import AddFaculty from './components/faculty/AddFaculty';
import AddStudent from './components/students/AddStudent';
import BulkUploadStudents from './components/students/BulkUploadStudents';
import ManageStudents from './components/students/ManageStudents';
import ManageFaculty from './components/faculty/ManageFaculty';
import ManageSubjects from './components/subjects/ManageSubjects';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold">Welcome to SmartCMS</h1>
            </div>
          } />
          <Route path="/subjects/add" element={<AddSubject />} />
          <Route path="/subjects/manage" element={<ManageSubjects />} />
          <Route path="/mapping/faculty" element={<FacultySubjectMapping />} />
          <Route path="/faculty/add" element={<AddFaculty />} />
          <Route path="/faculty/manage" element={<ManageFaculty />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/upload" element={<BulkUploadStudents />} />
          <Route path="/students/manage" element={<ManageStudents />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App; 