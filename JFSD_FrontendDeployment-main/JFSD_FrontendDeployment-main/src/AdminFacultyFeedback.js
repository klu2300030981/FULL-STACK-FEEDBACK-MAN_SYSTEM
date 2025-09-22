import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { callApi } from './main'; // Assuming callApi is defined in main.js
import './ViewStudents.css'; // Add styles as needed
import { getAdminName } from './main';

function AdminFacultyFeedback() {
    const navigate = useNavigate();
    const [facultyList, setFacultyList] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(null);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const adminId = sessionStorage.getItem('adminId');
        const adminName = getAdminName(); // Get the admin name from sessionStorage

        if (!isLoggedIn || !adminId || !adminName) {
            navigate('/login');
        } else {
            fetchFacultyList();
        }
    }, [navigate]);

    const fetchFacultyList = () => {
        const url = `http://localhost:2004/faculty`;
        callApi(
            'GET',
            url,
            null,
            (response) => {
                try {
                    const data = JSON.parse(response);
                    setFacultyList(data);
                } catch (error) {
                    console.error('Error parsing faculty data:', error);
                    setErrorMessage('Failed to load faculty data. Please try again later.');
                }
            },
            (error) => {
                console.error('Error fetching faculty data:', error);
                setErrorMessage('Failed to load faculty data. Please try again later.');
            }
        );
    };

    const fetchFeedbacks = (facultyId) => {
        const url = `http://localhost:2006/student-faculty-feedback/faculty/${facultyId}`;
        callApi(
            'GET',
            url,
            null,
            (response) => {
                try {
                    const data = JSON.parse(response);
                    setFeedbacks(data);
                    setSelectedFacultyId(facultyId);
                } catch (error) {
                    console.error('Error parsing feedback data:', error);
                    setErrorMessage('Failed to load feedback.');
                }
            },
            (error) => {
                console.error('Error fetching feedbacks:', error);
                setErrorMessage('Failed to load feedback data. Please try again later.');
            }
        );
    };

    const handleBackToFaculty = () => {
        setSelectedFacultyId(null);
        setFeedbacks([]);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
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
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {!selectedFacultyId && !errorMessage && (
                    <>
                        <h2>Faculty</h2>
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>Faculty ID</th>
                                    <th>Faculty Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facultyList.map((faculty) => (
                                    <tr key={faculty.faculty_Id}>
                                        <td>{faculty.faculty_Id}</td>
                                        <td>{faculty.faculty_Name}</td>
                                        <td>
                                            <button
                                                onClick={() => fetchFeedbacks(faculty.faculty_Id)}
                                            >
                                                View Feedback
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {selectedFacultyId && (
                    <>
                        <h3>Feedback for Faculty ID: {selectedFacultyId}</h3>
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td>
                                            {feedback.student.studentFirstName} {feedback.student.studentLastName}
                                        </td>
                                        <td>{feedback.feedback}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleBackToFaculty} className="back-button">
                            Back to Faculty
                        </button>
                    </>
                )}
            </main>
            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AdminFacultyFeedback;
