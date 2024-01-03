import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:provider/provider.dart';
import 'package:ovite/src/shared/cart.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/client/models/order.dart';

class Product {
  final String id;
  final String name;
  final String description;
  final double price;
  final String imageUrl;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.imageUrl,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: json['price'].toDouble(),
      imageUrl: json['imageUrl'],
    );
  }
}

Future<List<Order>> fetchCurrentOrders() async {
  // Assurez-vous que l'URL correspond à votre endpoint pour récupérer les commandes en cours
  final response = await http.get(
    Uri.parse(
        'http://localhost:3000/orders/current/649806d7-df0f-4f77-8a46-32a99f63796e'),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    },
  );
  print('Status code: ${response.statusCode}');
  print('Response body: ${response.body}');

  if (response.statusCode == 200) {
    var ordersJson = json.decode(response.body);
    if (ordersJson != null && ordersJson is List) {
      return (ordersJson as List)
          .map((orderJson) => Order.fromJson(orderJson))
          .toList();
    } else {
      return [];
    }
  } else {
    throw Exception('Echec du chargement des commandes en cours');
  }
}

Future<List<Product>> fetchProducts() async {
  final response = await http.get(Uri.parse('http://localhost:3000/products'));

  if (response.statusCode == 200) {
    List<dynamic> productsJson = json.decode(response.body);
    return productsJson.map((json) => Product.fromJson(json)).toList();
  } else {
    throw Exception('Echec du chargement des produits');
  }
}

class ClientHomePageContent extends StatefulWidget {
  @override
  _ClientHomePageContentState createState() => _ClientHomePageContentState();
}

class _ClientHomePageContentState extends State<ClientHomePageContent> {
  late Future<List<Product>> futureProducts;
  late Future<List<Order>> futureOrders; // Ajout pour les commandes

  @override
  void initState() {
    super.initState();
    futureProducts = fetchProducts();
    futureOrders = fetchCurrentOrders(); // Initialisation des commandes
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // En-tête pour les commandes en cours
        Padding(
          padding: EdgeInsets.all(8.0),
          child: Text(
            'Commande en cours',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ),
        // Section pour les commandes en cours
        Expanded(
          flex: 1, // Vous pouvez ajuster la flexibilité selon vos besoins
          child: FutureBuilder<List<Order>>(
            future: futureOrders,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Text("Erreur: ${snapshot.error}");
              } else if (snapshot.hasData && snapshot.data != null) {
                return buildOrdersList(snapshot.data!);
              } else {
                return Text('Pas de commande en cours.');
              }
            },
          ),
        ),

        // Section pour la grille de produits
        Expanded(
          child: FutureBuilder<List<Product>>(
            future: futureProducts,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Text("Erreur: ${snapshot.error}");
              } else if (snapshot.hasData) {
                // Assurez-vous de passer snapshot.data! ici, pas futureProducts
                return buildProductsGrid(snapshot.data!);
              } else {
                return Text('Aucun produit trouvé.');
              }
            },
          ),
        ),
      ],
    );
  }

  Widget buildOrdersList(List<Order> orders) {
    return ListView.builder(
      itemCount: orders.length,
      itemBuilder: (context, index) {
        Order order = orders[index];
        return OrderCard(order: order); // Utilisez un widget OrderCard ici
      },
    );
  }

  Widget buildProductsGrid(List<Product> products) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // En-tête centré pour la section Boutique
        Center(
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Boutique',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        // Grille de produits
        Expanded(
          child: GridView.builder(
            padding: EdgeInsets.all(8),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 10,
              mainAxisSpacing: 6,
              childAspectRatio: 0.8,
            ),
            itemCount: products.length,
            itemBuilder: (context, index) {
              var product = products[index];
              return ProductCard(product: product);
            },
          ),
        ),
      ],
    );
  }
}

class ProductCard extends StatelessWidget {
  final Product product;

  const ProductCard({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => _showProductDetails(context, product),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Expanded(
              child: CachedNetworkImage(
                imageUrl: product.imageUrl,
                fit: BoxFit.cover,
                width: double.infinity,
                placeholder: (context, url) =>
                    Center(child: CircularProgressIndicator()),
                errorWidget: (context, url, error) =>
                    Center(child: Icon(Icons.error)),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    product.name,
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    maxLines: 1,
                  ),
                  Text(
                    '${product.price}€',
                    style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showProductDetails(BuildContext context, Product product) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(product.name),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(product.description),
              Text("Prix: ${product.price}€"),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text("Fermer"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            ElevatedButton(
              child: Text("Ajouter au panier"),
              onPressed: () {
                Provider.of<Cart>(context, listen: false)
                    .addItem(product.id, product.price, product.name);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}

class OrderCard extends StatelessWidget {
  final Order order;

  OrderCard({Key? key, required this.order}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text('Commande ID: ${order.id}'),
        subtitle: Text('Adresse de livraison: ${order.deliveryAddress}'),
        // Vous pouvez ajouter plus d'informations ici
      ),
    );
  }
}
