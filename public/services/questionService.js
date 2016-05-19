angular.module('QuestionService',[]).factory('Question', ['$http','$q', function($http, $q) {
    return {
        getAll:function() {
            var deferred = $q.defer();
            $http.get('api/questions')
            .success(function(data){
                console.log(data);
                deferred.resolve(data);
                })
            .error(function(err){
                console.log(err);
                deferred.resolve(err);
                });
            return deferred.promise;
        },
        get:function(id){
            var deferred = $q.defer();
            $http.get('api/questions' +id)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.resolve(err);
            });
            return deferred.promise;
        },
        create:function(questionData){
            var deferred = $q.defer();
            $http.post('api/questions', questionData)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.resolve(err);
            });
            return deferred.promise;
        },
        update:function(id, questionData){
            var deferred = $q.defer();
            $http.put('api/questions' +id, questionData)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.resolve(err);
            });
            return deferred.promise;
        },
        del:function(id){
            var deferred = $q.defer();
            $http.delete('api/questions' +id)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.resolve(err);
            });
            return deferred.promise;
        }

    } 

}]);