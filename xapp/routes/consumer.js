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
  //obj.payments={year:new Date(obj.doc).getFullYear().toString()};
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



module.exports = router;