import React, { useState, useEffect } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js`
import './ViewStudents.css';

function UpdateStudentCourse() {
    const [studentCourses, setStudentCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(null);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    // Fetch student-course mapping data when the component mounts
    useEffect(() => {
        const fetchStudentCourses = () => {
            const url = 'http://localhost:2005/feedback'; // Backend endpoint to get all student-course mappings

            callApi(
                'GET',
                url,
                null,
                (response) => {
                    const data = JSON.parse(response); // Parse the response to JSON
                    setStudentCourses(data); // Update the state with student-course data
                },
                (error) => {
                    console.error('Error fetching student-course mappings:', error);
                    setErrorMessage('Failed to load student-course data. Please try again later.');
                }
            );
        };

        fetchStudentCourses();
    }, []);

    // Handle deletion of a student-course mapping
    const handleDelete = (id) => {
        const url = `http://localhost:2005/feedback/${id}`;

        callApi(
            'DELETE',
            url,
            null,
            (response) => {
                const updatedStudentCourses = studentCourses.filter(studentCourse => studentCourse.id !== id);
                setStudentCourses(updatedStudentCourses);
                alert('Student-Course mapping deleted successfully!');
                window.location.href = '/student-course-mapping/update';
            },
            (error) => {
                console.error('Error deleting student-course mapping:', error);
                setErrorMessage('Failed to delete student-course data. Please try again later.');
                alert('Error deleting student-course mapping!');
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
                <div className="view-students-container">
                    <h2>Update Student-Course Mapping</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentCourses.map((mapping) => (
                                <tr key={mapping.id}>
                                    <td>{mapping.student.studentId}</td>
                                    <td>{`${mapping.student.studentFirstName} ${mapping.student.studentLastName}`}</td>
                                    <td>{mapping.course.course_Id}</td>
                                    <td>{mapping.course.course_Name}</td>
                                    <td>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(mapping.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default UpdateStudentCourse;
