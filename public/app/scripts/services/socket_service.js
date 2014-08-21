/**
********************************************************************************************
* name:    SocketService
********************************************************************************************
* This module is responsible for incoming/ outgoing socket.io communication and calling of 
* functions
********************************************************************************************
* desc:   anonymous function that is called, connects to the server via socket.io , to a differnt
*         port, it then initializes all the listerns of pre-set message code between the client 
*         and the server.
*         Such listerns, include: untrained listings, updating a listing and number of listings
*         as well as default messages for socket.io communication
*         
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/
myServices.service('SocketService', function SocketService($rootScope, Constants) {
    var self = this

    this.socketCon = {}

    // outbound socket.io communication - getting the untrained listings
    this.getAllUntrainedListings = function () {
        self.socketCon.emit(Constants.RDS_GET_UNTRAINED_LISTNGS)
    }

    // outbound socket.io communication - updting untrained listing, passing it
    this.updateUntrainedListing = function (listing) {
        self.socketCon.emit(Constants.RDS_UPDATE_UNTRAINED_LISTING, listing)
    }

    // outbound socket.io communication - getting the number of untrained listings
    this.getAllUntrainedListingsNo = function () {
        self.socketCon.emit(Constants.RDS_GET_UNTRAINED_LISTNGS_NO)
    }


    // Socket.io disconnect
    this.disconnect = function () {
        self.socketCon.disconnect()
    };

    // Socket.io connect
    (function () {
        // Connect to Socket.io server
        self.socketCon = io.connect('http://localhost:8000')

        // RDS_GET_UNTRAINED_LISTNGS - Icoming socket.io communication - handling untrained listings from server inside the application layer
        self.socketCon.on(Constants.RDS_GET_UNTRAINED_LISTNGS, function (data) {
            $rootScope.$broadcast(Constants.RDS_GET_UNTRAINED_LISTNGS, data)
        })

        // RDS_UPDATE_UNTRAINED_LISTING - Icoming socket.io communication - handling an updated listing action's response from server inside the application layer
        self.socketCon.on(Constants.RDS_UPDATE_UNTRAINED_LISTING, function (data) {
            $rootScope.$broadcast(Constants.RDS_UPDATE_UNTRAINED_LISTING, data)
        })

        // RDS_GET_UNTRAINED_LISTNGS_NO - Icoming socket.io communication - handling number of untrained listings, inside the application layer
        self.socketCon.on(Constants.RDS_GET_UNTRAINED_LISTNGS_NO, function (data) {
            $rootScope.$broadcast(Constants.RDS_GET_UNTRAINED_LISTNGS_NO, data)
        })

        // CONNECTED - Icoming socket.io communication - handling connection , we ask for untrained listings from server
        self.socketCon.on(Constants.CONNECTED, function () {
            //self.getAllUntrainedListings()
            $rootScope.$broadcast(Constants.CONNECTED, {})
        })

        // Disconnected 
        self.socketCon.on('end', function () {
            $rootScope.$broadcast('disconnect')
        })

        // Error occured
        self.socketCon.on('error', function () {
            $rootScope.$broadcast('disconnect')
        })

        // Reconnecting
        self.socketCon.on('reconnecting', function () {
            $rootScope.$broadcast('disconnect')
        })
        

    })();


})
