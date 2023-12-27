// Fichier: lib/src/features/client/screens/client_main_page.dart

import 'package:flutter/material.dart';
import 'package:ovite/src/features/client/screens/commande.dart';
import 'package:ovite/src/features/client/screens/profil.dart';
import 'package:ovite/src/features/client/widgets/ClientHomePageContent.dart';
import 'package:ovite/src/shared/cart.dart';
import 'package:ovite/src/features/client/screens/cartScreen.dart';

class ClientMainPage extends StatefulWidget {
  @override
  _ClientMainPageState createState() => _ClientMainPageState();
}

class _ClientMainPageState extends State<ClientMainPage> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    ClientHomePageContent(),
    CartScreen(),
  ];

  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Client Dashboard'),
      ),
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        onTap: onTabTapped,
        currentIndex: _currentIndex,
        selectedItemColor: Colors.blue, // Couleur des éléments sélectionnés
        unselectedItemColor:
            Colors.grey, // Couleur des éléments non sélectionnés
        items: [
          BottomNavigationBarItem(
            icon: new Icon(Icons.home),
            label: 'Accueil',
          ),
          BottomNavigationBarItem(
            icon: new Icon(Icons.list),
            label: 'Commande',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart),
            label: 'Panier',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profil',
          ),
        ],
      ),
    );
  }
}
