angular.module('popAnsApp').controller('questionController', function($scope, Question){
    
    $scope.questions = [];
    $scope.activeQuestion = {};
    $scope.showDetailsForm = false;
    $scope.showCreateForm = false;
    
    $scope.getAllQuestions = function() {
        Question.getAll()
         .then(function(data){$scope.questions= data;
            }, function(err){console.log('Could not load questions')});
         
        
    }
    
    $scope.getQuestion = function(id) {
        Question.get(id).then();
        
    }
    
    $scope.createQuestion = function(data) {
        Question.create(data).then();
        
        $scope.showCreateForm = true;
        
    }
    
    $scope.updateQuestion = function(question) {
        Question.update(question._id, question).then();
    }
        
    $scope.deleteQuestion = function(question) {
        Question.delete(question._id).then();
    }
    
    $scope.showDetails = function(question){
        $scope.showDetailsForm = true;
        $scope.activeQuestion = question;
    }   
        
        
});