
const renderPage = data => {
  const itemsElement = document.querySelector('#items');

  data.forEach( product => {
    const aElement = createElement('a');
    const articleElement = createElement('article');
    const imgElement = createElement('img');
    const titleElement = createElement('h3');
    const descElement = createElement('p');
    insertElement(itemsElement,aElement);
    appendElement(aElement,articleElement);
    appendElement(articleElement,imgElement);
    insertElement(articleElement,titleElement);
    insertElement(articleElement,descElement);

    const href = new Attribute('href',`./product.html?id=${product._id}`);
    const src = new Attribute('src',`${product.imageUrl}`);
    const alt = new Attribute('alt',`Lorem ipsum dolor sit amet,${product.name}`);
    const titleClassName = new Attribute('class','productName');
    const descriptionClassName = new Attribute('class','productDescription');
    href.setAttribute(aElement);
    src.setAttribute(imgElement);
    alt.setAttribute(imgElement);
    titleClassName.setAttribute(titleElement);
    descriptionClassName.setAttribute(descElement);

    setInnerText(titleElement,product.name);
    setInnerText(descElement,product.description);
  })

}

const fetchProdutData = () => {
  return fetch('http://localhost:3000/api/products')
}

fetchProdutData()
.then( response => response.json() )
.then( data => {
    // render page
    renderPage(data)
    // save product data in LocalStorage
    localStorage.setItem('productData',JSON.stringify(data));
})
.catch( error => {itemsElement.innerHTML = error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochain fois';});



