import { Injectable } from '@angular/core';

export class BrowsersName {
    public static IE_BROWSER = 'IE';
    public static CHROME_BROWSER = 'Chrome';
    public static FIREFOX_BROWSER = 'Firefox';
    public static SAFARI_BROWSER = 'Safari';
    public static OPERA_BROWSER = 'Opera';
}

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor() {}

    getBrowserName(): string {
      const userAgent = window.navigator.userAgent;
      const msie = userAgent.indexOf('MSIE ');
      const trident = userAgent.indexOf('Trident/');
      const edge = userAgent.indexOf('Edge/');
      if (msie > 0 || trident > 0 || edge > 0) {
        return BrowsersName.IE_BROWSER;
      }
      // Check if browser is Chrome or not
      else if (userAgent.search(BrowsersName.CHROME_BROWSER) >= 0) {
        return BrowsersName.CHROME_BROWSER;
      }
      // Check if browser is Firefox or not
      else if (navigator.userAgent.search(BrowsersName.FIREFOX_BROWSER) >= 0) {
        return BrowsersName.FIREFOX_BROWSER;
      }
      // Check if browser is Safari or not
      else if (
        navigator.userAgent.search(BrowsersName.SAFARI_BROWSER) >= 0 &&
        navigator.userAgent.search('Chrome') < 0
      ) {
        return BrowsersName.SAFARI_BROWSER;
      }
      // Check if browser is Opera or not
      else if (navigator.userAgent.search(BrowsersName.OPERA_BROWSER) >= 0) {
        return BrowsersName.OPERA_BROWSER;
      }

      return '';
    }

    isMobile(): boolean {
      if (
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      }

      return false;
    }

    isTablet(): boolean {
      if (/iPad/i.test(navigator.userAgent)) {
        return true;
      }

      return false;
    }
}
