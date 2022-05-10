const img = document.querySelector(".item__img");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const colors = document.querySelector("#colors");
const addToCartBtn = document.querySelector("#addToCart");
const quantity = document.querySelector("#quantity");
 
// get product id from current URL
const id = window.location.href.split("?")[1].split("=")[1];

// add to cart 
const addToCart = (colors,id,quantity) => {
    const selectedColor = colors.options[colors.selectedIndex].value;
    const shoppingCartItem = {
        id:id,
        quantity: + quantity.value,
        color:selectedColor
    }
    if (selectedColor === "") {
        alert("veuillez sélectionner une couleur"); 
    } else if (quantity.value === "0") {
        alert("veuillez sélectionner une quantité");
    } else if (quantity.value > 100) {
        alert("la quantité maximum est 100");
    }else{
        const shoppingCart = new ShoppingCart();
        shoppingCart.add(shoppingCartItem);
        console.log(shoppingCart);
    }
}

// fetch data by id ,then render product page
fetch(`http://localhost:3000/api/products/${id}`)
.then( response  => response.json() )
.then( data => {
    img.innerHTML =`<img src=${data.imageUrl} alt="Photographie d'un canapé ${data.name}">`; 
    title.innerText = data.name;
    price.innerText = data.price;
    description.innerText=data.description;

    for (i=0; i<data.colors.length; i++){
        colors.insertAdjacentHTML("beforeend",`
        <option value="${data.colors[i]}">${data.colors[i]}</option>`);
    }

    addToCartBtn.addEventListener('click', () => {
        addToCart(colors,id,quantity);
    });

}).catch( error => alert(error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochain fois') )


