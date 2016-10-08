'use strict';

describe('Routing', function () {
  var $route, $httpBackend, LinkList, Auth, isAuth_OLD;
  beforeEach(module('shortly'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $route = $injector.get('$route');
  }));

  it('Should have /signup route, template, and controller', function () {
    expect($route.routes['/signup']).to.be.defined;
    expect($route.routes['/signup'].controller).to.equal('AuthController');
    expect($route.routes['/signup'].templateUrl).to.equal('app/auth/signup.html');
  });

  it('Should have /signin route, template, and controller', function () {
    expect($route.routes['/signin']).to.be.defined;
    expect($route.routes['/signin'].controller).to.equal('AuthController');
    expect($route.routes['/signin'].templateUrl).to.equal('app/auth/signin.html');
  });

  it('Should have /links route, template, and controller', function () {
    expect($route.routes['/links']).to.be.defined;
    expect($route.routes['/links'].controller).to.equal('LinksController');
    expect($route.routes['/links'].templateUrl).to.equal('app/links/links.html');
  });

  it('Should have /shorten route, template, and controller', function () {
    expect($route.routes['/shorten']).to.be.defined;
    expect($route.routes['/shorten'].controller).to.equal('ShortenController');
    expect($route.routes['/shorten'].templateUrl).to.equal('app/shorten/shorten.html');
  });

  // Being my tests
  it('Should require authentication for /links and /shorten', function () {
    expect($route.routes['/links'].authenticate).to.equal(true);
    expect($route.routes['/shorten'].authenticate).to.equal(true);
  });

  it('Should redirect to /links for unknown routes', function () {
    expect($route.routes['null'].redirectTo).to.equal('/links');
  });

  it('Should resolve LinkList prior to invoking the LinksController', function () {
    expect($route.routes['/links'].resolve).to.be.an('object');
    expect($route.routes['/links'].resolve.LinkList).to.be.a('function');
  });
});
