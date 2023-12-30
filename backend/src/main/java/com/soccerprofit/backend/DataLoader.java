package com.soccerprofit.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    private MatchRepository matchRepository;

    @Override
    public void run(String... args) throws Exception {
        for (long i = 1; i <= 30; i++) {
            long leagueId = (i - 1) / 10 + 1;
            String teamA = "TeamA" + i;
            String teamB = "TeamB" + i;
            Match match = new Match(leagueId, teamA, teamB);
            matchRepository.save(match);
        }
    }
}
