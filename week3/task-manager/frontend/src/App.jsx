import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3004/api';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Task Manager</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function Register({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { username, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

function Dashboard({ setAuth }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
    setTasks(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/tasks`, { title, priority }, { headers: { Authorization: `Bearer ${token}` } });
    setTitle('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Task Manager</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>
      
      <form onSubmit={handleAdd} className="task-form">
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="New Task..." required />
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <span>{task.title} ({task.priority})</span>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register setAuth={setIsAuthenticated} />} />
        <Route path="/" element={isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
