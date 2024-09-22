describe('Title Test', () => {
  const firstMatchBy: string = "(//p[contains(@class, 'MuiTypography-body1')])[2]";
  const firstMatchCheckBoxBy: string = "(//input[@id='box'])[1]";
  const betButtonBy: string = '(//button)[2]';
  const selectLeagueBy: string = "demo-simple-select";

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('Checks webpage title', () => {
    cy.get('title').contains('Soccer')
      .contains('Profit');
  });

  it('Checks first match', () => {
    cy.xpath(firstMatchBy)
      .should('exist')
      .should('have.text', 'TeamA1 vs TeamB1')
      ;
  });

  it('Checks button Bet', () => {
    cy.xpath(betButtonBy).should('exist');
  });
});
