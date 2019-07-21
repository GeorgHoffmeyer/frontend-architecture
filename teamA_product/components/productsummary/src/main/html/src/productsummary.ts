import axios, { AxiosResponse } from 'axios'

class ProductSummary extends HTMLElement {

    private contentWrapper : HTMLDivElement

    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'open'})
        this.contentWrapper = document.createElement('div')
        this.contentWrapper.setAttribute('class', 'product-element product-summary')

        shadow.appendChild(this.contentWrapper)

        console.log('ProductDetail element created.')
    }

    connectedCallback() {
        console.log('ProductDetail element added to page.')
        this.applyStyles()
        window.addEventListener('productlist:selected-product-changed', (event) => this.productChanged(event))
    }

    disconnectedCallback() {
        console.log('ProductDetail element removed from page.')
        window.removeEventListener('productlist:selected-product-changed', (event) => this.productChanged(event))
    }

    adoptedCallback() {
        console.log('ProductDetail element moved to new page.')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('ProductDetail element attributes changed.')
        this.applyStyles()
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

    productChanged(event) {
        console.log(event)
        this.loadProduct(event.detail.productid)
    }

    loadProduct(productId){
        axios.get('/api/product/'+productId).then(response => {this.renderProduct(response.data)})
    }

    renderProduct(productJson) {
        let productDetailheader = document.createElement('h1')
        productDetailheader.innerHTML = 'Product: ' + productJson.name

        let productDesciption = document.createElement('p')
        productDesciption.innerHTML = productJson.summary

        let addToCart = document.createElement('cart-add')
        addToCart.setAttribute("data-cartitem-id", productJson.id)
        addToCart.setAttribute("data-cartitem-description", productJson.name)
        addToCart.setAttribute("data-cartitem-price", "2,99 EUR")
        if(this.hasAttribute("data-stylesheets")) {
            addToCart.setAttribute("data-stylesheets", this.getAttribute("data-stylesheets"))
        }
        let linkToDetails = document.createElement('a')
        linkToDetails.setAttribute('href', '/target/product/' + productJson.id + '/details')
        linkToDetails.innerText = 'More Details'

        this.contentWrapper.innerHTML = ''
        this.contentWrapper.append(productDetailheader)
        this.contentWrapper.append(productDesciption)
        this.contentWrapper.append(addToCart)
        this.contentWrapper.append(linkToDetails)
    }
}


customElements.define('product-summary', ProductSummary)