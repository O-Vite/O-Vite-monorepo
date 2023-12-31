import 'package:flutter/material.dart';
import 'package:ovite/login/login.dart';
import 'package:ovite/shared/constants/constants.dart';
import 'package:ovite/shared/widgets/already_have_an_account_check.dart';


class RegisterForm extends StatefulWidget {
  const RegisterForm({
    Key? key,
  }) : super(key: key);

  @override
  State<RegisterForm> createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  // Permet de récupérer la valeur de chaque champs et d'appliquer le validateur.
  final _formKeys = GlobalKey<FormState>();

  final eventSiretController    = TextEditingController();
  final eventFirstNameController    = TextEditingController();
  final eventLastNameController     = TextEditingController();
  final eventEmailController    = TextEditingController();
  final eventPhoneController    = TextEditingController();
  final eventPasswordController = TextEditingController();
  final eventCPasswordController = TextEditingController();

 /* late FocusNode focusSiret;
  late FocusNode focusFirstName;
  late FocusNode focusLastName;
  late FocusNode focusEmail;
  late FocusNode focusPhone;
  late FocusNode focusPassword;
  late FocusNode focusCPassword;
  late FocusNode focusSignUpButton;*/

  @override
  void initState() {
    super.initState();
/*    focusSiret = FocusNode();
    focusFirstName = FocusNode();
    focusLastName = FocusNode();
    focusEmail = FocusNode();
    focusPhone = FocusNode();
    focusPassword = FocusNode();*/
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    //focusCPassword.dispose();
    eventSiretController.dispose();
    eventFirstNameController.dispose();
    eventLastNameController.dispose();
    eventEmailController.dispose();
    eventPhoneController.dispose();
    eventPasswordController.dispose();
    eventCPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKeys,
      child: Column(
        children: [
          TextFormField(
            controller: eventSiretController,
            keyboardType: TextInputType.text,
            textInputAction: TextInputAction.next,
            decoration: const InputDecoration(
              hintText: "Siret",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.credit_card_outlined),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: eventFirstNameController,
              keyboardType: TextInputType.name,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(
                hintText: "Prénom",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.person_outline),
                ),
              ),
            ),
          ),
          TextFormField(
            controller: eventLastNameController,
            keyboardType: TextInputType.name,
            textInputAction: TextInputAction.next,
            decoration: const InputDecoration(
              hintText: "Nom",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.person_outline),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: eventEmailController,
              keyboardType: TextInputType.emailAddress,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(
                hintText: "Email",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.email_outlined),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: eventPhoneController,
              keyboardType: TextInputType.phone,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(
                hintText: "Telephone",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.phone_outlined),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              textInputAction: TextInputAction.next,
              obscureText: true,
              decoration: const InputDecoration(
                hintText: "Mot de passe",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock_outline  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8), // Ajustement de l'écart
            child: TextFormField(
              textInputAction: TextInputAction.done,
              obscureText: true,
              decoration: const InputDecoration(
                hintText: "Confirmer mot de passe",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock_outline),
                ),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding / 2),
          ElevatedButton(
            onPressed: () {},
            child: Text("S'inscrire".toUpperCase()),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            login: false,
            press: () {
              LoginScreen.route();
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