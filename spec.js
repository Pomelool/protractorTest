// spec.js
describe('Judi Admin Page 2.0', function () {
    var EC = protractor.ExpectedConditions;
    browser.get('https://vmlb.agmednet.net/adminjs#/trials');
    it('should render the trial Page', function () {
        browser.wait(EC.urlIs('https://vmlb.agmednet.net/adminjs#/trials'), 2000);
    });

    it('should have the correct title', function () {
        browser.wait(EC.titleIs("Judi Admin Page 2.0"), 2000);
    });

    it('should give list of trials', function () {
        let trialList = $$('trial-list a');
        browser.wait(EC.elementToBeClickable(trialList.get(0)), 2000)
    });

    it('should go to detail page if click link', function () {
        let trialList = $$('trial-list a');
        trialList.get(0).click().then(function () {
            //more specific
            browser.wait(EC.urlContains('adminjs#/trials/'), 2000);
        });
    });

    it('should give all attributes', function () {
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
    });

    it('should go to edit page when click on edit icon', function () {
        //edit later
        browser.get('https://vmlb.agmednet.net/adminjs#/trials/ZTGH9KDP/edit');
        expect($('h3').getText()).toEqual('Trial Information Edit');
    });

    it('should be able to give original values', function () {
        let textfields = $$('mdl-textfield input');
        expect(textfields.get(1).getAttribute('value')).toEqual('CSVSyncUnitTest');
    });

    it('should be able to update textField value', function () {
        $$('mdl-textfield input').get(1).clear().then(() => {
            $$('mdl-textfield input').get(1).sendKeys('CSVSyncUnitTest');
        });
        $('span.mdl-button__ripple-container').click().then(() => {
            expect($$('mdl-textfield input').get(1).getAttribute('value')).toEqual('CSVSyncUnitTest');
        });
    });
});