class Attribute {
    constructor(name,value){
      this.name = name;
      this.value = value;
    }
  
    setAttribute(element) {
      element.setAttribute(this.name,this.value);
    }
  }
  
  const createElement = element => {
    return document.createElement(element);
  }
  
  const insertElement = (fartherNode, childNode) => {
    fartherNode.insertAdjacentElement('beforeend',childNode);
  }
  
  const appendElement = (fartherNode, childNode) => {
    fartherNode.appendChild(childNode);
  }
  
  const setInnerText =  (element,value) => {
    element.innerText = value;
  }