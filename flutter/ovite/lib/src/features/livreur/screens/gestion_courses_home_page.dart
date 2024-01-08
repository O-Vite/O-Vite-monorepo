import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ovite/src/shared/user_session.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:ovite/src/features/client/models/order.dart';

class GestionDesCoursesPage extends StatefulWidget {
  @override
  _GestionDesCoursesPageState createState() => _GestionDesCoursesPageState();
}

class _GestionDesCoursesPageState extends State<GestionDesCoursesPage> {
  String? delivererId;

  @override
  void initState() {
    super.initState();
    fetchDelivererId(UserSession.userId);
  }

  Future<String?> fetchDelivererId(String? userId) async {
    if (userId == null) {
      throw Exception("L'ID de l'utilisateur est nul.");
    }

    var url = Uri.parse('http://localhost:3000/orders/getDelivererId/$userId');
    var response = await http.get(url, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    });

    if (response.statusCode == 200) {
      Map<String, dynamic> data = json.decode(response.body);
      String? delivererId = data['delivererId'];
      setState(() {
        this.delivererId = delivererId;
      });
      return delivererId;
    } else {
      throw Exception('Échec de la récupération du delivererId');
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
                      target: LatLng(48.8566, 2.3522),
                      zoom: 12.0,
                    ),
                    //
                  ),
                ),
              ],
            ),
            Column(
              children: [
                Expanded(
                  flex: 1,
                  child: FutureBuilder<List<Order>>(
                    future: fetchOngoingOrders(delivererId),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        return Text('Erreur: ${snapshot.error}');
                      } else if (snapshot.hasData &&
                          snapshot.data!.isNotEmpty) {
                        return ListView.builder(
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            Order order = snapshot.data![index];
                            return InkWell(
                              onTap: () => _showOrderDetails(
                                  order), // Ajoutez la méthode pour afficher les détails de la commande
                              child: Card(
                                elevation: 3,
                                margin: EdgeInsets.all(10),
                                child: ListTile(
                                  title: Text('Numéro de commande ${order.id}'),
                                  subtitle: Text(
                                      'Adresse de livraison : ${order.address}'),
                                ),
                              ),
                            );
                          },
                        );
                      } else {
                        return Text('Aucune commande en cours.');
                      }
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

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
        body: json.encode({'delivererId': delivererId}));
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

  Future<List<Order>> fetchOngoingOrders(String? delivererId) async {
    if (delivererId == null) {
      throw Exception("L'ID du livreur est nul.");
    }

    var url = Uri.parse('http://localhost:3000/orders/taken/$delivererId');
    var response = await http.get(url, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    });

    if (response.statusCode == 200) {
      List<dynamic> ordersJson = json.decode(response.body);
      return ordersJson.map((json) => Order.fromJson(json)).toList();
    } else {
      throw Exception("Échec du chargement des commandes en cours.");
    }
  }

  void finaliserLivraison(String orderId) async {
    var response = await http.patch(
      Uri.parse('http://localhost:3000/orders/deliver/$orderId'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${UserSession.jwtToken}',
      },
      body: json.encode({}),
    );

    if (response.statusCode == 200) {
    } else {
      print('Erreur');
    }

    void _showFinalizeConfirmationDialog(String orderId) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Finaliser la livraison'),
            content:
                Text('Êtes-vous sûr de vouloir finaliser cette livraison ?'),
            actions: <Widget>[
              TextButton(
                child: Text('Annuler'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              ElevatedButton(
                child: Text('Finaliser'),
                onPressed: () {
                  Navigator.of(context).pop();
                  finaliserLivraison(orderId);
                },
              ),
            ],
          );
        },
      );
    }
  }

  void _showOrderDetails(Order order) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Détails de la commande'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Numéro de commande : ${order.id}'),
              Text('Adresse de livraison : ${order.address}'),
              // Ajoutez d'autres informations de commande ici
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Fermer'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            ElevatedButton(
              child: Text('Confirmer la livraison de la commande'),
              onPressed: () {
                // Placez ici la logique pour confirmer la livraison de la commande
                finaliserLivraison(order.id);
                Navigator.of(context).pop(); // Fermer la boîte de dialogue
              },
            ),
          ],
        );
      },
    );
  }
}
