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

    add (product) {
        const isSameProduct = this.cart.some( element => element.id === product.id && element.color === product.color );
            
        if(isSameProduct) {
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

    update(product){
        const newShoppingCart = this.cart.map( (element) => {
            if(element.id === product.id && element.color === product.color) {
                return {...element,quantity:product.quantity}
            }else {
                return element;
            }
        })
        this.save(newShoppingCart);   
    }

    delete(product){
        const newShoppingCart = this.cart.filter( element => {
            return !(element.id === product.id && element.color === product.color)
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

