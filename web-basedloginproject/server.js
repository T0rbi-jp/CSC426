const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Handle and decode standard JSON request payloads
app.use(express.json());

// Serve static frontend assets directly out of current workspace root
app.use(express.static(path.join(__dirname, '/')));

// API Mock Secure User Storage Array Reference
const MOCK_DB_USER = {
    username: "admin",
    password: "supersecretpassword" // Real world structures rely on secure cryptographically-hashed strings (e.g. bcrypt)
};

// Route Endpoint handler matching login pipeline requirements
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Safety fallback checking null pointer structures
    if (!username || !password) {
        return res.status(400).json({ message: "Payload constraints incomplete." });
    }

    // Authenticate inputs against mock user
    if (username.toLowerCase() === MOCK_DB_USER.username.toLowerCase() && password === MOCK_DB_USER.password) {
        return res.status(200).json({ 
            message: "Access granted! Redirection authorized.",
            token: "mock-jwt-session-payload" 
        });
    } else {
        return res.status(401).json({ message: "Invalid combination credentials." });
    }
});

// Direct all generic traffic vectors right back to single entry UI view
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server executing safely at address port http://localhost:${PORT}`);
});
