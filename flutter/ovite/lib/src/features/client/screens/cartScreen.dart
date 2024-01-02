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
    TextEditingController _addressController = TextEditingController();
    List<String> _addressSuggestions = [];

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Adresse de livraison'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _addressController,
                onChanged: (value) async {
                  if (value.isNotEmpty) {
                    _addressSuggestions = await _getAddressSuggestions(value);
                  } else {
                    _addressSuggestions = [];
                  }
                  // Mettre à jour l'état pour afficher les suggestions
                  (context as Element).markNeedsBuild();
                },
                decoration: InputDecoration(hintText: 'Entrez votre adresse'),
              ),
              SizedBox(height: 10),
              // Widget pour afficher les suggestions
              if (_addressSuggestions.isNotEmpty)
                Container(
                  height: 100.0, // Ajustez la hauteur selon vos besoins
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: _addressSuggestions.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text(_addressSuggestions[index]),
                        onTap: () {
                          _addressController.text = _addressSuggestions[index];
                          _addressSuggestions = [];
                          (context as Element).markNeedsBuild();
                        },
                      );
                    },
                  ),
                ),
            ],
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
                sendOrder(cart, _addressController.text, context);
              },
            ),
          ],
        );
      },
    );
  }
}

Future<List<String>> _getAddressSuggestions(String query) async {
  if (query.isEmpty) return [];

  String url = 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json';
  String apiKey = '6b-XqGUYILl8vd-dHopxzAnHhfZFEX930vYaByBA0C8';
  String requestUrl = '$url?apiKey=$apiKey&query=$query&maxresults=5';

  try {
    var response = await http.get(Uri.parse(requestUrl));
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      var suggestions = data['suggestions'] as List;
      return suggestions.map((s) => s['label'] as String).toList();
    } else {
      throw Exception('Failed to load suggestions');
    }
  } catch (e) {
    print('Error fetching suggestions: $e');
    return [];
  }
}

Future<void> sendOrder(
    Cart cart, String deliveryAddress, BuildContext context) async {
  var userId = UserSession.userId;
  var orderProducts = cart.items.values.map((cartItem) {
    return {
      'productId': cartItem.id,
      'quantity': cartItem.quantity,
      'price': cartItem.price,
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
