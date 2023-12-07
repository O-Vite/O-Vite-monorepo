import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ovite/login/bloc/login_bloc.dart';

import '../../auth/bloc/auth_bloc.dart';
import 'login_form.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const LoginScreen());
  }

  /*static Route<void> route() {
    return MaterialPageRoute<void>(
      builder: (_) => const LoginScreen(),
    );
  }*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: BlocProvider(
          create: (context) => LoginBloc(authBloc: BlocProvider.of<AuthBloc>(context),),
          child: const LoginForm(),
        ),
      ),
    );
  }
}