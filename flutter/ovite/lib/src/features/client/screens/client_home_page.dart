import 'package:flutter/material.dart';
import 'package:ovite/src/features/client/screens/commande.dart';
import 'package:ovite/src/features/client/screens/profile_page.dart';
import 'package:ovite/src/features/client/widgets/ClientHomePageContent.dart';
import 'package:ovite/src/features/client/screens/cartScreen.dart';
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/auth/login/login_page.dart';
import 'package:ovite/src/features/client/screens/suiviCommande.dart';

class ClientMainPage extends StatefulWidget {
  @override
  _ClientMainPageState createState() => _ClientMainPageState();
}

class _ClientMainPageState extends State<ClientMainPage> {
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    UserSession.init().then((_) {
      setState(() {
        _currentIndex = UserSession.currentTabIndex ?? 0;
      });
    });
  }

  final List<Widget> _pages = [
    ClientHomePageContent(),
   // CommandesPage(),
    CartScreen(),
  ];

  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
    UserSession.setTabIndex(index);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Client Dashboard'),
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
                'Nom du Client',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Accueil'),
              onTap: () {
                Navigator.of(context).pop();
                setState(() {
                  _currentIndex = 0;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.list),
              title: Text('Commande'),
              onTap: () {
                Navigator.of(context).pop();
                setState(() {
                  _currentIndex = 1;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.person),
              title: Text('Profil'),
              onTap: () {
                Navigator.of(context).pop();
                setState(() {
                  _currentIndex = 2;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.shopping_cart),
              title: Text('Panier'),
              onTap: () {
                Navigator.of(context).pop();
                setState(() {
                  _currentIndex = 3;
                });
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
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        onTap: onTabTapped,
        currentIndex: _currentIndex,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Accueil'),
          BottomNavigationBarItem(icon: Icon(Icons.list), label: 'Commande'),
          BottomNavigationBarItem(
              icon: Icon(Icons.shopping_cart), label: 'Panier'),
        ],
      ),
    );
  }
}
