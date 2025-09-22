import React, { useState } from 'react';
import { callApi } from './main'; // Assuming you have a callApi function to handle API requests

function PostInfrastructureFeedback() {
    const [studentId, setStudentId] = useState('');
    const [feedback, setFeedback] = useState('');
    const [filePath, setFilePath] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create an object with the data to be posted
        const feedbackData = {
            studentId,
            feedback,
            filePath,
        };

        // Call the API to POST data
        const url = 'http://localhost:2007/api/infrastructure/submit'; // Your backend API endpoint

        callApi(
            'POST',
            url,
            JSON.stringify(feedbackData),
            (response) => {
                alert('Feedback submitted successfully!');
                // Reset form fields
                setStudentId('');
                setFeedback('');
                setFilePath('');
            },
            (error) => {
                console.error('Error submitting feedback:', error);
                setErrorMessage('Failed to submit feedback. Please try again later.');
            }
        );
    };

    return (
        <div>
            <h2>Submit Infrastructure Feedback</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student ID:</label>
                    <input
                        type="number"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Feedback:</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>File Path:</label>
                    <input
                        type="text"
                        value={filePath}
                        onChange={(e) => setFilePath(e.target.value)}
                    />
                </div>

                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default PostInfrastructureFeedback;
