describe("Routing e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show 'NotFound' page", () => {
    cy.get("[id=page-NotFound]").should("not.be.undefined");
  });

  it("should show 'Prelude' page", () => {
    cy.visit("/prelude");
    cy.get("[id=page-Prelude]").should("not.be.undefined");
  });

  it("should show 'Viewer' page", () => {
    cy.visit("/viewer");
    cy.get("[id=page-Viewer]").should("not.be.undefined");
  });
});
