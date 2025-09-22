import React from 'react';
import { callApi } from './main';
import './login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            password: '',
            role: 'admin', // Default selected role
            errorMessage: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        // Check if session variables are already set
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const adminId = sessionStorage.getItem('adminId');
        const studentId = sessionStorage.getItem('studentId');

        if (isLoggedIn && adminId) {
            window.location.href = '/adminhome'; // Redirect to admin home if admin session exists
        } else if (isLoggedIn && studentId) {
            window.location.href = '/studenthome'; // Redirect to student home if student session exists
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleAdminLogin() {
        const { id, password } = this.state;
        const url = `http://localhost:2002/admins/${id}`;

        callApi(
            'GET',
            url,
            null,
            (res) => {
                const admin = JSON.parse(res);
                if (admin.password === password) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('adminId', admin.id);
                    sessionStorage.setItem('adminName', admin.name);
                    sessionStorage.setItem('adminEmailId', admin.emailId);

                    window.location.href = '/adminhome';
                } else {
                    this.setState({ errorMessage: 'Invalid Admin Password. Please try again.' });
                }
            },
            (err) => {
                console.error(err);
                this.setState({ errorMessage: 'Admin ID not found or service is unavailable.' });
            }
        );
    }

    handleStudentLogin() {
        const { id, password } = this.state;
        const url = `http://localhost:2001/students/${id}`;
    
        callApi(
            'GET',
            url,
            null,
            (res) => {
                const student = JSON.parse(res);
                if (student.studentPassword === password) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('studentId', student.studentId);
                    sessionStorage.setItem('studentFirstName', student.studentFirstName);
                    sessionStorage.setItem('studentLastName', student.studentLastName);
                    sessionStorage.setItem('studentEmail', student.studentEmail);
    
                    window.location.href = '/studenthome';
                } else {
                    this.setState({ errorMessage: 'Invalid Student Password. Please try again.' });
                }
            },
            (err) => {
                console.error(err);
                this.setState({ errorMessage: 'Student ID not found or service is unavailable.' });
            }
        );
    }    
    
    handleLogin(event) {
        event.preventDefault();
        const { role } = this.state;

        if (role === 'admin') {
            this.handleAdminLogin();
        } else if (role === 'student') {
            this.handleStudentLogin();
        }
    }

    render() {
        const { id, password, role, errorMessage } = this.state;
        return (
        <div>
            <div className="header1">Student Feedback Management System</div>
            <div className='login-container'>
                <h2>Login</h2>
                <form onSubmit={this.handleLogin}>
                    <div className='form-group'>
                        <label htmlFor='id'>ID</label>
                        <input
                            type='text'
                            id='id'
                            name='id'
                            value={id}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Role</label>
                        <div>
                            <label>
                                <input
                                    type='radio'
                                    name='role'
                                    value='admin'
                                    checked={role === 'admin'}
                                    onChange={this.handleInputChange}
                                />
                                Admin
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='role'
                                    value='student'
                                    checked={role === 'student'}
                                    onChange={this.handleInputChange}
                                />
                                Student
                            </label>
                        </div>
                    </div>
                    {errorMessage && <p className='error'>{errorMessage}</p>}
                    <button type='submit'>Login</button>
                </form>
                <br></br>
                <div className="links-container">
                Forgot your password <a href="/forgot-password">Click here..</a>
                </div>
                <br></br>
                <div  className="links-container">
                Don't have an account <a href="/signup">Signup</a>
                </div>
            </div>
            <div className="footer1">© 2024 Feedback Management System</div>
        </div>
        );
    }
}

export default Login;
