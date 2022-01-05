import { Given } from "@cucumber/cucumber";
import reporter from "../../helper/reporter";
import chai from "chai";
import sauceHomePage from "../../page-objects/sause.home.page";
import constants from "../../../data/constants.json";
import apiHelper from "../../helper/apiHelper";
import fs from "fs";
Given(
  /^As (a|an) (.*) I login to inventory web app$/,
  async function (prefixTxt, userType) {
    try {
      reporter.addStep(this.testid, "info", "Login to sauce demo");
      //@ts-ignore
      await sauceHomePage.navigateTo(browser.config.sauceDemoURL);
      await sauceHomePage.loginToSauseApp(
        this.testid,
        process.env.TEST_STD_USERNAME,
        process.env.TEST_STD_PASSWORD
      );
    } catch (err) {
      err.message = `${this.testid}: Failed at login step, ${err.message}`;
      throw err;
    }
  }
);

/**
 * Get List of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make API call using API helper
 * 3. Store results
 *
 */

Given(
  /^Get a list of (.*) from reques.in$/,
  async function (endpointReference) {
    if (!endpointReference)
      throw Error(
        `Endpoint reference is not valid. Endpoint Ref: ${endpointReference}`
      );
    try {
      reporter.addStep(
        this.testid,
        "info",
        `Getting the payload data for endpoint: ${endpointReference}`
      );
      let endpoint: string = "";
      if (endpointReference.trim().toUpperCase() === "USERS") {
        endpoint = constants.REQRES.GET_USERS;
      }
      if (!endpoint)
        throw Error(
          `Error getting the endpoint: ${endpoint} from the constants.json`
        );

      let res;
      await browser.call(async () => {
        res = await apiHelper.GET(
          this.testid,
          //@ts-ignore
          browser.config.reqresBaseURL,
          endpoint,
          "",
          constants.REQRES.QUERY_PARAM
        );
      });
      if (res.status !== 200)
        chai.expect.fail(
          //@ts-ignore
          `Failed getting users from: ${browser.config.reqresBaseURL}${endpoint}`
        );

      reporter.addStep(
        this.testid,
        "debug",
        `API response received, data: ${res.body}`
      );

      let data = JSON.stringify(res.body, undefined, 4);
      let fileName = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
      fs.writeFileSync(fileName, data);
      reporter.addStep(
        this.testid,
        "info",
        `API response from ${endpoint} stored in JSON file`
      );
    } catch (err) {
      err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`;
      throw err;
    }
  }
);
