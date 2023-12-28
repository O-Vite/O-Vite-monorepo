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
                  subtitle: Text(
                      'Total: ${(cartItem.price * cartItem.quantity).toStringAsFixed(2)}€'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.remove),
                        onPressed: () {
                          cart.decreaseQuantity(productId);
                        },
                      ),
                      Text('${cartItem.quantity}'),
                      IconButton(
                        icon: Icon(Icons.add),
                        onPressed: () {
                          cart.addItem(
                              productId, cartItem.price, cartItem.title);
                        },
                      ),
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
                _showDeliveryAddressModal(context, cart);
              },
              style: ElevatedButton.styleFrom(
                minimumSize: Size(double.infinity, 50),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showDeliveryAddressModal(BuildContext context, Cart cart) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        String address = '';
        return AlertDialog(
          title: Text('Adresse de livraison'),
          content: TextField(
            onChanged: (value) => address = value,
            decoration: InputDecoration(hintText: 'Entrez votre adresse'),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Annuler'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            ElevatedButton(
              child: Text('Confirmer'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
