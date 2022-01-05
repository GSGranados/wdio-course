import { When } from "@wdio/cucumber-framework";
import chai from "chai";
import reporter from "../../helper/reporter";
import nopCommerceHomepage from "../../page-objects/nopcommerce.home.page";
When(/^As an (.*) User login to nopcommerce site$/, async function (userType) {
  if (!userType) throw Error(`Given user: ${userType} is not valid`);
  userType.trim().toUpperCase();
  try {
    reporter.addStep(this.testid, "info", "Login to nopCommerce demo site...");
    await nopCommerceHomepage.loginToNopCommerceWeb(
      this.testid,
      //@ts-ignore
      browser.config.nopCommerceBaseURL,
      process.env.TEST_NOP_ADMIN_USERNAME,
      process.env.TEST_NOP_ADMIN_PASSWORD
    );
  } catch (error) {
    error.message = `${this.testid}: Failed at nopcommerce Login with user: ${userType}, ${error.message}`;
  }
});
When(/^Search User in customers list$/, async function () {});
