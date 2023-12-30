import Grid from '@mui/material/Grid';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography, Checkbox, FormControlLabel, TextField } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Match {
    matchId: number;
    matchName: string;
}

interface MatchCardProps {
    match: Match;
}

export type { Match };

export default function MatchCard({ match }: MatchCardProps) {
    return (
        <Grid container spacing={3} margin={5}>
            <Box margin={1} >
                <Grid container spacing={1} columnSpacing={1} rowSpacing={1} key={match.matchId}>

                    <Grid item xs={3}>
                        <Typography variant="body1">{match.matchName}</Typography>
                    </Grid>

                    <Grid item xs={1}>
                        <Checkbox {...label} />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            type="text"
                            label="Stake"
                            size="small"
                            // value={stakeBack}
                            // onChange={(e) => setStakeBack(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            type="number"
                            label="Step"
                            size="small"
                            // value={stepBack}
                            // onChange={(e) => setStepBack(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            type="text"
                            label="Sell"
                            size="small"
                            // value={stakeBack}
                            // onChange={(e) => setStakeBack(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                </Grid>
            </Box>
        </Grid>
    );
}
