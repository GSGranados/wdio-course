import { Then } from "@cucumber/cucumber";
import chai from "chai";

Then(/^Inventory page should list (.*)$/, async function (numberOfProducts) {
  if (!numberOfProducts)
    throw Error(`Invalid Number Provided:, ${numberOfProducts}`);

  const amountOfProducts = await $$(".inventory_item").length;
  chai.expect(amountOfProducts).to.equal(Number(numberOfProducts));
  await browser.pause(2000);
});

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
  console.log(pricesArray);
  await browser.pause(2000);
});
