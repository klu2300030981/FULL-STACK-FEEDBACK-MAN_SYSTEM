import React, { useState, useEffect } from 'react';
import { callApi, getAdminName } from './main'; // Assuming `callApi` is defined in `main.js`
import './ViewStudents.css';

function UpdateFaculty() {
    const [facultyList, setFacultyList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editableFaculty, setEditableFaculty] = useState(null);
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
        const fetchFaculty = () => {
            const url = 'http://localhost:2004/faculty'; // Backend endpoint for faculty

            callApi(
                'GET',
                url,
                null,
                (response) => {
                    const data = JSON.parse(response);
                    setFacultyList(data);
                },
                (error) => {
                    console.error('Error fetching faculty:', error);
                    setErrorMessage('Failed to load faculty data. Please try again later.');
                }
            );
        };

        fetchFaculty();
    }, []);

    const handleEdit = (faculty) => {
        setEditableFaculty({ ...faculty });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableFaculty({
            ...editableFaculty,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        const url = `http://localhost:2004/faculty/${editableFaculty.faculty_Id}`;
        const updatedFaculty = JSON.stringify(editableFaculty);

        callApi(
            'PUT',
            url,
            updatedFaculty,
            (response) => {
                const data = JSON.parse(response);
                const updatedFacultyList = facultyList.map(faculty =>
                    faculty.faculty_Id === data.faculty_Id ? data : faculty
                );
                setFacultyList(updatedFacultyList);
                setIsEditing(false);
                setEditableFaculty(null);
                alert('Faculty updated successfully!');
            },
            (error) => {
                console.error('Error updating faculty:', error);
                setErrorMessage('Failed to update faculty data. Please try again later.');
                alert('Error updating faculty!');
            }
        );
    };

    const handleDelete = (facultyId) => {
        const url = `http://localhost:2004/faculty/${facultyId}`;

        callApi(
            'DELETE',
            url,
            null,
            (response) => {
                const updatedFacultyList = facultyList.filter(faculty => faculty.faculty_Id !== facultyId);
                setFacultyList(updatedFacultyList);
                alert('Faculty deleted successfully!');
            },
            (error) => {
                console.error('Error deleting faculty:', error);
                setErrorMessage('Failed to delete faculty data. Please try again later.');
                alert('Error deleting faculty!');
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
                <div className="view-faculty-container">
                    <h2>Update Faculty</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {isEditing ? (
                        <div className="edit-faculty-form">
                            <h3>Edit Faculty Details</h3>
                            <form>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="faculty_Name"
                                    value={editableFaculty.faculty_Name}
                                    onChange={handleChange}
                                />
                                <label>Department:</label>
                                <input
                                    type="text"
                                    name="faculty_Dept"
                                    value={editableFaculty.faculty_Dept}
                                    onChange={handleChange}
                                />
                                <label>Contact:</label>
                                <input
                                    type="text"
                                    name="faculty_Contact"
                                    value={editableFaculty.faculty_Contact}
                                    onChange={handleChange}
                                />
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="faculty_Email"
                                    value={editableFaculty.faculty_Email}
                                    onChange={handleChange}
                                />
                            </form>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={() => handleDelete(editableFaculty.faculty_Id)}>Delete</button>
                        </div>
                    ) : (
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Contact</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facultyList.map((faculty) => (
                                    <tr key={faculty.faculty_Id}>
                                        <td>{faculty.faculty_Id}</td>
                                        <td>{faculty.faculty_Name}</td>
                                        <td>{faculty.faculty_Dept}</td>
                                        <td>{faculty.faculty_Contact}</td>
                                        <td>{faculty.faculty_Email}</td>
                                        <td>
                                            <button onClick={() => handleEdit(faculty)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(faculty.faculty_Id)}>Delete</button>
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

export default UpdateFaculty;
