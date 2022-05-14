const imgEle = document.querySelector(".item__img");
const titleEle = document.querySelector("#title");
const priceEle = document.querySelector("#price");
const descripEle = document.querySelector("#description");
const colorsEle = document.querySelector("#colors");
const addToCartBtn = document.querySelector("#addToCart");
const quantityEle = document.querySelector("#quantity");
 
// get product id from current URL
const id = window.location.href.split("?")[1].split("=")[1];

// add to cart 
const addToCart = (id,colorsEle,quantityEle) => { 
    const selectedColor = colorsEle.options[colorsEle.selectedIndex].value;
    const product = {
        id:id,
        quantity: + quantityEle.value,
        color:selectedColor
    };

    if (product.color === "") {
        alert("veuillez sélectionner une couleur"); 
    } else if (product.quantity === "0") {
        alert("veuillez sélectionner une quantité");
    } else if (product.quantity > 100) {
        alert("la quantité maximum est 100");
        quantityEle.value = 100;
    }else{
        const shoppingCart = new ShoppingCart();
        shoppingCart.add(product);
    }
}

// fetch data by id ,then render product page
fetch(`http://localhost:3000/api/products/${id}`)
.then( response  => response.json() )
.then( data => {
    imgEle.innerHTML =`<img src=${data.imageUrl} alt="Photographie d'un canapé ${data.name}">`; 
    titleEle.innerText = data.name;
    priceEle.innerText = data.price;
    descripEle.innerText=data.description;

    for (i=0; i<data.colors.length; i++){
        colorsEle.insertAdjacentHTML("beforeend",`
        <option value="${data.colors[i]}">${data.colors[i]}</option>`);
    }

    addToCartBtn.addEventListener('click', () => {
        addToCart(id,colorsEle,quantityEle);
    });

}).catch( error => {
    imgEle.innerHTML = error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochain fois';
})


