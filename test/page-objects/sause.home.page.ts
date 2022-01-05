import Page from "./page";
import chai from "chai";
import reporter from "../helper/reporter";

class HomePage extends Page {
  constructor() {
    super();
  }

  /**
   *  await $("#user-name").setValue(process.env.TEST_STD_USERNAME);
      await $("#password").setValue(process.env.TEST_STD_PASSWORD);
      await browser.pause(1000);
      await $("#login-button").click();
   */

  /**Page Objects */
  get usernameInputBox() {
    return $("#user-name");
  }
  get passwordInputBox() {
    return $("#password");
  }
  get loginBtn() {
    return $("#login-button");
  }

  /**Page Actions */
  /**
   *
   * @param testId If we will user the reporter helper tool for crashing purposes, having the
   * testID it is a great practice to trace bugs
   */
  async enterUsername(testId: string, username: string) {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username);
      reporter.addStep(
        testId,
        "info",
        `Username: ${username} entered successfully`
      );
    } catch (err) {
      err.message = `Error entering username: ${username}, ${err.message}`;
      throw err;
    }
  }
  async enterPassword(testId: string, password: string) {
    if (!password) throw Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.typeInto(await this.passwordInputBox, password);
      reporter.addStep(testId, "info", `Password entered successfully`);
    } catch (err) {
      err.message = `Error entering password, ${err.message}`;
      throw err;
    }
  }

  async clickLoginButton(testId: string) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testId, "info", "Login Button clicked successfully");
    } catch (error) {
      error.message = `Error clicking the login Button, ${error.message}`;
    }
  }

  async loginToSauseApp(testId: string, username: string, password: string) {
    try {
      await this.enterUsername(testId, username);
      await this.enterPassword(testId, password);
      await this.clickLoginButton(testId);
    } catch (err) {
      throw err;
    }
  }
}
export default new HomePage();
