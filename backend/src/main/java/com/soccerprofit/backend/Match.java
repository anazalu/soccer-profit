package com.soccerprofit.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchId;

    private Long leagueId;
    private String teamA;
    private String teamB;

    public Match(Long leagueId, String teamA, String teamB) {
        this.leagueId = leagueId;
        this.teamA = teamA;
        this.teamB = teamB;
    }
}
