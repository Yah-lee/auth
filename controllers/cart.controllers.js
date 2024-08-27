const { Cart, Product } = require("../models/cart.models");

exports.updateQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const product = await Product.findByPk(cartItem.productId);
    const linePrice = product.price * quantity;

    res.json({ linePrice: linePrice.toFixed(2), cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    await cartItem.destroy();

    res.json({ message: "Item removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recalculateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: Product,
    });

    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.quantity * item.Product.price;
    });

    const taxRate = 0.05;
    const shippingRate = 15.0;
    const tax = subtotal * taxRate;
    const shipping = subtotal > 0 ? shippingRate : 0;
    const total = subtotal + tax + shipping;

    res.json({
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
