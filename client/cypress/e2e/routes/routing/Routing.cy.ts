describe("Routing e2e tests", () => {
  it("should show 'NotFound' page when visisting random route", () => {
    cy.visit("/randomRoute").get("[id=page-NotFound]").should("be.visible");
  });

  it("should redirect to 'Prelude' page", () => {
    cy.visit("/").get("[id=page-Prelude]").should("be.visible");
  });

  it("should show 'Prelude' page", () => {
    cy.visit("/prelude").get("[id=page-Prelude]").should("be.visible");
  });

  it("should show 'Viewer' page when user persist set", () => {
    cy.setPersist()
      .visit("/viewer")
      .get("[id=page-Viewer]")
      .should("be.visible");
  });
});
