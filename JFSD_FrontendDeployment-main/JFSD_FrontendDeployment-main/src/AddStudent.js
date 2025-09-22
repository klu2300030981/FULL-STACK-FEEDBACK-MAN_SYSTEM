import React, { useState } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js`
import './ViewStudents.css';
function AddStudent() {
    const [expandedMenu, setExpandedMenu] = useState(null);
    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    const [newStudent, setNewStudent] = useState({
        studentId: '', // Added Student ID field
        studentFirstName: '',
        studentLastName: '',
        studentEmail: '',
        studentContact: '',
        studentDept: '',
        studentYear: '',
        studentGender: '',
        studentPassword: '',
        studentConfirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({
            ...newStudent,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Check if the passwords match
        if (newStudent.studentPassword !== newStudent.studentConfirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError(''); // Clear any previous password error

        const url = 'http://localhost:2001/students/addStudent'; // Backend endpoint to add a student
        const studentData = JSON.stringify({
            studentId: newStudent.studentId, // Include Student ID in payload
            studentFirstName: newStudent.studentFirstName,
            studentLastName: newStudent.studentLastName,
            studentEmail: newStudent.studentEmail,
            studentContact: newStudent.studentContact,
            studentDept: newStudent.studentDept,
            studentYear: newStudent.studentYear,
            studentGender: newStudent.studentGender,
            studentPassword: newStudent.studentPassword,
        });

        callApi(
            'POST',
            url,
            studentData,
            (response) => {
                alert('Student added successfully!');
                window.location.href = '/students/view'; // Redirect to the student view page after adding
            },
            (error) => {
                console.error('Error adding student:', error);
                setErrorMessage('Failed to add student. Please try again later.');
                alert('Error adding student!');
            }
        );
    };

    return (
        <div className="admin-home">
            <header className="header">
                <h1>Student Feedback Evaluation System</h1>
                <div className="admin-welcome">
                    Welcome, {getAdminName()}
                </div>
            </header>

            <nav className="navbar">
                <ul>
                    <li>
                        <button onClick={() => toggleMenu('students')}>Students</button>
                        {expandedMenu === 'students' && (
                            <ul className="submenu">
                                <li><a href="/students/add">Add</a></li>
                                <li><a href="/students/update">Update</a></li>
                                <li><a href="/students/view">View</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('faculty')}>Faculty</button>
                        {expandedMenu === 'faculty' && (
                            <ul className="submenu">
                                <li><a href="/faculty/add">Add</a></li>
                                <li><a href="/faculty/update">Update</a></li>
                                <li><a href="/faculty/view">View</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('courses')}>Courses</button>
                        {expandedMenu === 'courses' && (
                            <ul className="submenu">
                                <li><a href="/courses/add">Add</a></li>
                                <li><a href="/courses/update">Update</a></li>
                                <li><a href="/courses/view">View</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('view-feedback')}>
                            View Feedback
                        </button>
                        {expandedMenu === 'view-feedback' && (
                            <ul className="submenu">
                                <li><a href="/view-feedback/course">Course Feedback</a></li>
                                <li><a href="/view-feedback/faculty">Faculty Feedback</a></li>
                                <li><a href="/view-feedback/infrastructure">Infrastructure Feedback</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('student-course-mapping')}>
                            Student-Course Mapping
                        </button>
                        {expandedMenu === 'student-course-mapping' && (
                            <ul className="submenu">
                                <li><a href="/student-course-mapping/add">Add</a></li>
                                <li><a href="/student-course-mapping/update">Update</a></li>
                                <li><a href="/student-course-mapping/view">View</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('student-faculty-mapping')}>
                            Student-Faculty-Mapping
                        </button>
                        {expandedMenu === 'student-faculty-mapping' && (
                            <ul className="submenu">
                                <li><a href="/student-faculty-mapping/add">Add</a></li>
                                <li><a href="/student-faculty-mapping/update">Update</a></li>
                                <li><a href="/student-faculty-mapping/view">View</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('my-profile')}>My Profile</button>
                        {expandedMenu === 'my-profile' && (
                            <ul className="submenu">
                                <li><a href="/adminprofile/view">View Profile</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button 
                            onClick={handleLogout} 
                            className="logout-button"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="content">
                <div className="view-students-container">
                    <h2>Add New Student</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <div className="add-student-form">
                        <form>
                            <label>Student ID:</label> {/* New field */}
                            <input
                                type="text"
                                name="studentId"
                                value={newStudent.studentId}
                                onChange={handleChange}
                            />
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="studentFirstName"
                                value={newStudent.studentFirstName}
                                onChange={handleChange}
                            />
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="studentLastName"
                                value={newStudent.studentLastName}
                                onChange={handleChange}
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="studentEmail"
                                value={newStudent.studentEmail}
                                onChange={handleChange}
                            />
                            <label>Contact:</label>
                            <input
                                type="text"
                                name="studentContact"
                                value={newStudent.studentContact}
                                onChange={handleChange}
                            />
                            <label>Department:</label>
                            <input
                                type="text"
                                name="studentDept"
                                value={newStudent.studentDept}
                                onChange={handleChange}
                            />
                            <label>Year:</label>
                            <input
                                type="text"
                                name="studentYear"
                                value={newStudent.studentYear}
                                onChange={handleChange}
                            />
                            <label>Gender:</label>
                            <input
                                type="text"
                                name="studentGender"
                                value={newStudent.studentGender}
                                onChange={handleChange}
                            />
                            <label>Password:</label>
                            <input
                                type="password"
                                name="studentPassword"
                                value={newStudent.studentPassword}
                                onChange={handleChange}
                            />
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="studentConfirmPassword"
                                value={newStudent.studentConfirmPassword}
                                onChange={handleChange}
                            />
                        </form>
                        <br></br>
                        <button onClick={handleSubmit}>Add Student</button>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AddStudent;
