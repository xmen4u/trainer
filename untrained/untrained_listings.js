/**
********************************************************************************************
* name:     Untrained listings module 
********************************************************************************************
* This module is responsible for handling untrained listings off RDS
********************************************************************************************
* desc:     from connecting to AWS RDS, to querying the untrained listings / their number 
*           or updating [binded to the angular.js part] of the model, which is the listings
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/
var constants = require('../constants'),
    mysql = require('mysql')


UntrainedListings = function (rds, conf) {
    this.rds        = rds
    this.connection = mysql.createConnection(conf)
    var self = this

    this.connection.connect(function(err){
        if (err)
            console.error("couldn't connect",err)
        else
            console.log("mysql connected")
    })
    
    /************************************************************************
    *   name:   getAllUntrainedListings
    *   desc:   queries all the untrained listings to be returned to the client
    *           pagination capabilities were removed as they used sessions and i 
    *           removed the memory data store code [redis], so only the 1st 100 listings
    *           will be fetched
    *************************************************************************
    *   in:     should be pagination capabilities , page number
    *************************************************************************
    *   out:    the untrained listings 
    *************************************************************************
    */
    this.getAllUntrainedListings = function(socket){
       var query = this.connection.query("SELECT DISTINCT orig_post, id, lang, type FROM db.listings WHERE orig_post REGEXP '^[A-Za-z]' AND trained=0 LIMIT 0,100;", function(err,result){

            if (err){
                console.error("failed to get",err)
                socket.emit(constants.RDS_GET_UNTRAINED_LISTNGS, constants.ERROR)
            }// if - err
            else {
                socket.emit(constants.RDS_GET_UNTRAINED_LISTNGS, result)
            }// else - err
        }) // query
    } // getAllUntrainedListings

    /************************************************************************
    *   name:   getAllUntrainedListingsNo
    *   desc:   selects the number of untrained lisitngs
    *************************************************************************
    *   in:     none
    *************************************************************************
    *   out:    the number of untrained listings
    *************************************************************************
    */
    this.getAllUntrainedListingsNo = function(socket){
        var query = this.connection.query("SELECT COUNT(1) as count FROM db.listings WHERE orig_post REGEXP '^[A-Za-z]' AND trained=0 LIMIT 1000;", function(err,result){
        
            if (err){
                console.error("failed to get",err)

                // throw new Error('failed to get')
                socket.emit(constants.RDS_GET_UNTRAINED_LISTNGS_NO, constants.ERROR)
            } 
            else {
                if (result.length  === 1){
                    socket.emit(constants.RDS_GET_UNTRAINED_LISTNGS_NO, result[0].count)
                } // if - length
            }// else
        })// query
    }// getAllUntrainedListingsNo


    /************************************************************************
    *   name:   updateUntrainedListing
    *   desc:   updates the listing with the trained data
    *************************************************************************
    *   in:     @listing_trained_data  object
    *************************************************************************
    *   out:    updates the client with the result listing
    *************************************************************************
    */
    this.updateUntrainedListing = function(listing_trained_data, socket){
        var lang = listing_trained_data.lang,
            type = listing_trained_data.type,
            id   = listing_trained_data.id,
            query = this.connection.query('UPDATE db.listings SET lang=?,type=? WHERE post_id=?', [lang,type,id], function(err, result) {

            if (err) {
                console.error("failed to insert",err)
                
                socket.emit(constants.RDS_UPDATE_UNTRAINED_LISTING, constants.ERROR)    
            }// if - err 
            else {
                socket.emit(constants.RDS_UPDATE_UNTRAINED_LISTING, result)
            }// else - err
        })// query
    } // updateUntrainedListing

}// UntrainedListings

module.exports = UntrainedListings