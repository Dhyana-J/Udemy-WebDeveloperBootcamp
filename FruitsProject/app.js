const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB',{useNewUrlParser:true,useUnifiedTopology:true});

const fruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"what\'s your name?"]
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:String
});

const Fruit = mongoose.model('Fruit',fruitSchema);

const fruit = new Fruit({
    name:"peach",
    rating:4,
    review:"Pretty solid as a fruit."
});

// fruit.save();

// Fruit.insertMany([],(err)=>{
//     if(err){

//     }else{

//     }
// });

Fruit.find((err,fruits)=>{
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        fruits.forEach((fruit)=>{
            console.log(fruit.name);
        });
    }
});

// Fruit.updateOne({_id:'6060756db6f9840280eb75cd'},{name:'peach'},(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully updated the document");
//     }
// })

// Fruit.deleteOne({name:'peach'},(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('good');
//     }
// });


const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favoriteFruit:fruitSchema
});

const Person = mongoose.model('Person',personSchema);

const pineapple = new Fruit({
    name:'Pineapple',
    score:9,
    review:'Great fruit'
});

const mango = new Fruit({
    name:'Mango',
    score:10,
    review:'Best fruit ever'
});

// mango.save();

Person.updateOne({name:'BaekJooboo'},{favoriteFruit:mango},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('successfully added favorite fruit!');
    }
});

const person = new Person({
    name:'Amy',
    age:12,
    favoriteFruit:pineapple
});

// person.save();

Person.find((err,people)=>{
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        people.forEach((person)=>{
            console.log(person.name);
        });
    }
});

// Person.deleteMany({name:'BaekJooboo'},(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('successfully deleted');
//     }
// });

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
      {
          name:"Apple",
          score:8,
          review:"Great Fruit"
      },
      {
          name:"Orange",
          score:10,
          review:"Fantastic Fruit"
      },
      {
          name:"Kiwi",
          score:8,
          review:"Beautiful Fruit"
      }
    ], function(err, result) {
      assert.strictEqual(err, null); 
      assert.strictEqual(3, result.result.n);
      assert.strictEqual(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }


  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.strictEqual(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }