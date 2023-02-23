const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://Sasha:Pass2911@cluster0.6sidyvh.mongodb.net/Cluster0?retryWrites=true&w=majority',
{useNewUrlParser: true }) 
        .then(() => {
          console.log('Connected to MongoDB');
        })
        .catch((err) => {
          console.log(err);
        });

app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true,
}));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');  
});

// async function start(){
//   try {
//      await mongoose.connect(("mongodb+srv://Sasha:Pass2911@cluster0.6sidyvh.mongodb.net/graphql-tutorial?retryWrites=true&w=majority"),{
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//      })
//       app.listen(PORT, ()=>console.log(`App has been started on port ${PORT}...`));
//   }catch (err){
//       console.log('Server error', err.message);
//       process.exit(1)
//   }
// }

// start();

// const dbConnection = mongoose.connection;
// dbConnection.on('error', err => console.log('Connection error: ${err}'));
// dbConnection.once('open', () => console.log('Connected to DB!'));