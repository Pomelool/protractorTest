// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],

  onPrepare: function() {
    browser.driver.get("https://vmsso.agmednet.net/sso/UI/Login?module=AGMAuth&goto=https%3A%2F%2Fvmlb.agmednet.net%3A443%2Fadminjs%2F#/trials");

    browser.driver.findElement(by.id('IDToken1')).sendKeys('admin');
    browser.driver.findElement(by.id('IDToken2')).sendKeys('Sail2Fast!');
    browser.driver.findElement(by.name('Login.Submit')).click();
  }
}