/**
********************************************************************************************
* name:     CONSTANTS module
********************************************************************************************
* This module is responsible for AWS use configuration , especially of RDS
********************************************************************************************
* desc:   these represent the message ids to be passed between the client <-> the server, over socket.io 
*         you can add more, but consistency between the client/ server is mandatory
*         some inner application level constants may appear here as well
*         
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/
module.exports = {
    // generic strings
    CONNECTED: 'connected!',
    ERROR: 'error',
    SUCCESS: 'success',

    // rds request constants
    RDS_GET_UNTRAINED_LISTNGS_NO: 'rds_get_untrained_listings_no',
    RDS_GET_UNTRAINED_LISTNGS: 'rds_get_untrained_listings',
    RDS_UPDATE_UNTRAINED_LISTING: 'rds_update_untrained_listing'

}
