import Page from "./page";
import reporter from "../helper/reporter";

class CustList extends Page {
  constructor() {
    super();
  }

  /**Page Objects */
  get firstNameInputBox() {
    return $("#SearchFirstName");
  }
  get lastNameInputBox() {
    return $("#SearchLastName");
  }
  get searchBtn() {
    return $("#search-customers");
  }
  get noResultsMessage() {
    return $("td=No data available in table");
  }

  async searchNameAndConfirm(
    testid: string,
    firstname: string,
    lastname: string
  ): Promise<boolean> {
    if (!firstname || !lastname)
      throw Error(
        `Invalid firstname: ${firstname} or lastname: ${lastname} to search`
      );
    let nameNoExist = false;
    firstname = firstname.trim();
    lastname = lastname.trim();
    reporter.addStep(
      testid,
      "info",
      `Searching user: ${firstname} ${lastname}`
    );
    try {
      await this.typeInto(await this.firstNameInputBox, firstname);
      await this.typeInto(await this.lastNameInputBox, lastname);
      await this.click(await this.searchBtn);
      await browser.pause(3000);
      let isNotDisplayed = await this.noResultsMessage.isDisplayed();
      if (isNotDisplayed) nameNoExist = true;
    } catch (error) {
      error.message = `Failed searching user with the given params: ${firstname} and ${lastname}, ${error.message}`;
      throw error;
    }
    return nameNoExist;
  }
}
export default new CustList();
