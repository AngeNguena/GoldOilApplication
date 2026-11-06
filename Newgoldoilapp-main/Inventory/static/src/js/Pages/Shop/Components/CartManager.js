// Cart management utilities

export const getCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch event for cart updates
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.product_id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product_id: product.id,
      name: product.name,
      reference: product.reference,
      unit_price: product.unit_price,
      quantity: quantity,
      image_url: product.image_url,
      stock_quantity: product.stock_quantity,
    });
  }
  
  saveCart(cart);
  return cart;
};

export const updateCartItem = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find(item => item.product_id === productId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const newCart = cart.filter(item => item.product_id !== productId);
  saveCart(newCart);
  return newCart;
};

export const clearCart = () => {
  saveCart([]);
  return [];
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};