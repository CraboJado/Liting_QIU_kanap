const orderIdNode = document.querySelector('#orderId');
const currentURL = window.location.href;
const url = new URL(currentURL);
const id = url.searchParams.get("id");
orderIdNode.innerText = id + ', Merci pour votre visite, à bientôt ! ' ;