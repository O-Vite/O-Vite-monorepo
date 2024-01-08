import 'package:flutter/material.dart';

class LivreurDashboard extends StatelessWidget {
  final bool hasOngoingDelivery;
  final double levelProgress;

  LivreurDashboard({this.hasOngoingDelivery = false, this.levelProgress = 0.0});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.all(8.0),
      children: <Widget>[
        _buildCurrentDeliveryCard(),
        _buildLevelProgress(),
        _buildStatisticsCard('Nombre total de livraison', ''),
      ],
    );
  }

  Widget _buildCurrentDeliveryCard() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: hasOngoingDelivery
            ? Text('Details of the ongoing delivery')
            : Text('Pas de course en cours'),
      ),
    );
  }

  Widget _buildLevelProgress() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        children: <Widget>[
          Text('Niveau du Livreur'),
          LinearProgressIndicator(value: levelProgress),
        ],
      ),
    );
  }

  Widget _buildStatisticsCard(String title, String value) {
    return Card(
      child: ListTile(
        title: Text(title),
        trailing: Text(value),
      ),
    );
  }
}
