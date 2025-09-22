import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { callApi } from './main'; // Assuming callApi is defined in main.js
import './ViewStudents.css'; // Add styles as needed
import { getAdminName } from './main';

function AdminCourseFeedback() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
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
            fetchCourses();
        }
    }, [navigate]);

    const fetchCourses = () => {
        const url = `http://localhost:2003/courses`;
        callApi(
            'GET',
            url,
            null,
            (response) => {
                try {
                    const data = JSON.parse(response);
                    setCourses(data);
                } catch (error) {
                    console.error('Error parsing course data:', error);
                    setErrorMessage('Failed to load course data. Please try again later.');
                }
            },
            (error) => {
                console.error('Error fetching courses:', error);
                setErrorMessage('Failed to load course data. Please try again later.');
            }
        );
    };

    const fetchFeedbacks = (courseId) => {
        const url = `http://localhost:2005/feedback/course/${courseId}`;
        callApi(
            'GET',
            url,
            null,
            (response) => {
                try {
                    const data = JSON.parse(response);
                    setFeedbacks(data);
                    setSelectedCourseId(courseId);
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

    const handleBackToCourses = () => {
        setSelectedCourseId(null);
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

                {!selectedCourseId && !errorMessage && (
                    <>
                        <h2>Courses</h2>
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.course_Id}>
                                        <td>{course.course_Id}</td>
                                        <td>{course.course_Name}</td>
                                        <td>
                                            <button
                                                onClick={() => fetchFeedbacks(course.course_Id)}
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

                {selectedCourseId && (
                    <>
                        <h3>Feedback for Course ID: {selectedCourseId}</h3>
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
                        <button onClick={handleBackToCourses} className="back-button">
                            Back to Courses
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

export default AdminCourseFeedback;
