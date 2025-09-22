import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminhome.css';

function StudentHome() {
    const navigate = useNavigate();
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const studentId = sessionStorage.getItem('studentId');
        const firstName = sessionStorage.getItem('studentFirstName');
        const lastName = sessionStorage.getItem('studentLastName');
    
        if (!isLoggedIn || !studentId || !firstName || !lastName) {
            navigate('/');
        } else {
            setFirstName(firstName);
            setLastName(lastName);
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
                <section className="welcome-section">
                    <h2>Welcome to Your Student Dashboard</h2>
                    <p>
                        This platform empowers you to provide valuable feedback, manage your profile, and 
                        track your course interactions efficiently. Explore the features using the navigation menu.
                    </p>
                </section>

                <section className="features-section">
                    <h3>Platform Features</h3>
                    <ul>
                        <li>Provide feedback on courses and faculty to improve academic quality.</li>
                        <li>View and update your personal profile at any time.</li>
                        <li>Access detailed insights into institutional services.</li>
                        <li>Engage in continuous feedback loops for improvement.</li>
                    </ul>
                </section>

                <section className="guidelines-section">
                    <h3>Guidelines for Using the Dashboard</h3>
                    <ul>
                        <li>Complete all feedback tasks before deadlines.</li>
                        <li>Ensure your profile details are up-to-date.</li>
                        <li>Be respectful and constructive in your feedback.</li>
                        <li>Log out after each session to ensure your account’s security.</li>
                    </ul>
                </section>
            </main>


            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default StudentHome;
