const cartItems = document.querySelector('#cart__items'); 
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');

const productData = JSON.parse(localStorage.getItem("productData"));
let shoppingCart = new ShoppingCart();

console.log(shoppingCart.cart);

// first rendering page by using the datas in LocalStorage
let articleString ="";
let sum = shoppingCart.getTotalPrice(productData);
let quantity = shoppingCart.getTotalQuantity(); 
shoppingCart.cart.forEach( (element) => {
    const selectProduct = productData.find( (product)=> {
        return product._id === element.id
    })
    articleString += `
        <article class="cart__item" data-id=${element.id} data-color=${element.color}>
            <div class="cart__item__img">
                <img src=${selectProduct.imageUrl} alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${selectProduct.name}</h2>
                    <p>${element.color}</p>
                    <p>${selectProduct.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${element.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
});

cartItems.insertAdjacentHTML('beforeEnd',articleString);
totalQuantity.innerText = quantity;
totalPrice.innerText=sum;

const eventHandler = (elementNodes,eventType)=>{
    elementNodes.forEach( element => {
        element.addEventListener(eventType, e => {
            let id = e.currentTarget.closest(".cart__item").dataset.id;
            let color = e.currentTarget.closest(".cart__item").dataset.color;
            if(eventType === 'click') {
                // delect product functionality
                shoppingCart.delete(id,color);
                e.currentTarget.closest(".cart__item").style.display = "none";
            }else{
                // update quantity functionality
                let newQuantity = + e.currentTarget.value;
                shoppingCart.update(id,color,newQuantity);
            }
            // re-render page for total quantity:
            let quantity = shoppingCart.getTotalQuantity()
            totalQuantity.innerText = quantity;

            // re-render page for total price:
            let sum = shoppingCart.getTotalPrice(productData);
            totalPrice.innerText = sum;
                
        })
    })
}

const itemQuantityInputs = document.querySelectorAll('.itemQuantity');
const delectItemBtns = document.querySelectorAll('.deleteItem');
eventHandler(itemQuantityInputs,'change');
eventHandler(delectItemBtns,'click');





