var express = require('express');
var router = express.Router();
var con = require('../config/connection');
var ObjectId = require('mongodb').ObjectId;

router.post('/create',function(req,res){
	var obj=req.body;
	console.log('payment insert object......');
	console.log(obj);
	var id=obj._id;
	var year= new Date(obj.doc).getFullYear();
	con.connect(function(err,db){
		if(err){
			res.json({error:'db is not fetched'});
		}
		else{
			db.collection('payment').insertOne({consumerid:id,year:year,payments:[]},function(err,result){
				if(err){
					res.json({error:'err while creating doc'});
				}
				else{
					test();
					res.json({message:'payement a/c for '+obj._id+' of the year '+obj.year+' has been created successfully'});
				}
			});
		}
	});
});


function test(){
 console.log('hey i am a test function');
};

router.post('/showPaymentForYear',function(req,res){
	var obj=req.body;
	console.log("recieving json");
	console.log(obj)
	con.connect(function(err,db){
		if(err){
			res.json({error:"DB ERROR"});
		}
		else{
			db.collection('payment').findOne({$and:[{_id:ObjectId(obj._id)},{year:obj.year.toString()}]},function(err,doc){
				if(err){
					res.json({error:'error occurred during reading document'});
				}
				else{
					res.json(doc);
					console.log(doc);
				}
			});
		}
		db.close();
	});
});



router.post('/update',function(req,res){
	var obj=Object.assign({},req.body);
	var id=req.body._id;
	var year=new Date(obj.dop).getFullYear();
	var month=new Date(obj.dop).getMonth();
	//delete obj._id;
	console.log(obj);
	con.connect(function(err,db){
		if(err){
			res.json({error:"Db error"});
		}
		else{
			
			db.collection('payment').updateOne({"_id.id":id,"_id.year":year,"payments.$":month},{$addToSet:{payments:{'month':month,'amount':obj.amount,'dop':obj.dop}}},function(err,result){
				if(err){
					res.json({message:"update error"});
				}
				else{
					res.json({message:id+" has been updated successfully."});
				}
				db.close();
			});
		}
	});

router.post('/deletePayment',function(req,res){
		var obj=req.body;
		console.log("deleting");
		console.log(obj);
		con.connect(function(err,db){
			if(err){
				res.json({error:"Connection Error"});
			}
			else{
				db.collection('payment').deleteOne({_id:ObjectId(obj._id)},function(err,result){
					if(err){
						res.json({error:'Error occurred during delete operation'});
					}
					else{
						res.json({message:obj._id+" has been succesfully deleted"});
					}
				});
			}
			db.close();
		});
	});

	

});

module.exports=router;