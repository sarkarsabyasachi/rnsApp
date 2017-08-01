var express = require('express');
var router = express.Router();
var con = require('../config/connection');
var ObjectId = require('mongodb').ObjectId;

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

router.post('/create',function(req,res){
	var obj=req.body;
	console.log(obj);
	console.log("requesting object");
	console.log(req);
	var updateData={_id:ObjectId(obj._id)};
	con.connect(function(err,db){
		if(err){
			res.json({error:"DB ERROR"});
		}
		else{
			db.collection('payment').insertOne(updateData,function(err,result){
				if(err){
					res.json({error:'DBERR'});
				}
				else{
					res.json({message:"payment account for "+obj._id+' has been successfully created'})
				}
			});
		}
		db.close();
	});
});

router.post('/update',function(req,res){
	var obj=Object.assign({},req.body);
	var id=req.body._id;
	delete obj._id;
	con.connect(function(err,db){
		if(err){
			res.json({error:"Db error"});
		}
		else{
			var year=new Date(obj.dop).getFullYear();
			var month=new Date(obj.dop).getMonth();
			console.log("year : "+year);
			console.log("month : "+month);
			switch(month){
					case 0 : 
					updateData={year:year.toString(),m1:obj.amount};
					break;
					case 1 : 
					updateData={year:year.toString(),m2:obj.amount};
					break;
					case 2 : 
					updateData={year:year.toString(),m3:obj.amount};
					break;
					case 3 : 
					updateData={year:year.toString(),m4:obj.amount};
					break;
					case 4 : 
					updateData={year:year.toString(),m5:obj.amount};
					break;
					case 5 : 
					updateData={year:year.toString(),m6:obj.amount};
					break;
					case 6 : 
					updateData={year:year.toString(),m7:obj.amount};
					break;
					case 7 : 
					updateData={year:year.toString(),m8:obj.amount};
					break;
					case 8 : 
					updateData={year:year.toString(),m9:obj.amount};
					break;
					case 9 : 
					updateData={year:year.toString(),m10:obj.amount};
					break;
					case 10 : 
					updateData={year:year.toString(),m11:obj.amount};
					break;
					case 11 : 
					updateData={year:year.toString(),m12:obj.amount};
					break;
			}
			db.collection('payment').updateOne({_id:ObjectId(id)},{$set:updateData},function(err,result){
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