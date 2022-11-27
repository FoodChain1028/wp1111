import wsConnect from './wsConnect.js';
import mongo from './mongo.js';
import http from 'http';
import mongoose from 'mongoose';
import express from 'express';
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server })

const db = mongoose.connection;
// wss = server 端的 websocket
db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        // ws.id = uuidv4();
        // ws.box = '';
        ws.onmessage = wsConnect.onMessage(ws);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});