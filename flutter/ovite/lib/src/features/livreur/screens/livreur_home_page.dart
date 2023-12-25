import 'package:flutter/material.dart';
import 'package:ovite/src/shared/user_session.dart'; // Assurez-vous que ce chemin est correct
import 'package:ovite/src/features/auth/login/login_page.dart';

class LivreurHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Page d\'Accueil Livreur'),
        actions: [
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () async {
              await UserSession.logout();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Text('Bienvenue sur la page d\'accueil du livreur!'),
      ),
    );
  }
}
