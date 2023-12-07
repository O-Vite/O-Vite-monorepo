import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../auth/bloc/auth_bloc.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const HomeScreen());
  }

  /*static Route<void> route(BuildContext context) {
    return MaterialPageRoute<void>(
      builder: (context) => const HomeScreen(),
    );
  }*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        title: const Text('Home'),
      ),
      body:  SafeArea(
          child: Center(
            child: Row(
              children: [
                const Text('Logged'),
                ElevatedButton(onPressed: () => {
                  context.read<AuthBloc>()..add(AuthLogoutRequested()),
                },
                child: const Text('Logout')
                ),
              ],
            ),
          )
      ),
    );
  }
}
