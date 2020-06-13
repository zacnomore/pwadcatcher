import { browser, by, element, promise } from 'protractor';

export class AppPage {
  navigateTo(): promise.Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  getTitleText(): promise.Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }
}
