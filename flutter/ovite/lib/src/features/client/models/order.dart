class Order {
  final String id;
  final String address;
  final String state;
  final List<OrderProduct> orderProducts;

  Order({
    required this.id,
    required this.address,
    required this.state,
    required this.orderProducts,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    // Transformer les données JSON des produits en une liste d'objets OrderProduct
    var orderProductsFromJson = json['orderProducts'] != null
        ? (json['orderProducts'] as List)
            .map((orderProductJson) => OrderProduct.fromJson(orderProductJson))
            .toList()
        : [];

    return Order(
      id: json['id'],
      address: json['address'],
      state: json['state'],
      orderProducts: List<OrderProduct>.from(orderProductsFromJson),
    );
  }
}

class OrderProduct {
  final String id;
  final double price;
  final int quantity;

  OrderProduct({required this.id, required this.price, required this.quantity});

  factory OrderProduct.fromJson(Map<String, dynamic> json) {
    return OrderProduct(
      id: json['id'],
      price: json['price'].toDouble(),
      quantity: json['quantity'],
    );
  }
}
