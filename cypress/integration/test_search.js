/* eslint-disable */

describe("Test Search -> 404", function () {
    it("Search for nonsensical string, verify leads to 404", function () {
      cy.visit("http://localhost:3000/")

      cy.wait(1000)
    
      cy.get("#search-input").type("sdfjknasdfkjsr").type("{enter}")
  
      cy.contains("404").should("contain", "404")

    })
  })
describe("Test Search for Real Block", function () {
    it("Search for block no. 300, verify all data cells exist", function () {

        cy.visit("http://localhost:3000/")

        cy.wait(1000)

        cy.get("#search-input").type("300").type("{enter}")
  
        cy.contains("300").should("contain", "300")
        cy.contains("Block Size")
        cy.contains("Block Hash")
        cy.contains("Data Hash")
        cy.contains("Previous Hash")
        cy.contains("Transactions:")
    
        })
  })

describe("Follow Block Search to TXN", function () {
    it("Follow TXN link from block no. 300, verify the TXN hash matches on both pages", function () {

        cy.visit("http://localhost:3000/blocks/300")

        cy.wait(1000)

        cy.contains("Transactions:")

        cy.get(".info-table-link").first().as('txnHash')
        cy.get("@txnHash").then(($txnhash) => { const value = $txnhash.text()
            cy.get("@txnHash").click()
            
            cy.contains(value)
        
        
        
        })
        })
  })

describe("Extract TXN from Block hash, Search", function () {
    it("Get a TXN hash from a block page, search for it in bar", function () {

        cy.visit("http://localhost:3000/blocks/300")

        cy.wait(1000)

        cy.contains("Transactions:")

        cy.get(".info-table-link").first().as('txnHash')
        cy.get("@txnHash").then(($txnhash) => { const value = $txnhash.text()
            
            cy.get("#search-input").type(value).type("{enter}")

            cy.contains(value)
                
        })
        })
  })
