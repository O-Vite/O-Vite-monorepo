import 'package:flutter/material.dart';
import 'package:ovite/src/features/client/models/order.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ovite/src/shared/user_session.dart';

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
              Tab(text: 'Suivi'),
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
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: const [
              Text('Chargement'),
              Text('Départ'),
              Text('Livré'),
            ],
          ),
          StepProgressIndicator(
            totalSteps: 3,
            currentStep: _currentStep,
            selectedColor: Colors.blue,
            unselectedColor: Colors.grey[300]!,
          ),
          SizedBox(height: 20),
        ],
      ),
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
  Future<List<Order>> fetchOrders() async {
    var url =
        Uri.parse('http://localhost:3000/orders/user/${UserSession.userId}');
    var response = await http.get(url, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${UserSession.jwtToken}',
    });

    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
    if (response.statusCode == 200) {
      print('Response body: ${response.body}');
      List<dynamic> ordersJson = json.decode(response.body);
      print('Orders: $ordersJson');
      return ordersJson.map((json) => Order.fromJson(json)).toList();
    } else {
      print('Failed to load orders. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
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
          return Text("Error: ${snapshot.error}");
        } else if (snapshot.hasData) {
          return ListView.builder(
            itemCount: snapshot.data!.length,
            itemBuilder: (context, index) {
              Order order = snapshot.data![index];
              return ListTile(
                title: Text('ID de la Commande: ${order.id}'),
                // Vous pouvez supprimer ou commenter la ligne suivante si vous ne voulez pas afficher l'état
                // subtitle: Text('État: ${order.state}'),
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
