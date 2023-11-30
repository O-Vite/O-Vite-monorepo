import 'package:flutter/material.dart';
import 'package:ovite/src/shared/components/already_have_an_account_acheck.dart';
import 'package:ovite/src/shared/constants/constants.dart';
import '../../login/login_page.dart';

class SignUpForm extends StatelessWidget {
  const SignUpForm({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          TextFormField(
            keyboardType: TextInputType.name,
            textInputAction: TextInputAction.next,
            decoration: InputDecoration(
              hintText: "Nom",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.person),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              keyboardType: TextInputType.name,
              textInputAction: TextInputAction.next,
              decoration: InputDecoration(
                hintText: "Prénom",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.person_outline),
                ),
              ),
            ),
          ),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            decoration: InputDecoration(
              hintText: "Email",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.email),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              textInputAction: TextInputAction.next,
              obscureText: true,
              decoration: InputDecoration(
                hintText: "Mot de passe",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock),
                ),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: 8), // Ajustement de l'écart
            child: TextFormField(
              textInputAction: TextInputAction.done,
              obscureText: true,
              decoration: InputDecoration(
                hintText: "Confirmer mot de passe",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock_outline),
                ),
              ),
            ),
          ),
          SizedBox(height: defaultPadding / 2),
          ElevatedButton(
            onPressed: () {},
            child: Text("S'Inscrire".toUpperCase()),
          ),
          SizedBox(height: defaultPadding),
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
