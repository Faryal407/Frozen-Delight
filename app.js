// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Function to show order form
    function showOrderForm() {
        Swal.fire({
            title: 'Place Your Order',
            html: `
                <div style="text-align: left;">
                    <input type="text" id="customerName" class="swal2-input" placeholder="Your Name" style="width: 85%; margin-bottom: 10px;">
                    <input type="email" id="customerEmail" class="swal2-input" placeholder="Your Email" style="width: 85%; margin-bottom: 10px;">
                    <select id="flavorSelect" class="swal2-input" style="width: 100%; margin-bottom: 10px;">
                        <option value="">Select Flavor</option>
                        <option value="Strawberry">Strawberry Ice Cream</option>
                        <option value="Chocolate">Chocolate Ice Cream</option>
                        <option value="Vanilla">Vanilla Ice Cream</option>
                        <option value="Mix Berry">Mix Berry Ice Cream</option>
                    </select>
                    <input type="number" id="quantity" min="1" max="10" value="1" class="swal2-input" placeholder="Quantity" style="width: 85%;">
                </div>
            `,
            confirmButtonText: 'Place Order',
            confirmButtonColor: '#ec4899',
            showCancelButton: true,
            heightAuto: false, // prevent automatic height that causes scroll
            
            preConfirm: () => {
                const name = document.getElementById('customerName').value;
                const email = document.getElementById('customerEmail').value;
                const flavor = document.getElementById('flavorSelect').value;
                const quantity = document.getElementById('quantity').value;
                
                if (!name || !email || !flavor || !quantity) {
                    Swal.showValidationMessage('Please fill all fields');
                    return false;
                }
                
                if (!email.includes('@')) {
                    Swal.showValidationMessage('Please enter a valid email');
                    return false;
                }
                
                return { name, email, flavor, quantity };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, email, flavor, quantity } = result.value;
                Swal.fire({
                    title: 'Order Confirmed!',
                    html: `
                        <p><strong>Thank you ${name}!</strong></p>
                        <p>Order Details:</p>
                        <p><strong>Flavor:</strong> ${flavor}</p>
                        <p><strong>Quantity:</strong> ${quantity}</p>
                        <p><strong>Order confirmation sent to:</strong> ${email}</p>
                    `,
                    icon: 'success',
                    confirmButtonColor: '#ec4899'
                });
            }
        });
    }
    
    // Add click event to all Order Now buttons
    const allOrderBtns = document.querySelectorAll('.btn1, .btn2, .btn3, .btn4');
    
    allOrderBtns.forEach(btn => {
        btn.addEventListener('click', showOrderForm);
    });

    // Card click events with Sweet Alert
    const iceCreamCards = document.querySelectorAll('.icecream1, .icecream2, .icecream3, .icecream4');

    iceCreamCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h2').textContent;
            const price = this.querySelector('h1').textContent;
            const flavor = this.querySelector('h3').textContent;
            
            Swal.fire({
                title: title,
                html: `<p><strong>${flavor}</strong></p><p style="font-size: 20px; color: #ec4899; font-weight: bold;">${price}</p>`,
                icon: 'info',
                confirmButtonText: 'Add to Cart',
                confirmButtonColor: '#ec4899',
                showCancelButton: true,
                cancelButtonText: 'Continue Shopping'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Extract price and flavor, then add to cart
                    const priceText = price.trim();
                    creamyBlissCart.addItem(title, priceText, 1);
                    creamyBlissCart.updateCartUI();
                    
                    Swal.fire({
                        title: 'Added to Cart!',
                        text: `${title} has been added to your cart`,
                        icon: 'success',
                        confirmButtonColor: '#ec4899'
                    });
                }
            });
        });
        
        // Add hover effect
        card.style.cursor = 'pointer';
    });

        // Initialize cart UI
        creamyBlissCart.updateCartUI();

        // Add view cart button handler
        const viewCartBtn = document.getElementById('view-cart-btn');
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', () => {
                creamyBlissCart.showCartSummary();
            });
        }
    });

window.addEventListener('load', function() {
    Swal.fire({
        title: 'Welcome to FrozenDelight !',
        text: 'The sweetest ice cream experience!',
        icon: 'info',
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: '#ec4899'
    });
});


//form fill
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload
  // Show SweetAlert2 popup
  Swal.fire({
    icon: 'success',
    title: 'Message Sent!',
    text: '✅ Your message has been sent successfully!',
    confirmButtonColor: '#ec4899', // pink to match your theme
    timer: 2500,
    timerProgressBar: true
  });

  contactForm.reset(); // reset form fields
});


//form message
let form = document.getElementById("contact");
let formMessage = document.getElementById("formMessage");
let submitBtn = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.style.color = "green";
  formMessage.style.fontWeight = "bold";
  
  formMessage.innerText = "✅ Your message has been sent successfully!";
  form.reset();
});