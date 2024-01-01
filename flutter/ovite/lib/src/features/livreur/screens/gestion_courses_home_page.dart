import 'package:flutter/material.dart';
import 'course_details_page.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ovite/src/features/client/models/order.dart';

class GestionDesCoursesPage extends StatefulWidget {
  @override
  _GestionDesCoursesPageState createState() => _GestionDesCoursesPageState();
}

class _GestionDesCoursesPageState extends State<GestionDesCoursesPage> {
  Future<List<Order>> fetchCourses() async {
    var url = Uri.parse('localhost:3000/orders');
    var response = await http.get(url);
    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      List<Order> courses =
          body.map((dynamic item) => Order.fromJson(item)).toList();
      return courses;
    } else {
      throw Exception('Impossible de charger les courses');
    }
  }

  void acceptCourse(String courseId) {}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Gestion des Courses'),
      ),
      body: FutureBuilder<List<Order>>(
        future: fetchCourses(),
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
                  title: Text('Commande ${order.id}'),
                  subtitle: Text('Détails: ${order.details}'),
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

class Order {
  final String id;
  final String details;

  Order({required this.id, required this.details});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      details: json['details'],
    );
  }
}
