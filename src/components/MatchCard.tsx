import Grid from '@mui/material/Grid';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography, Checkbox, FormControlLabel, TextField } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Match {
    leagueId: number;
    matchId: number;
    teamA: string;
    teamB: string;
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
                        <Typography variant="body1">{match.teamA} vs {match.teamB}</Typography>
                    </Grid>

                    <Grid item xs={1}>
                        <Checkbox {...label} />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            type="text"
                            label="Stake"
                            size="small"
                            // value={stake}
                            // onChange={(e) => setStake(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            type="number"
                            label="Step"
                            size="small"
                            // value={step}
                            // onChange={(e) => setStep(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            type="text"
                            label="Sell"
                            size="small"
                            // value={sell}
                            // onChange={(e) => setSell(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                </Grid>
            </Box>
        </Grid>
    );
}
