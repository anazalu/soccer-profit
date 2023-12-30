import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import MatchCard, { Match } from "./MatchCard";

interface MatchesContainerProps {
    leagueId: string;
}

function MatchesContainer({ leagueId }: MatchesContainerProps) {
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery<Match[]>(
        {
            queryKey: ['matches' + leagueId],
            queryFn: () => axios.get(`http://localhost:8080/api/matches/${leagueId}`).then((response) => response.data)
        }
    );

    const handleClearAll = () => {
        console.log("Clear all.");
    };

    const setStake = () => {
        console.log("Stake.");
    };


    if (isLoading) {
        return <div>Is loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <Grid container spacing={3} margin={5} columns={12}>
            <Grid item xs={8}>
                <Box sx={{ width: 500 }}>
                    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">

                        <TextField
                            type="text"
                            label="Default Stake"
                            size="small"
                            // value={stake}
                            // onChange={(e) => setStake(~~e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            id="outlined-basic" label="Steps to Freeroll" variant="outlined" size="small"
                            // value={stepFreeRoll}
                            // onChange={(e) => setStepFreeRoll(~~e.target.value)}                            
                            InputLabelProps={{ shrink: true }}
                        />

                        <Stack direction="row" >
                            <Button variant="contained" onClick={() => { setStake() }}>1</Button>
                            <Button variant="contained" onClick={() => { setStake() }}>2</Button>
                            <Button variant="contained" onClick={() => { setStake() }}>5</Button>
                            <Button variant="contained" onClick={() => { setStake() }}>10</Button>
                            <Button onClick={handleClearAll}>Clear all</Button>
                        </Stack>
                    </Stack>
                </Box>

                {
                    data?.map((match: Match) => (
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
