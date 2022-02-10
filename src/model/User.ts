import mongoose, { Document, Model, model } from 'mongoose';
import validator from 'validator';
import constants from '../utils/constants';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { required } from 'joi';


export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  createPasswordResetToken(): string;
}

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Email is invalid']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        select: false,
    }, 
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },

}, { timestamps: true });


//hash the password then save to database.
userSchema.pre('save', async function (next) {
    //This would run only is password is actually modified
    const user = this as UserDocument;
    if (!user.isModified('password')) {
      return next();
    }
  
    user.password = await bcrypt.hash(user.password, 12);
  
    user.passwordConfirm = null;
    next();
  });
  
  //generate a random token. send it to user, hash it then store in database.
  userSchema.methods.createPasswordResetToken = function (): string {
    const token = crypto.randomBytes(16).toString('hex');
  
    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  
    this.passwordResetExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);
  
    return token;
  };

  const User = model<UserDocument>("User", userSchema);
  
  export default User;