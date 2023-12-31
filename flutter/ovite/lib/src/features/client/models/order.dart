class Order {
  final String id;
  final String deliveryAddress;
  final String state;

  Order({required this.id, required this.deliveryAddress, required this.state});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      deliveryAddress: json['deliveryAddress'],
      state: json['state'],
    );
  }
}
