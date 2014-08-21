/**
********************************************************************************************
* name:    RdsService
********************************************************************************************
* desc:    This module is responsible for incoming communication from the server (which uses RDS),
*           it binds the service with the incoming data, which will use the view controller
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/
myServices.service('RdsService', function RdsService($rootScope, Constants, SocketService) {
    var self = this
    this.listings = []

    // getting the untrained listings
    $rootScope.$on(Constants.RDS_GET_UNTRAINED_LISTNGS, function (event, data) {

        if (data && 
            data.hasOwnProperty('length') && 
            data.length > 0){
            self.listings = data
            self.listing  = data[0]
        }// if - data exist
    })

    // Getting the number of untrained listings, we bind the number of listings
    $rootScope.$on(Constants.RDS_GET_UNTRAINED_LISTNGS_NO, function (event, data) {

        if (data && !isNaN(data)){
            self.listings_no = data
            SocketService.getAllUntrainedListings()
        }// if - count
    })

    // Response of a PUT [server side] of listing update, making it trained
    $rootScope.$on(Constants.RDS_UPDATE_UNTRAINED_LISTING, function (event, data) {
        // listing was updated!
        if (data &&
            data.hasOwnProperty('sucess')){
            // if know the listing has been updated successfully!
        }// if - update

    })
})