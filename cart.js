// Simple Cart Management System
class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('FrozenDelightCart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('FrozenDelightCart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(flavor, price, quantity = 1) {
        const existingItem = this.items.find(item => item.flavor === flavor);
        
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            this.items.push({
                flavor,
                price: parseFloat(price.replace('$', '')),
                quantity: parseInt(quantity),
                id: Date.now()
            });
        }
        
        this.saveCart();
        return this.items;
    }

    // Remove item from cart
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        return this.items;
    }

    // Update item quantity
    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, parseInt(quantity));
            this.saveCart();
        }
        return this.items;
    }

    // Get total price
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }

    // Get total items
    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Get all items
    getItems() {
        return this.items;
    }

    // Show cart summary
    showCartSummary() {
        if (this.items.length === 0) {
            Swal.fire({
                title: 'Your Cart is Empty',
                text: 'Start adding some delicious ice creams!',
                icon: 'info',
                confirmButtonColor: '#ec4899'
            });
            return;
        }

        let cartHTML = '<div style="text-align: left; max-height: 300px; overflow-y: auto;">';
        cartHTML += '<table style="width: 100%; border-collapse: collapse;">';
        cartHTML += '<tr style="border-bottom: 1px solid #ddd;"><th>Flavor</th><th>Qty</th><th>Price</th></tr>';
        
        this.items.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            cartHTML += `<tr style="border-bottom: 1px solid #eee;">
                <td>${item.flavor}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal}</td>
            </tr>`;
        });
        
        cartHTML += '</table>';
        cartHTML += `<p style="text-align: right; font-weight: bold; margin-top: 10px;">Total: $${this.getTotal()}</p>`;
        cartHTML += '</div>';

        Swal.fire({
            title: `Your Cart (${this.getTotalItems()} items)`,
            html: cartHTML,
            icon: 'success',
            confirmButtonText: 'Checkout',
            cancelButtonText: 'Continue Shopping',
            showCancelButton: true,
            confirmButtonColor: '#ec4899'
        }).then((result) => {
            if (result.isConfirmed) {
                this.checkout();
            }
        });
    }

    // Checkout
    checkout() {
        if (this.items.length === 0) {
            Swal.fire({
                title: 'Cart Empty',
                text: 'Please add items before checkout',
                icon: 'warning',
                confirmButtonColor: '#ec4899'
            });
            return;
        }

        Swal.fire({
            title: 'Checkout',
            html: `
                <p>Total Amount: <strong style="color: #ec4899;">$${this.getTotal()}</strong></p>
                <p>Items: ${this.getTotalItems()}</p>
            `,
            icon: 'question',
            confirmButtonText: 'Confirm Order',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            confirmButtonColor: '#ec4899'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Order Confirmed!',
                    text: `Thank you for your order! Total: $${this.getTotal()}`,
                    icon: 'success',
                    confirmButtonColor: '#ec4899'
                });
                this.clearCart();
                this.updateCartUI();
            }
        });
    }

    // Update cart UI (cart count display)
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const count = this.getTotalItems();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }
}

// Initialize global cart instance
const creamyBlissCart = new Cart();
