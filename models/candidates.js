const mongoose = require('mongoose');
const candidateSchema =  new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    candidateId:{type:String,required:true,unique:true},
    party:{type:String,required:true},
    gender:{type:String,required:true,enum:['M','F','other']},
    votes:[
        {
            user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
            votedAt:{type:Date,default:Date.now()},
        }
    ],
    voteCount:{type:Number,default:0},
});
candidateSchema.pre('save', async function () {//next is not defined because arrow function not used
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

candidateSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const user=this;
        const isMatch=await bcrypt.compare(candidatePassword,user.candidateId);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;