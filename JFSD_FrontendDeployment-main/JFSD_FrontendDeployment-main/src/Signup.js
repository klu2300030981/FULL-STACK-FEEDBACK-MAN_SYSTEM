import React from 'react';
import { callApi } from './main';
import './signup.css';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            studentId: '',
            studentFirstName: '',
            studentLastName: '',
            studentPassword: '',
            confirmPassword: '',
            passwordStrength: '',
            studentEmail: '',
            studentContact: '',
            studentDept: '',
            studentYear: '',
            studentGender: '',
            successMessage: '',
            errorMessage: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.checkStudentIdAvailability = this.checkStudentIdAvailability.bind(this);
        this.validateEmailFormat = this.validateEmailFormat.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            if (name === 'studentPassword') {
                this.evaluatePasswordStrength(value);
            }
            if (name === 'studentId') {
                this.checkStudentIdAvailability(value);
            }
            if (name === 'studentEmail') {
                this.validateEmailFormat(value);
            }
        });
    }

    evaluatePasswordStrength(password) {
        if (password.length < 6) {
            this.setState({ passwordStrength: 'Weak' });
        } else if (password.match(/[A-Z]/) && password.match(/\d/)) {
            this.setState({ passwordStrength: 'Strong' });
        } else {
            this.setState({ passwordStrength: 'Moderate' });
        }
    }

    validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.setState({
                errorMessage: 'Invalid email format.',
                successMessage: '',
            });
        } else {
            this.setState({
                errorMessage: '',
            });
        }
    }

    async checkStudentIdAvailability(studentId) {
        if (!studentId) return;

        const url = `http://localhost:2001/students/${studentId}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    this.setState({
                        errorMessage: 'Student ID already exists. Please try a new ID.',
                        successMessage: '',
                        studentId: '',
                    });
                }
            }
        } catch (error) {
            console.log('ID check failed:', error);
        }
    }

    handleSignup(event) {
        event.preventDefault();

        const {
            studentId,
            studentFirstName,
            studentLastName,
            studentPassword,
            confirmPassword,
            studentEmail,
            studentContact,
            studentDept,
            studentYear,
            studentGender,
        } = this.state;

        if (!studentId || !studentFirstName || !studentLastName || !studentEmail) {
            this.setState({
                errorMessage: 'All fields are required.',
                successMessage: '',
            });
            return;
        }

        if (studentPassword !== confirmPassword) {
            this.setState({
                errorMessage: 'Passwords do not match.',
                successMessage: '',
            });
            return;
        }

        const url = 'http://localhost:2001/students/addStudent';
        const data = {
            studentId,
            studentFirstName,
            studentLastName,
            studentPassword,
            studentEmail,
            studentContact,
            studentDept,
            studentYear: parseInt(studentYear, 10),
            studentGender,
        };

        callApi(
            'POST',
            url,
            JSON.stringify(data),
            (res) => {
                this.setState({
                    successMessage: 'Student signed up successfully!',
                    errorMessage: '',
                });
                window.location.href = '/';
                console.log('Signup successful:', res);
            },
            (err) => {
                console.error('Signup failed:', err);
                this.setState({
                    errorMessage: 'Failed to sign up. Please try again.',
                    successMessage: '',
                });
            }
        );
    }

    render() {
        const {
            studentId,
            studentFirstName,
            studentLastName,
            studentPassword,
            confirmPassword,
            passwordStrength,
            studentEmail,
            studentContact,
            studentDept,
            studentYear,
            studentGender,
            successMessage,
            errorMessage,
        } = this.state;

        return (
            <div>
                <div className="header1">Student Feedback Management System</div>
                <div className="signup-container">
                    <h2>Student Signup</h2>
                    <form onSubmit={this.handleSignup}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentId">Student ID</label>
                                <input
                                    type="text"
                                    id="studentId"
                                    name="studentId"
                                    value={studentId}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="studentFirstName">First Name</label>
                                <input
                                    type="text"
                                    id="studentFirstName"
                                    name="studentFirstName"
                                    value={studentFirstName}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentLastName">Last Name</label>
                                <input
                                    type="text"
                                    id="studentLastName"
                                    name="studentLastName"
                                    value={studentLastName}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="studentEmail">Email</label>
                                <input
                                    type="email"
                                    id="studentEmail"
                                    name="studentEmail"
                                    value={studentEmail}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentPassword">Password</label>
                                <input
                                    type="password"
                                    id="studentPassword"
                                    name="studentPassword"
                                    value={studentPassword}
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <p className="password-strength">Strength: {passwordStrength}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentContact">Contact</label>
                                <input
                                    type="text"
                                    id="studentContact"
                                    name="studentContact"
                                    value={studentContact}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="studentDept">Department</label>
                                <input
                                    type="text"
                                    id="studentDept"
                                    name="studentDept"
                                    value={studentDept}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentYear">Year</label>
                                <input
                                    type="number"
                                    id="studentYear"
                                    name="studentYear"
                                    value={studentYear}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="studentGender">Gender</label>
                                <select
                                    id="studentGender"
                                    name="studentGender"
                                    value={studentGender}
                                    onChange={this.handleInputChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        {successMessage && <p className="success">{successMessage}</p>}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="footer1">© 2024 Feedback Management System</div>
            </div>
        );
    }
}

export default Signup;
