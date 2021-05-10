/* eslint-disable */

describe("Test Search -> 404", function () {
  it("Search for nonsensical string, verify leads to 404", function () {
    function randomString(length) {
      const result = [];
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * characters.length))
        );
      }
      return result.join("");
    }

    cy.visit("http://localhost:3000/");

    cy.wait(1000);

    cy.get("#search-input").type(randomString(8)).type("{enter}");

    cy.contains("404").should("contain", "404");
  });
});
describe("Test Search for Real Block", function () {
  it("Search for block no. 21342, verify all data cells exist", function () {
    cy.visit("http://localhost:3000/");

    cy.wait(3000);

    cy.get("#search-input").type("21342").type("{enter}");

    cy.contains("21342");
    cy.contains("Block Size");
    cy.contains("Block Hash");
    cy.contains("Data Hash");
    cy.contains("Previous Hash");
    cy.contains("Transactions");
  });
});

describe("Follow Block Search to TXN", function () {
  it("Follow TXN link from block no. 4, verify the TXN hash matches on both pages", function () {
    cy.visit("http://localhost:3000/blocks/21342");

    cy.wait(1000);

    cy.contains("Transactions");

    cy.get(".block-txn-link").first().as("txnHash");
    cy.get("@txnHash").then(($txnhash) => {
      const value = $txnhash.text();
      cy.get("@txnHash").click();

      cy.contains(value);
    });
  });
});

describe("Extract TXN from Block hash, Search", function () {
  it("Get a TXN hash from a block page, search for it in bar", function () {
    cy.visit("http://localhost:3000/blocks/21342");

    cy.wait(3000);

    cy.contains("Transactions");

    cy.get(".block-txn-link").first().as("txnHash");
    cy.get("@txnHash").then(($txnhash) => {
      const value = $txnhash.text();

      cy.get("#search-input").type(value).type("{enter}");
      cy.contains(value);
    });
  });
});

describe("Test search for wallet hash", function () {
  it("Get wallet hash from txn, search for it", function () {
    cy.visit("http://localhost:3000/blocks/21342");

    cy.wait(1000);

    cy.contains("Transactions");

    cy.get(".block-txn-link").first().as("txnHash");
    cy.get("@txnHash").click();

    cy.wait(100);

    cy.get(".to-from-cell").should("exist");

    cy.get(".to-from-cell").first().as("walletHash");

    cy.get("@walletHash").then(($walletHash) => {
      const walletHashString = $walletHash.text();

      cy.get("#search-input").type(walletHashString).type("{enter}");
      cy.contains(walletHashString);
    });
  });
});
