# 👑 Dastarkhwan-e-Nizam (Royal Hyderabadi Cuisine)

An authentic, ultra-luxurious, and interactive web application for a premier Indian restaurant specializing in the royal culinary heritage of Hyderabad (Asaf Jahi Nizami gastronomy).

---

## 🌟 Key Features

### 1. 🍲 Imperial Dastarkhwan (Interactive Menu)
- **Authentic Hyderabadi Delicacies**:
  - **Shahi Dum Biryani**: Kacchi Gosht Dum Biryani (cooked raw in clay handi), Nizam's Murgh Biryani, Sofiyani White Biryani (court recipe), and Shahi Subz Biryani.
  - **The Royal Deg**: GI-Tagged 12-Hour Woodfire Shahi Haleem, Mutton Marag (royal wedding broth), and Shahi Nalli Nihari.
  - **Charcoal & Pathar Kebabs**: Historic Pathar ka Gosht (seared on heated river granite stone), Shikampur Kebab (stuffed with hung yogurt & mint), Tala Hua Gosht, and Nizami Paneer Tikka Angara.
  - **Curries & Classic Salans**: Authentic Mirchi ka Salan (roasted peanut, sesame & coconut gravy), Shahi Baghara Baingan, and Dum ka Murgh.
  - **Charminar Breads**: Shahi Sheermal (saffron-brushed), Asaf Jahi Kulcha, and Roomali Roti.
  - **Royal Meetha (Desserts)**: Shahi Double ka Meetha (ghee-toasted bread in saffron rabri), Royal Qubani ka Meetha with clotted malai, and Gil-e-Firdaus.
  - **Chai & Refreshments**: Kadak Irani Chai with Osmania Butter Biscuits and Saffron Badam Sharbat.
- **Search & Live Filters**:
  - Instant live keyword search (by dish name, ingredients, or cooking style).
  - Dietary filters: All, Halal Non-Veg, and Pure Vegetarian.
  - Category tabs with smooth transitions.
  - Sorting: Royal Bestsellers, Highest Rated, Price Low-High, Price High-Low.
- **Interactive Dish Quick-View Modal**:
  - Detailed cooking techniques, ingredient breakdowns, spice profiles, and preparation time.

### 2. 🛍️ Royal Dastarkhwan Cart & Online Ordering
- Slide-out interactive Cart Drawer with animated item counters.
- **Promo Coupon System**:
  - `NIZAM50`: Flat ₹50 discount.
  - `SHAHI10`: 10% Royal Discount.
- Automatic calculation of Subtotal, 5% Restaurant GST, and free packaging for orders above ₹500.
- **Express Dispatch Checkout**:
  - Guest details, address in Hyderabad, delivery slot selection, and payment options (UPI/GPay, Credit/Debit Cards, Cash on Delivery).
  - Royal Order Confirmation Pass with generated Order Token (`DNZ-XXXXXX`), timestamp, ordered delicacies summary, and a 1-click **Print Receipt** feature.
- Automatic synchronization with browser `localStorage`.

### 3. 🏛️ Dawat-e-Khas (Table Reservation System)
- Interactive reservation engine for booking seating in:
  - *Royal Majlis* (Traditional low-seating with plush Persian carpets and velvet bolsters)
  - *Belgian Chandelier Main Darbar*
  - *Charminar View Terrace*
  - *Private Diwan-e-Khas Family Suites*
- Date picker, lunch/dinner slot selector, guest party size (from couples up to 12+ royal banquet banquets).
- Generates an instant royal booking pass with reference code (`NIZAM-RES-XXXX`).

### 4. 🎶 Nizami Royal Ambience (Built-in Audio Synthesizer)
- Integrated Web Audio API harmonic drone playing classical Indian raag frequencies (Sa-Pa drone / sitar & tanpura simulation).
- Requires zero external mp3 files or dependencies.

### 5. 📜 Royal Heritage & The Science of Dum
- Dedicated section demonstrating the **Anatomy of Kacchi Dum Biryani** (Saffron Basmati top, Birista glaze center, Marinated Gosht base).
- Deep dive into the **Geographical Indication (GI) Tagged Hyderabadi Haleem** and the 36-spice potli secret.
- Asaf Jahi Dynasty culinary timeline from 1724 to modern day.

---

## 🚀 How to Run the Website

### Option 1: Direct File Launch (Instant)
Simply double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Run via Built-in PowerShell Server
Open PowerShell in this directory and execute:
```powershell
.\start-server.ps1
```
This automatically starts a local server on `http://localhost:8080/` and opens your default browser.

---

## 📁 Project Structure

```
c:\Practise\
├── index.html        # Main luxury responsive SPA layout
├── styles.css        # Royal gold gradients, glassmorphism, animations & typography
├── data.js           # Structured authentic Hyderabadi menu catalog, reviews & history
├── app.js            # State management, cart drawer, checkout, filters & audio synth
├── start-server.ps1  # Lightweight PowerShell local web server
└── README.md         # Documentation & guide
```

---

## 🎨 Visual Design Palette
- **Obsidian Black**: `#0D0C0E`
- **Royal Nizami Burgundy**: `#3E0E18`
- **Antique Gold Foil**: `#D4AF37` / `#F3E5AB`
- **Emerald Court Green**: `#071E12`
- **Fonts**: *Cinzel* (Imperial Display), *Playfair Display* (Royal Serif), and *Plus Jakarta Sans* (Clean Body)
