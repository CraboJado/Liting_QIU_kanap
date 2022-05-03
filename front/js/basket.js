class ShoppingCart {
    constructor(){
        if(localStorage.getItem("shoppingCart") === null) {
            this.shoppingCart = [];
        }else {
            this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        } 
    }

    save (shoppingCart) {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }

    add (item) {
        if (this.shoppingCart.length === 0) {
            this.shoppingCart.push(item);
            this.save(this.shoppingCart);
        }else {
            const isSameId = this.shoppingCart.some( element => element.id === item.id );
            const isSameColor = this.shoppingCart.some( element => element.id === item.id && element.color === item.color );
            
            if (!isSameId ) {
                this.shoppingCart.push(item);
                this.save(this.shoppingCart);
            } 
    
            if (isSameId && !isSameColor) {
                this.shoppingCart.push(item);
                this.save(this.shoppingCart);
            }
    
            if (isSameId && isSameColor) {
                const newShoppingCart = this.shoppingCart.map( element => {
                    if (element.id === item.id && element.color === item.color) {
                        return {...element,quantity:+ element.quantity + + item.quantity}
                    }
                    return element;
                })
                this.save(newShoppingCart);
            }
    
        }
        
    }

}

