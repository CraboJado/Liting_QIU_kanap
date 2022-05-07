 const img = document.querySelector(".item__img");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const colors = document.querySelector("#colors");
const addToCartBtn = document.querySelector("#addToCart");
const quantity = document.querySelector("#quantity");
 

// get product id from current URL
const id = window.location.href.split("?")[1].split("=")[1];

// add to cart functionality 
const addToCartHandler = () => {
    const selectedColor = colors.options[colors.selectedIndex].value;
    const shoppingCartItem = {
        id:id,
        quantity: + quantity.value,
        color:selectedColor
    }

    if (selectedColor === "") {
        alert("please select a color");
    } else if (quantity.value === "0") {
        alert("please select a quantity");
    } else {
        const shoppingCart = new ShoppingCart();
        shoppingCart.add(shoppingCartItem);
    }
}

// fetch data by id ,then render page
fetch(`http://localhost:3000/api/products/${id}`)
.then( response  => response.json() )
.then( (data) => {
    img.innerHTML =`<img src=${data.imageUrl} alt="Photographie d'un canapé">`;
    title.innerText = data.name;
    price.innerText = data.price;
    description.innerText=data.description;

    for (i=0; i<data.colors.length; i++){
        colors.insertAdjacentHTML("beforeend",`
        <option value="${data.colors[i]}">${data.colors[i]}</option>`);
    }

    addToCartBtn.addEventListener('click',addToCartHandler);

}).catch( () => alert('something is wrong, please try later') )


