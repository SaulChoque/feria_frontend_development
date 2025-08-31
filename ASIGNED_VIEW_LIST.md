# 📱 *Complete Application Views Documentation*
### Koneque Marketplace - Sistema de Comercio Electrónico

---

## 🏠 *Main Application Structure*

### *1. 🌐 Main Layout*
- *Header/Navigation*: Top navigation bar with user authentication
- *Main Content Area*: Product grid/list and search functionality
- *Mobile Menu*: Responsive hamburger menu for mobile devices

---

## 📋 *Complete Views & Modals Inventory*

### *🛍 Core Marketplace Views*

#### *1. 🏪 Main Marketplace View*
- *States*: products, searchQuery, selectedCategory, selectedCondition, selectedLocation, priceRange
- *Purpose*: Display product catalog with search and filtering
- *Features*: Grid/list view, advanced search, category filters

#### *2. 🛒 Shopping Cart Sheet* (isCartOpen)
- *State*: setIsCartOpen
- *Purpose*: Display and manage cart items
- *Features*: Add/remove items, quantity management, checkout preview

#### *3. 📱 Mobile Menu* (showMobileMenu)
- *State*: setShowMobileMenu
- *Purpose*: Mobile navigation for smaller screens
- *Features*: Responsive navigation, user menu access

---

### *👤 User Authentication & Profile*

#### *4. 🔐 User Dropdown* (showUserDropdown)
- *State*: setShowUserDropdown
- *Purpose*: User account management and quick actions
- *Features*: Profile access, balance display, logout

#### *5. 💰 Balance Display* (showBalance)
- *State*: setShowBalance
- *Purpose*: Show/hide wallet balance and USD conversion
- *Features*: Toggle balance visibility, loading states

---

### *🛍 Product Management*

#### *6. 📋 Product Detail Sheet* (productDetailOpen)
- *State*: setProductDetailOpen, selectedProductDetail
- *Purpose*: Detailed product view with purchase options
- *Features*: Image gallery, full description, add to cart, contact seller

#### *7. 👨‍💼 Seller Dashboard* (isSellerDashboardOpen)
- *State*: setIsSellerDashboardOpen
- *Purpose*: Seller management interface
- *Features*: Add products, manage inventory, seller tools

#### *8. 📞 Contact Seller* (contactSellerOpen)
- *State*: setContactSellerOpen, selectedSeller
- *Purpose*: Communication interface with product sellers
- *Features*: Message sending, seller information

---

### *💳 Sales Management System*

#### *9. 📊 Sales Modal* (showSalesModal)
- *State*: setShowSalesModal, selectedSaleProduct
- *Purpose*: Seller's sales tracking and management
- *Features*: 3-stage progress tracking, sales metrics, earnings

*Sales Stages*:
- 🔄 *Stage 1*: Payment Received (pago_recibido)
- 📦 *Stage 2*: Product Delivered (producto_entregado)
- ✅ *Stage 3*: Transaction Completed (finalizado)

---

### *🛒 Purchase Management System*

#### *10. 📦 Purchases Modal* (showPurchasesModal)
- *State*: setShowPurchasesModal, selectedPurchaseProduct
- *Purpose*: Buyer's purchase tracking and management
- *Features*: Order tracking, dispute initiation, rating system

*Purchase Statuses*:
- ⏳ *Pending*: pendiente
- ✅ *Completed*: completado
- ⚖️ *Disputed*: disputa
- 🔍 *Under Review*: en revision

---

### *⚖️ Advanced Dispute Resolution System*

#### *11. 🚨 Create Dispute Modal* (showDisputeModal)
- *State*: setShowDisputeModal, disputeProduct, disputeReason, disputeDescription, disputeImages
- *Purpose*: Buyer initiates dispute with evidence
- *Features*: Reason selection, detailed description, image upload (up to 5 images)

#### *12. 🔍 Dispute Review Modal* (showDisputeReviewModal)
- *State*: setShowDisputeReviewModal, reviewingDisputeProduct, currentImageIndex
- *Purpose*: Seller reviews and responds to disputes
- *Features*: Evidence gallery navigation, response options

#### *13. 📝 Appeal Modal* (showAppealModal)
- *State*: setShowAppealModal, appealProduct, appealReason, appealDescription, appealImages
- *Purpose*: Seller appeals dispute decision
- *Features*: Appeal form, additional evidence upload

#### *14. 👁 Appeal Review Modal* (showAppealReviewModal)
- *State*: setShowAppealReviewModal, appealReviewProduct
- *Purpose*: Buyer reviews seller's appeal
- *Features*: Appeal evaluation, decision making

---

### *👥 Community Jury System*
#### *15. ⚖️ Jury Reviews Modal* (showReviewsModal)
- *State*: setShowReviewsModal
- *Purpose*: Community jury dispute resolution interface
- *Features*: 
  - Case presentation with evidence gallery
  - Binary voting system: "Successful Dispute" vs "Failed Dispute"  
  - Jury level display
  - Community decision making

---

### *🎯 Multi-Context Referral System*

#### *16. 🔗 Main Referrals Modal* (showReferralsModal)
- *State*: setShowReferralsModal, referralsContext, selectedReferral
- *Purpose*: Comprehensive referral program management
- *Contexts*: 
  - 'navbar': General program information
  - 'seller': Seller-specific referral management
  - 'buyer': Buyer referral tracking

#### *17. ➕ Add Referral Modal* (showAddReferralModal)
- *State*: setShowAddReferralModal, newReferral
- *Purpose*: Add new referrals with detailed information
- *Features*: 
  - Name, wallet address, referral code input
  - Validity date setting
  - Form validation

---