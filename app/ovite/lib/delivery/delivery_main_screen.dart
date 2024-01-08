import 'package:flutter/material.dart';
import 'package:ovite/delivery/delivery.dart';
import 'package:ovite/delivery/delivery_chat/delivery_chat.dart';
import 'package:ovite/shared/constants/constants.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ovite/auth/bloc/auth_bloc.dart';

import 'delivery_order/delivery_order.dart';

class DeliveryMainScreen extends StatefulWidget {
  const DeliveryMainScreen({super.key});

  @override
  State<DeliveryMainScreen> createState() => _DeliveryMainScreenState();

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const DeliveryMainScreen());
  }
}

class _DeliveryMainScreenState extends State<DeliveryMainScreen> {
  int _currentIndex = 0;
  int counterNotification = 0;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const [Text('Acceuil'), Text('Tableau de board'), Text('Commande en cours'), Text('Chat'), Text('Account'),][_currentIndex],
          leading: const [Icon(Icons.home), Icon(Icons.bar_chart), Icon(Icons.shopping_cart), Icon(Icons.chat), Icon(Icons.person),][_currentIndex],
          titleSpacing: 0,
          backgroundColor: kPrimaryLightColor,
          actions: [
            notificationIcon(counterNotification),
            IconButton(icon: const Icon(Icons.logout), tooltip: 'logout', onPressed: () {
              context.read<AuthBloc>().add(AuthLogoutRequested());
            },),
          ],
        ),
        body: const [DeliveryHomeScreen(), DeliveryHomeScreen(), DeliveryOrderScreen(), DeliveryChatScreen(), DeliveryHomeScreen(),][_currentIndex],
        bottomNavigationBar: BottomNavigationBar(
          selectedItemColor: kPrimaryColor,
          unselectedItemColor: Colors.black,
          currentIndex: _currentIndex,
          backgroundColor: kPrimaryLightColor,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          items: const [
            BottomNavigationBarItem(label: "Home", icon: Icon(Icons.home)),
            BottomNavigationBarItem(label: "Events", icon: Icon(Icons.bar_chart)),
            BottomNavigationBarItem(label: "Add Event", icon: Icon(Icons.shopping_cart)),
            BottomNavigationBarItem(label: "Chat", icon: Icon(Icons.chat)),
            BottomNavigationBarItem(label: "Account", icon: Icon(Icons.person)),
          ],
        ),
      ),
    );
  }
  
  Widget notificationIcon(int counterNotification) {
    return Stack(
      children: [
        IconButton(icon: const Icon(Icons.notifications), onPressed: () {
          setState(() {
            counterNotification = 0;
          });
        }, ),
        counterNotification == 0 ? Container() :
            Positioned(
              right: 11, top: 11,
              child: Container(
                padding: const EdgeInsets.all(2),
                decoration: BoxDecoration(
                  color: Colors.red,
                  borderRadius: BorderRadius.circular(6),
                ),
                constraints: const BoxConstraints(
                  minWidth: 14,
                  minHeight: 14,
                ),
                child: Text(
                  '$counterNotification',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 8,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            )
      ],
    );
  }
}
