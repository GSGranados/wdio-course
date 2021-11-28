import { Given } from "@cucumber/cucumber";

Given(/^Login into inventory web app$/, async function () {
  await browser.url("https://www.saucedemo.com/");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  try {
    await $("#user-name").setValue("standard_user");
    await $("#password").setValue("secret_sauce");
    await browser.pause(1000);
    await $("#login-button").click();
  } catch (err) {
    console.log("the error in the login form is:");
    await browser.refresh(); // f you already catched the error you need to call the browser element to reload
    await browser.pause(2000);
    await $("#user-name").setValue("standard_user");
    await $("#password").setValue("secret_sauce");
    await browser.pause(1000);
    await $("#login-button").click();
  }

  /**LOGIN WITH ANOTHER USER */
  await browser.back();
  await browser.pause(2000);
  await browser.forward();
  await browser.pause(3000);
  // await browser.reloadSession(); // creates a new selenium session with your current capabilities
  // //useful with a highly stateful application and you need to clean the session for your tests.
  // await browser.url("https://www.saucedemo.com/");
  // await $("#user-name").setValue("problem_user");
  // await $("#password").setValue("secret_sauce");
  // await $("#login-button").click();
  // await browser.pause(2000);
});
