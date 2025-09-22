import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminhome.css';
import { getAdminName } from './main'; // Import the function

function AdminHome() {
    const navigate = useNavigate();
    const [expandedMenu, setExpandedMenu] = useState(null);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const adminId = sessionStorage.getItem('adminId');
        const adminName = getAdminName(); // Get the admin name from sessionStorage

        if (!isLoggedIn || !adminId || !adminName) {
            navigate('/');
        }
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
                <section className="welcome-section">
                    <h2>Welcome to Your Admin Dashboard</h2>
                    <p>
                        This platform provides tools to manage student feedback, oversee courses, and improve 
                        the quality of academic and institutional services. Utilize the menu to navigate through 
                        the system features.
                    </p>
                </section>

                <section className="features-section">
                    <h3>Platform Features</h3>
                    <ul>
                        <li>Manage and assign courses to students seamlessly.</li>
                        <li>Design and distribute feedback forms for courses, faculty, and services.</li>
                        <li>View and analyze feedback data to identify improvement areas.</li>
                        <li>Maintain an up-to-date record of student and faculty details.</li>
                    </ul>
                </section>

                <section className="guidelines-section">
                    <h3>Guidelines for Admins</h3>
                    <ul>
                        <li>Ensure all feedback forms are created and assigned accurately.</li>
                        <li>Review and respond to student feedback constructively.</li>
                        <li>Keep faculty and course information updated for smooth operations.</li>
                        <li>Log out after each session to safeguard sensitive data.</li>
                    </ul>
                </section>
            </main>

            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AdminHome;
