Trainer using Angular.js, Express.js, Socket.io, bootstrap.js,  AWS-sdk node.js RDS 
====================

This project's is a simple, usage of various technologies. 
There haven't been testing added [yet] as it's an internal application on the go, 
that show case coding style, usage of angular.js, socket.io, bower, bootstrap.js, aws-sdk, node.js
no fancy UI, but it should give you a nice clue to the boilerplate i used.

You [currently] won't find here any:
node.js 's cluster / streams / async.js [or other] / error handling / tests , even though they are important
this is a simple project to show case [and do work] of the style, integration of this type of stack and my code conventions

ToC
---------------------

1. [RDS](#rds)
1. [AngularJS](#angularjs)
1. [EC2 / EBS](#ec2_deploy)


<a name="rds">RDS</a>
---------------------

i used RDS for storing the table with the listings, 

<a name="angularjs">AngularJS</a>
---------------------

The AngularJS Code is pretty simple, it uses socket.io connection to communicate with the server. 
It asks for new untrained listings, allows user keyboard input for fast training and updates the server.

<a name="ec2_deploy">EC2 deployment</a>
---------------------

Make sure that the node.js version is set correctly

You'll need to set up the environment variables: 
 * AWS_ACCESS_KEY_ID
 * AWS_SECRET_ACCESS_KEY
 * AWS_RDS_HOST
 * AWS_RDS_MYSQL_USERNAME
 * AWS_RDS_MYSQL_PASSWORD

You can acheive this by using:
<pre>
export AWS_ACCESS_KEY_ID='AKID'
export AWS_SECRET_ACCESS_KEY='SECRET'
export AWS_RDS_HOST='hostname'
export AWS_RDS_MYSQL_USERNAME='username'
export AWS_RDS_MYSQL_PASSWORD='pass'
</pre>
