/**
********************************************************************************************
* name:     SERVER
********************************************************************************************
* This module is responsible for the server 
********************************************************************************************
* desc:   This is a simple code [can be used as a boilerplate], for using
*         Angular.js, node.js, express.js, socket.io , aws-sdk for node.js, bootstrap 
*         i've removed the pagination option of the code for this project, 
*         as it used sessions and redis as the memory datastore Wasn't need to use asynch.js /
*         streams / clustering in node.js / throwing errors / testing library for this , 
*         even though they are very important
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission
* date: aug-2014
********************************************************************************************
**/

var express = require('express'),
    app,
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    cookie = require('cookie-parser'), 
    directory = 'public/app/',
    constants = require('./constants.js'),
    aws_func = require('./aws_wrapper.js'),
    aws = new aws_func()

app = express()
app.use(cookie())


io.listen(8000) // needs a different port than server, or else no connection

io.on('connection', function (socket) {
    
    // on connect
    console.log('emitting connected!')
    socket.emit(constants.CONNECTED, constants.CONNECTED)

    // gets all untrained listings
    socket.on(constants.RDS_GET_UNTRAINED_LISTNGS, function () {
      aws.UntrainedListings.getAllUntrainedListings(socket)
    })// socket - RDS_GET_UNTRAINED_LISTNGS

    // gets the number of untrained listings
    socket.on(constants.RDS_GET_UNTRAINED_LISTNGS_NO, function () {
      aws.UntrainedListings.getAllUntrainedListingsNo(socket)
    })// socket - RDS_GET_UNTRAINED_LISTNGS_NO

    // updates an untrained listing , meaning it has been trained
    socket.on(constants.RDS_UPDATE_UNTRAINED_LISTING, function (untrained_listing_date) {
      aws.UntrainedListings.updateUntrainedListing(untrained_listing_date, socket)
    })// socket - RDS_UPDATE_UNTRAINED_LISTING

})// io - connection

app.use(express.static(directory)).listen(80)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    // res.render('error', {
    //     message: err.message,
    //     error: {}
    // })
})

console.log('Listening on port 80.')
