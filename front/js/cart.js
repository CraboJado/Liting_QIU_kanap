const cartItems = document.querySelector('#cart__items'); 
const productData = JSON.parse(localStorage.getItem("productData"));
const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

let articleString ="";

shoppingCart.forEach( (item) => {
    const sameIdItem = productData.find( (product)=> {
        return product._id === item.id
    })

    articleString += `
    <article class="cart__item" data-id=${item.id} data-color=${item.color}>
        <div class="cart__item__img">
            <img src=${sameIdItem.imageUrl} alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${sameIdItem.name}</h2>
                <p>${item.color}</p>
                <p>${sameIdItem.price}</p>
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

// const createElement = (element,className) => {
//     const elementNode = document.createElement(element);
//     elementNode.classList.add(className);
//     return elementNode 
// }

// const renderElement = (fatherNode,beforeChildNod,childNode) => {
//     fatherNode.appendChild(childNode);
//     fatherNode.insertBefore(beforeChildNod,childNode)
// }

// shoppingCart.forEach(item => {

//     let sameIdItem = productData.find( (product)=> {
//         return product._id === item.id
//     })

//     const article = createElement('article','cart__item');
//     article.dataset.id = item.id;
//     article.dataset.color = item.color;

//     const divImg = createElement('div','cart__item__img');
//     const img = document.createElement('img');
//     img.src= sameIdItem.imageUrl;
//     img.alt = "Photographie d'un canapé";
//     divImg.appendChild(img);

//     const divContent = createElement('div','cart__item__content');
//     const divDescription = createElement('div','cart__item__content__description');
//     const h2 = document.createElement('h2');
//     const pColor = document.createElement('p');
//     const pPrice = document.createElement('p');
//     divDescription.appendChild(h2);
//     divDescription.appendChild(pColor);
//     divDescription.appendChild(pPrice);
//     h2.innerText=sameIdItem.name;
//     pColor.innerText=item.color;
//     pPrice.innerText=sameIdItem.price;
    
//     const divSettings = createElement('div','cart__item__content__settings');
//     const divQuantity = createElement('div','cart__item__content__settings__quantity');
//     const pQuantity = document.createElement('p');
//     pQuantity.innerText = "Qté :";
//     const input = createElement('input','itemQuantity');
//     input.type="number";
//     input.name="itemQuantity";
//     input.min="1";
//     input.max="100";
//     input.value=item.quantity;
//     divQuantity.appendChild(pQuantity);
//     divQuantity.appendChild(input);

//     const divDelete = createElement('div','cart__item__content__settings__delete');
//     const pDelete = createElement('p','deleteItem');
//     divDelete.appendChild(pDelete);

//     renderElement(divSettings,divQuantity,divDelete);
//     renderElement(divContent,divDescription,divSettings);
//     renderElement(article,divImg,divContent);
//     cartItems.insertAdjacentElement('beforeEnd',article);
// });


