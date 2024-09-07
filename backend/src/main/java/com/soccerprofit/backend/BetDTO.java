package com.soccerprofit.backend;

import lombok.Data;

@Data
public class BetDTO {
    private Long matchId;
    private int stake;
    private int step;
    private int sell;
    private int stepFreeRoll;
}
