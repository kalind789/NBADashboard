import express from "express";
import dotenv from "dotenv";
import { BalldontlieAPI } from "@balldontlie/sdk";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
// Add some validation for the API key
if (!process.env.NBA_API_KEY) {
    console.error('NBA_API_KEY is not set in environment variables');
    process.exit(1);
}

const api = new BalldontlieAPI({ apiKey: process.env.NBA_API_KEY });

app.get('/api/teams', async (req, res) => {
    try {
        const teams = await api.nba.getTeams();
        
        if (!teams || !teams.data) {
            throw new Error('No teams data received');
        }
        
        res.json(teams.data);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ 
            error: 'Failed to fetch teams data',
            message: error.message 
        });
    }
});

app.get('/api/james-name', async(req, res) => {
    try {
        const players = await api.nba.getPlayers({ search: "James" });
        
        if (!players || !players.data) {
            throw new Error('No teams data received');
        }
        
        res.json(players.data);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ 
            error: 'Failed to fetch players data',
            message: error.message 
        });
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));