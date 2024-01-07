import 'package:flutter/material.dart';
import 'package:ovite/responsive.dart';
import 'package:ovite/src/shared/user_session.dart';
import 'package:ovite/src/features/client/screens/client_home_page.dart';
import 'package:ovite/src/features/livreur/screens/livreur_home_page.dart';

import '../.../../../../../shared/components/background.dart';
import '../components_login/login_form.dart';
import '../components_login/login_screen_top_image.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  void _checkLoginStatus() async {
    await UserSession.init();
    if (UserSession.isUserLoggedIn) {
      if (UserSession.userRole == 'client') {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => ClientMainPage()),
        );
      } else if (UserSession.userRole == 'livreur') {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => LivreurHomePage()),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Background(
      child: SingleChildScrollView(
        child: Responsive(
          mobile: MobileLoginScreen(),
          desktop: Row(
            children: [
              Expanded(
                child: LoginScreenTopImage(),
              ),
              Expanded(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: 450,
                      child: LoginForm(),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MobileLoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        LoginScreenTopImage(),
        Row(
          children: [
            Spacer(),
            Expanded(
              flex: 8,
              child: LoginForm(),
            ),
            Spacer(),
          ],
        ),
      ],
    );
  }
}
