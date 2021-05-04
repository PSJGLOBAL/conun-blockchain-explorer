/*eslint-disable */

describe("Test autocomplete", function () {
  it("Ascertain autocomplete fetches results", function () {

      cy.visit("http://localhost:3000/")

      cy.wait(1000)

      cy.get("#search-input").type("0xe")

      cy.get(".autocomplete-option").should("exist")

      })
})

describe("Test autocomplete shortcuts", function () {
  it("Ascertain right arrow can fast-forward autocomplete entry", function () {

      cy.visit("http://localhost:3000/")

      cy.wait(1000)

      cy.get("#search-input").type("0xe").type("{rightArrow}").type("{enter}")

      cy.contains("Wallet Address")

      })
})
