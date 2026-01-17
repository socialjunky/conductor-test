import express from 'express';
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
// Basic error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};
// Root route - responds with Hello World
app.get('/', (req, res) => {
    try {
        res.send('Hello World');
    }
    catch (error) {
        console.error('Error in root route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Apply error handling middleware
app.use(errorHandler);
// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
export default app;
