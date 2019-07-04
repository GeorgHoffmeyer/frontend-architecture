import axios, { AxiosResponse } from 'axios'

class Productlist extends HTMLElement {
    shadow = this.attachShadow({mode: 'open'});

    constructor() {
        super();
        /*
        productlist.prototype.createdCallback = function() {
        }
        */

        if(!this.hasAttribute('id')) {
            this.id = 'productlist'
        }

        const wrapper = document.createElement('template')
        wrapper.innerHTML = '<p>I am a productlist</p>'
        this.shadow.appendChild(wrapper.content)

    }
    
    
    connectedCallback() {
        console.log('Custom square element added to page.');
        //updateStyle(this);

        var shadowRootElem = this.shadowRoot

        axios.get('http://localhost:8080/product').then((response) => this.processProductResponse(response))
        
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }
    
    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
        //updateStyle(this);
    }
    
    processProductResponse(response: AxiosResponse<any>) {
        console.log(response)
        var listElement = document.createElement('ul')
        listElement.setAttribute('class', 'productlist')

        this.shadowRoot.appendChild(listElement)

        response.data.forEach(element => {
            let productElement = document.createElement('li')
            productElement.setAttribute('data-product-id', element.id)
            productElement.innerHTML = element.name
            listElement.appendChild(productElement)
        });

        console.log("call finished in method")
    }
}

customElements.define('product-list', Productlist)

/*
window.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('product-list');
    setTimeout(() => {
        element.parentNode.removeChild(element);
    }, 2000);
});
*/