// conf.js
let currentTime = getTimeStr();

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  resultJsonOutputFile: currentTime + '/summary.txt',
 
  onPrepare: function() {
    browser.params['date'] = currentTime;
    browser.driver.get("https://vmsso.agmednet.net/sso/UI/Login?module=AGMAuth&goto=https%3A%2F%2Fvmlb.agmednet.net%3A443%2Fadminjs%2F#/trials");
    browser.driver.findElement(by.id('IDToken1')).sendKeys('admin');
    browser.driver.findElement(by.id('IDToken2')).sendKeys('Sail2Fast!');
    browser.driver.findElement(by.name('Login.Submit')).click();
  }
}

function getTimeStr() {
    var now = new Date();
    var mm = now.getMonth() + 1;
    var hh = now.getHours();
    var ii = now.getMinutes();
    var ss = now.getSeconds();
    var dd = now.getDate();
    if (mm < 10) {
        mm = '0' + mm
    }
    if (dd < 10) {
        dd = '0' + dd
    }
    if (hh < 10) {
        hh = '0' + hh
    }
    if (ii < 10) {
        ii = '0' + ii
    }
    if (ss < 10) {
        ss = '0' + ss
    }
    var date = [now.getFullYear(), '-', mm, '-', dd, '--', hh, '-', ii, '-', ss].join('');
    return date;
}