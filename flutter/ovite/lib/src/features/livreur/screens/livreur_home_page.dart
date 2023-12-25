import 'package:flutter/material.dart';

class LivreurHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Page d\'Accueil Livreur'),
      ),
      body: Center(
        child: Text('Bienvenue sur la page d\'accueil du livreur!'),
      ),
    );
  }
}
