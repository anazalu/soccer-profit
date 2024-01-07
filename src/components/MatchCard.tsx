import Grid from '@mui/material/Grid';
import { Box, Typography, Checkbox, TextField, Divider } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Match {
    matchId: number;
    teamA: string;
    teamB: string;
    isChecked: boolean;
    stake: number;
    step: number;
    sell: number;
    stepFreeRoll: number;
}

interface MatchCardProps {
    match: Match;
    showStuff: boolean;
    onCheck: (matchId: number, isChecked: boolean) => void;
    setStake: (matchId: number, stake: number) => void;
    setStep: (matchId: number, step: number) => void;
    setSell: (matchId: number, sell: number) => void;
    setStepFreeRoll: (matchId: number, stepFreeRoll: number) => void;
}

export type { Match };

export default function MatchCard({ match, showStuff, onCheck, setStake, setStep, setSell, setStepFreeRoll }: MatchCardProps) {

    return (
        <Box>
            <Grid container margin={1} key={match.matchId}>

                <Grid item xs={3}>
                    {showStuff ? (
                        <Typography minWidth={1500} variant="body1">{match.teamA} vs {match.teamB}</Typography>
                    ) : (
                        <Typography minWidth={1500} variant="body1"></Typography>
                    )}
                </Grid>

                <Grid item xs={1}>
                    {showStuff && (
                        <Checkbox {...label} checked={match.isChecked} onChange={(e) => onCheck(match.matchId, e.target.checked)} />
                    )}
                </Grid>

                <Grid item xs={1}>
                    <TextField
                        type="text"
                        label="Stake"
                        size="small"
                        variant={showStuff ? undefined : "filled"}
                        value={match.stake}
                        onChange={(e) => setStake(match.matchId, ~~e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={1}>
                    <TextField
                        // https://mui.com/base-ui/react-number-input/
                        type="number"
                        label="Step"
                        size="small"
                        variant={showStuff ? undefined : "filled"}
                        value={match.step}
                        onChange={(e) => setStep(match.matchId, ~~e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={1}>
                    <TextField
                        type="text"
                        label="Sell"
                        size="small"
                        variant={showStuff ? undefined : "filled"}
                        value={match.sell}
                        onChange={(e) => setSell(match.matchId, ~~e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={1}>
                    <TextField
                        type="number"
                        label="SFree"
                        size="small"
                        variant={showStuff ? undefined : "filled"}
                        value={match.stepFreeRoll}
                        onChange={(e) => setStepFreeRoll(match.matchId, ~~e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

            </Grid>
            <Divider light />
        </Box>
    );
}
