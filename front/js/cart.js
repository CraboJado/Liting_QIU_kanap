const cartItemsElement = document.querySelector('#cart__items'); 
const totalQuantityEle = document.querySelector('#totalQuantity');
const totalPriceEle = document.querySelector('#totalPrice');
const productData = JSON.parse(localStorage.getItem("productData")); 
const shoppingCart = new ShoppingCart();

// get html element article string integreted with shoppingcart item's datas
const getArticleHtmlString = (shoppingCart,productData) => {
    let articleHtmlString ="";
    shoppingCart.cart.forEach( element => {
        const selectProduct = productData.find( product => product._id === element.id );

        articleHtmlString += `
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
    return articleHtmlString
}

// render shopping cart items on the page
const renderShoppingCart = (productData) => {
    const articleHtmlString = getArticleHtmlString(shoppingCart,productData);
    cartItemsElement.insertAdjacentHTML('beforeEnd',articleHtmlString);
}

// render total quantity of shopping cart items on the page
const renderTotalQty = () => {
    const quantity = shoppingCart.getTotalQuantity(); 
    totalQuantityEle.innerText = quantity;
}

// render total price of shopping cart items on the page
const renderTotalPrice = (productData) => {
    const sum = shoppingCart.getTotalPrice(productData);
    totalPriceEle.innerText = sum;
}

// handle change event of qty input
const changeInputHandler = (productData) =>{
    const itemQuantityInputs = document.querySelectorAll('.itemQuantity');
    itemQuantityInputs.forEach ( input => {
        input.addEventListener('change', e => {
            const id = e.currentTarget.closest(".cart__item").dataset.id;
            const color = e.currentTarget.closest(".cart__item").dataset.color;
            const product = {
                id:id,
                color:color,
                quantity: + e.currentTarget.value
            };
        
            if(product.quantity > 100){
                alert("la quantité maximum d'un produit est 100");
                e.currentTarget.value = 100;
                product.quantity = 100;
            }

            shoppingCart.update(product);
            renderTotalQty();
            renderTotalPrice(productData);
        });
    });
}

// handle click event of delete button
const deleteProductHandler = (productData) => {
    const delectItemBtns = document.querySelectorAll('.deleteItem');
    delectItemBtns.forEach ( delectItemBtn => {
        delectItemBtn.addEventListener('click', e => {
            const id = e.currentTarget.closest(".cart__item").dataset.id;
            const color = e.currentTarget.closest(".cart__item").dataset.color;
            const product = {
                id:id,
                color:color
            };
        
            shoppingCart.delete(product);
            cartItemsElement.removeChild(e.currentTarget.closest(".cart__item"));
            renderTotalQty();
            renderTotalPrice(productData);
        });
    });
}

const renderPage = (productData) => {
    renderShoppingCart(productData);
    renderTotalQty();
    renderTotalPrice(productData);
    deleteProductHandler(productData);
    changeInputHandler(productData);
}

const fetchProductData = () => {
    fetch('http://localhost:3000/api/products')
    .then( response => response.json() )
    .then( data => {
        renderPage(data);
    })
    .catch( error => {cartItemsElement.innerText = error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochaine fois';});
}

// before rendering page, check if any item's quantity is over 100 ( maximum per product is 100)
const isOverMaxQuantity = shoppingCart.cart.some( element => element.quantity > 100 );
if (isOverMaxQuantity) {
    const newShoppingCart = shoppingCart.cart.map( element => {
         return element.quantity > 100 ? {...element,quantity:100} : element;
    })
    // save newShoppingCart datas in localstorage
    shoppingCart.save(newShoppingCart);
}

// if productData in LocalStorage is null, need to fetch data to render page , otherwise render page directely
productData === null ? fetchProductData() : renderPage(productData);

/********************************************************************************/
/********************************* form vadility *******************************/ 
/*******************************************************************************/
const orderBtn = document.querySelector('.cart__order__form input[type="submit"]');
const firstNameErrorMsgEle = document.querySelector('#firstNameErrorMsg');
const lastNameErrorMsgEle = document.querySelector('#lastNameErrorMsg');
const addressErrorMsgEle = document.querySelector('#addressErrorMsg');
const cityErrorMsgEle = document.querySelector('#cityErrorMsg');
const emailErrorMsgEle = document.querySelector('#emailErrorMsg');
const inputs = document.querySelectorAll('.cart__order__form input:required');
const [firstName,lastName,address,city,email] = inputs;

// create regular expression 
const nameRegex = /^[a-zA-Zéèàùçûü\s]+[-a-zA-Zéèàùçûü\s]*$/;
const cityRegex = /^[a-zA-Zéèàùçûü\s]+$/;
const addressRegex = /^[a-zA-Z0-9éèàùçûü\s-,]+$/;
const emailRegex = /^[0-9a-z._-\s]+[+0-9a-z._-]*@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}\s*$/; 

// create error message
const nameErrorMsg = 'le prénom doit commencer et finir par une letter et doit contenir au moins 2 lettres et un seul - pour le prénom composé';
const cityErrorMsg = 'le city doit contenir que les lettres';
const addressErrorMsg = 'l\'adresse doit contenir que les lettres, les chiffres et le virgule';
const emailErrorMsg = 'le format d\'une adresse mail n\'est pas conforme';

// check if input value is valid
const isInputValid = (inputValue,regExp) => {
    if(regExp.test(inputValue) && inputValue != "" )  return true ;
    if(regExp.test(inputValue) === false && inputValue != "")  return false ;
}

// render msg
const renderMsg = (elementNode,Msg) => {
    elementNode.innerText = Msg; 
}

// render msg for firstName input
const firstNameHandler = (inputValue) => {
    if(inputValue === ""){
        renderMsg(firstNameErrorMsgEle,'Veuillez renseigner ce champ');
    }else {
        const isValid = isInputValid(inputValue,nameRegex);
        isValid ? renderMsg(firstNameErrorMsgEle,"") : renderMsg(firstNameErrorMsgEle,nameErrorMsg);
    }
}

// render msg for lastName input
const lastNameHandler = (inputValue) => {
    if(inputValue === ""){
        renderMsg(lastNameErrorMsgEle,'Veuillez renseigner ce champ');
    }else {
        const isValid = isInputValid(inputValue,nameRegex);
        isValid ? renderMsg(lastNameErrorMsgEle,"") : renderMsg(lastNameErrorMsgEle,nameErrorMsg);
    }
}

// render msg for address input 
const addressHandler = (inputValue) => {
    if(inputValue === ""){
        renderMsg(addressErrorMsgEle,'Veuillez renseigner ce champ');
    }else {
        const isValid = isInputValid(inputValue,addressRegex);
        isValid ? renderMsg(addressErrorMsgEle,"") : renderMsg(addressErrorMsgEle,addressErrorMsg);
    }
}

// render msg for city input 
const cityHandler = (inputValue) => {
    if(inputValue === ""){
        renderMsg(cityErrorMsgEle,'Veuillez renseigner ce champ');
    }else {
        const isValid = isInputValid(inputValue,cityRegex);
        isValid ? renderMsg(cityErrorMsgEle,"") : renderMsg(cityErrorMsgEle,cityErrorMsg);
    }
}

// render msg for email input 
const emailHandler = (inputValue) => {
    if(inputValue === ""){
        renderMsg(emailErrorMsgEle,'Veuillez renseigner ce champ');
    }else {
        const isValid = isInputValid(inputValue,emailRegex);
        isValid ? renderMsg(emailErrorMsgEle,"") : renderMsg(emailErrorMsgEle,emailErrorMsg);
    }
}

const userInputsHandler = () => {
    firstNameHandler(firstName.value);
    lastNameHandler(lastName.value);
    addressHandler(address.value);
    cityHandler(city.value);
    emailHandler(email.value);
}

// get ordered product id (array)
const getOrderProdutIds = () => {
    return shoppingCart.cart.map( element => element.id );
}

// remove all space of input before sending to back-end
const removeAllSpace = (inputValue) => {
    return inputValue.replace(/\s*/g,"")
}

// remove beginging sqace and end space of input datas before sending to back-end
const removeSpace = (inputValue) => {
    return inputValue.replace(/^\s*|\s*$/g,"")
}
// get body to send to back-end
const getPostBody = () => {
    const contact = {
        firstName: removeSpace(firstName.value), 
        lastName: removeSpace(lastName.value), 
        address: removeSpace(address.value),
        city: removeAllSpace(city.value),
        email: removeAllSpace(email.value)
    };

    const body = {
        contact :contact,
        products:getOrderProdutIds(),
    };
    return body
}

// send body to back-end and get orderID
const fetchData = () => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(getPostBody())
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

//  check if all form inputs are valid 
const isAllValid = () => {
    if(nameRegex.test(firstName.value) && nameRegex.test(lastName.value) &&
        addressRegex.test(address.value) && cityRegex.test(city.value) && emailRegex.test(email.value)) {
        return true
    }else{
        return false
    }
}

// listen blur event of form inputs
const changeInputListener = e => {
    const inputValue = e.currentTarget.value;
    if(e.currentTarget.name === "firstName"){
        firstNameHandler(inputValue);
    }
    if(e.currentTarget.name === "lastName"){
        lastNameHandler(inputValue);
    }
    if(e.currentTarget.name === "address"){
        addressHandler(inputValue);
    }
    if(e.currentTarget.name === "city"){
        cityHandler(inputValue);
    }
    if(e.currentTarget.name === "email"){
        emailHandler(inputValue);
    }
};

inputs.forEach( element => {
    element.addEventListener('blur',changeInputListener);
})

// listen click event of orderBtn button
const orderListener = e => {
    e.preventDefault();
    if(shoppingCart.cart.length === 0){
        alert('votre panier est vide');
    }else {
        isAllValid() ? fetchData() : userInputsHandler();
   }
}

orderBtn.addEventListener('click',orderListener);





