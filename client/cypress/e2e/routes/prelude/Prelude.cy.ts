describe("Prelude e2e tests", () => {
  beforeEach(() => {
    cy.visit("/prelude");
  });

  it("enable 'Start Meeting' button when name is not empty", () => {
    const nameId = "Prelude-user-name-textfield";
    const startBtnId = "Prelude-start-meeting-button";
    cy.get(`[id=${nameId}]`).type("Jon Doe");
    cy.get(`[id=${startBtnId}]`).should("be.enabled");
  });

  it("disable 'Start Meeting' button when name is empty", () => {
    const nameId = "Prelude-user-name-textfield";
    const startBtnId = "Prelude-start-meeting-button";
    cy.get(`[id=${nameId}]`).clear();
    cy.get(`[id=${startBtnId}]`).should("be.disabled");
  });

  it("switch to 'viewer' page when 'Start Meeting' button clicked", () => {
    const nameId = "Prelude-user-name-textfield";
    const startBtnId = "Prelude-start-meeting-button";
    cy.get(`[id=${nameId}]`).type("Jon Doe");
    cy.get(`[id=${startBtnId}]`).click();
    cy.location("pathname")
      .then((path) => path.endsWith("/viewer"))
      .should("be.true");
  });

  it("switch to 'viewer' page when 'Start Meeting' when 'enter' key down", () => {
    const nameId = "Prelude-user-name-textfield";
    cy.get(`[id=${nameId}]`).type("Jon Doe").type("{enter}");
    cy.location("pathname")
      .then((path) => path.endsWith("/viewer"))
      .should("be.true");
  });
});
