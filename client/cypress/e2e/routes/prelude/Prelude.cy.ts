describe("Prelude e2e tests", () => {
  beforeEach(() => {
    cy.visit("/prelude");
  });

  it("enable 'Start Meeting' button when name is not empty", () => {
    cy.visit("/prelude");
    const nameId = "Prelude-user-name-textfield";
    cy.get(`[id=${nameId}]`).type("Jon Doe");
    const startBtnId = "Prelude-start-meeting-button";
    cy.get(`[id=${startBtnId}]`).should("not.be.disabled");
  });

  it("disable 'Start Meeting' button when name is empty", () => {
    cy.visit("/prelude");
    const nameId = "Prelude-user-name-textfield";
    cy.get(`[id=${nameId}]`).clear();
    const startBtnId = "Prelude-start-meeting-button";
    cy.get(`[id=${startBtnId}]`).should("be.disabled");
  });

  it("switch to 'viewer' page when 'Start Meeting' button clicked", () => {
    cy.visit("/prelude");
    const nameId = "Prelude-user-name-textfield";
    cy.get(`[id=${nameId}]`).type("Jon Doe");
    const startBtnId = "Prelude-start-meeting-button";
    cy.get(`[id=${startBtnId}]`).click();
    cy.location("pathname").should("eq", "/viewer");
  });
});
