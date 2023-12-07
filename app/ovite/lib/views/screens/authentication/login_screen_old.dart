import 'package:flutter/material.dart';
import 'package:ovite/core/services/auth_api_services.dart';
import 'package:ovite/views/screens/delivery/home_delivery.dart';

import '../../../shared/utils/validator.dart';

class LoginScreenOld extends StatefulWidget {
  const LoginScreenOld({super.key});

  @override
  State<LoginScreenOld> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreenOld> {
  // Permet de récupérer la valeur de chaque champs et d'appliquer le validateur.
  final _formKeys = GlobalKey<FormState>();

  final eventUsernameController = TextEditingController();
  final eventPasswordController = TextEditingController();

  late FocusNode focusPassword;

  Future<void> login () async {
    if (_formKeys.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: const Text('Processing Data'),
        backgroundColor: Colors.green.shade300,
      ));

      dynamic res = AuthApiServices.instance.login(
        eventUsernameController.text,
        eventUsernameController.text,
      );

      ScaffoldMessenger.of(context).hideCurrentSnackBar();

      if (res['ErrorCode'] == null) {
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => const HomeDelivery()
            )
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Error: ${res['Message']}'),
          backgroundColor: Colors.red.shade300,
        ));
      }
    }
  }

  @override
  void initState() {
    super.initState();
    focusPassword = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    focusPassword.dispose();

    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          margin: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(
                height: MediaQuery.of(context).size.height/11,
                alignment: Alignment.center,
                child: const Text('Login', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green, fontSize: 55, fontStyle: FontStyle.italic),)
              ),
              Container(
                alignment: Alignment.center,
                child: Form(
                  key: _formKeys,
                  child: SizedBox(
                    height: 250,
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            margin: const EdgeInsets.only(bottom: 5),
                            child: TextFormField(
                              autofocus: true,
                              controller: eventUsernameController,
                              validator: (String? value) {
                                return Validator.validateEmail(value);
                              },
                              decoration: const InputDecoration(
                                hintText: 'Username or Email', //placeholder
                                labelText: 'Username',
                                border: OutlineInputBorder(
                                    borderSide: BorderSide(style: BorderStyle.solid),
                                    borderRadius: BorderRadius.all(Radius.circular(15))
                                ),
                              ),
                            ),
                          ),
                          Container(
                            margin: const EdgeInsets.only(bottom: 5),
                            child: TextFormField(
                              focusNode: focusPassword,
                              controller: eventPasswordController,
                              validator: (String? value) {
                                return Validator.validatePassword(value);
                              },
                              obscureText: true,
                              decoration: const InputDecoration(
                                hintText: 'Password', //placeholder
                                labelText: 'Password',
                                fillColor: Colors.green,
                                border: OutlineInputBorder(
                                    borderSide: BorderSide(style: BorderStyle.solid, color: Colors.red),
                                    borderRadius: BorderRadius.all(Radius.circular(15))
                                ),
                                floatingLabelStyle: TextStyle(color: Colors.green),

                              ),
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(children: [
                                Material(child: InkWell(
                                  child: const Padding(
                                    padding: EdgeInsets.all(8.0),
                                    child: Text(
                                      'Forget password',
                                      style: TextStyle(
                                        color: Colors.blue,
                                        decoration: TextDecoration.none,
                                      ),
                                    ),
                                  ),
                                  onTap: () => {

                                  },
                                ),)
                              ],)
                            ],
                          ),
                          SizedBox(
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
                                // Permet de verifier si tous les validateurs sont correctes
                                if (_formKeys.currentState!.validate()) {
                                  // Récupérer les valeurs des champs avant le dispose.
                                  final eventUsername = eventUsernameController.text;
                                  final eventPassword = eventPasswordController.text;
                                  ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(content: Text("Sending event : $eventUsername | Speaker : $eventPassword"))
                                  );
                                  // Permet de désactiver le clavier lorsque je clique sur ce button.
                                  FocusScope.of(context).requestFocus(FocusNode());
                                }
                              },
                              child: const Text("Sign in"),
                            ),
                          ),
                        ]
                    ),
                  )
              ),)
            ],
          )
      ),
    );
  }
}

