/* eslint-disable */
import randomString from "../utility/randomString.ts"

describe("Test Root URL", function () {
  it("Add nonsensical string to root url, check it redirects to main page", function () {
    cy.visit("http://localhost:3000/" + randomString(8))

    cy.contains("Recent Blocks")
    cy.contains("Recent Transactions")
    cy.contains("Tx/Min")
    cy.contains("Blocks/Min")
    cy.contains("View More Blocks")
    cy.contains("View More Transactions")
  })
})
describe("Test Blocks Route + String", function () {
  it("Add nonsensical string to blocks url, check it leads to 404", function () {
    cy.visit("http://localhost:3000/blocks/" + randomString(8))

    cy.contains("404").should("contain", "404")
  })
})
describe("Test Blocks Route", function () {
  it("Check /blocks and /blocks/ lead to the same page ", function () {
    cy.visit("http://localhost:3000/blocks")

    cy.get(".block-number").first().as("blockNumber")
    cy.get("@blockNumber").then(($blockNumber) => {
      const value = $blockNumber.text()

      cy.visit("http://localhost:3000/blocks/")
      cy.contains(value)
    })
  })
})
describe("Test Txns Route + String", function () {
  it("Add nonsensical string to txns url, check it leads to 404", function () {
    cy.visit("http://localhost:3000/txns/" + randomString(8))

    cy.contains("404").should("contain", "404")
  })
})
describe("Test Txns Route", function () {
  it("Check /txns and /txns/ lead to the same page ", function () {
    cy.visit("http://localhost:3000/txns")

    cy.get(".txn-hash").first().as("txnHash")
    cy.get("@txnHash").then(($txnHash) => {
      const value = $txnHash.text()

      cy.visit("http://localhost:3000/txns/")
      cy.contains(value)
    })
  })
})
