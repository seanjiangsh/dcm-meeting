describe("Appbar e2e tests", () => {
  beforeEach(() => {
    cy.setPersist().visit("/viewer");
  });

  it("Popover should be opened/closed when button click/lose popover focus", () => {
    const menuBtnId = "Appbar-menu-button";
    const popoverId = "Appbar-popover";
    // * click the menu button to open the popover
    cy.get(`[id=${menuBtnId}]`).click();
    cy.get(`[id=${popoverId}]`).should("be.visible");
    // * click away to close the popover
    cy.get("body").click(50, 50);
    cy.get(`[id=${popoverId}]`).should("not.exist");
  });

  it("switch to 'prelude' page when 'back' button clicked", () => {
    const menuBtnId = "Appbar-menu-button";
    const backBtnId = "Appbar-back-button";
    // * click the menu button to open the popover
    cy.get(`[id=${menuBtnId}]`).click();
    // * click back button to get back to /prelude
    cy.get(`[id=${backBtnId}]`).click();
    cy.location("pathname")
      .then((path) => path.endsWith("/prelude"))
      .should("be.true");
  });
});
