import 'package:flutter/material.dart';
import 'course_details_page.dart'; // Assurez-vous que le chemin est correct

class GestionDesCoursesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Gestion des Courses'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ListView.builder(
          itemCount: 3,
          itemBuilder: (context, index) {
            String courseDetails = "Détails de la Course ${index + 1}";
            return Card(
              elevation: 4,
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.blue,
                  child: Text('${index + 1}',
                      style: TextStyle(color: Colors.white)),
                ),
                title: Text('Course ${index + 1}'),
                subtitle: Text("Cliquez pour plus de détails"),
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) =>
                          CourseDetailsPage(courseDetails: courseDetails),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
