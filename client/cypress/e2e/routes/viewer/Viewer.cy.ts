describe("Viewer e2e tests", () => {
  it("should redirect to 'Prelude' page when user persist unset", () => {
    cy.clearLocalStorage("persist:root")
      .visit("/viewer")
      .get("[id=page-Prelude]")
      .should("be.visible");
  });
});
