import React from 'react';
import logo from './logo.svg';
import Grid from '@mui/material/Grid';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography, Checkbox, FormControlLabel, TextField } from '@mui/material';

import './App.css';
import MatchesContainer from './components/MatchesContainer';
import RightPane from './components/RightPane';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const leagueId = 1;

const handleClearAll = () => {
  console.log("Clear all.");
};

function App() {
  return (

    <Grid container spacing={3} margin={5}>


      <Grid item xs={8}>
        <div className="left-pane">

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
                  // onChange={handleRaceChange}
                >
                  <MenuItem value={1}>UK League 1</MenuItem>
                  <MenuItem value={2}>UK League 2</MenuItem>
                  <MenuItem value={3}>IT Liga 1</MenuItem>
                  <MenuItem value={4}>IT Liga 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Button onClick={handleClearAll}>Clear all</Button>
            </Grid>
          </Grid>

          <MatchesContainer />
        </div>
      </Grid>

      <Grid item xs={4}>
        <div className="right-pane">
          <RightPane />
        </div>
      </Grid>
    </Grid>

  );
}

export default App;
