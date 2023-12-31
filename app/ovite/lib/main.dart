import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ovite/auth/bloc/auth_bloc.dart';
import 'package:ovite/delivery/delivery_home.dart';
import 'package:ovite/login/login.dart';
import 'package:ovite/register/register.dart';
import 'package:ovite/shared/splash/view/splash_page.dart';
import 'package:ovite/shared/storage/preferences_manager.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Assurez-vous que les liaisons Flutter sont initialisées
  await PreferencesManager().init(); // Initialisez les préférences
  runApp( const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return  MyHomePage();
  }
}


class MyHomePage extends StatelessWidget {
   MyHomePage({super.key});

  final _navigatorKey = GlobalKey<NavigatorState>();

  NavigatorState get _navigator => _navigatorKey.currentState!;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ovite',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      navigatorKey: _navigatorKey,
      builder: (context, child) {
        return BlocProvider(
          create: (context) => AuthBloc()..add(AuthCheckRequested()),
          //child: const RegisterScreen(),
          child: BlocListener<AuthBloc, AuthState>(
            listener: (context, state) {
              switch (state.status) {
                case AuthStatus.authenticated:
                  //log("authenticated");
                  _navigator.pushAndRemoveUntil<void>(
                    DeliveryHomeScreen.route(),
                        (route) => false,
                  );
                  break;
                case AuthStatus.unauthenticated:
                case AuthStatus.unknown:
                  final status = state.status;
                  //log("unauthenticated or Unknown : $status");
                  _navigator.pushAndRemoveUntil<void>(
                    LoginScreen.route(),
                        (route) => false,
                  );
                  break;
              }
            },
            child: child,
          )
        );
      },
      onGenerateRoute: (_) => SplashPage.route(),
    );
  }
}

/*class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Ovite',
        theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        //navigatorKey: _navigatorKey,

        home: BlocProvider(
          create: (context) => AuthBloc()..add(AuthCheckRequested()),
          child: const MyHomePage(),
        ),
    );
  }
}


class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        switch (state.status) {
          case AuthStatus.authenticated:
            log("authenticated");
            Navigator.of(context).pushReplacement<void, void>(
              HomeScreen.route(),
            );
            break;
          case AuthStatus.unauthenticated:
        case AuthStatus.unknown:
          log("unauthenticated or Unknown");
          Navigator.of(context).pushReplacement<void, void>(
            LoginScreen.route(),
          );
          break;
        }
      },
      child: const SplashPage(),
    );
  }
}*/