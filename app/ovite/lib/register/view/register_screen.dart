import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:ovite/login/bloc/login_bloc.dart';
import 'package:ovite/register/register.dart';
import 'package:ovite/shared/widgets/globals/background_image.dart';

import '../../auth/bloc/auth_bloc.dart';
import '../../responsive.dart';
import '../../shared/constants/constants.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const RegisterScreen());
  }

  /*static Route<void> route() {
    return MaterialPageRoute<void>(
      builder: (_) => const LoginScreen(),
    );
  }*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: BlocProvider(
          create: (context) => LoginBloc(authBloc: BlocProvider.of<AuthBloc>(context),),
          child: BackgroundImage(
              child: SingleChildScrollView(
                child: Responsive(
                  mobile: const MobileRegisterScreen(),
                  desktop: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Column(
                          children: [
                            Row(
                              children: [
                                Expanded(
                                  flex: 13,
                                  child: SvgPicture.asset("assets/icons/logo.svg"),
                                ),
                              ],
                            ),
                            const SizedBox(height: defaultPadding * 2),
                          ],
                        ),
                        const SizedBox(
                          width: 450,
                          child: RegisterForm(),
                        ),
                      ]
                  ),
                ),
              )
          ),
        ),
      ),
    );
  }
}

class MobileRegisterScreen extends StatelessWidget {
  const MobileRegisterScreen({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: MediaQuery.of(context).size.height,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Expanded(
              flex: 1,
                child: SvgPicture.asset("assets/icons/logo.svg")
            ),
            const Expanded(
              flex: 7,
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: RegisterForm(),
              ),
            ),
          ],
        ),
    );
  }
}

/*
class MobileRegisterScreen extends StatelessWidget {
  const MobileRegisterScreen({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height,
      child:  const SingleChildScrollView(
          child :Padding(
        padding: EdgeInsets.all(8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Expanded(
              child: Text("Signup Deliverer"),
            ),
             Expanded(
               flex: 15,
              child: RegisterForm(),
            ),
          ],
        ),
          ),
      ),
    );
  }
}
*/