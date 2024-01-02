import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/client/models/order.dart';

class GestionDesCoursesPage extends StatefulWidget {
  @override
  _GestionDesCoursesPageState createState() => _GestionDesCoursesPageState();
}

class _GestionDesCoursesPageState extends State<GestionDesCoursesPage> {
  Future<List<Order>> fetchAvailableOrders() async {
    var url = Uri.parse('http://localhost:3000/orders/available');
    var response = await http.get(url, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    });

    if (response.statusCode == 200) {
      List<dynamic> ordersJson = json.decode(response.body);
      return ordersJson.map((json) => Order.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load available orders');
    }
  }

  void acceptCourse(String courseId) async {
    var url = Uri.parse('http://localhost:3000/orders/accept/$courseId');
    var response = await http.post(url, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    });

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Course acceptée avec succès')),
      );
      setState(() {});
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Erreur lors de l'acceptation de la course")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Gestion des Courses'),
      ),
      body: FutureBuilder<List<Order>>(
        future: fetchAvailableOrders(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Text('Erreur: ${snapshot.error}');
          } else if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                Order order = snapshot.data![index];
                return ListTile(
                  title: Text('Numéro de commande ${order.id}'),
                  subtitle:
                      Text('Adresse de livraison : ${order.deliveryAddress}'),
                  onTap: () => acceptCourse(order.id),
                );
              },
            );
          } else {
            return Text('Aucune course disponible.');
          }
        },
      ),
    );
  }
}
