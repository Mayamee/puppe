const puppeteer = require("puppeteer");
const useProxy = require("puppeteer-page-proxy");
const path = require("path");

class Puppe {
  pages = new Array();
  constructor() {
    this.currentPageIndex = 0;
    this.currentPage = null;
  }

  async launchBrowser(settings) {
    if (!settings) {
      this.launchSettings = {
        headless: false,
        slowMo: 0,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        acceptInsecureCerts: true,
        args: ["--no-sandbox"],
      };
    } else {
      this.launchSettings = settings;
    }
    this.browser = await puppeteer.launch(this.launchSettings);
  }
  async createPage(t1 = 15000, t2 = 15000, downloadPath) {
    const page = await this.browser.newPage();
    this.pages.push(page);
    await page.setDefaultTimeout(t1);
    await page.setDefaultNavigationTimeout(t2);
    if (downloadPath) {
      await this.page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: downloadPath,
      });
    }
    this.currentPageIndex++;
    return page;
  }

  async setProxy(page, proxyString) {
    await useProxy(page, proxyString);
  }
  async closeAllPages() {
    for (let i = 0; i < this.pages.length; i++) {
      await this.pages[i].close();
    }
    this.pages = new Array();
  }
  async stopBrowser() {
    await this.browser.close();
  }
}
module.exports = { Puppe };
