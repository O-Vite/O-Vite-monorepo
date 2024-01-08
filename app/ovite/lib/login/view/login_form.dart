import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:ovite/register/register.dart';
import 'package:ovite/shared/constants/constants.dart';
import 'package:ovite/shared/utils/validator.dart';
import 'package:ovite/shared/widgets/already_have_an_account_check.dart';
import '../../shared/widgets/auth_text_field.dart';
import '../bloc/login_bloc.dart';


class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  // Permet de récupérer la valeur de chaque champs et d'appliquer le validateur.
  final _formKeys = GlobalKey<FormState>();
  bool isPasswordShown = false;

  final eventEmailController = TextEditingController();
  final eventPasswordController = TextEditingController();

  late FocusNode focusLoginButton;
  late FocusNode focusPassword;

  @override
  void initState() {
    super.initState();
    focusPassword = FocusNode();
  }

  void onPassShowClicked() {
    isPasswordShown = !isPasswordShown;
    setState(() {});
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    focusPassword.dispose();
    super.dispose();
    eventEmailController.dispose();
    eventPasswordController.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return BlocConsumer<LoginBloc, LoginState>(
      listener: (context, state) {
        if (state.status == LoginStatus.failure) {
          ScaffoldMessenger.of(context)..hideCurrentSnackBar()..showSnackBar(
            const SnackBar(content: Text('Authentication Failure')),
          );
        }
      },
      builder: (context, state) {
        return Form(
          key: _formKeys,
          child: Column(
            children: [
              TextFormField(
                //keyboardType: TextInputType.emailAddress,
                //textInputAction: TextInputAction.next,
                cursorColor: kPrimaryColor,
                //onSaved: (email) {},
                autofocus: true,
                controller: eventEmailController,
                validator: (String? value) {
                  return Validator.validateEmail(value);
                },
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
                  //textInputAction: TextInputAction.done,
                  obscureText: !isPasswordShown,
                  cursorColor: kPrimaryColor,
                    focusNode: focusPassword,
                  controller: eventPasswordController,
                  validator: (String? value) {
                    return Validator.validatePassword(value);
                  },
                  decoration: InputDecoration(
                    hintText: "Mot de passe",
                    prefixIcon: const Padding(
                      padding: EdgeInsets.all(defaultPadding),
                      child: Icon(Icons.lock),
                    ),
                    suffixIcon: SizedBox(
                      child: IconButton(
                        icon: const Icon(Icons.remove_red_eye),
                        onPressed: onPassShowClicked,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: defaultPadding),
              ElevatedButton.icon(
                icon: state.status == LoginStatus.inProgress ? const CircularProgressIndicator() : const Icon(Icons.login),
                onPressed: () {
                  if (_formKeys.currentState!.validate()) {
                    // Récupérer les valeurs des champs avant le dispose.
                    final String eventEmail = eventEmailController.text;
                    final String eventPassword = eventPasswordController.text;

                    context.read<LoginBloc>().add(LoginFormSubmitted(eventEmail, eventPassword));
                    // Permet de désactiver le clavier lorsque je clique sur ce button.
                    FocusScope.of(context).requestFocus(FocusNode());
                  }
                },
                label: Text(state.status == LoginStatus.inProgress ? "Logging".toUpperCase() : "Se Connecter".toUpperCase(),),
              ),
              const SizedBox(height: defaultPadding),
              AlreadyHaveAnAccountCheck(
                press: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) { return const RegisterScreen();},
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }
}

/*
class _LoginButton extends StatelessWidget {
  const _LoginButton({super.key, required this.focusNode, required this.eventEmailController, required this.eventPasswordController, required this.formKeys});

  final FocusNode focusNode;
  final GlobalKey formKeys;
  final TextEditingController eventEmailController;
  final TextEditingController eventPasswordController;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.status != current.status,
      builder: (context, state) {
        return state.status == LoginStatus.inProgress ? const CircularProgressIndicator() : SizedBox(
          width: MediaQuery.of(context).size.width/2,
          height: 50,
          child: ElevatedButton(
            onPressed: () {
              if (formKeys.currentState!.validate()) {
                // Récupérer les valeurs des champs avant le dispose.
                final eventUsername = eventEmailController.text;
                final eventPassword = eventPasswordController.text;
                //ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Loading ...")));
                // Permet de désactiver le clavier lorsque je clique sur ce button.
                FocusScope.of(context).requestFocus(FocusNode());
                context.read<LoginBloc>().add(const LoginFormSubmitted());
              }
            },
            child: Text("Se Connecter".toUpperCase(),),
          ),
        );
      },
    );
  }
}
*/

/*
class _LoginButton extends StatelessWidget {
  const _LoginButton({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.status != current.status,
      builder: (context, state) {
        return state.status == LoginStatus.inProgress ? const CircularProgressIndicator() : SizedBox(
          width: MediaQuery.of(context).size.width/2,
          height: 50,
          child: ElevatedButton(
            style: ButtonStyle(
                backgroundColor: const MaterialStatePropertyAll<Color>(Colors.green),
                shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(15)),
                    )
                )
            ),
            onPressed: () {
              context.read<LoginBloc>().add(const LoginFormSubmitted());
            },
            child: const Text("Sign in"),
          ),
        );
      },
    );
  }
}
*/



