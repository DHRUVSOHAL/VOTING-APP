const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true},
    mobile:{type:String,unique:true},
    gender:{type:String,required:true,enum:['M','F','other']},
    address:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    aadharCardNumber:{type:Number,required:true,unique:true},
    role:{type:String,required:true,enum:['voter','admin'],default:'voter'},
    isVoted:{type:Boolean,default:false}
});
userSchema.pre('save', async function () {//next is not defined because arrow function not used
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const user=this;
        const isMatch=await bcrypt.compare(candidatePassword,user.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const User=mongoose.model('User',userSchema);
module.exports=User;