const cartItems = document.querySelector('#cart__items'); 
const productData = JSON.parse(localStorage.getItem("productData"));
// const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));


let shoppingCart = new ShoppingCart();

let articleString ="";
shoppingCart.cart.forEach( (item) => {
    const selectProduct = productData.find( (product)=> {
        return product._id === item.id
    })

    articleString += `
        <article class="cart__item" data-id=${item.id} data-color=${item.color}>
            <div class="cart__item__img">
                <img src=${selectProduct.imageUrl} alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${selectProduct.name}</h2>
                    <p>${item.color}</p>
                    <p>${selectProduct.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${item.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
});

cartItems.insertAdjacentHTML('beforeEnd',articleString);

const itemQuantity = document.querySelectorAll('.itemQuantity');
itemQuantity.forEach( element => {
    element.addEventListener('change', e => {
        // pourquoi sans re-instancé le panier, je ne pouvais pas récupér les valeurs après click ?
        // sans re-instancé le panier, je dois refresh le page pour récupérer les valeurs.
        // est ce que c'est un bon pratique de écraser l'ancien instance pour récuperer les valeurs.
        shoppingCart = new ShoppingCart();
        console.log(shoppingCart.cart);
        let newQuantity = +e.currentTarget.value;
        let id = e.currentTarget.closest(".cart__item").dataset.id;
        let color = e.currentTarget.closest(".cart__item").dataset.color;
        shoppingCart.update(id,color,newQuantity);
    })
})

