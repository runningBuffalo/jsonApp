var app =  angular.module('GeneApp',[]);
var testVal;

app.controller('geneResults', function($scope, $http){
    $scope.currentSorting = "Complete List";
    $scope.getAllSamples = function () {
        /**
        * Retrieve all sample files
        */

        $http({
            method: 'GET',
            url: 'api/values'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.allSamples = response.data;
            $scope.currentSorting = "Complete List";
        });
    }

    $scope.getAllSamples(); // run the function on load
    //console.log($scope.allSamples);

    $scope.getSamplesWithId = function(statusId){
        /**
        * Retrive samples with a specific status ID
        */
        $http({
            method: 'GET',
            url:'api/values/'+statusId
        }).then(function successCallback(response){
            console.log(response);
            $scope.allSamples = response.data;
            $scope.currentSorting = "Samples with Status: " + response.data[0].Status.Status1;
        });
    }

    $scope.getAllSamplesWithSameCreator = function(id){
        /**
        * Retrive all Samples created by specified user
        */
        $http({
            method: 'Get',
            url: 'api/Samples/'+id
        }).then(function successCallback(response){
            console.log(response);
            $scope.allSamples = response.data
            $scope.currentSorting = "Samples by " + response.data[0].User.FirstName + ' ' + response.data[0].User.LastName;
        });
    }

    $scope.postTest = function(){
        $http({
            method: "POST",
            url: "/api/values",
            data: JSON.stringify("Bu")
        });
    }
});