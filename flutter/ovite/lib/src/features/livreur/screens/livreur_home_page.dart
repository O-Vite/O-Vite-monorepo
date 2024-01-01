import 'package:flutter/material.dart';
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

  @override
  void initState() {
    super.initState();
    _currentIndex = UserSession.currentTabIndex ?? 0;
  }

  final List<Widget> _pages = [
    LivreurDashboard(),
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
        title: Text('Livreur Dashboard'),
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
      ),
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        onTap: onTabTapped,
        currentIndex: _currentIndex,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        items: [
          BottomNavigationBarItem(
              icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(
              icon: Icon(Icons.schedule), // or Icons.assignment
              label: 'Gestion des Courses'),
          BottomNavigationBarItem(
              icon: Icon(Icons.history), label: 'Historique des Courses'),
          BottomNavigationBarItem(
              icon: Icon(Icons.report_problem), // or Icons.feedback
              label: 'Système de Réclamation'),
        ],
      ),
    );
  }
}
