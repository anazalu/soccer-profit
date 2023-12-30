import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import MatchCard, { Match } from "./MatchCard";

function MatchesContainer() {

    const matches: Match[] = [
        { matchId: 1, matchName: 'team1 vs team 2' },
        { matchId: 2, matchName: 'team2 vs team 3' },
        { matchId: 3, matchName: 'team3 vs team 4' },
        { matchId: 4, matchName: 'team4 vs team 1' }
    ];

    const handleClearAll = () => {
        console.log("Clear all.");
    };

    return (
        <Grid container spacing={3} margin={5} columns={12}>
            <Grid item xs={8}>

                <Box sx={{ width: 500 }}>
                    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                        <TextField
                            id="outlined-basic" label="Steps to Freeroll" variant="outlined" size="small"
                            // value={multiStake}
                            // onChange={(e) => setMultiStake(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <Grid item>
                            <Button onClick={handleClearAll}>Clear all</Button>
                        </Grid>

                        <TextField
                            type="text"
                            label="Default Stake"
                            size="small"
                            // value={stakeBack}
                            // onChange={(e) => setStakeBack(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                    </Stack>
                </Box>

                {
                    matches.map((match) => (
                        <MatchCard key={match.matchId} match={match} />
                    ))
                }
            </Grid>

            <Grid item xs={4}>
                <Button variant="contained" size="large" >Bet</Button>
            </Grid>

        </Grid >
    )
}

export default MatchesContainer;
