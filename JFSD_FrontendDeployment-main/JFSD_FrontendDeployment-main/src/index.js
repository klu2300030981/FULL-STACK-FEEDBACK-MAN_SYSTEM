import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './login';
import AddAdmin from './AddAdmin';
import AdminHome from './AdminHome';
import ViewStudents from './ViewStudents';
import UpdateStudent from './UpdateStudent';
import AddStudent from './AddStudent';
import ViewFaculty from './ViewFaculty';
import UpdateFaculty from './UpdateFaculty';
import AddFaculty from './AddFaculty';
import ViewCourses from './ViewCourses';
import UpdateCourses from './UpdateCourse';
import AddCourse from './AddCourse';
import AddStudentCourse from './AddStudentCourse';
import ViewStudentCourse from './ViewStudentCourse';
import UpdateStudentCourse from './UpdateStudentCourse';
import ViewStudentFaculty from './ViewStudentFaculty';
import StudentHome from './StudentHome';
import ViewMappedCourses from './ViewMappedCourses';
import CourseFeedback from './CourseFeedback';
import ViewMappedFaculty from './ViewMappedFaculty';
import FacultyFeedback from './FacultyFeedback';
import AddStudentFaculty from './AddStudentFaculty';
import UpdateStudentFaculty from './UpdateStudentFaculty';
import AdminCourseFeedback from './AdminCourseFeedback';
import AdminFacultyFeedback from './AdminFacultyFeedback';
import ViewAdminProfile from './viewAdminProfile'
import Signup from './Signup';
import PostInfrastructureFeedback from './PostInfrastructureFeedback';
function Website() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path='/addAdmin' element={<AddAdmin />} />

                <Route path='/adminHome' element={<AdminHome />} />

                <Route path="/students/view" element={<ViewStudents />} />
                <Route path="/students/update" element={<UpdateStudent />} />
                <Route path="/students/add" element={<AddStudent />} />

                <Route path="/faculty/view" element={<ViewFaculty />} />
                <Route path="/faculty/update" element={<UpdateFaculty />} />
                <Route path="/faculty/add" element={<AddFaculty />} />

                <Route path="/courses/view" element={<ViewCourses />} />
                <Route path="/courses/update" element={<UpdateCourses />} />
                <Route path="/courses/add" element={<AddCourse />} />

                <Route path="/student-course-mapping/add" element={<AddStudentCourse />} />
                <Route path="/student-course-mapping/view" element={<ViewStudentCourse />} />
                <Route path="/student-course-mapping/update" element={<UpdateStudentCourse />} />

                <Route path="/student-faculty-mapping/view" element={<ViewStudentFaculty />} />
                <Route path="/student-faculty-mapping/add" element={<AddStudentFaculty />} />
                <Route path="/student-faculty-mapping/update" element={<UpdateStudentFaculty />} />

                <Route path="/studenthome" element={<StudentHome />} />

                <Route path="/studentcourses/view" element={<ViewMappedCourses />} />
                <Route path="/studentcourses/feedback" element={<CourseFeedback />} />

                <Route path="/studentfaculty/view" element={<ViewMappedFaculty />} />
                <Route path="/studentfaculty/feedback" element={<FacultyFeedback />} />
                
                <Route path="/view-feedback/course" element={<AdminCourseFeedback />} />
                <Route path="/view-feedback/faculty" element={<AdminFacultyFeedback />} />
                
                <Route path="/adminprofile/view" element={<ViewAdminProfile />} />
                
                <Route path="/signup" element={<Signup />} />
                <Route path="/test" element={<PostInfrastructureFeedback />} />

            </Routes>
        </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Website />);