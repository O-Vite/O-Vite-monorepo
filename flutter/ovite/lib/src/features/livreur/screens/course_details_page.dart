import 'package:flutter/material.dart';

class CourseDetailsPage extends StatelessWidget {
  final String courseDetails;

  CourseDetailsPage({Key? key, required this.courseDetails}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Détails de la Course"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              courseDetails,
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Logique d'acceptation de la course
              },
              child: Text("Accepter"),
            ),
            TextButton(
              onPressed: () {
                // Logique de refus de la course
              },
              child: Text("Refuser"),
            ),
          ],
        ),
      ),
    );
  }
}
