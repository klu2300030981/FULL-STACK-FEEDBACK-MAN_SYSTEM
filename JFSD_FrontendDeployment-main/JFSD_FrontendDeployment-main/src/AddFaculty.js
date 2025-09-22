import React, { useState } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js`
import './ViewStudents.css';

function AddFaculty() {
    const [expandedMenu, setExpandedMenu] = useState(null);
    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    const [newFaculty, setNewFaculty] = useState({
        faculty_Id: '',
        faculty_Name: '',
        faculty_Dept: '',
        faculty_Contact: '',
        faculty_Email: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFaculty({
            ...newFaculty,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const url = 'http://localhost:2004/faculty'; // Backend endpoint to add a faculty member
        const facultyData = JSON.stringify(newFaculty);

        callApi(
            'POST',
            url,
            facultyData,
            (response) => {
                alert('Faculty added successfully!');
                window.location.href = '/faculty/view'; // Redirect to the faculty view page after adding
            },
            (error) => {
                console.error('Error adding faculty:', error);
                setErrorMessage('Failed to add faculty. Please try again later.');
                alert('Error adding faculty!');
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
                    <h2>Add New Faculty</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="add-student-form">
                        <form>
                            <label>Faculty ID:</label>
                            <input
                                type="text"
                                name="faculty_Id"
                                value={newFaculty.faculty_Id}
                                onChange={handleChange}
                            />
                            <label>Name:</label>
                            <input
                                type="text"
                                name="faculty_Name"
                                value={newFaculty.faculty_Name}
                                onChange={handleChange}
                            />
                            <label>Department:</label>
                            <input
                                type="text"
                                name="faculty_Dept"
                                value={newFaculty.faculty_Dept}
                                onChange={handleChange}
                            />
                            <label>Contact:</label>
                            <input
                                type="text"
                                name="faculty_Contact"
                                value={newFaculty.faculty_Contact}
                                onChange={handleChange}
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="faculty_Email"
                                value={newFaculty.faculty_Email}
                                onChange={handleChange}
                            />
                        </form>
                        <br></br>
                        <button onClick={handleSubmit}>Add Faculty</button>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AddFaculty;
