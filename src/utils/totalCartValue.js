import calculateFinalPrice from "./calculateFinalPrice";
 

export default function totalCartValue(cart) {
    var simpleProductValue = 0

    
    for (let i = 0; i < cart.cartItem.length; i++) {
        const varientMrp = cart.cartItem[i].varient.mrp;
        const discount = cart.cartItem[i].varient.discount;
        const finalvalue = calculateFinalPrice(varientMrp,discount)
        
        simpleProductValue+=(finalvalue*cart.cartItem[i].qty)

        
    }
    

    

    return simpleProductValue
    
}