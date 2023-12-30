import React from 'react';
import logo from './logo.svg';
import Grid from '@mui/material/Grid';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography, Checkbox, FormControlLabel, TextField } from '@mui/material';

import './App.css';
import MatchesContainer from './components/MatchesContainer';
import RightPane from './components/RightPane';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const leagueId = 1;

function App() {
  return (
    <Grid container spacing={3} margin={5}>
      <Grid item xs={12}>
        <Grid
          //  sx={{ minWidth: 120 }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >

          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">League</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leagueId}
                label="League"
              // onChange={handleLeagueChange}
              >
                <MenuItem value={1}>UK League 1</MenuItem>
                <MenuItem value={2}>UK League 2</MenuItem>
                <MenuItem value={3}>IT Liga 1</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Grid item>
          <MatchesContainer />
        </Grid>

      </Grid>
    </Grid>

  );
}

export default App;
