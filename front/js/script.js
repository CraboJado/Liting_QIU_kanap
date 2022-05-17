const itemsElement = document.querySelector('#items');

// render created elements on the page
const renderPage = data => {
  data.forEach( product => {
    const ancre = new HtmlElement("a");
    const article = new HtmlElement("article");
    const img = new HtmlElement("img");
    const hTitle = new HtmlElement("h3");
    const pDesc = new HtmlElement("p");

    const titleClassName = getAttribute('class','productName');
    const descriptionClassName = getAttribute('class','productDescription');
    const imgSrc = getAttribute('src',`${product.imageUrl}`);
    const imgAlt = getAttribute('alt',`Lorem ipsum dolor sit amet,${product.name}`);
    const href = getAttribute('href',`./product.html?id=${product._id}`);
    ancre.setAttribute(href);
    img.setAttribute(imgSrc);
    img.setAttribute(imgAlt);
    hTitle.setAttribute(titleClassName);
    pDesc.setAttribute(descriptionClassName);

    article.appendElement(ancre.element);
    img.appendElement(article.element);
    hTitle.appendElement(article.element);
    pDesc.insertElement(article.element);
    hTitle.setInnerText(product.name);
    pDesc.setInnerText(product.description);

    ancre.insertElement(itemsElement);
  })
}

// fetch data 
const fetchProductData = () => {
    fetch('http://localhost:3000/api/products')
    .then( response => response.json() )
    .then( data => {
        // render page
        renderPage(data)
        // save product data in LocalStorage
        localStorage.setItem('productData',JSON.stringify(data));
    })
    .catch( error => {itemsElement.innerText = error + ': le chargement de la page a rencontré un problème, veuillez re-essayer une prochaine fois';});
}

fetchProductData();




