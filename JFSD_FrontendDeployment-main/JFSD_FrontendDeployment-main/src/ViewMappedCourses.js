import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { callApi } from './main'; // Assuming `callApi` is defined in `main.js` for API calls
import './ViewStudents.css'; // Reusing CSS for consistency

function ViewMappedCourses() {
    const navigate = useNavigate();
    const [courseList, setCourseList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(null);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const studentId = sessionStorage.getItem('studentId');
        const storedFirstName = sessionStorage.getItem('studentFirstName');
        const storedLastName = sessionStorage.getItem('studentLastName');

        if (!isLoggedIn || !studentId || !storedFirstName || !storedLastName) {
            navigate('/');
        } else {
            setFirstName(storedFirstName);
            setLastName(storedLastName);
        }

        const fetchStudentCourses = () => {
            const url = `http://localhost:2005/feedback/student/${studentId}`;
            callApi(
                'GET',
                url,
                null,
                (response) => {
                    try {
                        const data = JSON.parse(response);
                        const courses = data.map((item) => item.course);
                        setCourseList(courses);
                    } catch (error) {
                        console.error('Error parsing course data:', error);
                        setErrorMessage('Failed to process course data. Please try again later.');
                    }
                },
                (error) => {
                    console.error('Error fetching student courses:', error);
                    setErrorMessage('Failed to load course data. Please try again later.');
                }
            );
        };

        fetchStudentCourses();
    }, [navigate]);

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
                <div className="student-welcome">
                    Welcome, {firstName} {lastName}
                </div>
            </header>

            <nav className="navbar">
                <ul>
                    <li>
                        <button onClick={() => toggleMenu('my-courses')}>My Courses</button>
                        {expandedMenu === 'my-courses' && (
                            <ul className="submenu">
                                <li><a href="/studentcourses/view">View Courses</a></li>
                                <li><a href="/studentcourses/feedback">Course Feedback</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('my-faculty')}>My Faculty</button>
                        {expandedMenu === 'my-faculty' && (
                            <ul className="submenu">
                                <li><a href="/studentfaculty/view">View Faculty</a></li>
                                <li><a href="/studentfaculty/feedback">Faculty Feedback</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('institutional-services')}>
                            Institutional Services
                        </button>
                        {expandedMenu === 'institutional-services' && (
                            <ul className="submenu">
                                <li><a href="/institutional/feedback">Feedback</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleMenu('my-profile')}>My Profile</button>
                        {expandedMenu === 'my-profile' && (
                            <ul className="submenu">
                                <li><a href="/profile/view">View Profile</a></li>
                                <li><a href="/profile/update">Update Profile</a></li>
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
                <div className="view-faculty-container">
                    <h2>My Courses</h2>
                    {errorMessage ? (
                        <p className="error-message">{errorMessage}</p>
                    ) : (
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Year</th>
                                    <th>Description</th>
                                    <th>Credits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseList.map((course) => (
                                    <tr key={course.course_Id}>
                                        <td>{course.course_Id}</td>
                                        <td>{course.course_Name}</td>
                                        <td>{course.course_Year}</td>
                                        <td>{course.course_Description}</td>
                                        <td>{course.course_Credits}</td>
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

export default ViewMappedCourses;
