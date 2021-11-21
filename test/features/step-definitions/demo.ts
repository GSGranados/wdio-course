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
/**
 *
 * WEB INTERACTIONS
 *
 */

Given(/^A web page is opened$/, async function () {
  await browser.url("/inputs"); //it understands the base URL
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //it will wait until it reaches 15000 ms when it comes to locate an element
  //await browser.maximizeWindow(); //maximizing the window
});

When(/^Perform web interactions$/, async function () {
  /**
   * 1. Input Box
   * Actions:
   * 1. Type into the box
   * 2. Clear the field and type or just addValue
   * 3. Click and type
   * 4. Slowly typing like a normal user
   */
  // let num = 12345;
  // let strNum = num.toString();
  // let searchInput = await $('input[type="number"]');
  // searchInput.click();
  // for (let i = 0; i < strNum.length; i++) {
  //   let charStr = strNum.charAt(i);
  //   await browser.pause(1000);
  //   await browser.keys(charStr); // gets the char your passing to and press the corresponding Key
  // }
  /**
   *Dropdown
   *
   *
   *
   */
});
