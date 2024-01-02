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
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _kbisNumberController = TextEditingController();
  String _selectedRole = "client";
  bool _isLoading = false;

  bool isEmailValid(String email) {
    String pattern = r'\w+@\w+\.\w+';
    RegExp regex = RegExp(pattern);
    return regex.hasMatch(email);
  }

  bool isPasswordValid(String password) {
    String pattern =
        r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'; // Au moins 8 caractères, une lettre et un chiffre
    RegExp regex = RegExp(pattern);
    return regex.hasMatch(password);
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _firstNameController.dispose();
    _lastNameController.dispose();
    _kbisNumberController.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

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
        _selectedRole,
        _firstNameController.text,
        _lastNameController.text,
        _kbisNumberController.text,
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
      key: _formKey,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _firstNameController,
              decoration: InputDecoration(
                hintText: "Prénom",
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _lastNameController,
              decoration: InputDecoration(
                hintText: "Nom de famille",
              ),
            ),
          ),
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(
              hintText: "Email",
            ),
            validator: (value) {
              if (value == null || value.isEmpty || !isEmailValid(value)) {
                return 'Veuillez entrer une adresse email valide';
              }
              return null;
            },
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _passwordController,
              obscureText: true,
              decoration: InputDecoration(
                hintText: "Mot de passe",
              ),
              validator: (value) {
                if (value == null || value.isEmpty || !isPasswordValid(value)) {
                  return 'Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre';
                }
                return null;
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: _confirmPasswordController,
              obscureText: true,
              decoration: InputDecoration(
                hintText: "Confirmer mot de passe",
              ),
              validator: (value) {
                if (value != _passwordController.text) {
                  return 'Les mots de passe ne correspondent pas';
                }
                return null;
              },
            ),
          ),
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
          if (_selectedRole == 'deliverer')
            Padding(
              padding: EdgeInsets.symmetric(vertical: defaultPadding),
              child: TextFormField(
                controller: _kbisNumberController,
                decoration: InputDecoration(
                  hintText: "Numéro Kbis",
                ),
              ),
            ),
          ElevatedButton(
            onPressed: _isLoading ? null : _register,
            child: _isLoading
                ? CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  )
                : Text("S'Inscrire".toUpperCase()),
          ),
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
