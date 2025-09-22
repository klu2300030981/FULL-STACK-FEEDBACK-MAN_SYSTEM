import React, { useState } from 'react';

// Function to make API calls
function callApi(method, url, data, callbackSuccess, callbackError) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);

    // Set Content-Type for POST/PUT requests
    if (method === 'POST' || method === 'PUT') {
        xhttp.setRequestHeader('Content-Type', 'application/json');
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                callbackSuccess(this.responseText);
            } else {
                console.error(`Error: ${this.status}, Response: ${this.responseText}`);
                callbackError(`Error: ${this.status} - ${this.responseText}`);
            }
        }
    };

    // Send JSON data for POST/PUT, null for GET/DELETE
    xhttp.send(data ? JSON.stringify(data) : null);
}

// AddAdmin Component
function AddAdmin() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // API URL for adding admin
        const url = 'http://localhost:2002/admins/addAdmin';

        // Call API to add admin
        callApi(
            'POST',
            url,
            formData,
            (response) => {
                setMessage('Admin added successfully!');
                console.log('Response:', JSON.parse(response));
            },
            (error) => {
                setMessage('Failed to add admin. Please try again later.');
                console.error('Error adding admin:', error);
            }
        );
    };

    return (
        <div className="add-admin-container">
            <h2>Add New Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Admin</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddAdmin;
