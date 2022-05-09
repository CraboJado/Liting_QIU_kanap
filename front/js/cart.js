// first rendering page 
const cartItems = document.querySelector('#cart__items'); 
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');
const productData = JSON.parse(localStorage.getItem("productData"));
let shoppingCart = new ShoppingCart();
let articleString ="";
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

// render total quantity and price
const renderTotal = () => {
    const sum = shoppingCart.getTotalPrice(productData);
    const quantity = shoppingCart.getTotalQuantity(); 
    totalQuantity.innerText = quantity;
    totalPrice.innerText=sum;
};
renderTotal();


const itemQuantityInputs = document.querySelectorAll('.itemQuantity');
const delectItemBtns = document.querySelectorAll('.deleteItem');

// listen click event to delect product
const deleteProductHandler = (e) => {
    const id = e.currentTarget.closest(".cart__item").dataset.id;
    const color = e.currentTarget.closest(".cart__item").dataset.color;
    shoppingCart.delete(id,color);
    e.currentTarget.closest(".cart__item").style.display = "none";
    renderTotal(); 
}

// listen change event to change quantity
const changeQuantityHandler = (e) => {
    const id = e.currentTarget.closest(".cart__item").dataset.id;
    const color = e.currentTarget.closest(".cart__item").dataset.color;
    const newQuantity = + e.currentTarget.value;
    shoppingCart.update(id,color,newQuantity);
    renderTotal();
}

delectItemBtns.forEach ( (element) => {
    element.addEventListener('click',deleteProductHandler);
});

itemQuantityInputs.forEach ( (element) => {
    element.addEventListener('change',changeQuantityHandler);
});



// form vadility
const form = document.querySelector('.cart__order__form');
const orderBtn = document.querySelector('.cart__order__form input[type="submit"]');
const inputs = document.querySelectorAll('.cart__order__form input:required');
const firstNameErrorMsgNode = document.querySelector('#firstNameErrorMsg');
const lastNameErrorMsgNode = document.querySelector('#lastNameErrorMsg');
const addressErrorMsgNode = document.querySelector('#addressErrorMsg');
const cityErrorMsgNode = document.querySelector('#cityErrorMsg');
const emailErrorMsgNode = document.querySelector('#emailErrorMsg');

// create regular expression 
const nameRegex = /^[a-zA-Zéèàùçûü\s]+\-?[a-zA-Zéèàùçûü\s]+$/;
const cityRegex = /^[a-zA-Zéèàùçûü\s]+$/;
const addressRegex = /^[a-zA-Z0-9éèàùçûü\s-,]+$/;
const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]{2,}[.][a-zA-Z]{2,3}$/;

// create error message
const nameErrorMsg = 'le prénom doit commencer et finir par une letter et doit contenir au moins 2 lettres et un seul - pour le prénom composé';
const cityErrorMsg = 'le city doit contenir que les lettres';
const addressErrorMsg = 'l\'adresse doit contenir que les lettres et les chiffres ';
const emailErrorMsg = 'le format d\'une adresse mail n\'est pas conforme';

// check input validity 
const checkInputValidity = (inputValue,regExp,ErrorMsg,elementNode) => {
    if(inputValue === ""){
        elementNode.innerText = 'Veuillez renseigner ce champ';
    }

    if( regExp.test(inputValue) === false && inputValue != "") {
        elementNode.innerText = ErrorMsg; 
    }

    if(regExp.test(inputValue) && inputValue != ""){
        elementNode.innerText = "";
    }
}

// listen blur event to check input validity
const changeInputHandler = (e) => {
    const inputValue = e.currentTarget.value;
    if(e.currentTarget.name === "firstName"){
        checkInputValidity(inputValue,nameRegex,nameErrorMsg,firstNameErrorMsgNode);
    }

    if(e.currentTarget.name === "lastName"){
        checkInputValidity(inputValue,nameRegex,nameErrorMsg,lastNameErrorMsgNode);
    }

    if(e.currentTarget.name === "address"){
        checkInputValidity(inputValue,addressRegex,addressErrorMsg,addressErrorMsgNode);
    }

    if(e.currentTarget.name === "city"){
        checkInputValidity(inputValue,cityRegex,cityErrorMsg,cityErrorMsgNode);
    }

    if(e.currentTarget.name === "email"){
        checkInputValidity(inputValue,emailRegex,emailErrorMsg,emailErrorMsgNode);
    }
};

inputs.forEach( (element) => {
    element.addEventListener('blur',changeInputHandler);
})


orderBtn.addEventListener('click',(e)=>{

    e.preventDefault();
     const [firstName,lastName,address,city,email] = inputs;

     if ( nameRegex.test(firstName.value) && nameRegex.test(lastName.value) &&
        addressRegex.test(address.value) && cityRegex.test(city.value) && emailRegex.test(email.value)
        ) { 
        const products = shoppingCart.cart.map( (element) => {
            return element.id
         });

        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        };

        const body = {
            contact :contact,
            products:products,
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        fetch('http://localhost:3000/api/products/order',requestOptions)
        .then( response => response.json())
        .then( data => {
            location.href = `confirmation.html?id=${data.orderId}`;
            // clear localStorage
            localStorage.clear();
        })
     }
})




