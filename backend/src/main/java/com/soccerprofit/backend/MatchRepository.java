package com.soccerprofit.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findAllByLeagueId(Long leagueId);
    Optional<Match> findByMatchId(Long matchId);
}
