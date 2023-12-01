import { IProduct } from "@/Interfaces";
import { connect, disconnect } from ".";
import { Product } from "@/models";


export const getProductBySlug = async(slug:string): Promise<IProduct| null> =>{

    await connect();
    const product = await Product.findOne({slug}).lean();
    await disconnect();

    if(!product){
        return null;
    }

    return JSON.parse(JSON.stringify(product));

} 