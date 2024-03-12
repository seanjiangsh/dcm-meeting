describe("Viewer e2e tests", () => {
  it("should redirect to 'Prelude' page when user persist unset", () => {
    cy.clearLocalStorage("persist:root")
      .visit("/viewer")
      .get("[id=page-Prelude]")
      .should("be.visible");
  });
  it("should show viewer page and render 1st image properly", () => {
    cy.setPersist()
      .visit("/viewer")
      .get("[data-viewport-uid=meeting-stack-viewport][rendered=true]")
      .should("be.visible");
    cy.compareSnapshot("viewer-initial-page");
  });
});
