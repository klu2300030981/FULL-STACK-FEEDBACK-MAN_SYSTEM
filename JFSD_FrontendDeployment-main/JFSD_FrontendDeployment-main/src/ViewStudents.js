import React, { useState, useEffect } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js` for API calls
import './ViewStudents.css';
function ViewStudents() {
    const [students, setStudents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(null);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    // Fetch students data when the component mounts
    useEffect(() => {
        const fetchStudents = () => {
            const url = 'http://localhost:2001/students'; // Backend endpoint to get all students

            callApi(
                'GET',
                url,
                null,
                (response) => {
                    const data = JSON.parse(response); // Parse the response to JSON
                    setStudents(data); // Update the state with student data
                },
                (error) => {
                    console.error('Error fetching students:', error);
                    setErrorMessage('Failed to load student data. Please try again later.');
                }
            );
        };

        fetchStudents();
    }, []); // Empty dependency array ensures it runs only once on component mount

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
                    <h2>Student List</h2>
                    {errorMessage ? (
                        <p className="error-message">{errorMessage}</p>
                    ) : (
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.studentId}>
                                        <td>{student.studentId}</td>
                                        <td>{student.studentFirstName}</td>
                                        <td>{student.studentLastName}</td>
                                        <td>{student.studentEmail}</td>
                                        <td>{student.studentContact}</td>
                                        <td>{student.studentDept}</td>
                                        <td>{student.studentYear}</td>
                                        <td>{student.studentGender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ViewStudents;
