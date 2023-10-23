import dotenv from 'dotenv';
dotenv.config(); 
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../src/models/userModel.mjs';

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    connection.on('error', (err) => {
      console.error('Error connecting MongoDB:', err);
      process.exit(1);
    });

    const users = await User.find();

    for (const user of users) {
      if (!user.password) {
        // Generate a random password and hash it with bcrypt
        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        user.password = hashedPassword;
        await user.save();
      }
    }

    console.log('Migration completed.');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Helper function to generate a random password
function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const passwordLength = 12; // Change this to the desired password length

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

migrate();
