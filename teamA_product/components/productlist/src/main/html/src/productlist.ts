import axios, { AxiosResponse } from 'axios'

class Productlist extends HTMLElement {

    private contentWrapper : HTMLDivElement

    constructor() {
        super();

        if (!this.hasAttribute('id')) {
            this.id = 'productlist'
        }

        const shadow = this.attachShadow({ mode: 'open' })
        this.contentWrapper = document.createElement('div')
        this.contentWrapper.setAttribute('class', 'product-element product-list')

        shadow.appendChild(this.contentWrapper)

        console.log('ProductList element created.')
    }


    connectedCallback() {
        console.log('ProductList element added to page.');
        axios.get('/api/product/')
            .then((response) =>
                this.processProductResponse(response.data)
            )
    }

    disconnectedCallback() {
        console.log('ProductList element  removed from page.');
    }

    adoptedCallback() {
        console.log('ProductList element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('ProductList element attributes changed.');
        //updateStyle(this);
    }

    processProductResponse(productListJSON) {
        console.log(productListJSON)
        let listElement = document.createElement('ul')
        listElement.setAttribute('class', 'productlist')

        this.contentWrapper.appendChild(listElement)

        productListJSON.forEach(element => {
            let productElement = document.createElement('li')
            productElement.addEventListener('click', () => this.handleClick(element.id))
            productElement.setAttribute('data-product-id', element.id)
            productElement.innerHTML = element.name
            listElement.appendChild(productElement)
        });
    }

    handleClick(productid) {
        this.dispatchEvent(new CustomEvent('productlist:selected-product-changed', { bubbles: true, 'detail': { productid: productid, productlist: this.id } }))
        console.log('product click ' + productid)
    }

}

customElements.define('product-list', Productlist)