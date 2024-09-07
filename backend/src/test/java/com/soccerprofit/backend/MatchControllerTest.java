package com.soccerprofit.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
class MatchControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private MatchRepository matchRepository;

	private String baseUrl = "http://localhost:8080/api/matches/";

	// private Long leagueOneId = matchRepository.findAll().get(0).getLeagueId();
	// private Long matchOneLeagueOne = matchRepository.findAllByLeagueId(leagueOneId).get(0).getMatchId();
	
	@Test
	void getMatchesByLeagueId() throws Exception {

		Long leagueOneId = matchRepository.findAll().get(0).getLeagueId();
		Long matchOneLeagueOne = matchRepository.findAllByLeagueId(leagueOneId).get(0).getMatchId();
		String teamAfromMatchOneLeagueOne = matchRepository.findAllByLeagueId(leagueOneId).get(0).getTeamA();

		mockMvc.perform(get(baseUrl + leagueOneId))
			.andExpect(status().isOk())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.length()").value(greaterThan(0)))
			.andExpect(jsonPath("$[0].leagueId").value(Long.toString(leagueOneId)))
			.andExpect(jsonPath("$[0].matchId").value(Long.toString(matchOneLeagueOne)))
			.andExpect(jsonPath("$[0].teamA").value(teamAfromMatchOneLeagueOne));
	}

	@Test
	void postBet() throws Exception {
		Long leagueOneId = matchRepository.findAll().get(0).getLeagueId();
		Long matchOneLeagueOne = matchRepository.findAllByLeagueId(leagueOneId).get(0).getMatchId();
		String teamAbeforeBet = matchRepository.findAllByLeagueId(leagueOneId).get(0).getTeamA();

		String betJson = "[{\"matchId\":" + matchOneLeagueOne + ",\"stake\":1,\"step\":1,\"sell\":1,\"stepFreeRoll\":1}]";

		mockMvc.perform(post(baseUrl + "bet")
			.contentType(MediaType.APPLICATION_JSON)
			.content(betJson))
				.andExpect(status().isOk())
			;

		String teamAafterBet = matchRepository.findAllByLeagueId(leagueOneId).get(0).getTeamA();
		
		assertEquals(teamAafterBet, teamAbeforeBet + "*");
	}		
}
