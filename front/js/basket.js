class ShoppingCart {
    constructor(){
        if(localStorage.getItem("shoppingCart") === null) {
            this.cart = [];
        }else {
            this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
        } 
    }

    save (shoppingCart) {
        this.cart = shoppingCart;
        localStorage.setItem("shoppingCart", JSON.stringify(this.cart)); 
    }
    // Question à voir avec mentor:
    // pourquoi sans changer la valuer du proprité cart; je ne pouvais pas récuperer les bonnes valeurs après changement du quantité ?
    // save(shoppingCart){
    //     localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));  
    // }

    add (product) {
        if (this.cart.length === 0) {
            this.cart.push(product);
            this.save(this.cart);
        }else {
            const isSameId = this.cart.some( element => element.id === product.id );
            const isSameColor = this.cart.some( element => element.id === product.id && element.color === product.color );
            
            if(isSameId && isSameColor) {
                const newShoppingCart = this.cart.map( element => {
                    if (element.id === product.id && element.color === product.color) {
                        return {...element,quantity: element.quantity + product.quantity}
                    }
                    return element;
                })
                this.save(newShoppingCart);
            }else {
                this.cart.push(product);
                this.save(this.cart);
            }
        }  
    }

    update(id,color,quantity){
        const newShoppingCart = this.cart.map( (element) => {
            if(element.id === id && element.color === color) {
                return {...element,quantity:quantity}
            }else {
                return element;
            }
        })
        this.save(newShoppingCart);   
    }

    delete(id,color){
        const newShoppingCart = this.cart.filter( element => {
            return !(element.id === id && element.color === color)
        })
        this.save(newShoppingCart);  
    }

    getTotalQuantity(){
        let TotalQuantity = this.cart.reduce( (accumulateur,valeurCourante) => {
            return accumulateur + valeurCourante.quantity
        },0);

        return TotalQuantity;
    }

    getTotalPrice(productData){
        let sum = 0;
        this.cart.forEach(element => {
            const selectProduct = productData.find( (product)=> {
                return product._id === element.id
            });
            sum += element.quantity * selectProduct.price;    
        });
        return sum;
    }



}

