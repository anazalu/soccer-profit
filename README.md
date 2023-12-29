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

### Match DTO:
- Id;
- Name;

### Bet DTO:
- Stake
- Step
- Sell
- SFree

### TradeService methods
```
List<Match> getAllMatches(leagueId);
void placeBets(List<Bet>)
```


### Useful commands 
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.