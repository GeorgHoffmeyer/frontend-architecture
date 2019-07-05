import axios, { AxiosResponse } from 'axios'

class CartOverview extends HTMLElement {

    public constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    public connectedCallback() {
        // add event Listeners
        console.log('cart overvice created')
        window.addEventListener('cart:item-add', (event)=>this.itemAddedHandler(event))
        // render component
        this.render()
    }

    public disconnectedCallback() {
        //remove event Listenes
        //window.removeEventListener('cart:item-add', this.itemAddedHandler)
    }

    itemAddedHandler(event) {
        console.log("handle cart add event")
        this.render();
    }

    private render() {
        const overviewHeader = document.createElement('h1')
        overviewHeader.innerText = 'no items in cart'

        const shadowroot = this.shadowRoot
        shadowroot.append(overviewHeader)

        axios.get('/api/cart/').then(result => {
            const overviewHeader = document.createElement('h1')

            let itemCount = result.data.length
            if(itemCount > 0) {
                overviewHeader.innerText = 'items in cart: ' + itemCount
            } else {
                overviewHeader.innerText = 'no items in cart'
            }

            shadowroot.innerHTML = ''
            shadowroot.append(overviewHeader)

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

            shadowroot.append(itemOutterContainer)
        })
    }
}


customElements.define('cart-overview', CartOverview)