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
        this.loadProduct(event.detail.productid)
    }

    loadProduct(productId){
        axios.get('/api/product/'+productId+'/').then(response => {this.renderProduct(response.data)})
    }

    renderProduct(productJson) {
        let productDetailheader = document.createElement('h1')
        productDetailheader.innerHTML = 'Product: ' + productJson.product.name

        let productDesciption = document.createElement('p')
        productDesciption.innerHTML = productJson.description

        let addToCart = document.createElement('cart-add')
        addToCart.setAttribute("data-cartitem-id", productJson.product.id)
        addToCart.setAttribute("data-cartitem-description", productJson.product.name)
        addToCart.setAttribute("data-cartitem-price", "2,99 EUR")

        this.shadowRoot.innerHTML = ''
        this.shadowRoot.append(productDetailheader)
        this.shadowRoot.append(productDesciption)
        this.shadowRoot.append(addToCart)
    }
}


customElements.define('product-summary', ProductSummary)