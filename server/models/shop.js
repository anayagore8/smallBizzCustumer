const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const passwordComplexity=require('joi-password-complexity');
const shopSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobileNo:({type:Number, required:true}),
  
});

shopSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;   
}

const Customer=mongoose.model('Customers',shopSchema);
const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const validate=(data)=>{
    const schema=Joi.object({
        name:Joi.string().required().label("Name"),
        email:Joi.string().email().required().label("Email"),
        password: passwordComplexity(complexityOptions).required().label("Password"),
        
        mobileNo:Joi.number().required().label("Mobile No"),
        
    });
    return schema.validate(data);
        
};
module.exports={Customer,validate};