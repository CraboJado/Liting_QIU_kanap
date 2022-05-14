const imgContainer = document.querySelector(".item__img");
const addToCartBtn = document.querySelector("#addToCart");
const quantityElement = document.querySelector("#quantity");
// get product id from current URL
const id = window.location.href.split("?")[1].split("=")[1];

const renderImg = data => {
    const img = createElement('img');
    appendElement(imgContainer,img);
    const src = new Attribute('src',`${data.imageUrl}`);
    const alt = new Attribute('alt',`Photographie d'un canapé ${data.name}`);
    src.setAttribute(img);
    alt.setAttribute(img);
}

const renderTitle = data => {
    const titleElement = document.querySelector("#title");
    setInnerText(titleElement,data.name);
}

const renderPrice = data => {
    const priceElement = document.querySelector("#price");
    setInnerText(priceElement ,data.price);
}

const renderDescription = data => {
    const descripElement = document.querySelector("#description");
    setInnerText(descripElement,data.description);
}

const renderColorOption = data => {
    const colorsElement = document.querySelector("#colors");
    for (i=0; i<data.colors.length; i++){
        const colorOption = createElement('option');
        const optionValue = new Attribute('value',`${data.colors[i]}`);
        optionValue.setAttribute(colorOption);
        insertElement(colorsElement,colorOption);
        setInnerText(colorOption ,data.colors[i]);
    }
}

const renderPage = data => {
    // render img
    renderImg(data);
    // render title
    renderTitle(data);
    // render price
    renderPrice(data);
    // render discription
    renderDescription(data);
    // render colorOption dropdown menu
    renderColorOption(data);
}

const getSelectedProduct = id => {
    const colorsElement = document.querySelector("#colors");
    const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;
    const product = {
        id:id,
        quantity: + quantityElement.value,
        color:selectedColor
    };
    return product
}

const addToCart = () => {
    const product = getSelectedProduct(id);
    if (product.color === "") {
        alert("veuillez sélectionner une couleur"); 
    } else if (product.quantity === 0 ) {
        alert("veuillez sélectionner une quantité");
    } else if (product.quantity > 100) {
        alert("la quantité maximum est 100");
        quantityElement.value = 100;
    }else{
        const shoppingCart = new ShoppingCart();
        shoppingCart.add(product);
    }
}

const fetchDataById = (id) => {
    return fetch(`http://localhost:3000/api/products/${id}`)
};

fetchDataById(id)
.then( response  => response.json() )
.then( data => {
    renderPage(data);
    addToCartBtn.addEventListener('click', () => addToCart())
})
.catch( error => {imgContainer.innerText = error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochain fois';})



