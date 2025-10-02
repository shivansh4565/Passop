const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'passop';
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function startServer() {
    try {
        await client.connect();
        console.log("✅ Connected successfully to MongoDB");

        const db = client.db(dbName);

        // Get all passwords
        app.get('/passwords', async (req, res) => {
            try {
                const passwords = await db.collection('passwords').find({}).toArray();
                res.json(passwords);
            } catch (err) {
                res.status(500).json({ success: false, error: err.message });
            }
        });

        // Save a password
        app.post('/passwords', async (req, res) => {
            try {
                const password = req.body;
                if (!password || Object.keys(password).length === 0) {
                    return res.status(400).json({ success: false, message: "No password data provided" });
                }
                const result = await db.collection('passwords').insertOne(password);
                res.json({ success: true, result });
            } catch (err) {
                res.status(500).json({ success: false, error: err.message });
            }
        });
        // Update a password by ID
        app.put('/passwords/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const updatedData = req.body;
                const result = await db.collection('passwords').updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedData }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ success: false, message: "Password not found" });
                }

                res.json({ success: true, result });
            } catch (err) {
                res.status(500).json({ success: false, error: err.message });
            }
        });


        // Delete a password by ID
        app.delete('/passwords/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const result = await db.collection('passwords').deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ success: false, message: "Password not found" });
                }
                res.json({ success: true, result });
            } catch (err) {
                res.status(500).json({ success: false, error: err.message });
            }
        });

        // Start server
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

startServer();
