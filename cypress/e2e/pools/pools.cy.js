/// <reference types="cypress" />

describe("pools with no data", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/pools");
  });

  it("displays headers", () => {
    cy.get("h1").should("have.length", 2);
    cy.get("h1").first().should("have.text", "Your Watchlist");
    cy.get("h1").last().should("have.text", "All Pools");
  });
});

describe("pools with data", () => {
  beforeEach(() => {
    cy.intercept(
      "POST",
      "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      { fixture: "pools.json" }
    ).as("pools");
    cy.visit("localhost:3000/pools");
    cy.wait("@pools");
  });

  it("should display tables", () => {
    cy.get("table").should("have.length", 2);
  });
});

describe("pools with data", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/pools/randomid");
  });

  it("should display back to pools", () => {
    cy.get(".flex").should("have.text", "Back to Pools");
  });
});
