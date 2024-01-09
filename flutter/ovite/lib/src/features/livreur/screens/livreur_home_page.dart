import 'package:flutter/material.dart';
import 'package:ovite/src/shared/constants/constants.dart';
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/auth/login/login_page.dart';
import 'package:ovite/src/features/livreur/screens/gestion_courses_home_page.dart';
import 'package:ovite/src/features/livreur/screens/dashboard.dart';

class LivreurHomePage extends StatefulWidget {
  @override
  _LivreurHomePageState createState() => _LivreurHomePageState();
}

class _LivreurHomePageState extends State<LivreurHomePage> {
  late int _currentIndex;
  int counterNotification = 0;

  @override
  void initState() {
    super.initState();
    _currentIndex = UserSession.currentTabIndex ?? 0;
  }

  final List<Widget> _pages = [
    LivreurDashboard(),
    LivreurDashboard(),
    GestionDesCoursesPage(),
    GestionDesCoursesPage(),
    GestionDesCoursesPage(),
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
        title: const [Text('Acceuil'), Text('Tableau de board'), Text('Commande en cours'), Text('Chat'), Text('Account'),][_currentIndex],
        leading: const [Icon(Icons.home), Icon(Icons.bar_chart), Icon(Icons.shopping_cart), Icon(Icons.chat), Icon(Icons.person),][_currentIndex],
        titleSpacing: 0,
        backgroundColor: kPrimaryLightColor,
        actions: [
          notificationIcon(counterNotification),
          IconButton(icon: const Icon(Icons.logout), tooltip: 'logout', onPressed: () async {
            await UserSession.clearSession();
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(builder: (context) => const LoginScreen()),
            );
          },),
        ],
      ),
      /*drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            const DrawerHeader(
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
              title: const Text('Dashboard'),
              onTap: () {
                Navigator.of(context).pop();
                setState(() {
                  _currentIndex = 0;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.schedule), // or Icons.assignment
              title: Text('Gestion des Courses'),
              onTap: () {
                Navigator.of(context).pop();
                setState(() {
                  _currentIndex = 1;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.history),
              title: Text('Historique des Courses'),
              onTap: () {
                Navigator.of(context).pop();
                setState(() {
                  _currentIndex = 2;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.report_problem), // or Icons.feedback
              title: Text('Système de Réclamation'),
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
      ),*/
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        onTap: onTabTapped,
        currentIndex: _currentIndex,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Acceuil'),
          BottomNavigationBarItem(icon: Icon(Icons.bar_chart), label: 'Tableau de board'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart), label: 'Gestion des Courses'),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }

  Widget notificationIcon(int counterNotification) {
    return Stack(
      children: [
        IconButton(icon: const Icon(Icons.notifications), onPressed: () {
          setState(() {
            counterNotification = 0;
          });
        }, ),
        counterNotification == 0 ? Container() :
        Positioned(
          right: 11, top: 11,
          child: Container(
            padding: const EdgeInsets.all(2),
            decoration: BoxDecoration(
              color: Colors.red,
              borderRadius: BorderRadius.circular(6),
            ),
            constraints: const BoxConstraints(
              minWidth: 14,
              minHeight: 14,
            ),
            child: Text(
              '$counterNotification',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 8,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        )
      ],
    );
  }
}
