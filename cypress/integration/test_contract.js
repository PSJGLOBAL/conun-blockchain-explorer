/* eslint-disable */


describe("Test Contracts Page Loads Contracts", function () {
  it("Smart Contracts Page should receive list of contracts.", function () {
    cy.visit("http://localhost:3000/")

    cy.wait(500)
  
    cy.get("#headbar-link-contracts").click()
    
    cy.get(".smart-contract-row").its("length").should("be.gt", 0)
  })
})


describe("Test Contract Detail Loads Contracts", function () {
  it("Detailed page for smart contract should have some contracts on it.", function () {
    cy.visit("http://localhost:3000/contracts/conToken")

    cy.wait(500)

    cy.get(".transaction-data-row").should("exist")
  
    cy.get(".transaction-data-row").its("length").should("be.gt", 0)
  })
})


describe("Test Reach Contract Detail from Main Page", function () {
  it("Should be able to click on the icon in TXN table and reach ", function () {
    cy.visit("http://localhost:3000/")

    cy.wait(500)

    cy.get(".contract-icon-image").first().click()

    cy.wait(500)

    cy.contains("Title")
    cy.contains("Author")
    cy.contains("Type")
  
  })
})


