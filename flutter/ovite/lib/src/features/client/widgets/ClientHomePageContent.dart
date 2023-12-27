import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:provider/provider.dart';
import 'package:ovite/src/shared/cart.dart';

class ClientHomePageContent extends StatelessWidget {
  final List<Map<String, dynamic>> products = List.generate(
      10,
      (index) => {
            "id": index,
            "name": "Pack d'eau N°$index",
            "description": "Description du pack d'eau N°$index",
            "price": (10 + index).toDouble(),
            "imageUrl":
                "https://via.placeholder.com/200x150?text=Water+Pack+$index"
          });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CarouselSlider(
          options: CarouselOptions(
            aspectRatio: 2.0,
            enlargeCenterPage: true,
            scrollDirection: Axis.horizontal,
            autoPlay: true,
          ),
          items: products.map((product) {
            return Builder(
              builder: (BuildContext context) {
                return Container(
                  width: MediaQuery.of(context).size.width,
                  margin: EdgeInsets.symmetric(horizontal: 5.0),
                  decoration: BoxDecoration(color: Colors.amber),
                  child: Image.network(product['imageUrl'], fit: BoxFit.cover),
                );
              },
            );
          }).toList(),
        ),
        Expanded(
          child: GridView.builder(
            padding: EdgeInsets.all(8),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              childAspectRatio: 0.8,
            ),
            itemCount: products.length,
            itemBuilder: (context, index) {
              var product = products[index];
              return ProductCard(
                product: product,
              );
            },
          ),
        ),
      ],
    );
  }
}

class ProductCard extends StatelessWidget {
  final Map<String, dynamic> product;

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
                imageUrl: product["imageUrl"],
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
                    product["name"],
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    maxLines: 1,
                  ),
                  Text(
                    '${product["price"]}€',
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

  void _showProductDetails(BuildContext context, Map<String, dynamic> product) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(product["name"]),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(product["description"]),
              Text("Prix: ${product["price"]}€"),
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
                Provider.of<Cart>(context, listen: false).addItem(
                    product["id"].toString(),
                    product["price"],
                    product["name"]);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
