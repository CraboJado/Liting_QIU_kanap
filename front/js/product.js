const imgContainer = document.querySelector(".item__img");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const descripElement = document.querySelector("#description");
const colorsElement = document.querySelector("#colors");
const quantityElement = document.querySelector("#quantity");
const addToCartBtn = document.querySelector("#addToCart");

// get product id from current URL
const id = window.location.href.split("?")[1].split("=")[1];

// creat and render img
const renderImg = data => {
    const img = new HtmlElement('img');
    img.appendElement(imgContainer);
    const imgSrc = getAttribute('src',`${data.imageUrl}`);
    const imgAlt = getAttribute('alt',`Photographie d'un canapé ${data.name}`);
    img.setAttribute(imgSrc);
    img.setAttribute(imgAlt);
}

// set html element innerText
const setInnerText = (element,data) => {
    element.innerText = data;
}

// create and render colorOption dropdown menu
const renderColorOption = data => {
    for (i = 0; i < data.colors.length; i++){
        const colorOption = new HtmlElement ('option');
        const optionValue = getAttribute('value',`${data.colors[i]}`);
        colorOption.setAttribute(optionValue);
        colorOption.insertElement(colorsElement);
        colorOption.setInnerText(data.colors[i]);
    }
}

const renderPage = data => {
    renderImg(data);
    setInnerText(titleElement,data.name);
    setInnerText(priceElement,data.price)
    setInnerText(descripElement,data.description)
    renderColorOption(data);
}

// get seleted product
const getSelectedProduct = id => {
    // const colorsElement = document.querySelector("#colors");
    const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;
    const product = {
        id:id,
        quantity: + quantityElement.value,
        color:selectedColor
    };
    return product
}

// add to shopping cart
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

// fetch data by Id and render page
const fetchDataById = (id) => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then( response  => response.json() )
    .then( data => {
        renderPage(data);
        addToCartBtn.addEventListener('click', () => addToCart())
    })
    .catch( error => {imgContainer.innerText = error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochain fois';})
};

fetchDataById(id);




