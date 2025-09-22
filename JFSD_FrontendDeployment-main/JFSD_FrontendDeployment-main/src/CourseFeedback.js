import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { callApi } from './main'; // Assuming callApi is defined in main.js
import './ViewStudents.css'; // Add styles as needed

function CourseFeedback() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [feedbacks, setFeedbacks] = useState({}); // Track feedback inputs
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

        const fetchFeedbacks = () => {
            const url = `http://localhost:2005/feedback/student/${studentId}`;
            callApi(
                'GET',
                url,
                null,
                (response) => {
                    try {
                        const data = JSON.parse(response);
                        setCourses(data);
                        const initialFeedbacks = {};
                        data.forEach((item) => {
                            initialFeedbacks[item.id] = item.feedback;
                        });
                        setFeedbacks(initialFeedbacks);
                    } catch (error) {
                        console.error('Error parsing feedback data:', error);
                        setErrorMessage('Failed to load feedback data. Please try again later.');
                    }
                },
                (error) => {
                    console.error('Error fetching feedbacks:', error);
                    setErrorMessage('Failed to load feedback data. Please try again later.');
                }
            );
        };

        fetchFeedbacks();
    }, [navigate]);

    const handleFeedbackChange = (id, value) => {
        setFeedbacks((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (id, studentId, courseId) => {
        const url = `http://localhost:2005/feedback/${id}`;
        const payload = {
            feedback: feedbacks[id],
            student: {
                studentId: studentId,
            },
            course: {
                course_Id: courseId,
            },
        };

        callApi(
            'PUT',
            url,
            JSON.stringify(payload),
            () => {
                alert('Feedback submitted successfully!');
                navigate('/studentcourses/view');
            },
            (error) => {
                console.error('Error updating feedback:', error);
                setErrorMessage('Failed to submit feedback. Please try again later.');
            }
        );
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
                <h2>Provide Feedback</h2>
                {errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                ) : (
                    <table className="faculty-table">
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Feedback</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.course.course_Id}</td>
                                    <td>{item.course.course_Name}</td>
                                    <td>
                                        {item.feedback === 'No feedback yet.' ? (
                                            <textarea
                                                value={feedbacks[item.id] || ''}
                                                onChange={(e) =>
                                                    handleFeedbackChange(item.id, e.target.value)
                                                }
                                            ></textarea>
                                        ) : (
                                            <span>{item.feedback}</span>
                                        )}
                                    </td>
                                    <td>
                                        {item.feedback === 'No feedback yet.' ? (
                                            <button
                                                disabled={!feedbacks[item.id]}
                                                onClick={() =>
                                                    handleSubmit(
                                                        item.id,
                                                        item.student.studentId,
                                                        item.course.course_Id
                                                    )
                                                }
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            'Feedback Submitted'
                                        )}
                                    </td>
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

export default CourseFeedback;
