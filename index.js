const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const jwt = require('jsonwebtoken')

const { MongoClient, ServerApiVersion } = require('mongodb');

//Middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//jwt
app.post('/jwt', (req, res)=>{
  const isUser = req.body;
  const token = jwt.sign(isUser, process.env.DB_ACCESS_TOKEN_SECREAT, { expiresIn: '1h'})
  res.send(token)
  
})

const verifyJWT =(req, res, next)=>{
  const authorizatnHeader = req.headers.authorizatn;
  if(!authorizatnHeader){
     return res.status(401).send({error : true, message: 'UnAothorized access'})
  }

  const token = authorizatnHeader.split(" ")[1]
  // console.log(token);
  jwt.verify(token, process.env.DB_ACCESS_TOKEN_SECREAT, (error, decoded)=>{
      if(error){
          return  res.status(403).send({error : true, message: 'UnAothorized token'})
      }
      req.decoded = decoded;
      next()
  })
}

//MongoDB
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@cluster0.mtm85fa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //API 
    
    const usersCollection = client.db('RhythmicDB').collection('usersCollection');
    const classesCollection = client.db('RhythmicDB').collection('classesCollection');


    //Called from login page 
    app.get('/user', async(req, res)=>{
      const user = req.query
      const result = await usersCollection.findOne({email : user.email})
      res.send(result)
    })

    // Called from regester page and google login button
    app.post('/user', async(req, res)=>{
      const user = req.body;
      const isExist = await usersCollection.findOne({email : user.email})
      if(isExist){
        console.log("Already exist");
        res.send(isExist)
      }else{
        const result = await usersCollection.insertOne(user)
        if(result.acknowledged){
          console.log(result);
          res.send(user)
        }
      }
    })


    //verify admin
    const verifyAdmin = async(req, res, next)=>{
      const email = req.query.email;
      const admin = await usersCollection.findOne({email : email})
      if(admin.role==='admin'){
        next()
      }else{
        return res.status(401).send({error : true, message: 'UnAothorized access, not admin'})

      }
      
    }

    //verify Instructor
    const verifyInstractor = async(req, res, next)=>{
      const email = req.query.email;
      const instructor = await usersCollection.findOne({email : email})
      if(instructor.role==='instractor'){
       
        next()
      }else{
        return res.status(401).send({error : true, message: 'UnAothorized access, not instructor'})
      }
      // console.log(instructor);
    }


    //Called from admin penel to manage users
    app.get('/users', verifyJWT, verifyAdmin, async (req, res)=>{
      const result = await usersCollection.find().toArray()
      res.send(result)
    })

    //update user role [ From Admin panal ]
    app.patch('/usersrole', async(req, res)=>{
      const user = req.body
      const filter = { email: user.email }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          role: user.role
        }
      };
      const result = await usersCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    //add class api called from add class page of instractor dashboard
    app.post('/addaclass', verifyInstractor, async(req, res)=>{
      const classData = req.body;
      const result = await classesCollection.insertOne(classData)
      
      res.send(result)
    })

    // Called from instractor dashboard for myclasses data of instructor
    app.get('/myclasses', verifyJWT, verifyInstractor, async(req, res)=>{
      const email = req.query.email;
      const result = await classesCollection.find({email : email}).toArray()
      res.send(result)
    })

    //Callde by an admin to load all classes data
    app.get('/allclasses', verifyJWT, verifyAdmin, async(req, res)=>{
      const result = await classesCollection.find().toArray()
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Server is running at port : ${port}`)
})