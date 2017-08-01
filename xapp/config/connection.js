var mongoClient= require('mongodb').MongoClient,
 	assert= require('assert');
var dburl="mongodb://localhost:27017/rnsdb"
 var connect=function(callback){
 	mongoClient.connect(dburl,function(err,db){
 		if(err){
 			callback(err,null);
 		}
 		else{
 			callback(null,db);
 		}
 	})
 }

 module.exports.connect = connect;

 // ******* adeysarkar version***************
//  var mongoClient= require('mongodb').MongoClient,
// 	assert= require('assert');

// var localDB='mongodb://localhost:27017/testDB';

// var connect = function(callback){
// 	mongoClient.connect(localDB, function(err, db){
// 		if(err){
// 			callback(err,null);
// 		}
// 		else{
// 			callback(null, db);
// 		}
// 	});
// };

// module.exports.connect=connect;