import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Suivi des Commandes',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CommandesPage(),
    );
  }
}

class CommandesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Suivi des Commandes'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Suivi'),
              Tab(text: 'Historique'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            SuiviCommandesWidget(),
            HistoriqueCommandesWidget(),
          ],
        ),
      ),
    );
  }
}

class SuiviCommandesWidget extends StatefulWidget {
  @override
  _SuiviCommandesWidgetState createState() => _SuiviCommandesWidgetState();
}

class _SuiviCommandesWidgetState extends State<SuiviCommandesWidget> {
  int _currentStep = 0;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: const [
              Text('Chargement'),
              Text('Départ'),
              Text('Livré'),
            ],
          ),
          StepProgressIndicator(
            totalSteps: 3,
            currentStep: _currentStep,
            selectedColor: Colors.blue,
            unselectedColor: Colors.grey[300]!,
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}

class StepProgressIndicator extends StatelessWidget {
  final int totalSteps;
  final int currentStep;
  final Color selectedColor;
  final Color unselectedColor;

  StepProgressIndicator({
    required this.totalSteps,
    required this.currentStep,
    required this.selectedColor,
    required this.unselectedColor,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(
        totalSteps,
        (index) => Expanded(
          child: Container(
            height: 10,
            margin: EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(
              color: index <= currentStep ? selectedColor : unselectedColor,
              borderRadius: BorderRadius.circular(5),
            ),
          ),
        ),
      ),
    );
  }
}

class HistoriqueCommandesWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Contenu de l\'historque des commandes'),
    );
  }
}
