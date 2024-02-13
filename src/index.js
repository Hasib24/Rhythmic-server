const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(express.json()); //body parser 
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));

const corsOptions ={
  origin:'*', 
  credentials:true,
  exposedHeaders: 'Authorization',
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())

require('./configs/DBConfig.js')

const AdminHandler = require('./routes/AdminHandler.js');
const UserHandler = require('./routes/UserHandler.js')
const InstructorHandler = require('./routes/InstructorHandler.js');
const CoursesHandler = require('./routes/CoursesHandler.js')

app.use("/admin", AdminHandler)
app.use("/user", UserHandler)
app.use("/instructor", InstructorHandler)
app.use("/courses", CoursesHandler)


// APIs
app.get('/', (req, res) => {
  res.send(`Express Server is Running at Port ${process.env.PORT}`);
});

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});