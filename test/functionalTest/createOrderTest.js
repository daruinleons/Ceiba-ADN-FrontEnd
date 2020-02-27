describe('angularjs homepage todo list', function() {
  it('create order', function() {
    browser.get('http://localhost:3000/order');
    element(by.css('[href="/form-order"]')).click();
    element(by.css('#hours option:nth-child(2)')).click();
    element(by.css('#clientId option:nth-child(2)')).click();
    element(by.css('#washingMachineId option:nth-child(2)')).click();
    element(by.id('saveButton')).click();
    expect(browser.getTitle()).toEqual('Listado Ordenes');
  });
});
