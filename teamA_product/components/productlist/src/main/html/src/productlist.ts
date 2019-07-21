import axios, { AxiosResponse } from 'axios'
import { link } from 'fs';

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

        let linkNode = document.createElement('link')
        linkNode.setAttribute('href', 'css/style_shadow.css');
        linkNode.setAttribute('type', 'text/css');
        linkNode.setAttribute('rel', 'stylesheet');

        shadow.appendChild(linkNode)
        shadow.appendChild(this.contentWrapper)

        console.log('ProductList element created.')
    }


    connectedCallback() {
        console.log('ProductList element added to page.');

        this.applyStyles();

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
        this.applyStyles();
    }

    private applyStyles() {
        this.shadowRoot.childNodes.forEach(child => {
            if(child.nodeName.toLowerCase() == 'link') {
                this.shadowRoot.removeChild(child);
            }            
        })
        if(this.hasAttribute("data-stylesheets")) {
            let stylesheets = this.getAttribute("data-stylesheets")
            stylesheets.split(',').forEach(el => {
                let linkNode = document.createElement('link');
                linkNode.setAttribute('href', el);
                linkNode.setAttribute('type', 'text/css');
                linkNode.setAttribute('rel', 'stylesheet');

                this.shadowRoot.appendChild(linkNode);
            })
        }

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