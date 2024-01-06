import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ovite/auth/bloc/auth_bloc.dart';

//import '../../auth/bloc/auth_bloc.dart';

class DeliveryHomeScreen extends StatelessWidget {
  const DeliveryHomeScreen({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const DeliveryHomeScreen());
  }

  /*static Route<void> route(BuildContext context) {
    return MaterialPageRoute<void>(
      builder: (context) => const HomeScreen(),
    );
  }*/

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Row(
        children: [
          Text('Logged'),
        ],
      ),
    );
  }
}
