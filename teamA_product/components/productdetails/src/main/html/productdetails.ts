import axios, { AxiosResponse } from 'axios'

class ProductDetails extends HTMLElement {
    private productId
    private contentWrapper : HTMLDivElement

    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        this.contentWrapper = document.createElement('div')
        this.contentWrapper.setAttribute('class', 'product-element product-details')

        this.shadowRoot.append(this.contentWrapper)
    }

    connectedCallback() {
        if(this.hasAttribute("data-productid")) {
            this.productId = this.getAttribute("data-productid")
            console.log('productid from data-productid: ' + this.productId)
        } else {
            var url_string = window.location.href;
            var url = new URL(url_string);
            if(url.searchParams.get("productid")) {
                this.productId = url.searchParams.get("productid")
                console.log('productid from url: ' + this.productId);
            }
        }
        this.render();
        console.log('Productdetail element added to page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('ProductDetail element attribute ' + name + ' changed.' );

        if(name == 'data-productid') {
            this.productId = this.getAttribute("data-productid")

        }
        this.render();
        //updateStyle(this);

    }

    render() {
        axios.get('/api/product/' + this.productId + '/details')
            .then((response) =>
                this.processProductResponse(response.data)
            )

    }

    processProductResponse(productJSON) {
        console.log(productJSON)

        let p = document.createElement('p')
        p.innerText = productJSON.description

        this.contentWrapper.innerHTML = "";
        this.contentWrapper.append(p)
    }
}

customElements.define('product-details', ProductDetails)