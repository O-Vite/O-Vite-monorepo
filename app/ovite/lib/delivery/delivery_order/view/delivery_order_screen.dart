import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:ovite/delivery/delivery_order/components/delivery_order_validation.dart';
import 'package:ovite/shared/constants/constants.dart';
//import 'package:validate/validate.dart';  //for validation

import 'package:flutter/material.dart';
import 'package:ovite/shared/constants/constants.dart';

class MyData {
  String name = '';
  String phone = '';
  String email = '';
  String age = '';
}

class StepModel {
  String title = "";
  bool isActive = false;
  StepModel({required this.title, required this.isActive,});
}

class DeliveryOrderScreen extends StatefulWidget {
  const DeliveryOrderScreen({super.key});

  @override
  State<StatefulWidget> createState() { return  _DeliveryOrderScreenState(); }
}

class _DeliveryOrderScreenState extends State<DeliveryOrderScreen> {
  static int _currStep = 0;
  static final focusNode =  FocusNode();
  final GlobalKey<FormState> _formKey =  GlobalKey<FormState>();
  static MyData data =  MyData();

  @override
  void dispose() {
    focusNode.dispose();
    super.dispose();
  }

  List<Step> steps = [
    Step(
      title: const Text('En cours de prise en charge'),
      isActive: _currStep >= 0,
      state: _currStep >= 0 ? StepState.editing : StepState.complete,
      content:  const Text("Valider la prise en charge de la commande."),
    ),
    Step(
      title: const Text('Chargement réalisé'),
      isActive: _currStep <= 1,
      state: _currStep >= 1 ? StepState.editing : StepState.complete,
      content:  const Text("Valider le chargement de la commande."),
    ),
    Step(
      title: const Text('Départ du dépôt'),
      isActive: _currStep <= 2,
      state: _currStep >= 2 ? StepState.editing : StepState.complete,
      content:  const Text("Valider le Départ du dépôt de la commande."),
    ),
    Step(
      title: const Text('Livré'),
      isActive: _currStep >= 3,
      state: StepState.complete,
      content:  const Text("Valider la livraison de la commande."),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return const DeliveryOrderValidation();
  }
}




/*
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:ovite/shared/constants/constants.dart';
//import 'package:validate/validate.dart';  //for validation

class DeliveryOrderScreen extends StatefulWidget {
  const DeliveryOrderScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return  _DeliveryOrderScreenState();
  }
}

class MyData {
  String name = '';
  String phone = '';
  String email = '';
  String age = '';
}

class _DeliveryOrderScreenState extends State<DeliveryOrderScreen> {
  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
        theme:  ThemeData(
          primarySwatch: Colors.lightGreen,
        ),
        home:  Scaffold(
          appBar:  AppBar(
            title:  const Text('Steppers'),
          ),
          body:  const StepperBody(),
        ));
  }
}

class StepperBody extends StatefulWidget {
  const StepperBody({super.key});

  @override
  //_StepperBodyState createState() =>  _StepperBodyState();
  State<StepperBody> createState() => _StepperBodyState();
}

class _StepperBodyState extends State<StepperBody> {
  int _currStep = 0;
  static final focusNode =  FocusNode();
  final GlobalKey<FormState> _formKey =  GlobalKey<FormState>();
  static MyData data =  MyData();

  /*@override
  void initState() {
    super.initState();
    _focusNode.addListener(() {
      setState(() {});
      log('Has focus: $_focusNode.hasFocus');
    });
  }*/

  @override
  void dispose() {
    focusNode.dispose();
    super.dispose();
  }

  List<Step> steps = [
     Step(
        title: const Text('Name'),
        //subtitle: const Text('Enter your name'),
        isActive: true,
        //state: StepState.error,
        state: StepState.indexed,
        content:  TextFormField(
          focusNode: focusNode,
          keyboardType: TextInputType.text,
          autocorrect: false,
          onSaved: (String? value) {
            data.name = value!;
          },
          maxLines: 1,
          //initialValue: 'Aseem Wangoo',
          validator: (value) {
            if (value == null || value.isEmpty ) {
              return 'Please enter name';
            }
            return null;
          },
          decoration:  const InputDecoration(
              labelText: 'Enter your name',
              hintText: 'Enter a name',
              //filled: true,
              icon: Icon(Icons.person),
              labelStyle:
               TextStyle(decorationStyle: TextDecorationStyle.solid)),
        )),
     Step(
        title: const Text('Phone'),
        //subtitle: const Text('Subtitle'),
        isActive: true,
        //state: StepState.editing,
        state: StepState.indexed,
        content:  TextFormField(
          keyboardType: TextInputType.phone,
          autocorrect: false,
          validator: (value) {
            if (value == null || value.isEmpty || value.length < 10) {
              return 'Please enter valid number';
            }
            return null;
          },
          onSaved: (String? value) {
            data.phone = value!;
          },
          maxLines: 1,
          decoration:  const InputDecoration(
              labelText: 'Enter your number',
              hintText: 'Enter a number',
              icon: Icon(Icons.phone),
              labelStyle:
               TextStyle(decorationStyle: TextDecorationStyle.solid)),
        )),
     Step(
        title: const Text('Email'),
        // subtitle: const Text('Subtitle'),
        isActive: true,
        state: StepState.indexed,
        // state: StepState.disabled,
        content:  TextFormField(
          keyboardType: TextInputType.emailAddress,
          autocorrect: false,
          validator: (value) {
            if (value == null || value.isEmpty || !value.contains('@')) {
              return 'Please enter valid email';
            }
            return null;
          },
          onSaved: (String? value) {
            data.email = value!;
          },
          maxLines: 1,
          decoration:  const InputDecoration(
              labelText: 'Enter your email',
              hintText: 'Enter a email address',
              icon: Icon(Icons.email),
              labelStyle:
               TextStyle(decorationStyle: TextDecorationStyle.solid)),
        )),
     Step(
        title: const Text('Age'),
        // subtitle: const Text('Subtitle'),
        isActive: true,
        state: StepState.indexed,
        content:  TextFormField(
          keyboardType: TextInputType.number,
          autocorrect: false,
          validator: (value) {
            if (value == null || value.isEmpty || value.length > 2) {
              return 'Please enter valid age';
            }
            return null;
          },
          maxLines: 1,
          onSaved: (String? value) {
            data.age = value!;
          },
          decoration:  const InputDecoration(
              labelText: 'Enter your age',
              hintText: 'Enter age',
              icon: Icon(Icons.explicit),
              labelStyle:
               TextStyle(decorationStyle: TextDecorationStyle.solid)),
        )),
    //  Step(
    //     title: const Text('Fifth Step'),
    //     subtitle: const Text('Subtitle'),
    //     isActive: true,
    //     state: StepState.complete,
    //     content: const Text('Enjoy Step Fifth'))
  ];

  @override
  Widget build(BuildContext context) {
    void showSnackBarMessage(String message, [MaterialColor color = Colors.red]) {
      ScaffoldMessenger
          .of(context)
          .showSnackBar( SnackBar(content:  Text(message)));
    }

    void submitDetails() {
      final FormState? formState = _formKey.currentState;

      if (!formState!.validate()) {
        showSnackBarMessage('Please enter correct data');
      } else {
        formState.save();
        log("Name: ${data.name}");
        log("Phone: ${data.phone}");
        log("Email: ${data.email}");
        log("Age: ${data.age}");

        showDialog(
            context: context,
            builder:  (BuildContext context) {
              return AlertDialog(
                title:  const Text("Details"),
                content:  SingleChildScrollView(
                child:  ListBody(
                    children: <Widget>[
                       Text("Name : ${data.name}"),
                       Text("Phone : ${data.phone}"),
                       Text("Email : ${data.email}"),
                       Text("Age : ${data.age}"),
                    ],
                  ),
                ),
                actions: <Widget>[
                   ElevatedButton(
                    child:  const Text('OK'),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              );
            }
        );
      }
    }

    return Form(
      key: _formKey,
      child:  ListView(children: <Widget>[
         Stepper(
          steps: steps,
          type: StepperType.vertical,
          currentStep: _currStep,
          onStepContinue: () {
            setState(() {
              if (_currStep < steps.length - 1) {
                _currStep = _currStep + 1;
              } else {
                _currStep = 0;
              }
            });
          },
          onStepCancel: () {
            setState(() {
              if (_currStep > 0) {
                _currStep = _currStep - 1;
              } else {
                _currStep = 0;
              }
            });
          },
          onStepTapped: (step) {
            setState(() {
              _currStep = step;
            });
          },
        ),
         ElevatedButton(
          onPressed: submitDetails,
          child:  const Text(
            'Save details',
            style:  TextStyle(color: kPrimaryColor),
          ),
          //color: Colors.blue,
        ),
      ]),
    );
  }
}
 */