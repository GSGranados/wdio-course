import { config as baseConfig } from "../wdio.conf";

export const config = Object.assign(baseConfig, {
  //ALL TEST ENV SPECIFICATIONS
  environment: "TEST",
  sauceDemoURL: "https://www.saucedemo.com",
  nopCommerceBaseURL: "https://admin-demo.nopcommerce.com",
  reqresBaseURL: "https://reqres.in",
});
