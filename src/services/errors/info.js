export const generateUserErrorInfo = (user) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name:   needs to be a String, received  ${user.first_name}
    * last_name:    needs to be a String, received ${user.last_name}
    * email:        needs to be a String and Unique, received ${user.email}
    * age:          needs to be a Number, received ${user.age}
    * rol:          needs to be a String, received ${user.rol}
    * password:     needs to be a String, received ${user.password} ` 
} 


export const generateProductErrorInfo = (product) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * title:          needs to be a String, received  ${product.title}
    * description:    needs to be a String, received ${product.description}
    * code:           needs to be a String and Unique, received ${product.lacodest_name}
    * price:          needs to be a Number, received ${product.price}
    * status:         needs to be a Boolean, received ${product.status}
    * stock:          needs to be a Number, received ${product.stock}
    * category:       needs to be a String, received ${product.category}
    * thumbnails:     needs to be a Array, received ${product.thumbnails} ` 
} 

export const generateAddProductErrorInfo = (product) =>{
    return `The quantity you asked for is not available.
    * quantity:  needs to be lower than ${product.stock}, received  ${product.quantity} ` 
} 


