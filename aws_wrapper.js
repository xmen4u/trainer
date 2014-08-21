/**
********************************************************************************************
* name:     AWS wrapper for aws-sdk @ node.js , using RDS
********************************************************************************************
* This module is responsible for AWS use configuration , especially of RDS
********************************************************************************************
* desc:   This is a simple code [can be used as a boilerplate], for using
*         do not forget to the the environment variable, rather than export them:
*         Don't hard-code your credentials!
*         Export the following environment variables instead:
*
*         export AWS_ACCESS_KEY_ID='AKID'
*         export AWS_SECRET_ACCESS_KEY='SECRET'
*         export AWS_RDS_HOST='hostname'
*         export AWS_RDS_MYSQL_USERNAME='username'
*         export AWS_RDS_MYSQL_PASSWORD='pass'
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/

var AWS = require('aws-sdk'),
    UntrainedListings = require('./untrained/untrained_listings.js'),
    mysql_host,
    mysql_username,
    mysql_password,
    rds_conf



AWS.config.region = "us-east-1"
AWS.config.apiVersions = {
    rds: '2013-09-09'
}


if (process === undefined) {
    console.error('no process found')
    return
}

mysql_host     = process.env['AWS_RDS_HOST']
mysql_username = process.env['AWS_RDS_MYSQL_USERNAME']
mysql_password = process.env['AWS_RDS_MYSQL_PASSWORD']


if (!mysql_host || !mysql_password || !mysql_username) {
    console.error('no process found')
    return
}// if - mysql login error

rds_conf = {
    host: mysql_host,
    database: "db",
    user: mysql_username,
    password: mysql_password
}
AwsWrapper = function() {
    this.rds = new AWS.RDS()

    console.log('init rds wrappers')
    this.UntrainedListings = new UntrainedListings(this.rds, rds_conf)
}
module.exports = AwsWrapper