import 'package:flutter/material.dart';
import 'package:ovite/src/features/auth/services/auth_service.dart';
import 'package:ovite/src/shared/components/already_have_an_account_acheck.dart';
import 'package:ovite/src/shared/constants/constants.dart';
import '../../register/signup_page.dart';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:ovite/src/features/client/screens/client_home_page.dart';
import 'package:ovite/src/features/livreur/screens/livreur_home_page.dart';

class LoginForm extends StatefulWidget {
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Veuillez saisir votre email et mot de passe')),
      );
      return;
    }

    try {
      final authService = AuthService();
      var result = await authService.login(
        _emailController.text,
        _passwordController.text,
      );

      if (result != null && result.containsKey('access_token')) {
        Map<String, dynamic> tokenData = Jwt.parseJwt(result['access_token']);
        print('Données JWT décodées : $tokenData');

        if (tokenData['role'] == 'client') {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => ClientHomePage()),
          );
        } else if (tokenData['role'] == 'deliverer') {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => LivreurHomePage()),
          );
        }
      } else {
        print('Réponse inattendue du serveur: $result');
      }
    } catch (e) {
      print('Erreur capturée dans _login: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur de connexion : $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          TextFormField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            decoration: const InputDecoration(
              hintText: "Email",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.person),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _passwordController,
              textInputAction: TextInputAction.done,
              obscureText: true,
              cursorColor: kPrimaryColor,
              decoration: const InputDecoration(
                hintText: "Mot de passe",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock),
                ),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding),
          ElevatedButton(
            onPressed: _login,
            child: Text(
              "Se Connecter".toUpperCase(),
            ),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            login: true,
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const SignUpScreen();
                  },
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
