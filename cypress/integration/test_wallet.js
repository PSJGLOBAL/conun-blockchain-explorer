/* eslint-disable */

describe("Test Wallet error page", function () {
  it("Visit /wallets/ url, assert that it is an error page", function () {
    cy.visit("http://localhost:3000/wallets")

    cy.wait(1000)
  
    cy.contains("404").should("contain", "404")

  })
})


describe("Test Wallet URL", function () {
  it("Get wallet hash from txn, visit that page", function () {

      cy.visit("http://localhost:3000/")

      cy.wait(1000)

      cy.get(".to-from-cell").should("exist")

      cy.get(".to-from-cell")
        .first().as("walletHash")
        .invoke('attr', 'href')
        .then((href)=> {


        cy.visit(`http://localhost:3000${href}`)

        const walletHash = href.slice(9)

        cy.contains(walletHash)

        })
      })
})
