
// get product items container
const itemsContainer = document.querySelector("#items");

// get products data
fetch('http://localhost:3000/api/products')
.then( response => response.json() )
.then(data => {
    data.map( element => {

        itemsContainer.innerHTML +=`
        <a href="./product.html?id=${element._id}">
        <article>
          <img src="${element.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>
      `

    } )
}).catch((error) => {
  console.error('Error:', error); // question : comment traiter l'error ?
});



