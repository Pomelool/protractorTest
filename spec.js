// spec.js

var fs = require('fs');

var date = browser.params['date'];
fs.mkdirSync(date);

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

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('Judi Admin Page 2.0', function () {
    var EC = protractor.ExpectedConditions;
    browser.get('https://vmlb.agmednet.net/adminjs#/trials');
    it('should render the trial Page', function () {
        fs.mkdirSync(date + '/test1');
        browser.wait(EC.urlIs('https://vmlb.agmednet.net/adminjs#/trials'), 2000);
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test1/' + getTimeStr() + '.png');
        });
    });

    it('should have the correct title', function () {
        fs.mkdirSync(date + '/test2');
        browser.wait(EC.titleIs("Judi Admin Page 2.0"), 2000);
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test2/' + getTimeStr() + '.png');
        });
    });

    it('should give list of trials', function () {
        fs.mkdirSync(date + '/test3');
        let trialList = $$('trial-list a');
        browser.wait(EC.elementToBeClickable(trialList.get(0)), 2000)
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test3/' + getTimeStr() + '.png');
        });
    });

    it('should go to detail page if click link', function () {
        fs.mkdirSync(date + '/test4');
        let trialList = $$('trial-list a');

        $$('trial-list a').filter(function (elem, index) {
            return elem.getText().then(function (text) {
                return text === 'CSVSyncUnitTest';
            });
        }).first().click().then(function () {
            //more specific
            browser.wait(EC.urlContains('adminjs#/trials/ZTGH9KDP'), 2000);
        });
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test4/' + getTimeStr() + '.png');
        });
    });

    it('should give all attributes', function () {
        fs.mkdirSync(date + '/test5');
        let attrList = $$('span .label');
        expect(attrList.get(0).getText()).toEqual('Id');
        expect(attrList.get(1).getText()).toEqual('Description');
        expect(attrList.get(2).getText()).toEqual('Created');
        expect(attrList.get(3).getText()).toEqual('Updated');
        expect(attrList.get(4).getText()).toEqual('Join Code');
        expect(attrList.get(5).getText()).toEqual('Original Metadata');
        expect(attrList.get(6).getText()).toEqual('Protocol Confirmation Required');
        expect(attrList.get(7).getText()).toEqual('Cloud Domain Name');
        expect(attrList.get(8).getText()).toEqual('Cloud Enabled');
        expect(attrList.get(9).getText()).toEqual('Block Form Edits');
        expect(attrList.get(10).getText()).toEqual('Has Transmittal Form');
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test5/' + getTimeStr() + '.png');
        });
    });

    it('should go to edit page when click on edit icon', function () {
        fs.mkdirSync(date + '/test6');
        //edit later
        browser.get('https://vmlb.agmednet.net/adminjs#/trials/ZTGH9KDP/edit');
        expect($('h3').getText()).toEqual('Trial Information Edit');
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test6/' + getTimeStr() + '.png');
        });
    });

    it('should be able to give original values', function () {
        fs.mkdirSync(date + '/test7');
        let textfields = $$('mdl-textfield input');
        expect(textfields.get(1).getAttribute('value')).toEqual('CSVSyncUnitTest');
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test7/' + getTimeStr() + '.png');
        });
    });

    it('should be able to update textField value and give response', function () {
        fs.mkdirSync(date + '/test8');
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test8/' + getTimeStr() + '(before).png');
        });
        $$('mdl-textfield input').get(1).clear().then(() => {
            $$('mdl-textfield input').get(1).sendKeys('CSVSyncUnitTestModified');
        });
        $('span.mdl-button__ripple-container').click().then(() => {
            browser.wait(EC.visibilityOf($('mdl-snackbar-component')), 2000).then(() => {
                expect($('.mdl-snackbar__text').getText()).toEqual('Trial Successfully Updateds');
                //logging
                browser.takeScreenshot().then(function (png) {
                    writeScreenShot(png, date + '/test8/' + getTimeStr() + '(after).png');
                });
            });
            browser.refresh().then(() => {
                expect($$('mdl-textfield input').get(1).getAttribute('value')).toEqual('CSVSyncUnitTestModified');
            });
        });
        $$('mdl-textfield input').get(1).clear().then(() => {
            $$('mdl-textfield input').get(1).sendKeys('CSVSyncUnitTest');
        });
        $('span.mdl-button__ripple-container').click().then(() => {
            browser.wait(EC.visibilityOf($('mdl-snackbar-component')), 2000).then(() => {
                expect($('.mdl-snackbar__text').getText()).toEqual('Trial Successfully Updateds');
            });
            browser.refresh().then(() => {
                expect($$('mdl-textfield input').get(1).getAttribute('value')).toEqual('CSVSyncUnitTest');
            });
        });
    });

    it('should be able to update options', function () {
        fs.mkdirSync(date + '/test9');
        $$('mdl-select input').get(0).click().then(() => {
            browser.takeScreenshot().then(function (png) {
                writeScreenShot(png, date + '/test9/' + getTimeStr() + '(before).png');
            });
            $$('mdl-option').get(1).click().then(() => {
                $('span.mdl-button__ripple-container').click().then(() => {
                    browser.wait(EC.visibilityOf($('mdl-snackbar-component')), 2000).then(() => {
                        expect($('.mdl-snackbar__text').getText()).toEqual('Trial Successfully Updateds');
                        //logging
                        browser.takeScreenshot().then(function (png) {
                            writeScreenShot(png, date + '/test9/' + getTimeStr() + '(after).png');
                        });
                    });
                    browser.refresh().then(() => {
                        expect($$('mdl-select input').get(0).getAttribute('value')).toEqual('False');
                    });

                });
            });
        });
        $$('mdl-select input').get(0).click().then(() => {
            $$('mdl-option').get(0).click().then(() => {
                $('span.mdl-button__ripple-container').click().then(() => {
                    browser.wait(EC.visibilityOf($('mdl-snackbar-component')), 2000).then(() => {
                        expect($('.mdl-snackbar__text').getText()).toEqual('Trial Successfully Updateds');
                    });
                    browser.refresh().then(() => {
                        expect($$('mdl-select input').get(0).getAttribute('value')).toEqual('True');
                    });
                });
            });
        });
    });

    it('should be able to give error message if form is not valid', function () {
        fs.mkdirSync(date + '/test10');
        $$('mdl-textfield input').last().clear().then(() => {
            $$('mdl-textfield input').last().sendKeys('\`');
        });
        $('span.mdl-button__ripple-container').click().then(() => {
            browser.wait(EC.visibilityOf($('mdl-snackbar-component')), 2000).then(() => {
                expect($('.mdl-snackbar__text').getText()).toEqual('Failed! Doublecheck Input Please.');
                browser.takeScreenshot().then(function (png) {
                    writeScreenShot(png, date + '/test10/' + getTimeStr() + '.png');
                });
            });
            browser.refresh().then(() => {
                expect($$('mdl-textfield input').last().getAttribute('value')).not.toEqual('\`');
            });
        });
    });

    it('should have readonly fields for certain attributes', function () {
        fs.mkdirSync(date + '/test11');
        expect($$('mdl-textfield input').first().getAttribute('readonly')).toEqual('true');
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, date + '/test11/' + getTimeStr() + '.png');
        });
    });
});
