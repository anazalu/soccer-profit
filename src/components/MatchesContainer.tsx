import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import MatchCard, { Match } from "./MatchCard";

interface MatchDTO {
    leagueId: number;
    matchId: number;
    teamA: string;
    teamB: string;
}

interface BetDTO {
    matchId: number;
    stake: number;
    step: number;
    sell: number;
    stepFreeRoll: number;
}

interface MatchesContainerProps {
    leagueId: string;
}

function MatchesContainer({ leagueId }: MatchesContainerProps) {
    const queryClient = useQueryClient();

    const { data: matchDTOs, isLoading, isError, error } = useQuery<MatchDTO[]>(
        {
            queryKey: ['matches' + leagueId],
            queryFn: () => axios.get(`http://localhost:8080/api/matches/${leagueId}`).then((response) => response.data)
        }
    );

    // const betMutation = useMutation((bets: BetDTO[]) =>
    //     axios.post(`http://localhost:8080/api/matches/bet`, bets).then((response) => {
    //         console.log(response);
    //         // queryClient.invalidateQueries(['horses' + bet.raceId]);
    //     })
    // );

    const [matches, setMatches] = useState<{ [key: number]: Match }>({});

    useEffect(() => {
        if (matchDTOs) {
            const convertedMatches: { [key: number]: Match } = {};

            matchDTOs.forEach((matchDTO) => {
                convertedMatches[matchDTO.matchId] = {
                    matchId: matchDTO.matchId,
                    teamA: matchDTO.teamA,
                    teamB: matchDTO.teamB,
                    isChecked: false,
                    stake: 0,
                    step: 0,
                    sell: 0,
                    stepFreeRoll: 0,
                };
            });

            setMatches(convertedMatches)
        }
    }, [matchDTOs]);

    const handleBet = () => {
        console.log("Bet.");
        const bets: BetDTO[] = [];
        Object.values(matches).forEach((match) => {
            if (match.isChecked) {
                const bet: BetDTO = {
                    matchId: match.matchId,
                    stake: match.stake,
                    step: match.step,
                    sell: match.sell,
                    stepFreeRoll: match.stepFreeRoll
                }
                bets.push(bet);
            }
        })
        console.log(...bets);

        // betMutation.mutate(bets);
    }

    const [defaultStake, setDefaultStake] = useState(5);
    const handleSetDefaultStake = (_: number, stake: number) => {
        setDefaultStake(stake);
        console.log('Set default stakes to:', stake);
    }

    const [defaultStep, setDefaultStep] = useState(2);
    const handleSetDefaultStep = (_: number, step: number) => {
        setDefaultStep(step);
        console.log('Set default step to:', step);
    }

    const [defaultSell, setDefaultSell] = useState(50);
    const handleSetDefaultSell = (_: number, sell: number) => {
        setDefaultSell(sell);
        console.log('Set default sell to:', sell);
    }

    const [defaultStepFreeRoll, setDefaultStepFreeRoll] = useState(3);
    const handleSetDefaultStepFreeRoll = (_: number, stepFreeRoll: number) => {
        setDefaultStepFreeRoll(stepFreeRoll);
        console.log('Set default freeroll to:', stepFreeRoll);
    }

    const handleClearAll = () => {
        console.log("Clear all.");
    };

    const handleOnCheck = (matchId: number, isChecked: boolean) => {
        console.log("Check some boxes.");
        let match: Match = matches[matchId];
        match.isChecked = isChecked;
        match.stake = defaultStake;
        match.step = defaultStep;
        match.sell = defaultSell;
        match.stepFreeRoll = defaultStepFreeRoll;
        setMatches({ ...matches, [matchId]: match });
    };

    const handleSetStake = (matchId: number, stake: number) => {
        console.log("Stake");
        let match: Match = matches[matchId];
        match.stake = stake;
        setMatches({ ...matches, [matchId]: match });
    }

    const handleSetStep = (matchId: number, step: number) => {
        console.log("Step.");
        let match: Match = matches[matchId];
        match.step = step;
        setMatches({ ...matches, [matchId]: match });
    };

    const handleSetSell = (matchId: number, sell: number) => {
        console.log("Sell.");
        let match: Match = matches[matchId];
        match.sell = sell;
        setMatches({ ...matches, [matchId]: match });
    };

    const handlesetStepFreeRoll = (matchId: number, stepFreeRoll: number) => {
        console.log("SFree.");
        let match: Match = matches[matchId];
        match.stepFreeRoll = stepFreeRoll;
        setMatches({ ...matches, [matchId]: match });
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
                        <Button onClick={handleClearAll}>Clear all fields / Clear default fields...</Button>
                    </Stack>
                </Box>

                <MatchCard match={{ matchId: 0, teamA: '', teamB: '', isChecked: true, stake: defaultStake, step: defaultStep, sell: defaultSell, stepFreeRoll: defaultStepFreeRoll }}
                    showStuff={false} onCheck={() => undefined}
                    setStake={handleSetDefaultStake} setStep={handleSetDefaultStep} setSell={handleSetDefaultSell} setStepFreeRoll={handleSetDefaultStepFreeRoll} />
                {
                    Object.values(matches)?.map((match: Match) => (
                        <MatchCard key={match.matchId} match={match} showStuff={true}
                            onCheck={handleOnCheck} setStake={handleSetStake} setStep={handleSetStep} setSell={handleSetSell} setStepFreeRoll={handlesetStepFreeRoll} />
                    ))
                }
            </Grid>

            <Grid item xs={4}>
                <Button variant="contained" size="large" onClick={handleBet} >Bet</Button>
            </Grid>

        </Grid >
    )
}

export default MatchesContainer;
