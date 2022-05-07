
// get product items container
const itemsContainer = document.querySelector("#items");

// get products data
fetch('http://localhost:3000/api/products')
.then( response => response.json() )
.then(data => {

  let listItems ="";

    data.forEach( item => {
      listItems +=`
      <a href="./product.html?id=${item._id}">
        <article>
          <img src="${item.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">${item.name}</h3>
          <p class="productDescription">${item.description}</p>
        </article>
      </a>`;

    } )

    itemsContainer.innerHTML = listItems;

    localStorage.setItem("productData",JSON.stringify(data));

}).catch((error) => {
  alert( error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochain fois')
});



