import React, { useState } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js`
import './ViewStudents.css';

function AddCourse() {
    const [expandedMenu, setExpandedMenu] = useState(null);
    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    const [newCourse, setNewCourse] = useState({
        course_Id: '',
        course_Name: '',
        course_Year: '',
        course_Description: '',
        course_Credits: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({
            ...newCourse,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const url = 'http://localhost:2003/courses'; // Backend endpoint to add a course
        const courseData = JSON.stringify(newCourse);

        callApi(
            'POST',
            url,
            courseData,
            (response) => {
                alert('Course added successfully!');
                window.location.href = '/courses/view'; // Redirect to the courses view page after adding
            },
            (error) => {
                console.error('Error adding course:', error);
                setErrorMessage('Failed to add course. Please try again later.');
                alert('Error adding course!');
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
                    <h2>Add New Course</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="add-student-form">
                        <form>
                            <label>Course ID:</label>
                            <input
                                type="text"
                                name="course_Id"
                                value={newCourse.course_Id}
                                onChange={handleChange}
                            />
                            <label>Course Name:</label>
                            <input
                                type="text"
                                name="course_Name"
                                value={newCourse.course_Name}
                                onChange={handleChange}
                            />
                            <label>Course Year:</label>
                            <input
                                type="text"
                                name="course_Year"
                                value={newCourse.course_Year}
                                onChange={handleChange}
                            />
                            <label>Description:</label>
                            <input
                                type="text"
                                name="course_Description"
                                value={newCourse.course_Description}
                                onChange={handleChange}
                            />
                            <label>Credits:</label>
                            <input
                                type="text"
                                name="course_Credits"
                                value={newCourse.course_Credits}
                                onChange={handleChange}
                            />
                        </form>
                        <br></br>
                        <button onClick={handleSubmit}>Add Course</button>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AddCourse;
