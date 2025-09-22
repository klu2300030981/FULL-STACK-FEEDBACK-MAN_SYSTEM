import React, { useState, useEffect } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js`
import './ViewStudents.css';

function UpdateStudent() {
    const [students, setStudents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editableStudent, setEditableStudent] = useState(null); // To store the student being edited
    const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
    const [expandedMenu, setExpandedMenu] = useState(null);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    // Fetch students data when the component mounts
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

    // Handle the editing of student details
    const handleEdit = (student) => {
        setEditableStudent({ ...student });
        setIsEditing(true);
    };

    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableStudent({
            ...editableStudent,
            [name]: value,
        });
    };

    // Update student details when the "Update" button is clicked
    const handleUpdate = () => {
        const url = `http://localhost:2001/students/${editableStudent.studentId}`;
        const updatedStudent = JSON.stringify(editableStudent);

        callApi(
            'PUT',
            url,
            updatedStudent,
            (response) => {
                const data = JSON.parse(response);
                const updatedStudents = students.map(student =>
                    student.studentId === data.studentId ? data : student
                );
                setStudents(updatedStudents);
                setIsEditing(false);
                setEditableStudent(null); // Clear the editable student
                alert('Student updated successfully!');
                window.location.href = '/students/update';
            },
            (error) => {
                console.error('Error updating student:', error);
                setErrorMessage('Failed to update student data. Please try again later.');
                alert('Error updating student!');
            }
        );
    };

    // Handle deletion of a student
    const handleDelete = (studentId) => {
        const url = `http://localhost:2001/students/${studentId}`;

        callApi(
            'DELETE',
            url,
            null,
            (response) => {
                const updatedStudents = students.filter(student => student.studentId !== studentId);
                setStudents(updatedStudents);
                alert('Student deleted successfully!');
                window.location.href = '/students/update';
            },
            (error) => {
                console.error('Error deleting student:', error);
                setErrorMessage('Student is mapped with faculty or course. Please try to delete that');
                alert('Error deleting student!');
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
                    <h2>Update Student</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {isEditing ? (
                        <div className="edit-student-form">
                            <h3>Edit Student Details</h3>
                            <form>
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="studentFirstName"
                                    value={editableStudent.studentFirstName}
                                    onChange={handleChange}
                                />
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    name="studentLastName"
                                    value={editableStudent.studentLastName}
                                    onChange={handleChange}
                                />
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="studentEmail"
                                    value={editableStudent.studentEmail}
                                    onChange={handleChange}
                                />
                                <label>Contact:</label>
                                <input
                                    type="text"
                                    name="studentContact"
                                    value={editableStudent.studentContact}
                                    onChange={handleChange}
                                />
                                <label>Department:</label>
                                <input
                                    type="text"
                                    name="studentDept"
                                    value={editableStudent.studentDept}
                                    onChange={handleChange}
                                />
                                <label>Year:</label>
                                <input
                                    type="text"
                                    name="studentYear"
                                    value={editableStudent.studentYear}
                                    onChange={handleChange}
                                />
                                <label>Gender:</label>
                                <input
                                    type="text"
                                    name="studentGender"
                                    value={editableStudent.studentGender}
                                    onChange={handleChange}
                                />
                            </form>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={() => handleDelete(editableStudent.studentId)}>Delete</button>
                        </div>
                    ) : (
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.studentId}>
                                        <td>{student.studentId}</td>
                                        <td>{student.studentFirstName}</td>
                                        <td>{student.studentLastName}</td>
                                        <td>{student.studentEmail}</td>
                                        <td>{student.studentContact}</td>
                                        <td>{student.studentDept}</td>
                                        <td>{student.studentYear}</td>
                                        <td>{student.studentGender}</td>
                                        <td>
                                            <button onClick={() => handleEdit(student)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(student.studentId)}>Delete</button>
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

export default UpdateStudent;
