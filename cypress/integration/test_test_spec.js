describe("Practice Test", function () {
  it("Pract is", function () {
    cy.visit("http://localhost:3000/")

    cy.contains("View More Blocks").click()

    cy.url().should("include", "/blocks")

    cy.get(".search-input-field").type("sdfjknasdfkjsr").type("{enter}")

    cy.contains("404").should("contain", "404")
  })
})
