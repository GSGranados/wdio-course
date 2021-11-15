import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai";

Given(/^Google page is opened$/, async function () {
  console.log("This is before the spec execution");
  await browser.url("https://google.com");
  await browser.pause(2000);
  console.log("This is after the spec execution");
});
When(/Search with (.*)/, async function (searchItem) {
  let searchInput = await $('input[name="q"]');
  await searchInput.setValue(searchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  let firstResult = await $("<h3>");
  await firstResult.click();
});
Then(/^URL should match (.*)$/, async function (expectedURL) {
  let url = await browser.getUrl();
  chai.expect(url).to.equal(expectedURL);
});
