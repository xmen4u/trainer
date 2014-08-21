/**
********************************************************************************************
* name:     main app
********************************************************************************************
* This module is angular configuration of the router and models
********************************************************************************************
* desc:   allocates the required angular sources and services, configures the main app
*         there are 2 routes that directs to the same html, for-future-usage of adding another
*         
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/
'use strict';

// modules
var myUtils = angular.module('publicApp.utils', [
]);
var myServices = angular.module('publicApp.services', [
    'publicApp.utils',
    'ngResource'
]);
var myApp = angular.module('publicApp', [
    'publicApp.utils',
    'publicApp.services',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);

// configure main app
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/listing.html',
            controller: 'RdsCtrl'
        })
        .when('/train', {
            templateUrl: 'views/listing.html',
            controller: 'RdsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
