package com.soccerprofit.backend;

import lombok.Data;

@Data
public class BetDTO {
    private Long matchId;
    private Integer stake;
    private Integer step;
    private Integer sell;
    private Integer stepFreeRoll;
}
