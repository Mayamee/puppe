const { Puppe } = require("./modules/puppe");
const [userAgents, genAgent] = require("./modules/userAgents");

const listener = new Puppe();

(async () => {
  await listener.launchBrowser();
  const page_1 = await listener.createPage(50000, 50000);
  // await page_1.setUserAgent(agent);
  // const userAgent = await page_1.evaluate(() => navigator.userAgent);
  // console.log(userAgent);
  await listener.stopBrowser();
})();

//https://filipvitas.medium.com/how-to-set-user-agent-header-with-puppeteer-js-and-not-fail-28c7a02165da
//https://dev.to/sonyarianto/user-agent-string-difference-in-puppeteer-headless-and-headful-4aoh
//https://github.com/Cuadrix/puppeteer-page-proxy
//https://stackoverflow.com/questions/52777757/how-to-use-proxy-in-puppeteer-and-headless-chrome
