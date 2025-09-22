import React, { useState, useEffect } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js` for API calls
import './ViewStudents.css'; // Assuming a separate CSS file for profile view

function ViewAdminProfile() {
    const [adminDetails, setAdminDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(null);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };


    // Fetch admin details when the component mounts
    useEffect(() => {
        const fetchAdminDetails = () => {
            const adminId = sessionStorage.getItem('adminId'); // Get admin ID from session storage

            if (!adminId) {
                setErrorMessage('Admin ID not found in session. Please log in again.');
                return;
            }

            const url = `http://localhost:2002/admins/${adminId}`; // Backend endpoint to get admin details

            callApi(
                'GET',
                url,
                null,
                (response) => {
                    const data = JSON.parse(response); // Parse the response to JSON
                    setAdminDetails(data); // Update the state with admin details
                },
                (error) => {
                    console.error('Error fetching admin details:', error);
                    setErrorMessage('Failed to load admin details. Please try again later.');
                }
            );
        };

        fetchAdminDetails();
    }, []); // Empty dependency array ensures it runs only once on component mount

    return (
        <div className="admin-profile">
            <header className="header1">
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
                        <button onClick={() => toggleMenu('student-course-mapping')}>Student-Course Mapping</button>
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
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="content">
                <div className="profile-container">
                    <h2>Admin Profile</h2>
                    {errorMessage ? (
                        <p className="error-message">{errorMessage}</p>
                    ) : adminDetails ? (
                        <div className="admin-details">
                            <p><strong>ID:</strong> {adminDetails.id}</p>
                            <p><strong>Name:</strong> {adminDetails.name}</p>
                            <p><strong>Email:</strong> {adminDetails.emailId}</p>
                            <p><strong>Password:</strong> {adminDetails.password}</p>
                        </div>
                    ) : (
                        <p>Loading admin details...</p>
                    )}
                </div>
            </main>

            <footer className="footer1">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ViewAdminProfile;
