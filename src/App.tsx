import { useState } from 'react';
import { Box, FormControl, Grid, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography, Checkbox, FormControlLabel, TextField } from '@mui/material';
import './App.css';
import MatchesContainer from './components/MatchesContainer';
import PonyContainer from './components/PonyContainer';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function App() {

  const [leagueId, setLeagueId] = useState('1');

  const handleLeagueChange = (event: SelectChangeEvent) => {
    setLeagueId(event.target.value as string);
  };

  return (

    // <Grid item >
    //   <PonyContainer />
    // </Grid>


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
                onChange={handleLeagueChange}
              >
                <MenuItem value={1}>UK League 1</MenuItem>
                <MenuItem value={2}>UK League 2</MenuItem>
                <MenuItem value={3}>IT Liga 1</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Grid item>
          <MatchesContainer leagueId={leagueId} />
        </Grid>

      </Grid>
    </Grid>

  );
}
