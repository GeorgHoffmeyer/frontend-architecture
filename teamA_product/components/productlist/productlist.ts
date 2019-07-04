class Productlist extends HTMLElement {
    constructor() {
        super();
        /*
        productlist.prototype.createdCallback = function() {
        }
        */

        const shadow = this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('template')
        wrapper.innerHTML = '<p>I am a productlist</p>'
        shadow.appendChild(wrapper.content)

    }
    
    
    connectedCallback() {
        console.log('Custom square element added to page.');
        //updateStyle(this);
    }
    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }
    
    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
        //updateStyle(this);
    }
}

customElements.define('product-list', Productlist)

window.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('product-list');
    setTimeout(() => {
        element.parentNode.removeChild(element);
    }, 2000);
});