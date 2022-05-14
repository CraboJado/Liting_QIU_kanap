// first rendering page 
const cartItemsEle = document.querySelector('#cart__items'); 
const totalQuantityEle = document.querySelector('#totalQuantity');
const totalPriceEle = document.querySelector('#totalPrice');

const productData = JSON.parse(localStorage.getItem("productData"));
let shoppingCart = new ShoppingCart();
let articleString ="";
shoppingCart.cart.forEach( element => {
    const selectProduct = productData.find( product => product._id === element.id );
    articleString += `
        <article class="cart__item" data-id=${element.id} data-color=${element.color}>
            <div class="cart__item__img">
                <img src=${selectProduct.imageUrl} alt="Photographie d'un canapé ${selectProduct.name}">
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
cartItemsEle.insertAdjacentHTML('beforeEnd',articleString);

// render total quantity and price
const renderTotal = (shoppingCart,productData,totalQuantityEle,totalPriceEle) => {
    const sum = shoppingCart.getTotalPrice(productData);
    const quantity = shoppingCart.getTotalQuantity(); 
    totalQuantityEle.innerText = quantity;
    totalPriceEle.innerText=sum;
};
renderTotal(shoppingCart,productData,totalQuantityEle,totalPriceEle);

const itemQuantityInputs = document.querySelectorAll('.itemQuantity');
const delectItemBtns = document.querySelectorAll('.deleteItem');

// listen click event of buttons (deleteItem)
const deleteProductHandler = e => {
    const id = e.currentTarget.closest(".cart__item").dataset.id;
    const color = e.currentTarget.closest(".cart__item").dataset.color;
    const product = {
        id:id,
        color:color
    };

    shoppingCart.delete(product);
    e.currentTarget.closest(".cart__item").style.display = "none";
    renderTotal(shoppingCart,productData,totalQuantityEle,totalPriceEle);
}

// listen change event of inputs (itemQuantity)
const changeQuantityHandler = e => {
    const id = e.currentTarget.closest(".cart__item").dataset.id;
    const color = e.currentTarget.closest(".cart__item").dataset.color;
    const product = {
        id:id,
        color:color
    };
    let newQuantity = + e.currentTarget.value;

    if(newQuantity > 100){
        alert("la quantité maximum d'un produit est 100");
        e.currentTarget.value = 100;
        newQuantity = 100;
    }

    shoppingCart.update(product,newQuantity);
    renderTotal(shoppingCart,productData,totalQuantityEle,totalPriceEle);
}

delectItemBtns.forEach ( element => {
    element.addEventListener('click',deleteProductHandler);
});

itemQuantityInputs.forEach ( element => {
    element.addEventListener('change',changeQuantityHandler);
});



// form vadility
const form = document.querySelector('.cart__order__form'); 
const orderBtn = document.querySelector('.cart__order__form input[type="submit"]');
const inputs = document.querySelectorAll('.cart__order__form input:required');
const firstNameErrorMsgEle = document.querySelector('#firstNameErrorMsg');
const lastNameErrorMsgEle = document.querySelector('#lastNameErrorMsg');
const addressErrorMsgEle = document.querySelector('#addressErrorMsg');
const cityErrorMsgEle = document.querySelector('#cityErrorMsg');
const emailErrorMsgEle = document.querySelector('#emailErrorMsg');

// create regular expression 
const nameRegex = /^[a-zA-Zéèàùçûü\s]+[-a-zA-Zéèàùçûü\s]*$/;
const cityRegex = /^[a-zA-Zéèàùçûü\s]+$/;
const addressRegex = /^[a-zA-Z0-9éèàùçûü\s-,]+$/;
const emailRegex = /^[0-9a-z._-\s]+[+0-9a-z._-]*@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}\s*$/; 

// create error message
const nameErrorMsg = 'le prénom doit commencer et finir par une letter et doit contenir au moins 2 lettres et un seul - pour le prénom composé';
const cityErrorMsg = 'le city doit contenir que les lettres';
const addressErrorMsg = 'l\'adresse doit contenir que les lettres et les chiffres ';
const emailErrorMsg = 'le format d\'une adresse mail n\'est pas conforme';

// check if input is empty and render error msg 
const emptyInputMsg = (inputValue,ErrorMsgNode) => {
    if (inputValue === "") {
        ErrorMsgNode.innerText = 'Veuillez renseigner ce champ';
     }
}

// check input validity and render error msg if necessary
const checkInputValidity = (inputValue,regExp,ErrorMsg,elementNode) => {

    emptyInputMsg(inputValue,elementNode)

    if( regExp.test(inputValue) === false && inputValue != "") {
        elementNode.innerText = ErrorMsg; 
    }

    if(regExp.test(inputValue) && inputValue != ""){
        elementNode.innerText = "";
    }
}

// listen blur event to check input validity
const changeInputHandler = e => {
    const inputValue = e.currentTarget.value;
    if(e.currentTarget.name === "firstName"){
        checkInputValidity(inputValue,nameRegex,nameErrorMsg,firstNameErrorMsgEle);
    }

    if(e.currentTarget.name === "lastName"){
        checkInputValidity(inputValue,nameRegex,nameErrorMsg,lastNameErrorMsgEle);
    }

    if(e.currentTarget.name === "address"){
        checkInputValidity(inputValue,addressRegex,addressErrorMsg,addressErrorMsgEle);
    }

    if(e.currentTarget.name === "city"){
        checkInputValidity(inputValue,cityRegex,cityErrorMsg,cityErrorMsgEle);
    }

    if(e.currentTarget.name === "email"){
        checkInputValidity(inputValue,emailRegex,emailErrorMsg,emailErrorMsgEle);
    }
};

inputs.forEach( element => {
    element.addEventListener('blur',changeInputHandler);
})

// remove all space of input datas before sending to server
const removeAllSpace = (inputValue) => {
    return inputValue.replace(/\s+/g,"")
}

// remove beginging sqace qnd end space of input datas before sending to server
const removeSpace = (inputValue) => {
    return inputValue.replace(/^\s+|\s+$/g,"")
}

// send form datas to back-end
orderBtn.addEventListener('click', e => {
     e.preventDefault();
     const [firstName,lastName,address,city,email] = inputs;

     if(shoppingCart.cart.length === 0){
         alert('votre panier est vide');
     }else {
        //  show error msg when inputs are empty
        emptyInputMsg(firstName.value,firstNameErrorMsgEle);
        emptyInputMsg(lastName.value,lastNameErrorMsgEle);
        emptyInputMsg(address.value,addressErrorMsgEle);
        emptyInputMsg(city.value,cityErrorMsgEle);
        emptyInputMsg(email.value,emailErrorMsgEle);

        //  send form datas to server when all inputs are valid
        if(nameRegex.test(firstName.value) && 
        nameRegex.test(lastName.value) &&
        addressRegex.test(address.value) && 
        cityRegex.test(city.value) && 
        emailRegex.test(email.value)
        ){ 
        // get to-order product id
        const productsIdArr = shoppingCart.cart.map( element => element.id );

        // remove space of inputs values
        const contact = {
            firstName: removeAllSpace(firstName.value),
            lastName: removeAllSpace(lastName.value),
            address: removeSpace(address.value),
            city: removeAllSpace(city.value),
            email: removeAllSpace(email.value)
        };

        const body = {
            contact :contact,
            products:productsIdArr,
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        fetch('http://localhost:3000/api/products/order',requestOptions)
        .then( response => response.json())
        .then( data => {
            // redirection to confirmation page
            location.href = `confirmation.html?id=${data.orderId}`;
            // clear localStorage
            localStorage.clear();
        })
        .catch( error => alert(error));
        }
    }
})




