import mongoose from 'mongoose';
// import User from "@/models/userModel";
import User from '../src/models/userModel.js';

import bcrypt from 'bcryptjs';
// Load environment variables from a .env file 
require('dotenv').config();

// Connect to your MongoDB database
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

// Define the migration function
const migrateData = async () => {
  try {
    // Query for users who don't have a "password" field 
    const usersToUpdate = await User.find({ password: { $exists: false } });

     // Generate a random password for users during the migration
     const generateRandomPassword = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      for (let i = 0; i < 8; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return password;
    };


    for (const user of usersToUpdate) {
      
      const randomPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user.password = hashedPassword;
      await user.save();
      console.log(`Updated user ${user._id}`);
    }

    console.log('Data migration complete');
  } catch (error) {
    console.error('Data migration error:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Call the migration function to start the migration process
migrateData();

