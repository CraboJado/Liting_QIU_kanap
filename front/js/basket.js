class ShoppingCart {
    constructor(){
        if(localStorage.getItem("shoppingCart") === null) {
            this.cart = [];
        }else {
            this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
        } 
    }

    save (shoppingCart) {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }

    add (item) {
        if (this.cart.length === 0) {
            this.cart.push(item);
            this.save(this.cart);
        }else {
            const isSameId = this.cart.some( element => element.id === item.id );
            const isSameColor = this.cart.some( element => element.id === item.id && element.color === item.color );
            
            if (!isSameId ) {
                this.cart.push(item);
                this.save(this.cart);
            } 
    
            if (isSameId && !isSameColor) {
                this.cart.push(item);
                this.save(this.cart);
            }
    
            if (isSameId && isSameColor) {
                const newShoppingCart = this.cart.map( element => {
                    if (element.id === item.id && element.color === item.color) {
                        return {...element,quantity: element.quantity + item.quantity}
                    }
                    return element;
                })
                this.save(newShoppingCart);
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

}

