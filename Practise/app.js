/**
 * Dastarkhwan-e-Nizam - Interactive Application Logic
 * Menu rendering, Cart drawer, Customizer, Table Reservations, Audio Ambience, Checkout
 */

// State
let cart = JSON.parse(localStorage.getItem('nizami_cart')) || [];
let currentCategory = 'all';
let searchQuery = '';
let dietaryFilter = 'all'; // 'all', 'veg', 'non-veg'
let sortBy = 'popular';
let appliedPromo = null;
let isAudioPlaying = false;
let audioContext = null;
let audioOscillators = [];

// Initialize on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    renderCategories();
    renderMenuItems();
    updateCartUI();
    initReservationForm();
    initModals();
    renderHeritageTimeline();
    renderReviews();
    initSearchAndFilters();
    initAmbientAudio();
    lucide.createIcons();
});

/* ========================================================
   NAVIGATION & HEADER
   ======================================================== */
function initHeader() {
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-[#D4AF37]/30');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-[#D4AF37]/30');
            navbar.classList.add('bg-transparent');
        }
    });

    // Mobile nav toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }
}

/* ========================================================
   CATEGORY TABS & FILTERS
   ======================================================== */
function renderCategories() {
    const container = document.getElementById('category-pills-container');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
        <button 
            onclick="selectCategory('${cat.id}')"
            id="cat-btn-${cat.id}"
            class="category-btn flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/30 text-sm font-medium transition-all duration-300 whitespace-nowrap ${currentCategory === cat.id ? 'active' : 'text-[#E2DFE7] bg-[#16141B] hover:border-[#D4AF37]'}">
            <span>${cat.name}</span>
        </button>
    `).join('');
}

function selectCategory(catId) {
    currentCategory = catId;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('text-[#E2DFE7]', 'bg-[#16141B]');
    });
    const activeBtn = document.getElementById(`cat-btn-${catId}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.classList.remove('text-[#E2DFE7]', 'bg-[#16141B]');
    }
    renderMenuItems();
}

function initSearchAndFilters() {
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderMenuItems();
        });
    }

    // Dietary filter buttons
    document.querySelectorAll('.dietary-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.dietary-filter-btn').forEach(b => {
                b.classList.remove('bg-[#D4AF37]', 'text-black', 'font-bold');
                b.classList.add('text-gray-300', 'bg-[#1D1A23]');
            });
            btn.classList.add('bg-[#D4AF37]', 'text-black', 'font-bold');
            btn.classList.remove('text-gray-300', 'bg-[#1D1A23]');
            dietaryFilter = btn.dataset.dietary;
            renderMenuItems();
        });
    });

    // Sort selector
    const sortSelect = document.getElementById('menu-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortBy = e.target.value;
            renderMenuItems();
        });
    }
}

/* ========================================================
   MENU ITEM RENDERING
   ======================================================== */
function renderMenuItems() {
    const container = document.getElementById('menu-items-grid');
    if (!container) return;

    let items = MENU_ITEMS.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery) || 
                              item.description.toLowerCase().includes(searchQuery) ||
                              item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery));
        const matchesDietary = dietaryFilter === 'all' || 
                               (dietaryFilter === 'veg' && item.isVeg) || 
                               (dietaryFilter === 'nonveg' && !item.isVeg);
        return matchesCategory && matchesSearch && matchesDietary;
    });

    // Sorting
    if (sortBy === 'price-low') {
        items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        items.sort((a, b) => b.rating - a.rating);
    } else {
        // popular: bestsellers first
        items.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-16 text-center text-gray-400">
                <i data-lucide="utensils-crossed" class="w-16 h-16 mx-auto mb-4 text-[#D4AF37]/50"></i>
                <h3 class="font-cinzel text-xl text-white mb-2">No Royal Delicacies Found</h3>
                <p class="text-sm">Try broadening your search or switching culinary categories.</p>
                <button onclick="resetFilters()" class="mt-4 px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                    Reset All Filters
                </button>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = items.map(item => {
        const cartItem = cart.find(c => c.id === item.id);
        const inCartQty = cartItem ? cartItem.quantity : 0;

        return `
            <div class="royal-card rounded-2xl overflow-hidden flex flex-col group">
                <!-- Image & Badges -->
                <div class="relative h-56 overflow-hidden bg-black/50 cursor-pointer" onclick="openDishDetail('${item.id}')">
                    <img 
                        src="${item.image}" 
                        alt="${item.name}" 
                        loading="lazy"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#16141B] via-transparent to-black/30"></div>

                    <!-- Dietary & Bestseller Badges -->
                    <div class="absolute top-3 left-3 flex flex-wrap gap-2 items-center">
                        <span class="${item.isVeg ? 'dot-veg' : 'dot-nonveg'} bg-black/60 p-1 backdrop-blur-sm" title="${item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian (Halal)'}"></span>
                        ${item.isBestseller ? `
                            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg">
                                Royal Choice
                            </span>
                        ` : ''}
                        ${item.category === 'deg' && item.tags.includes('GI Certified') ? `
                            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-[#0D2818] border border-emerald-500 text-emerald-300">
                                ✦ GI Tagged
                            </span>
                        ` : ''}
                    </div>

                    <!-- Rating Tag -->
                    <div class="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D4AF37]/40 flex items-center gap-1.5 text-xs text-white">
                        <i data-lucide="star" class="w-3.5 h-3.5 star-fill fill-amber-400"></i>
                        <span class="font-bold">${item.rating}</span>
                        <span class="text-gray-400 text-[10px]">(${item.reviewCount})</span>
                    </div>

                    <!-- Cooking Technique Overlay -->
                    <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-amber-200/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                        <span class="flex items-center gap-1">
                            <i data-lucide="flame" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            ${item.cookingStyle}
                        </span>
                        <span>${item.prepTime}</span>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between gap-2 mb-2">
                            <h3 class="font-playfair text-xl font-bold text-white hover:text-[#D4AF37] transition-colors cursor-pointer" onclick="openDishDetail('${item.id}')">
                                ${item.name}
                            </h3>
                            <span class="text-xs px-2 py-0.5 rounded border border-[#D4AF37]/30 text-amber-300 whitespace-nowrap">
                                ${item.spiceLevel}
                            </span>
                        </div>

                        <p class="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                            ${item.description}
                        </p>

                        <!-- Key Ingredients snippet -->
                        <div class="flex flex-wrap gap-1.5 mb-4">
                            ${item.ingredients.slice(0, 3).map(ing => `
                                <span class="text-[11px] bg-[#221F28] text-gray-300 px-2 py-0.5 rounded-md border border-white/5">
                                    ${ing}
                                </span>
                            `).join('')}
                            ${item.ingredients.length > 3 ? `<span class="text-[10px] text-amber-400/80 pt-0.5">+${item.ingredients.length - 3} more</span>` : ''}
                        </div>
                    </div>

                    <!-- Price & Cart Action -->
                    <div class="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                        <div>
                            <span class="text-xs text-gray-400 block">Royal Serving</span>
                            <div class="text-2xl font-bold text-white font-cinzel">
                                <span class="text-[#D4AF37]">₹</span>${item.price}
                            </div>
                        </div>

                        <div id="btn-container-${item.id}">
                            ${inCartQty > 0 ? `
                                <div class="flex items-center bg-[#241F2D] border border-[#D4AF37] rounded-full p-1 gap-2">
                                    <button onclick="decrementItem('${item.id}')" class="w-7 h-7 rounded-full bg-[#18151E] text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors">
                                        <i data-lucide="minus" class="w-3.5 h-3.5"></i>
                                    </button>
                                    <span class="font-bold text-sm px-1 text-white">${inCartQty}</span>
                                    <button onclick="incrementItem('${item.id}')" class="w-7 h-7 rounded-full bg-[#18151E] text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors">
                                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                                    </button>
                                </div>
                            ` : `
                                <button 
                                    onclick="addToCart('${item.id}')" 
                                    class="px-4 py-2 rounded-full bg-[#1E1B24] border border-[#D4AF37]/50 text-[#F5E084] hover:bg-[#D4AF37] hover:text-black text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md">
                                    <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                                    <span>Add to Feast</span>
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    lucide.createIcons();
}

function resetFilters() {
    currentCategory = 'all';
    searchQuery = '';
    dietaryFilter = 'all';
    sortBy = 'popular';
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) searchInput.value = '';
    renderCategories();
    renderMenuItems();
}

/* ========================================================
   CART OPERATIONS & SLIDE-OUT DRAWER
   ======================================================== */
function addToCart(itemId, size = 'Regular') {
    const item = MENU_ITEMS.find(m => m.id === itemId);
    if (!item) return;

    const existing = cart.find(c => c.id === itemId && c.size === size);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            isVeg: item.isVeg,
            size: size,
            quantity: 1,
            spicePreference: item.spiceLevel
        });
    }

    saveCart();
    renderMenuItems();
    updateCartUI();
    showToast(`Added ${item.name} to Dastarkhwan!`, 'success');

    // Trigger cart badge bounce
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.classList.add('cart-bump');
        setTimeout(() => badge.classList.remove('cart-bump'), 400);
    }
}

function incrementItem(itemId, size = 'Regular') {
    const item = cart.find(c => c.id === itemId && c.size === size);
    if (item) {
        item.quantity += 1;
        saveCart();
        renderMenuItems();
        updateCartUI();
    }
}

function decrementItem(itemId, size = 'Regular') {
    const index = cart.findIndex(c => c.id === itemId && c.size === size);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        saveCart();
        renderMenuItems();
        updateCartUI();
    }
}

function removeItem(itemId, size = 'Regular') {
    cart = cart.filter(c => !(c.id === itemId && c.size === size));
    saveCart();
    renderMenuItems();
    updateCartUI();
    showToast('Item removed from Dastarkhwan', 'info');
}

function saveCart() {
    localStorage.setItem('nizami_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

    if (badge) {
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    // Floating cart bar (mobile)
    const mobileCartBar = document.getElementById('mobile-cart-bar');
    if (mobileCartBar) {
        if (totalItems > 0) {
            mobileCartBar.classList.remove('translate-y-full');
            document.getElementById('mobile-cart-count').textContent = `${totalItems} Items`;
            document.getElementById('mobile-cart-total').textContent = `₹${calculateCartTotal().subtotal}`;
        } else {
            mobileCartBar.classList.add('translate-y-full');
        }
    }

    renderCartDrawerItems();
}

function calculateCartTotal() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05); // 5% GST
    const delivery = subtotal > 500 || subtotal === 0 ? 0 : 49;
    
    let discount = 0;
    if (appliedPromo) {
        if (appliedPromo.type === 'flat') {
            discount = appliedPromo.amount;
        } else if (appliedPromo.type === 'percentage') {
            discount = Math.round((subtotal * appliedPromo.percentage) / 100);
        }
    }
    const finalTotal = Math.max(0, subtotal + gst + delivery - discount);

    return { subtotal, gst, delivery, discount, finalTotal };
}

function renderCartDrawerItems() {
    const listContainer = document.getElementById('cart-items-list');
    const summaryContainer = document.getElementById('cart-summary-section');
    const emptyContainer = document.getElementById('cart-empty-state');
    if (!listContainer) return;

    if (cart.length === 0) {
        listContainer.innerHTML = '';
        if (emptyContainer) emptyContainer.classList.remove('hidden');
        if (summaryContainer) summaryContainer.classList.add('hidden');
        return;
    }

    if (emptyContainer) emptyContainer.classList.add('hidden');
    if (summaryContainer) summaryContainer.classList.remove('hidden');

    listContainer.innerHTML = cart.map(item => `
        <div class="p-3 bg-[#1B1822] rounded-xl border border-white/5 flex items-center gap-3">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                    <span class="${item.isVeg ? 'dot-veg' : 'dot-nonveg'} scale-75"></span>
                    <h4 class="font-medium text-white text-sm truncate">${item.name}</h4>
                </div>
                <div class="text-xs text-amber-300 font-cinzel mt-1">₹${item.price} each</div>
                <div class="text-[11px] text-gray-400">Pref: ${item.spicePreference}</div>
            </div>

            <!-- Quantity Controls -->
            <div class="flex flex-col items-end gap-1.5">
                <div class="flex items-center bg-[#25212E] border border-[#D4AF37]/30 rounded-full p-0.5">
                    <button onclick="decrementItem('${item.id}', '${item.size}')" class="w-6 h-6 rounded-full text-gray-300 hover:text-white flex items-center justify-center">
                        <i data-lucide="minus" class="w-3 h-3"></i>
                    </button>
                    <span class="text-xs font-bold px-2 text-white">${item.quantity}</span>
                    <button onclick="incrementItem('${item.id}', '${item.size}')" class="w-6 h-6 rounded-full text-gray-300 hover:text-white flex items-center justify-center">
                        <i data-lucide="plus" class="w-3 h-3"></i>
                    </button>
                </div>
                <button onclick="removeItem('${item.id}', '${item.size}')" class="text-gray-500 hover:text-red-400 text-xs flex items-center gap-1">
                    <i data-lucide="trash-2" class="w-3 h-3"></i>
                </button>
            </div>
        </div>
    `).join('');

    const totals = calculateCartTotal();
    document.getElementById('summary-subtotal').textContent = `₹${totals.subtotal}`;
    document.getElementById('summary-gst').textContent = `₹${totals.gst}`;
    document.getElementById('summary-delivery').textContent = totals.delivery === 0 ? 'FREE' : `₹${totals.delivery}`;
    
    const discountRow = document.getElementById('summary-discount-row');
    if (totals.discount > 0) {
        discountRow.classList.remove('hidden');
        document.getElementById('summary-discount').textContent = `-₹${totals.discount}`;
    } else {
        discountRow.classList.add('hidden');
    }

    document.getElementById('summary-final').textContent = `₹${totals.finalTotal}`;

    lucide.createIcons();
}

function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (!drawer || !overlay) return;

    renderCartDrawerItems();
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        drawer.classList.remove('translate-x-full');
    }, 10);
}

function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (!drawer || !overlay) return;

    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 300);
}

function applyPromoCode() {
    const codeInput = document.getElementById('promo-input');
    if (!codeInput) return;
    const code = codeInput.value.trim().toUpperCase();

    if (code === 'NIZAM50') {
        appliedPromo = { code: 'NIZAM50', type: 'flat', amount: 50 };
        showToast('NIZAM50 applied: ₹50 Off!', 'success');
    } else if (code === 'SHAHI10') {
        appliedPromo = { code: 'SHAHI10', type: 'percentage', percentage: 10 };
        showToast('SHAHI10 applied: 10% Royal Discount!', 'success');
    } else {
        showToast('Invalid Coupon. Try NIZAM50 or SHAHI10', 'error');
        return;
    }
    codeInput.value = '';
    renderCartDrawerItems();
}

/* ========================================================
   CHECKOUT & ROYAL ORDER CONFIRMATION
   ======================================================== */
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Your Dastarkhwan is empty! Add royal delicacies first.', 'error');
        return;
    }
    closeCartDrawer();
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        const totals = calculateCartTotal();
        document.getElementById('checkout-modal-total').textContent = `₹${totals.finalTotal}`;
        modal.classList.remove('hidden');
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('hidden');
}

function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const address = document.getElementById('order-address').value;
    const notes = document.getElementById('order-notes').value;
    const payment = document.querySelector('input[name="payment-method"]:checked').value;
    const totals = calculateCartTotal();

    const orderId = 'DNZ-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        customer: { name, phone, address, notes },
        items: [...cart],
        totals,
        paymentMethod: payment
    };

    // Save in storage
    const pastOrders = JSON.parse(localStorage.getItem('nizami_past_orders')) || [];
    pastOrders.unshift(orderData);
    localStorage.setItem('nizami_past_orders', JSON.stringify(pastOrders));

    // Clear cart
    cart = [];
    appliedPromo = null;
    saveCart();
    renderMenuItems();
    updateCartUI();
    closeCheckoutModal();

    // Show confirmation pass
    showOrderPassModal(orderData);
}

function showOrderPassModal(order) {
    const modal = document.getElementById('order-confirmation-modal');
    if (!modal) return;

    document.getElementById('conf-order-id').textContent = order.orderId;
    document.getElementById('conf-order-time').textContent = order.date;
    document.getElementById('conf-order-name').textContent = order.customer.name;
    document.getElementById('conf-order-phone').textContent = order.customer.phone;
    document.getElementById('conf-order-payment').textContent = order.paymentMethod.toUpperCase();
    document.getElementById('conf-order-total').textContent = `₹${order.totals.finalTotal}`;

    const itemsList = document.getElementById('conf-order-items');
    itemsList.innerHTML = order.items.map(i => `
        <div class="flex justify-between text-xs py-1 text-gray-300 border-b border-white/5">
            <span>${i.name} × ${i.quantity}</span>
            <span class="font-cinzel text-amber-300">₹${i.price * i.quantity}</span>
        </div>
    `).join('');

    modal.classList.remove('hidden');
    playRoyalChime();
    showToast('Your Royal Order has been accepted by the Khansamas!', 'success');
}

function closeOrderConfirmationModal() {
    const modal = document.getElementById('order-confirmation-modal');
    if (modal) modal.classList.add('hidden');
}

/* ========================================================
   TABLE RESERVATION SYSTEM ("DAWAT-E-KHAS")
   ======================================================== */
function initReservationForm() {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        // Minimum date is today
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    const form = document.getElementById('table-reservation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const guestName = document.getElementById('res-name').value;
            const phone = document.getElementById('res-phone').value;
            const email = document.getElementById('res-email').value;
            const date = document.getElementById('res-date').value;
            const time = document.getElementById('res-time').value;
            const guests = document.getElementById('res-guests').value;
            const seating = document.getElementById('res-seating').value;
            const requests = document.getElementById('res-requests').value;

            const bookingRef = 'NIZAM-RES-' + Math.floor(1000 + Math.random() * 9000);
            const reservation = {
                bookingRef,
                guestName,
                phone,
                email,
                date,
                time,
                guests,
                seating,
                requests,
                createdAt: new Date().toISOString()
            };

            const existingBookings = JSON.parse(localStorage.getItem('nizami_bookings')) || [];
            existingBookings.push(reservation);
            localStorage.setItem('nizami_bookings', JSON.stringify(existingBookings));

            // Display Royal Pass
            showReservationPass(reservation);
            form.reset();
            if (dateInput) dateInput.value = today;
        });
    }
}

function showReservationPass(res) {
    const modal = document.getElementById('reservation-pass-modal');
    if (!modal) return;

    document.getElementById('pass-booking-ref').textContent = res.bookingRef;
    document.getElementById('pass-guest-name').textContent = res.guestName;
    document.getElementById('pass-date-time').textContent = `${res.date} at ${res.time}`;
    document.getElementById('pass-guests').textContent = `${res.guests} Royal Guests`;
    document.getElementById('pass-seating').textContent = res.seating;

    modal.classList.remove('hidden');
    playRoyalChime();
    showToast('Your Royal Table has been reserved!', 'success');
}

function closeReservationPass() {
    const modal = document.getElementById('reservation-pass-modal');
    if (modal) modal.classList.add('hidden');
}

/* ========================================================
   DISH QUICK DETAIL MODAL
   ======================================================== */
function openDishDetail(itemId) {
    const item = MENU_ITEMS.find(m => m.id === itemId);
    if (!item) return;

    const modal = document.getElementById('dish-detail-modal');
    if (!modal) return;

    document.getElementById('modal-dish-img').src = item.image;
    document.getElementById('modal-dish-title').textContent = item.name;
    document.getElementById('modal-dish-price').textContent = `₹${item.price}`;
    document.getElementById('modal-dish-desc').textContent = item.description;
    document.getElementById('modal-dish-style').textContent = item.cookingStyle;
    document.getElementById('modal-dish-spice').textContent = item.spiceLevel;
    document.getElementById('modal-dish-preptime').textContent = item.prepTime;

    const ingContainer = document.getElementById('modal-dish-ingredients');
    ingContainer.innerHTML = item.ingredients.map(ing => `
        <span class="px-3 py-1 bg-[#25212E] border border-[#D4AF37]/30 rounded-full text-xs text-amber-200">
            ${ing}
        </span>
    `).join('');

    const actionBtn = document.getElementById('modal-dish-add-btn');
    actionBtn.onclick = () => {
        addToCart(item.id);
        closeDishDetail();
    };

    modal.classList.remove('hidden');
}

function closeDishDetail() {
    const modal = document.getElementById('dish-detail-modal');
    if (modal) modal.classList.add('hidden');
}

/* ========================================================
   HERITAGE TIMELINE & REVIEWS
   ======================================================== */
function renderHeritageTimeline() {
    const container = document.getElementById('heritage-timeline-container');
    if (!container) return;

    container.innerHTML = HERITAGE_TIMELINE.map((item, idx) => `
        <div class="relative pl-8 pb-10 border-l-2 border-[#D4AF37]/30 last:border-l-0 last:pb-0">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#0D0C0E] shadow-[0_0_10px_#D4AF37]"></div>
            <div class="text-[#D4AF37] font-cinzel font-bold text-sm tracking-widest">${item.year}</div>
            <h4 class="text-xl font-bold font-playfair text-white mt-1 mb-2">${item.title}</h4>
            <p class="text-gray-400 text-sm leading-relaxed">${item.description}</p>
        </div>
    `).join('');
}

function renderReviews() {
    const container = document.getElementById('reviews-grid');
    if (!container) return;

    container.innerHTML = REVIEWS.map(r => `
        <div class="royal-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-1 text-amber-400 mb-4">
                    ${Array(r.rating).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>`).join('')}
                </div>
                <p class="text-gray-300 text-sm leading-relaxed italic mb-6">"${r.comment}"</p>
            </div>
            <div class="flex items-center gap-3 pt-4 border-t border-white/10">
                <img src="${r.avatar}" alt="${r.author}" class="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/40">
                <div>
                    <h5 class="text-white font-semibold text-sm">${r.author}</h5>
                    <p class="text-[#D4AF37] text-xs">${r.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

/* ========================================================
   AMBIENT NIZAMI AUDIO (Web Audio API Synthesizer)
   Creates a gentle royal tanpura / sitar harmonic drone
   ======================================================== */
function initAmbientAudio() {
    const toggleBtn = document.getElementById('ambient-sound-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        if (!isAudioPlaying) {
            startRoyalAmbience();
            toggleBtn.classList.add('playing');
            document.getElementById('sound-icon').setAttribute('data-lucide', 'volume-2');
            document.getElementById('sound-status').textContent = 'Sitar Mood: ON';
            showToast('Nizami Sitar Ambience Playing', 'info');
        } else {
            stopRoyalAmbience();
            toggleBtn.classList.remove('playing');
            document.getElementById('sound-icon').setAttribute('data-lucide', 'volume-x');
            document.getElementById('sound-status').textContent = 'Music: Muted';
            showToast('Ambience Muted', 'info');
        }
        lucide.createIcons();
    });
}

function startRoyalAmbience() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioContext = new AudioContextClass();

        // Fundamental drone frequencies (Sa - Pa - Sa in Indian classical music: D2 = 73.42Hz, A2 = 110Hz, D3 = 146.83Hz)
        const notes = [73.42, 110.00, 146.83, 220.00];

        notes.forEach((freq, idx) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);

            // Gentle pulsating LFO
            const lfo = audioContext.createOscillator();
            const lfoGain = audioContext.createGain();
            lfo.frequency.setValueAtTime(0.2 + (idx * 0.1), audioContext.currentTime);
            lfoGain.gain.setValueAtTime(0.015, audioContext.currentTime);
            lfo.connect(lfoGain.gain);

            gain.gain.setValueAtTime(0.025 / (idx + 1), audioContext.currentTime);
            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start();
            lfo.start();
            audioOscillators.push(osc, lfo);
        });

        isAudioPlaying = true;
    } catch (e) {
        console.warn('Audio Autoplay restricted or failed:', e);
    }
}

function stopRoyalAmbience() {
    audioOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    audioOscillators = [];
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    isAudioPlaying = false;
}

function playRoyalChime() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const chords = [587.33, 739.99, 880.00, 1174.66]; // D Major Arpeggio chime
        chords.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + (i * 0.08));

            gain.gain.setValueAtTime(0.08, ctx.currentTime + (i * 0.08));
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2 + (i * 0.08));

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + (i * 0.08));
            osc.stop(ctx.currentTime + 1.5 + (i * 0.08));
        });
    } catch (e) {}
}

/* ========================================================
   TOAST NOTIFICATION UTILITY
   ======================================================== */
function showToast(message, type = 'info') {
    const toast = document.getElementById('royal-toast');
    if (!toast) return;

    const iconEl = document.getElementById('toast-icon');
    const msgEl = document.getElementById('toast-msg');

    msgEl.textContent = message;

    if (type === 'success') {
        iconEl.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>';
    } else if (type === 'error') {
        iconEl.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5 text-rose-400"></i>';
    } else {
        iconEl.innerHTML = '<i data-lucide="sparkles" class="w-5 h-5 text-[#D4AF37]"></i>';
    }
    lucide.createIcons();

    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3200);
}

function initModals() {
    // Esc key close support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartDrawer();
            closeCheckoutModal();
            closeReservationPass();
            closeDishDetail();
            closeOrderConfirmationModal();
        }
    });
}
