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

interface ProductSlug{
    slug: string;
}

export const getAllProductSlug = async(): Promise<ProductSlug[]> =>{

    await connect();
        const slugs = await Product.find().select('slug -_id').lean();
    await disconnect();

    return slugs;
}


export const getProductByTerm = async(term:string): Promise<IProduct[]> =>{

    term=term.toString().toLowerCase();

    await connect();
    const products = await Product.find({$text: {$search: term}})
                                  .select('title images price inStock slug -_id')
                                  .lean();
    await disconnect();

    return products;
}

export const getAllProduct = async(): Promise<IProduct[]> =>{

    await connect();
    const products = await Product.find().lean();
await disconnect();

return JSON.parse(JSON.stringify(products));

}