/**
********************************************************************************************
* name:    RdsCtrl
********************************************************************************************
* This module is responsible controlling the data model and the user interaction
********************************************************************************************
* desc:  
*         
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/

'use strict'


myApp.controller('RdsCtrl', function ($scope, SocketService, RdsService, Constants) {
    $scope.users = RdsService.users
    $scope.listing = {}
    $scope.requireId = false


    /***********************************************************************************
    *   name:   keyPressed
    *   desc:   handling keyboard interaction for fast browsing of untrained listings
    *           and training them
    ************************************************************************************
    *   in:     none
    ************************************************************************************
    *   out:    we update the DOM and updating the server, via the SocketService service
    ************************************************************************************
    */
    $scope.keyPressed = function(e) {
        var keys = {
                type: $scope.listing.type,
                lang: $scope.listing.lang
            },
            update = false

        $scope.key_code = e.which

        switch($scope.key_code ) {
            case 37: // left arrow || < || shift + <
                $scope.counter -= 1
                $scope.listing = $scope.listings[$scope.counter]
                break
            case 44: // left arrow || < || shift + <
                $scope.counter -= 1
                $scope.listing = $scope.listings[$scope.counter]
                break
            case 60: // left arrow || < || shift + <
                $scope.counter -= 1
                $scope.listing = $scope.listings[$scope.counter]
                break
            case 39: // right arrow || > || shift + >
                $scope.counter++
                $scope.listing = $scope.listings[$scope.counter]
                break
            case 46: // right arrow || > || shift + >
                $scope.counter++
                $scope.listing = $scope.listings[$scope.counter]
                break
            case 62: // right arrow || > || shift + >
                $scope.counter++
                $scope.listing = $scope.listings[$scope.counter]
                break
            // TYPE
            case 48: // 0 - sublet
                keys.type = 1        
                update    = true
                break
            case 49: // 1 - rent
                keys.type = 2        
                update    = true     
                break
            case 50: // 2 - buy
                keys.type = 3        
                update    = true     
                break
            case 51: // 3 - spam
                keys.type = 4        
                update    = true     
                break
            // LANGUAGE
            case 101: // e - english
                keys.lang = 1        
                update    = true     
                break
            case 104: // h - hebrew
                keys.lang = 2        
                update    = true     
                break
            default:
        }

        // 
        if (update){

            SocketService.updateUntrainedListing({
                id: $scope.listing.id,
                type: keys.type,
                lang: keys.lang
            })
        }// if - update

        $scope.$apply()
    }

    /***********************************************************************************
    *   name:   RDS_UPDATE_UNTRAINED_LISTING
    *   desc:   handling keyboard interaction for fast browsing of untrained listings
    *           and training them
    ************************************************************************************
    *   in:     a JSON with a "success" / "error" property
    ************************************************************************************
    *   out:    we update the DOM 
    ************************************************************************************
    */
    $scope.$on(Constants.RDS_UPDATE_UNTRAINED_LISTING, function (event, data) {
        $scope.$apply(function () {
            // we update the DOM by messaging a toast, that the listing has been update 
            // haven't implemented [yet]
        })
    })

    /***********************************************************************************
    *   name:   RDS_GET_UNTRAINED_LISTNGS
    *   desc:   receiving untrained listings and updating the DOM and the interal model
    ************************************************************************************
    *   in:     none
    ************************************************************************************
    *   out:    we update the DOM and internal model
    ************************************************************************************
    */
    $scope.$on(Constants.RDS_GET_UNTRAINED_LISTNGS, function (event, data) {
        $scope.$apply(function () {
            $scope.listings = RdsService.listings
            $scope.listing  = RdsService.listing
            $scope.counter  = 0
            console.log(Constants.RDS_GET_UNTRAINED_LISTNGS, $scope.listing)
        })
    })

    /***********************************************************************************
    *   name:   RDS_GET_UNTRAINED_LISTNGS_NO
    *   desc:   receiving number of untrained listings and updating the DOM and the 
    *           interal model
    ************************************************************************************
    *   in:     none
    ************************************************************************************
    *   out:    we update the DOM and internal model 
    ************************************************************************************
    */
    $scope.$on(Constants.RDS_GET_UNTRAINED_LISTNGS_NO, function (event, data) {
        $scope.$apply(function () {
            $scope.listings_no = RdsService.listings_no
        })
    })

    /***********************************************************************************
    *   name:   updateUntrainedListing
    *   desc:   updating the server with the user input
    ************************************************************************************
    *   in:     user id, name, email
    ************************************************************************************
    *   out:    we update the DOM and internal model 
    ************************************************************************************
    */
    $scope.updateUntrainedListing = function () {
        SocketService.updateUntrainedListing({id: parseInt($scope.newUser.id), name: $scope.newUser.name, email: $scope.newUser.email})
        $scope.listing = {}
    }

    /***********************************************************************************
    *   name:   CONNECTED
    *   desc:   after we're connected to the server via socket.io we ask fo the untrained listings no
    *           and the untrained listings in general
    ************************************************************************************
    *   in:     none
    ************************************************************************************
    *   out:    we update the DOM 
    ************************************************************************************
    */
    $scope.$on(Constants.CONNECTED, function (event, data) {
        $scope.$apply(function () {
            SocketService.getAllUntrainedListingsNo()
        })
    })
})




