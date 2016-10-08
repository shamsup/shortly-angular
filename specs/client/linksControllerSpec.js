'use strict';

describe('LinksController', function () {
  var $scope, $rootScope, createController, Links, $httpBackend, $route, Auth, isAuthOld;
  var mockLinks = [{}, {}, {}];
  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('shortly'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $route = $injector.get('$route');
    Links = $injector.get('Links');
    $scope = $rootScope.$new();

    // replace isAuth function to always return true.
    // This avoids complications in the httpBackend tests
    Auth = $injector.get('Auth');
    isAuthOld = Auth.isAuth;
    Auth.isAuth = function() { return true; };

    var $controller = $injector.get('$controller');
    createController = function () {
      return $controller('LinksController', {
        $scope: $scope,
        LinkList: mockLinks
      });
    };

    $httpBackend.when('GET', 'app/links/links.html').respond(200);
    $httpBackend.when('GET', '/api/links').respond(200);

  }));
  afterEach(function() {
    Auth.isAuth = isAuthOld;
  });

  it('should have a data property on the $scope', function () {
    createController();
    expect($scope.data).to.be.an('object');
  });

  it('should call `Links.getAll()` when controller is loaded', function () {
    sinon.spy(Links, 'getAll');
    $httpBackend.expectGET('/api/links').respond(200);

    createController();
    $httpBackend.flush();

    expect(Links.getAll.called).to.equal(true);
    Links.getAll.restore();
  });

  it('should populate the data property after the call to `Links.getAll()`', function () {
    $httpBackend.expectGET('/api/links').respond(mockLinks);

    createController();
    $httpBackend.flush();

    expect($scope.data.links).to.deep.equal(mockLinks);
  });
});
