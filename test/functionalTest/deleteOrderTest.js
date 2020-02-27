describe('angularjs homepage todo list', function() {
  it('create order', function() {
    browser.get('http://localhost:3000/order');
    element(by.className('delete-button')).click();
    element(by.className('swal-button--danger')).click();
    expect(browser.getTitle()).toEqual('Listado Ordenes');
  });
});
