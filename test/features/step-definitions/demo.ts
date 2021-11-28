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
  await browser.waitUntil(
    async function () {
      return (
        (await browser.getTitle()) ===
        "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
      );
    },
    {
      timeout: 20000,
      interval: 500,
      timeoutMsg: "Failed loading WDIO web page",
    }
  );
  let url = await browser.getUrl();
  chai.expect(url).to.equal(expectedURL);
});
/**
 *
 * WEB INTERACTIONS
 *
 */

Given(/^A web page is opened$/, async function () {
  await browser.url("https://www.amazon.com/"); //it understands the base URL
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
   *1. assert default option is selected
   *2. Select by attribute, text. index
   *3. Get a list of option
   */
  // let selectInput = await $('//select/option[@selected="selected"]');
  // let value = await selectInput.getText();
  // chai.expect(value).to.equal("Please select an option");
  // await browser.pause(2000);
  //Select a specific option
  // let selectInput = await $("#dropdown");
  // await selectInput.selectByVisibleText("Option 2");
  // let listOfOptions = await $$('//select[@id="dropdown"]/option');
  // let valuesArray = [];
  // for (let i = 0; i < listOfOptions.length; i++) {
  //   let value = await listOfOptions[i].getText();
  //   valuesArray.push(value);
  // }
  // console.log("Options Array ->>>>", valuesArray);
  /**
   * Checkboxes
   * 1. Select an option
   * 2. Unselect an option (if selected)
   * 3. Assert if option is selected
   * 4. Select all options.
   *
   */
  // let checkboxes = await $$('//form[@id="checkboxes"]/input');
  // for (let i = 0; i < checkboxes.length; i++) {
  //   if (!(await checkboxes[i].isSelected())) {
  //     checkboxes[i].click();
  //   }
  // }
  /**
   *
   * Handling Windows
   * 1. Launch the browser.
   * 2. Open Another window
   * 3. Switch to the window based on the title
   * 4. Switch back to the main window
   *
   *
   * Methods to use
   * 1. getTitle()
   * 2. getWindowHandle()
   * 3. getWindowHandles()
   * 4. switchWindow()
   *
   */
  // await $("=Click Here").click();
  // await $("=Elemental Selenium").click();
  // let currentWindowTitle;
  // let parentWindowHandle = await browser.getWindowHandle();
  // //Switch to specific window
  // let windowHandles = await browser.getWindowHandles();
  // for (let i = 0; i < windowHandles.length; i++) {
  //   console.log("The current window handle is: ", windowHandles[i]);
  //   currentWindowTitle = await browser.getTitle();
  //   if (
  //     currentWindowTitle ===
  //     "Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro"
  //   ) {
  //     await browser.switchToWindow(windowHandles[i]);
  //     let heroTitle = await $("<h1>").getText();
  //     chai.expect(heroTitle).to.equal("Elemental Selenium");
  //     break;
  //   }
  //   //Switch to the parent window.
  //   await browser.pause(2000);
  //   await browser.switchToWindow(parentWindowHandle);
  // }
  /**
   * Alert and pop up windows
   * 1. isAlertOpen();
   * 2. acceptAlert();
   * 3. dismissAlert();
   * 4. getAlertText();
   * 5. sendAlertText();
   *
   */
  // await $("button=Click for JS Prompt").click();
  // if (await browser.isAlertOpen()) {
  //   await browser.sendAlertText("Hello JS prompt");
  //   let alertText = await browser.getAlertText();
  //   console.log(alertText);
  //   await browser.acceptAlert();
  //   await browser.pause(2000);
  // }
  /**
   * File upload
   *
   *
   */
  // await $("#file-upload").addValue(
  //   `${process.cwd()}/data/fileupload/dummy.txt`
  // );
  // await $("#file-submit").click();
  /**
   * Frames
   *
   * 1. click the iFrame Link
   * Enter the iFrame and start typing some text
   *
   *
   *
   */
  // await $("=iFrame").click();
  // let iFrame = await $("#mce_0_ifr");
  // await browser.switchToFrame(iFrame);
  // //iFrame interaction
  // await $("#tinymce").click();
  // await browser.keys(["Control", "A"]);
  // await browser.pause(2000);
  // await browser.keys("Delete");
  // await $("#tinymce").addValue("Typing into a Frame...");
  // await browser.switchToParentFrame();
  /**
   * Basic Scrolling
   * Methods: (Element Methods)
   *
   * 1. scrollIntoView();
   *
   */
  // await $("span=Shop by Category").scrollIntoView();

  /**OBTAIN THE WHOLE TABLE DATA*/

  // const rowCount = await $$('//table[@id="table1"]/tbody/tr').length;
  // chai.expect(rowCount).to.equal(4);
  // const columnCount = await $$('//table[@id="table1"]/thead/tr/th').length;
  // chai.expect(columnCount).to.equal(6);

  // let peopleArray = [];

  // for (let i = 0; i < rowCount; i++) {
  //   let personObj = {
  //     lastName: "",
  //     firstName: "",
  //     email: "",
  //     due: "",
  //     website: "",
  //   };
  //   for (let j = 0; j < columnCount; j++) {
  //     const cellValue = await $(
  //       `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
  //     ).getText();
  //     switch (j) {
  //       case 0:
  //         personObj.lastName = cellValue;
  //         break;
  //       case 1:
  //         personObj.firstName = cellValue;
  //         break;
  //       case 2:
  //         personObj.email = cellValue;
  //         break;
  //       case 3:
  //         personObj.due = cellValue;
  //         break;
  //       case 4:
  //         personObj.website = cellValue;
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  //   peopleArray.push(personObj);
  // }
  // console.log("Whole Table", JSON.stringify(peopleArray));

  /**GET A SINGLE ROW BASED ON A CONDITION */
  // const rowCount = await $$('//table[@id="table1"]/tbody/tr').length;
  // chai.expect(rowCount).to.equal(4);
  // const columnCount = await $$('//table[@id="table1"]/thead/tr/th').length;
  // chai.expect(columnCount).to.equal(6);

  // let personArray = [];

  // for (let i = 0; i < rowCount; i++) {
  //   let personObj = {
  //     lastName: "",
  //     firstName: "",
  //     email: "",
  //     due: "",
  //     website: "",
  //   };
  //   for (let j = 0; j < columnCount; j++) {
  //     const cellValue = await $(
  //       `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
  //     ).getText();
  //     const firstName = await $(
  //       `//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`
  //     ).getText();
  //     if (firstName === "Jason") {
  //       switch (j) {
  //         case 0:
  //           personObj.lastName = cellValue;
  //           break;
  //         case 1:
  //           personObj.firstName = cellValue;
  //           break;
  //         case 2:
  //           personObj.email = cellValue;
  //           break;
  //         case 3:
  //           personObj.due = cellValue;
  //           break;
  //         case 4:
  //           personObj.website = cellValue;
  //           break;

  //         default:
  //           break;
  //       }
  //     }
  //   }
  //   if (personObj.firstName) personArray.push(personObj);
  // }
  // console.log("Whole Table", JSON.stringify(personArray));

  /**GET SINGLE COLUMN */

  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let cellValue = await $(
  //     `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
  //   ).getText();
  //   arr.push(cellValue);
  // }
  // console.log(arr);

  /**GETTING ANOTHER CELL VALUE BASED ON ONE */
  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let price = await $(
  //     `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
  //   ).getText();
  //   let firstName = await $(
  //     `//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`
  //   ).getText();
  //   if (Number(price.replace("$", "")) > 50) {
  //     arr.push(firstName);
  //   }
  // }
  // console.log(arr);

  /**SCROLL INTO A SPECIFIC POSITION */

  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });

  await browser.pause(2000);

  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });

  await browser.pause(2000);
  /**Scroll To */
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await browser.pause(2000);
  /**Scroll To */
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });

  await browser.pause(3000);
});
