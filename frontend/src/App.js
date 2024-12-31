import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  const getWordCount = (str) => {
      return str.split(' ').filter(word => word.length > 0).length;
  };
  
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/teams')
      .then((data) => setTeams(data.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/james-name')
      .then((data) => setPlayers(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
      <TableContainer
        component={Paper}
        variant="outlined"
      >
      <Table aria-label="demo table">
        <TableHead>
          <TableRow>
            <TableCell>Teams</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Conference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.filter(team => getWordCount(team.name) === 1).map(team => (
              <TableRow>
                <TableCell key={team.id}>{team.city}</TableCell>
                <TableCell key={team.id}>{team.name}</TableCell>
                <TableCell key={team.id}>{team.conference}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}

export default App;
