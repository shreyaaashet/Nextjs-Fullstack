import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import UserModel from '../src/models/userModel';

// Read the MongoDB URL from the environment variable
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('MongoDB URL is undefined. Please set the MONGO_URL environment variable.');
  process.exit(1); // Exit the script
}

// Connect to your MongoDB database
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    migrateData(); // Call the migration function after a successful connection
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Define the migration function
const migrateData = async () => {
  try {
    // Query for users who don't have a "password" field
    const usersToUpdate = await UserModel.find({ password: { $exists: false } });

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
      const hashedPassword = await hash(randomPassword, 10);

      // Update the user document with the new "password" field
      await UserModel.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
      console.log(`Updated user ${user._id}`);
    }

    console.log('Data migration complete');
  } catch (error) {
    console.error('Data migration error:', error);
  } finally {
    // Disconnect from the database after the migration is complete
    mongoose.disconnect();
  }
};
