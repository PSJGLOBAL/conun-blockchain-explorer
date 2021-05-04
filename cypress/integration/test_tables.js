/*eslint-disable*/

describe("Test Block Table", function () {
  it("Click on Block Table view more button", function () {
    cy.visit("http://localhost:3000/")

    cy.contains("Recent Blocks")
    cy.contains("Recent Transactions")

    cy.wait(200)

    cy.get("#block-table-more").click()

    cy.get(".section-title").should('not.contain', "Recent Transactions")
  })
})

describe("Test Txn Table", function () {
  it("Click on Txn Table view more button", function () {
    cy.visit("http://localhost:3000/")

    cy.contains("Recent Blocks")
    cy.contains("Recent Transactions")

    cy.wait(200)

    cy.get("#txn-table-more").click()

    cy.get(".section-title").should('not.contain', "Recent Blocks")
  })
})

describe("Test Block Table Pagination", function () {
  it("Click on Block Table button pagination menu, assert results are same.", function () {
    cy.visit("http://localhost:3000/")

    cy.wait(200)

    cy.get("#block-table-more").click()

    //   Get top hash

    cy.get(".block-number").first().as("firstBlockHash")

    cy.wait(100)

    cy.get("@firstBlockHash").then(($firstBlockHash) => {
      const value = $firstBlockHash.text()

      cy.wait(500)

      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()

      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()

      cy.wait(500)

      cy.get("@firstBlockHash").should("contain", value)

      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()

      cy.get("#pagination-first").click()

      cy.wait(500)

      cy.get("@firstBlockHash").should("contain", value)
    })
  })
})

describe("Test Txn Table Pagination", function () {
  it("Click on Block Table button pagination menu, assert results are same.", function () {
    cy.visit("http://localhost:3000/")

    cy.wait(200)

    cy.get("#txn-table-more").click()

    cy.get(".hash-cell").first().as("firstTxnHash")

    cy.wait(100)

    cy.get("@firstTxnHash").then(($firstTxnHash) => {
      const value = $firstTxnHash.text()

      cy.wait(500)

      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()

      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()
      cy.get("#pagination-previous").click()

      cy.wait(500)

      cy.get("@firstTxnHash").should("contain", value)

      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()
      cy.get("#pagination-next").click()

      cy.get("#pagination-first").click()

      cy.wait(500)

      cy.get("@firstTxnHash").should("contain", value)
    })
  })
})
