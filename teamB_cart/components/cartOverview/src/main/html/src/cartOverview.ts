import axios, { AxiosResponse } from 'axios'

class CartOverview extends HTMLElement {
    private contentWrapper : HTMLDivElement;

    public constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.contentWrapper = document.createElement('div')

        this.contentWrapper.setAttribute('class', 'cart-element cart-overview')

        this.shadowRoot.append(this.contentWrapper)
    }

    public connectedCallback() {
        // add event Listeners
        console.log('cart overvice created')
        window.addEventListener('cart:item-add', (event)=>this.itemAddedHandler(event))
        // render component
        this.applyStyles()
        this.render()
    }

    public disconnectedCallback() {
        //remove event Listenes
        window.removeEventListener('cart:item-add', this.itemAddedHandler)
    }

    itemAddedHandler(event) {
        console.log("handle cart add event")
        this.render();
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

    private render() {

        const overviewHeader = document.createElement('h1')
        overviewHeader.innerText = 'no items in cart'

        this.contentWrapper.append(overviewHeader)

        axios.get('/api/cart/').then(result => {
            const overviewHeader = document.createElement('h1')

            let itemCount = result.data.length
            if(itemCount > 0) {
                overviewHeader.innerText = 'items in cart: ' + itemCount
            } else {
                overviewHeader.innerText = 'no items in cart'
            }

            this.contentWrapper.innerHTML = ''
            this.contentWrapper.append(overviewHeader)

            let itemOutterContainer = document.createElement('div')
            result.data.forEach(item => {
                let itemContainer = document.createElement('div')

                let itemName = document.createElement('p')
                itemName.innerText = item.description

                let itemPrice = document.createElement('p')
                itemPrice.innerText = item.price

                itemContainer.append(itemName)
                itemContainer.append(itemPrice)

                itemOutterContainer.append(itemContainer)
            })

            this.contentWrapper.append(itemOutterContainer)
        })
    }
}


customElements.define('cart-overview', CartOverview)