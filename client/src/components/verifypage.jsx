import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [promptResult, setPromptResult] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    // Simulate result generation
    const handleGenerate = () => {
        setPromptResult('Dear Sir/Madam, This is the AI-generated email content.');
    };

    // Handle editing mode toggle
    const handleEdit = () => {
        setIsEditable(true);
    };

    // Handle saving changes
    const handleSave = () => {
        setIsEditable(false);
    };

    // Handle sending the result
    const handleSend = () => {
        if (isEditable) {
            alert('Please save your changes before sending.');
        } else {
            alert('The mail has been sent!');
            console.log('Sending:', promptResult);
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%', borderRadius: '10px' }}>
                <h2 className="text-center text-success mb-4">Generate and Verify</h2>
                {!promptResult ? (
                    // Prompt generation section
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={handleGenerate}>
                            Generate Prompt
                        </button>
                    </div>
                ) : (
                    // Result verification section
                    <>
                        <div className="mb-3">
                            <label htmlFor="resultChamber" className="form-label">
                                Result Chamber
                            </label>
                            <textarea
                                id="resultChamber"
                                className="form-control"
                                rows="8"
                                value={promptResult}
                                readOnly={!isEditable}
                                onChange={(e) => setPromptResult(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="d-flex justify-content-between">
                            {isEditable ? (
                                <button className="btn btn-primary" onClick={handleSave}>
                                    Save Changes
                                </button>
                            ) : (
                                <button className="btn btn-secondary" onClick={handleEdit}>
                                    Edit
                                </button>
                            )}
                            <button className="btn btn-success" onClick={handleSend}>
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
