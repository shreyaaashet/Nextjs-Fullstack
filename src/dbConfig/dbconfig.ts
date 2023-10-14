// in order to connect with db : 
import mongoose from 'mongoose';

export async function connect() {
  try{
    mongoose.connect(process.env.MONGO_URL!) 
    //  using typescript ! so to say its not needed IT WILL always be available 
    const connection=mongoose.connection;

    connection.on('connected',()=>{
      console.log('MongoDB connected');
    })
    connection.on('error',(err)=>{
      console.log('error connecting MongoDB');
      process.exit();
    })
    
  }catch(error){
    console.log('Error connecting to the database', error);
  }  
}