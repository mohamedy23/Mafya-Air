
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    age:{
      type:Number,
      required:true,
      default: 0
  },
  passport:{
    type:String,
    required:true,
    default: ''
}
  },
  
  {
    timestamps: true,
  }
);

clientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Client = mongoose.model("Client", clientSchema);

module.exports= Client;
