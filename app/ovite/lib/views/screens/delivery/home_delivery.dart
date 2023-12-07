import 'package:flutter/material.dart';

class HomeDelivery extends StatelessWidget {
  const HomeDelivery ({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
        appBar: AppBar(title:  const Text("Home"),),
        body: const Center(
            child: Text("Home Delivery")
        ),
      ),
    );
  }
}
