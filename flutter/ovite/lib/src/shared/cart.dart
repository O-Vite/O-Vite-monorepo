import 'package:flutter/material.dart';

class CartItem {
  final String id;
  final String title;
  final double price;

  CartItem({required this.id, required this.title, required this.price});
}

class Cart with ChangeNotifier {
  Map<String, CartItem> _items = {};

  Map<String, CartItem> get items => _items;

  void addItem(String productId, double price, String title) {
    if (_items.containsKey(productId)) {
      // Si le produit existe déjà dans le panier, vous pouvez incrémenter la quantité ou mettre à jour le produit
    } else {
      _items.putIfAbsent(
        productId,
        () => CartItem(
          id: DateTime.now().toString(),
          title: title,
          price: price,
        ),
      );
    }
    notifyListeners();
  }

  // Autres méthodes (supprimer, vider le panier, etc.)
}
