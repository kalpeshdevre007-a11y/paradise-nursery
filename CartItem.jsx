import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

// CartItem component displays the shopping cart page
function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cart.items);

  // Calculate total amount for all items in cart
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Increment quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity - removes item if quantity reaches zero
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Remove item when quantity reaches zero
      dispatch(removeItem(item.name));
    }
  };

  // Remove item from cart completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Handle checkout button click
  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  // Handle continue shopping - navigate back to product listing
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="navbar-links">
          <a href="#" onClick={handleContinueShopping} className="navbar-link">Home</a>
          <a href="#" onClick={handleContinueShopping} className="navbar-link">Plants</a>
          <span className="cart-icon">
            🛒 <span className="cart-count">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
          </span>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {/* Display total cart amount */}
        <h3 className="cart-total-amount">Total Cart Amount: ${totalAmount.toFixed(2)}</h3>

        {cartItems.length === 0 ? (
          <p>Your cart is empty. <a href="#" onClick={handleContinueShopping}>Continue Shopping</a></p>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item.name}>
              {/* Plant thumbnail */}
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-details">
                {/* Plant name and pricing */}
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">Unit Price: ${item.price}</p>
                <p className="cart-item-total">Total Cost: ${(item.price * item.quantity).toFixed(2)}</p>

                {/* Quantity controls */}
                <div className="cart-item-quantity-controls">
                  <button onClick={() => handleDecrement(item)} className="cart-btn-decrement">-</button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} className="cart-btn-increment">+</button>
                </div>
              </div>

              {/* Delete button */}
              <button onClick={() => handleRemove(item)} className="cart-btn-delete">Delete</button>
            </div>
          ))
        )}

        {/* Action buttons */}
        <div className="cart-actions">
          <button onClick={handleContinueShopping} className="cart-btn-continue">Continue Shopping</button>
          <button onClick={handleCheckout} className="cart-btn-checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
