export default interface CartItem{
    userId:string,
    products:Product[]
}

interface Product{
    productId:string,
    name:string,
    pirce:number,
    quantity:number
}