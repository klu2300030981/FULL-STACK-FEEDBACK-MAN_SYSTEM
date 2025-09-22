import React, { useState, useEffect } from 'react';
import { callApi } from './main'; // Assuming `callApi` is defined for API calls
import './AddStudentCourse.css';

function AddStudentCourse() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(null);
    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    // Fetch the students data
    useEffect(() => {
        const fetchStudents = () => {
            const url = 'http://localhost:2001/students'; // Backend endpoint to get all students

            callApi(
                'GET',
                url,
                null,
                (response) => {
                    const data = JSON.parse(response); // Parse the response to JSON
                    setStudents(data); // Update the state with student data
                },
                (error) => {
                    console.error('Error fetching students:', error);
                    setErrorMessage('Failed to load student data. Please try again later.');
                }
            );
        };

        fetchStudents();
    }, []);

    // Fetch the courses data
    useEffect(() => {
        const fetchCourses = () => {
            const url = 'http://localhost:2003/courses'; // Backend endpoint to get all courses

            callApi(
                'GET',
                url,
                null,
                (response) => {
                    const data = JSON.parse(response); // Parse the response to JSON
                    setCourses(data); // Update the state with course data
                },
                (error) => {
                    console.error('Error fetching courses:', error);
                    setErrorMessage('Failed to load course data. Please try again later.');
                }
            );
        };

        fetchCourses();
    }, []);

    // Handle the Add button click to send the data
    const handleAdd = () => {
        if (selectedStudent && selectedCourse) {
            const data = {
                feedback: 'No feedback yet.',
                student: {
                    studentId: selectedStudent,
                },
                course: {
                    course_Id: selectedCourse,
                },
            };

            const url = 'http://localhost:2005/feedback'; // Backend endpoint to add mapping

            callApi(
                'POST',
                url,
                JSON.stringify(data),
                (response) => {
                    alert('Student-Course mapping added successfully!');
                    window.location.href = '/student-course-mapping/view';
                },
                (error) => {
                    console.error('Error adding student-course mapping:', error);
                    setErrorMessage('Failed to add student-course mapping. Please try again later.');
                }
            );
        } else {
            setErrorMessage('Please select both a student and a course.');
        }
    };

    return (
        <div className="admin-home">
            <header className="header">
                <h1>Student Feedback Evaluation System</h1>
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
                <div className="add-student-course-container">
                    <h2>Add Student-Course Mapping</h2>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="dropdown-container">
                        <div>
                            <label htmlFor="studentDropdown">Select Student</label>
                            <select
                                id="studentDropdown"
                                onChange={(e) => setSelectedStudent(e.target.value)}
                                value={selectedStudent}
                            >
                                <option value="">--Select Student--</option>
                                {students.map((student) => (
                                    <option key={student.studentId} value={student.studentId}>
                                        {student.studentFirstName} {student.studentLastName} -- {student.studentId}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="courseDropdown">Select Course</label>
                            <select
                                id="courseDropdown"
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                value={selectedCourse}
                            >
                                <option value="">--Select Course--</option>
                                {courses.map((course) => (
                                    <option key={course.course_Id} value={course.course_Id}>
                                        {course.course_Name} -- {course.course_Id}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <button onClick={handleAdd} className="add-button">Add</button>
                </div>
            </main>

            <footer className="footer">
                <p>© 2024 Student Feedback Evaluation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AddStudentCourse;
