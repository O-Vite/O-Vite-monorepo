import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class CartItem {
  final String id;
  final String title;
  final double price;

  CartItem({required this.id, required this.title, required this.price});

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'price': price,
      };

  static CartItem fromJson(Map<String, dynamic> json) {
    return CartItem(
      id: json['id'],
      title: json['title'],
      price: json['price'],
    );
  }
}

class Cart with ChangeNotifier {
  Map<String, CartItem> _items = {};

  Map<String, CartItem> get items => _items;

  Future<void> loadItems() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? cartData = prefs.getString('cartItems');
    if (cartData != null) {
      Map<String, dynamic> extractedData = json.decode(cartData);
      Map<String, CartItem> loadedItems = {};
      extractedData.forEach((productId, cartItem) {
        loadedItems[productId] = CartItem.fromJson(cartItem);
      });
      _items = loadedItems;
      notifyListeners();
    }
  }

  void addItem(String productId, double price, String title) {
    if (_items.containsKey(productId)) {
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
    saveItems();
  }

  Future<void> saveItems() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('cartItems',
        json.encode(_items.map((key, item) => MapEntry(key, item.toJson()))));
    notifyListeners();
  }

  void removeItem(String productId) {
    if (_items.containsKey(productId)) {
      _items.remove(productId);
      notifyListeners();
    }
  }

  void clear() {
    _items = {};
    notifyListeners();
  }
}
