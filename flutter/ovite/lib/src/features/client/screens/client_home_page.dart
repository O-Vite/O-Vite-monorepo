import 'package:flutter/material.dart';

class ClientHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Page d\'Accueil Client'),
      ),
      body: Center(
        child: Text('Bienvenue sur la page d\'accueil du client!'),
      ),
    );
  }
}
