import axios from 'axios'

class AddToCart extends HTMLElement {
    private itemid = ""
    private itemDescription = ""
    private itemPrice = ""
    private contentWrapper : HTMLDivElement

    public constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'})
        this.contentWrapper = document.createElement('div')
        this.contentWrapper.setAttribute('class', 'cart-element cart-add')

        shadow.appendChild(this.contentWrapper)

        console.log('cart-add element created.')
    }

    public connectedCallback() {
        // render component
        this.render()
    }

    public disconnectedCallback() {

    }

    public attributeChangedCallback(name, oldValue, newValue) {
    }

    private itemAddedHandler(event) {
        this.render();
    }

    private render() {
        const addButton = document.createElement('button')
        addButton.innerText = 'Add Item to Cart'

        if (this.getAttribute('data-cartitem-id')) {
            this.itemid = this.getAttribute('data-cartitem-id')
        } else {
            return
        }

        if (this.getAttribute('data-cartitem-description')) {
            this.itemDescription = this.getAttribute('data-cartitem-description')
        } else {
            return
        }

        if (this.getAttribute('data-cartitem-price')) {
            this.itemPrice = this.getAttribute('data-cartitem-price')
        } else {
            return
        }

        addButton.addEventListener("click", () => this.handleClick())

        this.contentWrapper.append(addButton)
    }

    handleClick() {
        let thizz = this
        axios.put('/api/cart/', {
            "id": this.itemid,
            "description": this.itemDescription,
            "price": this.itemPrice
        }).then(result => {
                console.log(result)
                if (result.status == 200) {
                    console.log("dispatch cart add event")
                    window.dispatchEvent(new CustomEvent('cart:item-add', {bubbles: true}))
                    console.log("event dispached")
                }
            }
        )
    }
}


customElements.define('cart-add', AddToCart)