import Grid from '@mui/material/Grid';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography, Checkbox, FormControlLabel, TextField, Divider } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Match {
    leagueId: number;
    matchId: number;
    teamA: string;
    teamB: string;
    stake?: number;
    step?: number;
}

interface MatchCardProps {
    match: Match;
    setStake: (matchId: number, stake: number) => void;
    showStuff: boolean;
}

export type { Match };

export default function MatchCard({ match, setStake, showStuff }: MatchCardProps) {
    return (
        <Grid container spacing={3} margin={5}>
            <Box margin={1} >
                <Grid container spacing={1} columnSpacing={1} rowSpacing={1} key={match.matchId}>

                    <Grid item xs={3}>
                        <Typography minWidth={1500} variant="body1">{match.teamA} vs {match.teamB}</Typography>
                    </Grid>
                    (if (showStuff) {
                        <Grid item xs={1}>
                            <Checkbox {...label} />
                        </Grid>
                    })

                    <Grid item xs={1}>
                        <TextField
                            type="text"
                            label="Stake"
                            size="small"
                            // defaultValue={1}
                            value={match.stake}
                            onChange={(e) => setStake(match.matchId, ~~e.target.value)}
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

                    <Grid item xs={1}>

                        <TextField
                            type="number"

                            id="outlined-basic" label="SFree" variant="outlined" size="small"
                            // value={stepFreeRoll}
                            // onChange={(e) => setStepFreeRoll(~~e.target.value)}                            
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                </Grid>
                <Divider light />
            </Box>
        </Grid>
    );
}
