import { TextField } from "@mui/material";
import MatchCard, { Match } from "./MatchCard";

function MatchesContainer() {

    const matches: Match[] = [
        { matchId: 1, matchName: 'team1 vs team 2' },
        { matchId: 2, matchName: 'team2 vs team 3' },
        { matchId: 3, matchName: 'team3 vs team 4' },
        { matchId: 4, matchName: 'team4 vs team 1' }
    ];

    return (
        <div>
            {matches.map((match) => (
                <MatchCard key={match.matchId} match={match} />
            ))}
        </div>
    )
}

export default MatchesContainer;
