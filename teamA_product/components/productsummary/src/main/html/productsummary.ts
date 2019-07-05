import axios, { AxiosResponse } from 'axios'

class ProductSummary extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'open'})
        const wrapper = document.createElement('template')
        wrapper.innerHTML = '<p>Product Summary</p>'
        shadow.appendChild(wrapper.content)

        console.log('ProductDetail element created.')
    }

    connectedCallback() {
        console.log('ProductDetail element added to page.')
        window.addEventListener('productlist:selected-product-changed', (event) => this.productChanged(event))
    }

    disconnectedCallback() {
        console.log('ProductDetail element removed from page.')
    }

    adoptedCallback() {
        console.log('ProductDetail element moved to new page.')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('ProductDetail element attributes changed.')
    }

    productChanged(event) {
        console.log(event)
    }
}


customElements.define('product-summary', ProductSummary)