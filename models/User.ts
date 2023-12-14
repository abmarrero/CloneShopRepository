import { IUser } from '@/Interfaces/user';
import mongoose, {Schema,Model,model} from 'mongoose';

const userSchema = new Schema({ 
// id:{type: 'string',required: true},
name:{type: 'string', required: true},
email:{type: 'string', required: true,unique: true},
password:{type: 'string', required: true},
role:[{type: String,
        enum:{
            values:['admin','client'],
            message:'{VALUE} no es un tamaño válido',
            default: 'client',
            required:true,
        }
}],

},{
    timestamps:true
});

   

const User:Model<IUser>= mongoose.models.User || model('User' , userSchema);

export default User;