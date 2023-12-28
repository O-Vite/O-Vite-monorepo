import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ovite/src/shared/cart.dart';

class CartScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cart = Provider.of<Cart>(context);
    return Scaffold(
      appBar: AppBar(
        title: Text('Votre Panier'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: cart.items.length,
              itemBuilder: (ctx, i) {
                var cartItem = cart.items.values.toList()[i];
                var productId = cart.items.keys.toList()[i];
                return ListTile(
                  title: Text(cartItem.title),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('${cartItem.price}€'),
                      IconButton(
                        icon: Icon(Icons.delete),
                        onPressed: () {
                          cart.removeItem(productId);
                        },
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          Container(
            padding: EdgeInsets.all(10),
            child: ElevatedButton(
              child: Text('Valider le Panier'),
              onPressed: () {
                // Logique pour valider le panier
              },
              style: ElevatedButton.styleFrom(
                minimumSize: Size(double.infinity, 50), // Largeur totale
              ),
            ),
          ),
        ],
      ),
    );
  }
}
