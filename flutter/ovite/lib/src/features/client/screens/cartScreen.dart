import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ovite/src/shared/cart.dart';
import 'package:http/http.dart' as http;
import 'package:ovite/src/shared/user_session.dart';
import 'dart:convert';

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
        String deliveryAddress = '';
        return AlertDialog(
          title: Text('Adresse de livraison'),
          content: TextField(
            onChanged: (value) => deliveryAddress = value,
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
                sendOrder(cart, deliveryAddress, context);
              },
            ),
          ],
        );
      },
    );
  }
}

Future<void> sendOrder(
    Cart cart, String deliveryAddress, BuildContext context) async {
  var userId = UserSession.userId;
  var orderProducts = cart.items.values.map((cartItem) {
    return {
      'productId': cartItem.id,
      'quantity': cartItem.quantity,
    };
  }).toList();

  var orderData = json.encode({
    'userId': userId,
    'deliveryAddress': deliveryAddress,
    'orderProducts': orderProducts,
    'state': 'not_taken',
  });

  try {
    var url = Uri.parse('http://localhost:3000/orders');
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: orderData,
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Commande envoyée avec succès')),
      );
      cart.clear();
    } else {
      print('État : ${response.statusCode}');
      print('Réponse : ${response.body}');
      print('userId : $userId');
      print('orderProducts : $orderProducts');

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur lors de l\'envoi de la commande')),
      );
    }
  } catch (e) {
    print('Exception: $e');
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
          content: Text('Enorme erreur lors de l\'envoi de la commande: $e')),
    );
  }
}
