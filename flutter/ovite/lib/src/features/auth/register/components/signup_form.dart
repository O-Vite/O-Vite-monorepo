import 'package:flutter/material.dart';
import 'package:ovite/src/features/auth/services/auth_service.dart'; // Assurez-vous que le chemin d'accès est correct
import 'package:ovite/src/shared/components/already_have_an_account_acheck.dart';
import 'package:ovite/src/shared/constants/constants.dart';
import '../../login/login_page.dart'; // Assurez-vous que le chemin d'accès est correct

class SignUpForm extends StatefulWidget {
  const SignUpForm({Key? key}) : super(key: key);

  @override
  _SignUpFormState createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  String _selectedRole = "client"; // Valeur par défaut pour le rôle
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _firstNameController.dispose();
    _lastNameController.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (_passwordController.text != _confirmPasswordController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Les mots de passe ne correspondent pas')),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final authService = AuthService();
      var result = await authService.register(
        _emailController.text,
        _passwordController.text,
        _selectedRole, // Assurez-vous que cette valeur est une des valeurs acceptées
        _firstNameController.text,
        _lastNameController.text,
      );

      if (result != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Inscription réussie! Redirection...'),
            duration: Duration(seconds: 2),
          ),
        );

        await Future.delayed(Duration(seconds: 2));
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const LoginScreen()),
          (Route<dynamic> route) => false,
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Échec de l\'inscription : $e')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          // Champ Prénom
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _firstNameController,
              decoration: InputDecoration(
                hintText: "Prénom",
                // ... autres propriétés
              ),
            ),
          ),
          // Champ Nom de famille
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _lastNameController,
              decoration: InputDecoration(
                hintText: "Nom de famille",
                // ... autres propriétés
              ),
            ),
          ),
          // Champ Email
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(
              hintText: "Email",
              // ... autres propriétés
            ),
          ),
          // Champ Mot de passe
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _passwordController,
              obscureText: true,
              decoration: InputDecoration(
                hintText: "Mot de passe",
                // ... autres propriétés
              ),
            ),
          ),
          // Champ Confirmer mot de passe
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _confirmPasswordController,
              obscureText: true,
              decoration: InputDecoration(
                hintText: "Confirmer mot de passe",
                // ... autres propriétés
              ),
            ),
          ),
          // Sélecteur de rôle
          DropdownButton<String>(
            value: _selectedRole,
            onChanged: (String? newValue) {
              setState(() {
                _selectedRole = newValue!;
              });
            },
            items: <String>['client', 'deliverer']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),

          // Bouton S'Inscrire
          ElevatedButton(
            onPressed: _isLoading ? null : _register,
            child: _isLoading
                ? CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  )
                : Text("S'Inscrire".toUpperCase()),
          ),
          // Lien vers l'écran de connexion
          AlreadyHaveAnAccountCheck(
            login: false,
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const LoginScreen();
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
