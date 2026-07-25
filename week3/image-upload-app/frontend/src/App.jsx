import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3002/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedUrl(response.data.filePath);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Failed to upload file.');
    }
  };

  return (
    <div className="upload-container">
      <h1>Image Upload Feature</h1>
      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" className="upload-btn">Upload Image</button>
      </form>
      {message && <p className="message">{message}</p>}
      
      <div className="image-display">
        {previewUrl && !uploadedUrl && (
          <div className="preview-section">
            <h3>Preview:</h3>
            <img src={previewUrl} alt="Preview" className="img-preview" />
          </div>
        )}
        
        {uploadedUrl && (
          <div className="uploaded-section">
            <h3>Uploaded Image (from Server):</h3>
            <img src={uploadedUrl} alt="Uploaded" className="img-uploaded" />
            <p>URL: <a href={uploadedUrl} target="_blank" rel="noreferrer">{uploadedUrl}</a></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
