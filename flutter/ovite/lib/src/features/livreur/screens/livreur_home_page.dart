import 'package:flutter/material.dart';
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/auth/login/login_page.dart';
import 'package:ovite/src/shared/components/livreur_components/bar_chart_component.dart';
import 'package:ovite/src/shared/components/livreur_components/pie_chart_component.dart';
import 'package:ovite/src/features/livreur/screens/gestion_courses_home_page.dart';

class LivreurHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Page d\'Accueil Livreur'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text(
                'Nom du Livreur',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.dashboard),
              title: Text('Dashboard'),
              onTap: () {},
            ),
            ListTile(
              leading: Icon(Icons.list),
              title: Text('Gestion des Courses'),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(
                  MaterialPageRoute(
                      builder: (context) => GestionDesCoursesPage()),
                );
              },
            ),
            ListTile(
              leading: Icon(Icons.history),
              title: Text('Historique des Courses'),
              onTap: () {},
            ),
            ListTile(
              leading: Icon(Icons.report_problem),
              title: Text('Système de Réclamation'),
              onTap: () {
                // Naviguer vers Système de Réclamation
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Paramètres'),
              onTap: () {
                // Naviguer vers Paramètres
              },
            ),
            ListTile(
              leading: Icon(Icons.exit_to_app),
              title: Text('Déconnexion'),
              onTap: () async {
                await UserSession.clearSession();
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => LoginScreen()),
                );
              },
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [],
        ),
      ),
    );
  }
}
