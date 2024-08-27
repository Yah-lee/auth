const { Cart, Product } = require("../models/cart.models");

exports.addItemToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
      priceAtTime: product.price,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.params.userId },
      include: Product,
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
