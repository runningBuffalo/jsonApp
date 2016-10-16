/**
* Author: George Heron
* Origination Date: October 13, 2016
* Version: Alpha (1)
*
* Domain: http://www.gheron.com
*
* Global interactivity functions
* Dependencies:
				jQuery,
                Angular,
* Target: Modern Browsers with HTML5 and CSS3 support
*/
var app =  angular.module('GeneApp',[]);

app.controller('geneResults', function($scope, $http){
    /**
     * Create a 1 page app that serves Sample information to user
     */

    //Set default values
    $scope.currentSorting = "Complete List";
    $scope.searchTerm = "";
    $scope.addNewBoxVisibility = false;
    $scope.newSample = {Barcode : "",StatusId : "", CreatedBy : ""};
    $scope.sortValue ={StatusId:0, CreatedBy:0};

    $scope.sortType     = 'Barcode'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term

    $scope.getAllSamples = function () {
        /**
        * 1. Output all samples, their status, and the name of the user that created them.
        */

        $http({
            method: 'GET',
            url: 'api/values'
        }).then(function successCallback(response) {
            $scope.allSamples = response.data;
            $scope.currentSorting = "Complete List";
            $scope.searchTerm = "";
        });
    }

    $scope.getStaus = function(statusId){
        /**
        * 2. Output all samples with a given status.
        */
        $http({
            method: 'GET',
            url:'api/Status'
        }).then(function successCallback(response){
            $scope.statusValues = response.data;
        });
    }
    $scope.getUsers = function(statusId){
        /**
        * 2. Output all samples with a given status.
        */
        $http({
            method: 'GET',
            url:'api/Users'
        }).then(function successCallback(response){
            $scope.userList = response.data;
        });
    }
    $scope.getSamplesWithId = function(statusId){
        /**
        * 2. Output all samples with a given status.
        */
        $http({
            method: 'GET',
            url:'api/values/'+statusId
        }).then(function successCallback(response){
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
            $scope.allSamples = response.data
            $scope.currentSorting = "Samples by " + response.data[0].User.FirstName + ' ' + response.data[0].User.LastName;
        });
    }

    $scope.searchByCeartor = function(){
        /**
        *  3.Output all samples created by any user that contains a given string in their name. 
        */
        $http({
            method: "GET",
            url: "api/Search/" + $scope.searchTerm
        }).then(function successCallback(response){
            $scope.allSamples = response.data
            $scope.currentSorting = "Searching Creatore that contain " + $scope.searchTerm
        });
    }
    $scope.addNewSample = function(){
        /**
        * 4. Create a new sample with associated status and user. Return HTTP OK or an error. 
        */
        var myObject = {
                Barcode : $scope.newSample.Barcode,
                CreatedBy : $scope.newSample.CreatedBy,
                SampleId : null,
                Status : null,
                StatusId : $scope.newSample.StatusId,
                User : null
            };
        $http({
            method: "POST",
            url: "api/Samples/",
            data: myObject
        }).then(function successCallback(response){
            //$scope.allSamples = response.data
            $scope.getAllSamples();
            alert("New record has been added");
        },function errorCallback(response){
            alert("Your record couldn't be saved")
        });
        $scope.addNewBoxVisibility = false;
        $scope.addButtonSisibility = false;
        $scope.editButtonVisibility = false;
    }
    $scope.openAddNewWindow = function(){
        /**
         * Control the visibilty options of edit window
         */
        // Clear values if any
        $scope.editID = null;
        $scope.newSample.Barcode = null;
        $scope.newSample.CreatedBy = null;
        $scope.newSample.StatusId = null;
        $scope.addNewBoxVisibility = true; // Open pop up window
        $scope.editButtonVisibility = false;// Hide button that edits an existing record
        $scope.addButtonVisibility = true;// Show button that allow user to save new record
    }
    $scope.openEditWindow = function(id,Barcode,CreatedBy,StatusId){
        /**
         * Control the visibilty options of edit window
         */
        // Take the values from the selected row
        $scope.editID = id;
        $scope.newSample.Barcode = Barcode;
        $scope.newSample.CreatedBy = CreatedBy;
        $scope.newSample.StatusId = StatusId;
        $scope.addNewBoxVisibility = true; // Open pop up window
        $scope.editButtonVisibility = true; // Show button that edits existing record
        $scope.addButtonVisibility = false; // edit button that saves new record
    }
    
    $scope.editSample = function(){
        /**
        * 4. Edit selected sample. 
        */
        var myObject = {
            Barcode : $scope.newSample.Barcode,
            CreatedBy : $scope.newSample.CreatedBy,
            SampleId : $scope.editID,
            Status : null,
            StatusId : $scope.newSample.StatusId,
            User : null
        };
        $http({
            method: "PUT",
            url: "api/Samples/" + $scope.editID,
            data: myObject
        }).then(function successCallback(response){
            //$scope.allSamples = response.data
            $scope.getAllSamples();
            alert("New record has been edited");
        },function errorCallback(response){
            alert("Your record edits couldn't be saved")
        });
        $scope.addNewBoxVisibility = false;
    }
    $scope.deleteSelectedSample = function(id){
        /**
        * 5. Delete Selected sample sample with associated status and user. Return HTTP OK or an error. 
        */
        $http({
            method: "DELETE",
            url: "api/Samples/" + id
        }).then(function successCallback(response){
            $scope.getAllSamples();
            //alert("New record has been added");
        },function errorCallback(response){
            alert("Your record couldn't be saved")
        });
    }
    // Run the function on load
    $scope.getAllSamples(); 
    $scope.getStaus();
    $scope.getUsers();
});