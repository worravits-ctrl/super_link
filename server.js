const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Data file path
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'links.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Helper functions
function readLinks() {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading links:', error);
        return [];
    }
}

function writeLinks(links) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(links, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing links:', error);
        return false;
    }
}

// API Routes
app.get('/api/links', (req, res) => {
    const links = readLinks();
    res.json(links);
});

app.get('/api/links.php', (req, res) => {
    const links = readLinks();
    res.json(links);
});

app.post('/api/links', (req, res) => {
    const links = readLinks();
    const newLink = {
        id: req.body.id || Date.now(),
        url: req.body.url || '',
        title: req.body.title || '',
        favicon: req.body.favicon || '',
        dateAdded: req.body.dateAdded || new Date().toISOString()
    };
    
    links.push(newLink);
    
    if (writeLinks(links)) {
        res.json(newLink);
    } else {
        res.status(500).json({ error: 'Failed to save link' });
    }
});

app.post('/api/links.php', (req, res) => {
    const links = readLinks();
    const newLink = {
        id: req.body.id || Date.now(),
        url: req.body.url || '',
        title: req.body.title || '',
        favicon: req.body.favicon || '',
        dateAdded: req.body.dateAdded || new Date().toISOString()
    };
    
    links.push(newLink);
    
    if (writeLinks(links)) {
        res.json(newLink);
    } else {
        res.status(500).json({ error: 'Failed to save link' });
    }
});

app.put('/api/links', (req, res) => {
    if (Array.isArray(req.body)) {
        if (writeLinks(req.body)) {
            res.json({ ok: true });
        } else {
            res.status(500).json({ error: 'Failed to save links' });
        }
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

app.put('/api/links.php', (req, res) => {
    if (Array.isArray(req.body)) {
        if (writeLinks(req.body)) {
            res.json({ ok: true });
        } else {
            res.status(500).json({ error: 'Failed to save links' });
        }
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

app.delete('/api/links', (req, res) => {
    if (!req.body.ids || !Array.isArray(req.body.ids)) {
        return res.status(400).json({ error: 'Invalid request format' });
    }
    
    const links = readLinks();
    const idsToDelete = req.body.ids.map(id => String(id));
    const filteredLinks = links.filter(link => !idsToDelete.includes(String(link.id)));
    const removedCount = links.length - filteredLinks.length;
    
    if (writeLinks(filteredLinks)) {
        res.json({ removed: removedCount });
    } else {
        res.status(500).json({ error: 'Failed to delete links' });
    }
});

app.delete('/api/links.php', (req, res) => {
    if (!req.body.ids || !Array.isArray(req.body.ids)) {
        return res.status(400).json({ error: 'Invalid request format' });
    }
    
    const links = readLinks();
    const idsToDelete = req.body.ids.map(id => String(id));
    const filteredLinks = links.filter(link => !idsToDelete.includes(String(link.id)));
    const removedCount = links.length - filteredLinks.length;
    
    if (writeLinks(filteredLinks)) {
        res.json({ removed: removedCount });
    } else {
        res.status(500).json({ error: 'Failed to delete links' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Super Link Manager server running on port ${PORT}`);
    console.log(`📝 Access your application at: http://localhost:${PORT}`);
    console.log(`🔗 API endpoint: http://localhost:${PORT}/api/links`);
});

module.exports = app;
