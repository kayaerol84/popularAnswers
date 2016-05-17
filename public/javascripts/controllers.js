'use strict';

var app = angular.module('myApp', []);

app.controller('AnswerController', function($scope) {
    $scope.getAnswers = function() {
        $http.get('/answers').success(function() {
            // url was called successfully, do something 
            // maybe indicate in the UI that the batch file is
            // executed...
        });
    }

    $http({method: 'GET', url: '/answers'}).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available.
        console.log('todos: ', data);
    }).
    error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('Oops and error', data);
    });

});