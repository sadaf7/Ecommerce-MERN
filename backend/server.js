const app = require('./app');
const dotenv = require('dotenv')
const connectToMongo = require('./config/db')
const cloudinary = require('cloudinary')


// config
// dotenv.config({path:"backend/config/config.env"})

// handling uncaught exception
process.on('uncaughtException',(err)=>{
  console.log(`Error ${err.message}`)
  console.log("server shutting down due to uncaught exception")
  process.exit(1)
})

const port =  5000;
connectToMongo();

cloudinary.config({
  cloud_name: 'dmumjlve0',
  api_key: 794342829319348,
  api_secret: process.env.CLOUDINARY_API_SECRET,

})

const server = app.listen(port, () => {
    console.log(` App started on port ${port}`);
})

// unhandled promise rejection
process.on('unhandledRejection',(err)=>{
  console.log(`Error ${err.message}`)
  console.log("server shutting down due to unhandled promise rejection")

  server.close(()=>{
    process.exit(1)
  })
})