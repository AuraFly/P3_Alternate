const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  instructorNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  phone: {
    type: String,
    require: true,
  },

  isAdmin: {
    //added 8/2 by N
    type: Boolean,
    required: true,
    default: false,
  }, 

  pic: {
    type: String,
    required: true,
    default: "https://icon-library.com/images/anonymous-avatar-icon-25.jpg",
  },
},
  {
    timestamps: true,   //to see when it was created
  }

);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if(!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // if (this.isNew || this.isModified("password")) {
  //   const saltRounds = 10;
  //   this.password = await bcrypt.hash(this.password, saltRounds);
  // }

  // next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
