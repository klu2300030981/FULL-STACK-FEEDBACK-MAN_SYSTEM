import React, { useState, useEffect } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js`
import './ViewStudents.css'; // Reuse the CSS from UpdateFaculty

function UpdateCourses() {
    const [courseList, setCourseList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editableCourse, setEditableCourse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState(null);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    useEffect(() => {
        const fetchCourses = () => {
            const url = 'http://localhost:2003/courses'; // Backend endpoint for courses

            callApi(
                'GET',
                url,
                null,
                (response) => {
                    const data = JSON.parse(response);
                    setCourseList(data);
                },
                (error) => {
                    console.error('Error fetching courses:', error);
                    setErrorMessage('Failed to load course data. Please try again later.');
                }
            );
        };

        fetchCourses();
    }, []);

    const handleEdit = (course) => {
        setEditableCourse({ ...course });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableCourse({
            ...editableCourse,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        const url = `http://localhost:2003/courses/${editableCourse.course_Id}`;
        const updatedCourse = JSON.stringify(editableCourse);

        callApi(
            'PUT',
            url,
            updatedCourse,
            (response) => {
                const data = JSON.parse(response);
                const updatedCourseList = courseList.map(course =>
                    course.course_Id === data.course_Id ? data : course
                );
                setCourseList(updatedCourseList);
                setIsEditing(false);
                setEditableCourse(null);
                alert('Course updated successfully!');
            },
            (error) => {
                console.error('Error updating course:', error);
                setErrorMessage('Failed to update course data. Please try again later.');
                alert('Error updating course!');
            }
        );
    };

    const handleDelete = (courseId) => {
        const url = `http://localhost:2003/courses/${courseId}`;

        callApi(
            'DELETE',
            url,
            null,
            (response) => {
                const updatedCourseList = courseList.filter(course => course.course_Id !== courseId);
                setCourseList(updatedCourseList);
                alert('Course deleted successfully!');
            },
            (error) => {
                console.error('Error deleting course:', error);
                setErrorMessage('Course is mapped with student. Please try to delete that.');
                alert('Error deleting course!');
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
                        <button onClick={() => toggleMenu('student-faculty-mapping')}>Student-Faculty-mapping</button>
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
                <div className="view-faculty-container">
                    <h2>Update Courses</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {isEditing ? (
                        <div className="edit-faculty-form">
                            <h3>Edit Course Details</h3>
                            <form>
                                <label>Course Name:</label>
                                <input
                                    type="text"
                                    name="course_Name"
                                    value={editableCourse.course_Name}
                                    onChange={handleChange}
                                />
                                <label>Year:</label>
                                <input
                                    type="number"
                                    name="course_Year"
                                    value={editableCourse.course_Year}
                                    onChange={handleChange}
                                />
                                <label>Description:</label>
                                <input
                                    type="text"
                                    name="course_Description"
                                    value={editableCourse.course_Description}
                                    onChange={handleChange}
                                />
                                <label>Credits:</label>
                                <input
                                    type="number"
                                    name="course_Credits"
                                    value={editableCourse.course_Credits}
                                    onChange={handleChange}
                                />
                            </form>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={() => handleDelete(editableCourse.course_Id)}>Delete</button>
                        </div>
                    ) : (
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Year</th>
                                    <th>Description</th>
                                    <th>Credits</th>
                                    <th>Action</th>
                                    <th>Action</th>
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
                                        <td>
                                            <button onClick={() => handleEdit(course)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(course.course_Id)}>Delete</button>
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

export default UpdateCourses;
