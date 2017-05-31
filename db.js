var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('mydb', server, {safe:true});

//连接db

function insterData(data, callback) {
    db.open(function(err, db){
      if(!err){
        console.log('connect db');
        db.createCollection('mycoll', {safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
              collection.insert(data, {safe:true},function(err,result){
                db.close();
                callback();
              });  
            }
        });
      }else{
        console.log(err);
      }
   });
}

module.exports = {
  insterData: insterData
};