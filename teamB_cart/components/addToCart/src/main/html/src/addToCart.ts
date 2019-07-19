import axios from 'axios'

class AddToCart extends HTMLElement {
    private itemid = ""
    private itemDescription = ""
    private itemPrice = ""

    public constructor() {
        super();
        this.attachShadow({mode: 'open'})
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

        const shadowroot = this.shadowRoot


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

        shadowroot.append(addButton)
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