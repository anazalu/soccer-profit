package com.soccerprofit.backend;

import org.junit.jupiter.api.BeforeEach;
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
	private Long leagueOneId;
	private Long matchOneLeagueOne;
	private String teamAfromMatchOneLeagueOne;

	@BeforeEach
	void setUp() {
		if (matchRepository.findAll().isEmpty()) {
			for (long i = 1; i <= 30; i++) {
				long leagueId = (i - 1) / 10 + 1;
				String teamA = "TeamA" + i;
				String teamB = "TeamB" + i;
				Match match = new Match(leagueId, teamA, teamB);
				matchRepository.save(match);
			}
		}

		leagueOneId = matchRepository.findAll().get(0).getLeagueId();
		matchOneLeagueOne = matchRepository.findAllByLeagueId(leagueOneId).get(0).getMatchId();
		teamAfromMatchOneLeagueOne = matchRepository.findAllByLeagueId(leagueOneId).get(0).getTeamA();
	}

	@Test
	void getMatchesByLeagueId() throws Exception {

		mockMvc.perform(get(baseUrl + leagueOneId))
			.andExpect(status().isOk())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.length()").value(greaterThan(0)))
			.andExpect(jsonPath("$[0].leagueId").value(Long.toString(leagueOneId)))
			.andExpect(jsonPath("$[0].matchId").value(Long.toString(matchOneLeagueOne)))
			.andExpect(jsonPath("$[0].teamA").value(teamAfromMatchOneLeagueOne));
	}
	
	@Test
	void getMatchesByLeagueIdNegative() throws Exception {

		mockMvc.perform(get(baseUrl + "0"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$").isEmpty())
			.andExpect(jsonPath("$.length()").value(0))
			;
	}
	
	@Test
	void getMatchesWithoutLeagueIdNegative() throws Exception {

		mockMvc.perform(get(baseUrl))
			.andExpect(status().isNotFound())
			;
	}

	@Test
	void postMatchesNegative() throws Exception {

		mockMvc.perform(post(baseUrl + leagueOneId)		
			.contentType(MediaType.APPLICATION_JSON)
			.content(""))
				.andExpect(status().is(405))
			;
	}
	
	@Test
	void deleteMatchesNegative() throws Exception {

		mockMvc.perform(delete(baseUrl + leagueOneId))
			.andExpect(status().is(405))
			;
	}

	@Test
	void postBet() throws Exception {

		String betJson = "[{\"matchId\":" + matchOneLeagueOne + ",\"stake\":1,\"step\":1,\"sell\":1,\"stepFreeRoll\":1}]";

		mockMvc.perform(post(baseUrl + "bet")
			.contentType(MediaType.APPLICATION_JSON)
			.content(betJson))
				.andExpect(status().isOk())
			;

		String teamAafterBet = matchRepository.findAllByLeagueId(leagueOneId).get(0).getTeamA();
		
		assertEquals(teamAafterBet, teamAfromMatchOneLeagueOne + "*");
	}		
}
