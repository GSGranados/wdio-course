import { Then } from "@cucumber/cucumber";
import chai from "chai";
import logger from "../../helper/logger";
import reporter from "../../helper/reporter";
import fs from "fs";
import nopCommercerCustomerPage from "../../page-objects/nopcommerce.custlist.page";

Then(
  /^Inventory page should (.*)\s?list (.*)$/,
  async function (negativeTxt, numberOfProducts) {
    try {
      if (!numberOfProducts)
        throw Error(`Invalid Number Provided:, ${numberOfProducts}`);

      const amountOfProducts = await $$(".inventory_item").length;
      chai.expect(amountOfProducts).to.equal(Number(numberOfProducts));
      await browser.pause(2000);
    } catch (err) {
      console.log("the type of error is :", typeof err);
      console.log("the name of error is :", err.name);
      console.log("the message of error is :", err.message);
      logger.error(err.message);
    }
  }
);

Then(/^Validate all products have valid price$/, async function () {
  const amountOfProducts = await $$(".inventory_item_price");
  let pricesArray = [];
  for (let i = 0; i < amountOfProducts.length; i++) {
    const [, priceValue] = await (
      await amountOfProducts[i].getText()
    ).split("$");
    chai.expect(Number(priceValue)).to.greaterThan(0);
    pricesArray.push(Number(priceValue));
  }
  await browser.pause(2000);
});

Then(/^Verify if all users exist in customer list$/, async function () {
  try {
    await browser.url(
      //@ts-ignore
      `${browser.config.nopCommerceBaseURL}/Admin/Customer/List`
    );
    reporter.addStep(
      this.testid,
      "info",
      "Navigating to the customer list screen..."
    );
    let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    let data = fs.readFileSync(filename, "utf8");
    let dataObject = JSON.parse(data);
    let notFoundCust = [];
    for (let i = 0; i < dataObject.data.length; i++) {
      let obj = {};
      let firstname = dataObject.data[i].first_name;
      let lastname = dataObject.data[i].last_name;
      let custNotFound = await nopCommercerCustomerPage.searchNameAndConfirm(
        this.testid,
        firstname,
        lastname
      );
      if (custNotFound) {
        obj["firstname"] = firstname;
        obj["lastname"] = lastname;
        notFoundCust.push(obj);
      }
    }
    if (notFoundCust.length > 1) {
      let data = JSON.stringify(notFoundCust);
      let filepath = `${process.cwd()}/results/custNotFoundList.json`;
      fs.writeFileSync(filepath, data);
    }
  } catch (err) {
    err.message = `${this.testid}: Failed at checking users in Customer List, ${err.message}`;
    throw err;
  }
});
