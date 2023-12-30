## Todo
![image](image_2023_12_23.png)

Country:
[UK][UKid=1, ITAid=2]
League:
[Championship]

Table
			 Default:|Stake|Steps|Sell|SFree
List Matches|Checkbox|Stake|Steps|Sell|SFree

UK vs SPA   |[X]      |10£ |11|   0.5%|23

      1.55(Sell 5 on ods 1.44) and sell rest on 1.32     
	  
	  1x(Button BET) 1x(Clear)

### Implementing the POST request

The POST request is made from the MatchesContainer. The requests sends a list of Bet objects in its body. There will be a new TypeScript interface, Bet, similar to the backend class BetDTO:

```
public class BetDTO {
    private Long matchId;
    private int stake;
    private int step;
    private int sell;
    private int stepFreeRoll;
}
```

There will be a useState hook in MatchesContainer that will keep a list (or a set) of these Bet objects. When the user changes Stake, Step or Sell in one of matches, this event must be handled in MatchesContainer, and the corresponding Bet object must be updated. When a checkbox is checked, a new Bet object is added to the list. The list of Bet objects reflects current state of the matches. The Bet objects are always ready to be packed and sent in a POST request.

### Endpoints
#### GET
- localhost:8080/api/matches/{leagueId}
#### POST
- localhost:8080/api/matches/bet

### Match DTO:
- matchId
- leagueId
- teamA
- teamB

    private Long matchId;
    private Long leagueId;
    private String teamA;
    private String teamB;

### Bet DTO:
- matchId
- stake
- step
- sell
- stepFreeRoll

    private Long matchId;
    private int stake;
    private int step;
    private int sell;
    private int stepFreeRoll;

### MatchService methods
```
List<Match> getAllMatches(leagueId);
void placeBets(List<Bet>)
```

### Useful commands 
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

![image](image_231230.png)