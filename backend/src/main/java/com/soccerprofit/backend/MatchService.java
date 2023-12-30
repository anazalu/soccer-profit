package com.soccerprofit.backend;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {
    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public List<Match> getAllMatches(Long leagueId) {
        return matchRepository.findAllByLeagueId(leagueId);
    }

    public void matchBet(BetDTO bet) {
        Optional<Match> matchOptional = matchRepository.findByMatchId(bet.getMatchId());
        if (matchOptional.isPresent()) {
            Match match = matchOptional.get();
            match.setTeamA(match.getTeamA() + "*"); // make a random change to give feedback
            matchRepository.save(match);
        }
    }
}
