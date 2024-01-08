import 'dart:developer';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:ovite/shared/constants/constants.dart';
import 'package:url_launcher/url_launcher.dart';

class ProductCardItemModel {
  String image = '';
  String title = '';
  int qte = 0;

  ProductCardItemModel({required this.title, required this.qte});
}

class StepModel {
  String title = "";
  bool isActive = false;
  StepModel({required this.title, required this.isActive,});
}

class DeliveryOrderValidation extends StatefulWidget {
  const DeliveryOrderValidation({super.key});

  @override
  State<DeliveryOrderValidation> createState() => _DeliveryOrderValidationState();
}

class _DeliveryOrderValidationState extends State<DeliveryOrderValidation> {
  static int _currStep = 0;
  static final focusNode =  FocusNode();
  List<ProductCardItemModel> orderDetailsList = List<ProductCardItemModel>.generate(
      3, (i) => ProductCardItemModel(title: 'Oclaire 12 cl', qte: 2)
  );

  int getProductsTotal(List<ProductCardItemModel> elements) {
    int total = 0;
    for (var el in elements) {
      total = total + el.qte;
    }
    return total;
  }

  Future<void> _launchUrl(String url) async {
    final Uri _url = Uri.parse(url);
    if (!await launchUrl(_url)) {
      throw Exception('Could not launch $_url');
    }
  }

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
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(defaultPadding),
        child: Column(
          children: [
            Container(
              child: _buildPanel(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPanel() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        const Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: ListTile(
                leading: Icon(Icons.person),
                title: Text("Bernadin G"),
                subtitle: Text("15T Rue de rosebois, 75260, Paris"),
              ),
            ),
            Expanded(
              child: ListTile(
                leading: Icon(Icons.arrow_forward_ios_outlined),
                title: Text("Commission : 7€"),
              ),
            ),
          ],
        ),
        ExpansionPanelList.radio(
          initialOpenPanelValue: 0,
          animationDuration: const Duration(seconds: 2),
          children: [
            ExpansionPanelRadio(
              value: 0,
              headerBuilder: (BuildContext context, bool isExpanded) {
                return const ListTile(
                  title: Text("Etapes de validation de la commande"),
                );
              },
              body: Stepper(
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
            ),
            ExpansionPanelRadio(
              value: 1,
              headerBuilder: (BuildContext context, bool isExpanded) {
              return const ListTile(
                title: Text("Détails de la commande"),
              );
              },
              body: SizedBox(
                height: MediaQuery.of(context).size.height/2,
                width: MediaQuery.of(context).size.width,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Expanded(child: orderCardList(orderDetailsList),),
                    Expanded(child: Text('Total : ${getProductsTotal(orderDetailsList)}€'))
                  ],
                )
              )
            ),
          ]
        ),
      ],
    );
  }

  Widget orderItemCard(ProductCardItemModel productCartItem) {
    return ListTile(
      leading: const CircleAvatar(
        radius: 30.0,
        backgroundImage: NetworkImage('https://png2.cleanpng.com/sh/ae5ea3a5de81926e26349e76a92f100c/L0KzQYm3VMA4N5VAfZH0aYP2gLBuTfJwfKVxfdY2d3H3dcO0hvl7gqoyfORybnv2Pb7wjvVzaZ0yj9N9ZYKwfbr1hgJidF58eeZucj24cbSCVcNjO2lpS6puMj64RIq9WcQzO2I6SqU6NEO5QIS8V8g2NqFzf3==/kisspng-bottled-water-fizzy-drinks-mineral-water-mineral-water-5ac953b38d38e2.5496942315231436035785.png'),
        //backgroundColor: Colors.transparent,
      ),
      title: Text("${productCartItem.title}                    x ${productCartItem.qte}"),
    );
  }

  Widget orderCardList(List<ProductCardItemModel> productCartList) {
    return ListView.builder(
        itemCount: productCartList.length,
        itemBuilder: (context, index) {
          final item = productCartList[index];
          return orderItemCard(item);
        },
    );
  }
}
