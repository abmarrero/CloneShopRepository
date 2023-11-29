
import { IProduct } from '@/Interfaces';
import mongoose, {Schema,Model,model} from 'mongoose';

const productSchema = new Schema({ 

description:{type: 'string', required: true},
images:[{type: String}],
inStock:{type: 'string', required: true, default: 0},
price:{type: 'string', required: true,default:0},
sizes:[{type: String,
        enum:{
            values:['XS','S','M','L','XL','XXL','XXXL'],
            message:'{VALUE} no es un tamaño válido'
        }
}],
slug:{type: 'string', required: true,unique: true},
type:{type: String,
    enum:{
        values:['shirts','pants','hoodies','hats'],
        message:'{VALUE} no es un tipo válido'
    }
},
tags:[{type: String}],
title:{type: 'string', required: true},

gender:[{type: String,
    enum:{
        values:['men','women','kid','unisex'],
        message:'{VALUE} no es un género válido'
    }
}]
},{
    timestamps:true
});

    productSchema.index({title: 'text',tags: 'text'});

const Product:Model<IProduct>= mongoose.models.Product || model('Product' , productSchema);

export default Product;