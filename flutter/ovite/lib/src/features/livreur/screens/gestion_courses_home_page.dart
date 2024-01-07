import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/client/models/order.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

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
      throw Exception('Échec du chargement des commandes');
    }
  }

  void _showAcceptConfirmationDialog(String courseId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Accepter la course'),
          content: Text('Êtes-vous sûr de vouloir accepter cette course ?'),
          actions: <Widget>[
            TextButton(
              child: Text('Annuler'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            ElevatedButton(
              child: Text('Accepter'),
              onPressed: () {
                Navigator.of(context).pop();
                acceptCourse(courseId);
              },
            ),
          ],
        );
      },
    );
  }

  void acceptCourse(String courseId) async {
    var url = Uri.parse('http://localhost:3000/orders/accept/$courseId');
    var response = await http.post(url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${UserSession.jwtToken}',
        },
        body: json.encode({'delivererId': UserSession.userId}));
    if (response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Course acceptée avec succès')),
      );
      setState(() {});
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Erreur lors de l'acceptation de la course")),
      );
      print('Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Tab> myTabs = <Tab>[
      Tab(text: 'Commandes disponibles'),
      Tab(text: 'Commandes en cours'),
    ];

    return DefaultTabController(
      length: myTabs.length,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Gestion des Courses'),
          bottom: TabBar(
            tabs: myTabs,
          ),
        ),
        body: TabBarView(
          children: [
            // Premier onglet - Commandes disponibles
            Column(
              children: [
                Expanded(
                  flex: 1,
                  child: FutureBuilder<List<Order>>(
                    future: fetchAvailableOrders(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        return Text('Erreur: ${snapshot.error}');
                      } else if (snapshot.hasData) {
                        return ListView.builder(
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            Order order = snapshot.data![index];
                            return ListTile(
                              title: Text('Numéro de commande ${order.id}'),
                              subtitle: Text(
                                  'Adresse de livraison : ${order.address}'),
                              onTap: () =>
                                  _showAcceptConfirmationDialog(order.id),
                            );
                          },
                        );
                      } else {
                        return Text('Aucune course disponible.');
                      }
                    },
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: GoogleMap(
                    initialCameraPosition: CameraPosition(
                      target: LatLng(48.8566, 2.3522), // Coordonnées par défaut
                      zoom: 12.0,
                    ),
                    // Vous pouvez ajouter des marqueurs ici si nécessaire
                  ),
                ),
              ],
            ),

            // Deuxième onglet - Commandes en cours
            Column(
              children: [
                // Ajoutez ici le code pour afficher les commandes en cours
                // Vous pouvez réutiliser la logique de récupération des données
                // similaire à celle du premier onglet, mais pour les commandes en cours.
                // N'oubliez pas d'ajuster ce code en conséquence.
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<String?> fetchDelivererId(String userId) async {
    var url = Uri.parse(
        'http://localhost:3000/deliverer/user/$userId'); // Remplacez l'URL par celle de votre API
    var response = await http.get(url, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    });

    if (response.statusCode == 200) {
      Map<String, dynamic> data = json.decode(response.body);
      String? delivererId = data['delivererId'];
      return delivererId;
    } else {
      throw Exception('Échec de la récupération du delivererId');
    }
  }
}
