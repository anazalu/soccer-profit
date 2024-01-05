import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
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

    const [listOfStakes, setListOfStakes] = useState({});
    const handleSetStake = (matchId: number, stake: number) => {
        setListOfStakes({ ...listOfStakes, [matchId]: stake });
        console.log(listOfStakes);
    }

    const [defaultStake, setDefaultStake] = useState(1);
    const handleSetDefaultStake = (_: number, stake: number) => {
        setDefaultStake(stake);
        console.log('Set default stakes to:', stake);
    }

    const handleClearAll = () => {
        console.log("Clear all.");
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
                <Box sx={{ width: 1500 }}>
                        <Stack alignContent={'right'}>
                            <Button onClick={handleClearAll}>Clear all fields</Button>
                        </Stack>
                </Box>

                <MatchCard match={{ leagueId: 0, matchId: 0, teamA: 'Default values', teamB: '', stake: defaultStake }} setStake={handleSetDefaultStake} showStuff={true} />
                {
                    data?.map((match: Match) => (
                        <MatchCard key={match.matchId} match={match} setStake={handleSetStake} showStuff={false} />
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
