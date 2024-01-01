import 'package:flutter/material.dart';
import 'package:ovite/src/features/client/models/order.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/client/models/order.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Suivi des Commandes',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CommandesPage(),
    );
  }
}

class CommandesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Suivi des Commandes'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Suivi de Commande'),
              Tab(text: 'Historique'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            SuiviCommandesWidget(),
            HistoriqueCommandesWidget(),
          ],
        ),
      ),
    );
  }
}

class SuiviCommandesWidget extends StatefulWidget {
  @override
  _SuiviCommandesWidgetState createState() => _SuiviCommandesWidgetState();
}

class _SuiviCommandesWidgetState extends State<SuiviCommandesWidget> {
  int _currentStep = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        StepProgressIndicator(
          totalSteps: 3,
          currentStep: _currentStep,
          selectedColor: Colors.blue,
          unselectedColor: Colors.grey[300]!,
        ),
        SizedBox(height: 20),
        Expanded(
          child: FlutterMap(
            options: MapOptions(
              center: LatLng(48.8566, 2.3522),
              zoom: 13.0,
            ),
            layers: [
              TileLayerOptions(
                urlTemplate:
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                subdomains: ['a', 'b', 'c'],
              ),
              MarkerLayerOptions(
                markers: [
                  Marker(
                    width: 80.0,
                    height: 80.0,
                    point: LatLng(48.8566, 2.3522),
                    builder: (ctx) => Container(
                      child: Icon(Icons.location_on, color: Colors.red),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class StepProgressIndicator extends StatelessWidget {
  final int totalSteps;
  final int currentStep;
  final Color selectedColor;
  final Color unselectedColor;

  StepProgressIndicator({
    required this.totalSteps,
    required this.currentStep,
    required this.selectedColor,
    required this.unselectedColor,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(
        totalSteps,
        (index) => Expanded(
          child: Container(
            height: 10,
            margin: EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(
              color: index <= currentStep ? selectedColor : unselectedColor,
              borderRadius: BorderRadius.circular(5),
            ),
          ),
        ),
      ),
    );
  }
}

class HistoriqueCommandesWidget extends StatefulWidget {
  @override
  _HistoriqueCommandesWidgetState createState() =>
      _HistoriqueCommandesWidgetState();
}

class _HistoriqueCommandesWidgetState extends State<HistoriqueCommandesWidget> {
  double getTotalPrice(List<OrderProduct> products) {
    return products.fold(
        0, (total, current) => total + (current.price * current.quantity));
  }

  Future<List<Order>> fetchOrders() async {
    var url =
        Uri.parse('http://localhost:3000/orders/user/${UserSession.userId}');
    var response = await http.get(url, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    });

    if (response.statusCode == 200) {
      List<dynamic> ordersJson = json.decode(response.body);
      return ordersJson.map((json) => Order.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load orders');
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Order>>(
      future: fetchOrders(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Text("Erreur: ${snapshot.error}");
        } else if (snapshot.hasData) {
          return ListView.builder(
            itemCount: snapshot.data!.length,
            itemBuilder: (context, index) {
              Order order = snapshot.data![index];
              double totalPrice = getTotalPrice(order.orderProducts);

              return Card(
                elevation: 4,
                margin: EdgeInsets.all(8),
                child: ExpansionTile(
                  leading: Icon(Icons.receipt, color: Colors.blue),
                  title: Text('Commande ${order.id}',
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.blue)),
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 16.0, vertical: 8.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                              'Adresse de livraison : ${order.deliveryAddress}',
                              style: TextStyle(fontSize: 16)),
                          Text('État : ${order.state}',
                              style: TextStyle(fontSize: 16)),
                          Text('Prix total : ${totalPrice.toStringAsFixed(2)}€',
                              style: TextStyle(
                                  fontSize: 16, color: Colors.redAccent)),
                          // Autres informations
                        ],
                      ),
                    ),
                  ],
                ),
              );
            },
          );
        } else {
          return Text('Aucune commande trouvée.');
        }
      },
    );
  }
}
