package com.soccerprofit.backend;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{leagueId}")
    public List<Match> getAllMatches(@PathVariable Long leagueId) {
        return matchService.getAllMatches(leagueId);
    }

    @PostMapping("/bet")
    public BetDTO matchBet(@RequestBody BetDTO bet) {
        matchService.matchBet(bet);
        return bet;
    }
}
