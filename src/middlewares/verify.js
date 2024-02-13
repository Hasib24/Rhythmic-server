//     //verify admin
//     const verifyAdmin = async(req, res, next)=>{
//       const email = req.query.email;
//       const admin = await usersCollection.findOne({email : email})
//       if(admin.role==='admin'){
//         next()
//       }else{
//         return res.status(401).send({error : true, message: 'UnAothorized access, not admin'})

//       }
      
//     }

//     //verify Instructor
//     const verifyInstractor = async(req, res, next)=>{
//       const email = req.query.email;
//       const instructor = await usersCollection.findOne({email : email})
//       if(instructor.role==='instractor'){
       
//         next()
//       }else{
//         return res.status(401).send({error : true, message: 'UnAothorized access, not instructor'})
//       }
//       // console.log(instructor);
//     }