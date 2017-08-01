var express = require("express");
var router = express.Router();
var con = require("../config/connection");
var ObjectId = require("mongodb").ObjectId;

// router.get("/consumers",function(req,res){
// 	res.json({consumer:[{fname:"Rabindranath",lname:"Sarkar",address:"sarkar para"}]});
// });


router.get("/showallconsumers",function(req,res){
	con.connect(function(err,db){
		if(err){
			res.json({error:"Connection to Mongodb has been lost"});
		}
		else{
			db.collection("consumer").find().toArray(function(err,docs){
				if(err){
					res.json({error:"Error occurred during reading docs"});
				}
				else{
					res.json(docs);
				}
			});
			db.close();
		}
	});
});

router.post('/create', function(req, res){
  var obj= req.body;
  obj.payments={year:new Date(obj.doc).getFullYear().toString()};
  console.log(obj);
  con.connect(function(err, db){
    if(err){
      console.log('Connection failed');
      console.log(err);
      res.status(500).json({error:'DB connection failed'});
    }
    else{
      db.collection('consumer').insertOne(obj, function(err, result){
        if(err){
          console.log('Insertion error');
          console.log(err);
          res.status(500).json({error:'DB erro in adding new user'});
        }
        else{
          //console.log(result);
          res.status(200).json(obj);

        }
        //Close the connection
        db.close();
      });

    }
  });
});

router.post('/delete',function(req,res){
	var obj=req.body;
	console.log(obj);
	con.connect(function(err,db){
		if(err){
			res.json({error:"DB err "});
		}
		else{
			db.collection('consumer').deleteOne({_id:ObjectId(obj._id)},function(err,doc){
				if(err){
					res.json({error:"Error occurred"});
				}
				else{
					res.json({message:obj._id+" has been successfully deleted"});
					
				}

			});
			

		}
		db.close();
	});
});

router.get('/showConsumer/:id',function(req,res){
	con.connect(function(err,db){
		if(err){
			res.json(err);
		}
		else{
			var id=
			db.collection('consumer').findOne({_id:ObjectId(req.params.id)},function(err,doc){
				if(err){
					res.json(err);
					console.log(err);
				}
				else{
					res.json(doc);
					console.log(doc);
				}
			})
		}
		db.close();
	});
});

router.post("/updateConsumer",function(req,res){
	var obj=Object.assign({},req.body);
	//var id=obj._id;
	delete obj._id;
	console.log(obj);
	console.log(req.body);

	con.connect(function(err,db){
		if(err){
			res.json(err);
		}
		else{
			db.collection('consumer').updateOne({'_id':ObjectId(req.body._id)},{$set:obj},function(err,doc){
				if(err){
					res.json(err);
					console.log(err);
				}
				else{
					res.json(doc);
					console.log(doc);
				}
			})
		}
		db.close();
	});
});

router.post('/updatePayment',function(req,res){
	var obj=Object.assign({},req.body);
	var id=obj._id;
	delete obj._id;
	var updateData={};
	console.log("UPDATE DATA########################");
	console.log(obj);
	con.connect(function(err,db){
		if(err){
			res.json({error:"DB ERR"});
		}
		else{
			var year = new Date(obj.dop).getFullYear();
			var month = new Date(obj.dop).getMonth();
			console.log("YEAR");
			console.log(year);
			console.log("MONTH");
			console.log(month);
			switch(month){
					case 0 : 
					updateData.year=year.toString();
					updateData.payments[0].m1=obj.amount;
					break;
					case 1 : 
					updateData.year=year.toString();
					updateData.payments[1].m2=obj.amount;
					break;
					case 2 : 
					updateData.year=year.toString();
					updateData.payments[2].m3=obj.amount;
					break;
					case 3 : 
					updateData.year=year.toString();
					updateData.payments[3].m4=obj.amount;
					break;
					case 4 : 
					updateData.year=year.toString();
					updateData.payments[4].m5=obj.amount;
					break;
					case 5 : 
					updateData.year=year.toString();
					updateData.payments[5].m6=obj.amount;
					break;
					case 6 : 
					updateData.year=year.toString();
					updateData.payments[6].m7=obj.amount;
					break;
					case 7 : 
					updateData.year=year.toString();
					updateData.payments[7].m8=obj.amount;
					break;
					case 8 : 
					updateData.year=year.toString();
					updateData.payments[8].m9=obj.amount;
					break;
					case 9 : 
					updateData.year=year.toString();
					updateData.payments[9].m10=obj.amount;
					break;
					case 10 : 
					updateData.year=year.toString();
					updateData.payments[10].m11=obj.amount;
					break;
					case 11 : 
					updateData.year=year.toString();
					updateData.payments[11].m12=obj.amount;
					break;
			}
			console.log("UPDATE DATA payments########################");
			console.log(updateData);
			db.collection('consumer').updateOne({'_id':ObjectId(id)},{$set:{payments:updateData}},function(err,doc){
				if(err){
					res.json({error:"error during update"});
				}
				else{
					res.json({message:"successfully done"});
				}
			});
		}
	});

	router.post('/showPaymentForYear',function(req,res){
		var obj=req.body;
		console.log("recieving json");
		console.log(obj)
		con.connect(function(err,db){
			if(err){
				res.json({error:"DB ERROR"});
			}
			else{
				db.collection('consumer').findOne({$and:[{'_id':ObjectId(obj._id)},{'payments.year':obj.year.toString()}]},function(err,doc){
					if(err){
						res.json({error:'error occurred during reading document'});
					}
					else{
						res.json(doc);
					}
				});
			}
			db.close();
		});
	});
});

module.exports = router;