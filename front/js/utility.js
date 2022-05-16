class HtmlElement{
    constructor(element){
      this.element = document.createElement(element);
    }

    setAttribute(attribute) {
      this.element.setAttribute(attribute.name,attribute.value);
    }

    insertElement (fartherNode) {
      fartherNode.insertAdjacentElement('beforeend',this.element);
    }

    appendElement (fartherNode) {
      fartherNode.appendChild(this.element);
    }

    setInnerText (value) {
      this.element.innerText = value;
    }
}

// create html elemet attribute
const getAttribute = (name,value) => {
  return {
      name : name,
      value: value
  }
}

