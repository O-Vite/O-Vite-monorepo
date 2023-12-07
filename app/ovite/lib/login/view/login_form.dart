import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import '../../shared/widgets/auth_text_field.dart';
import '../bloc/login_bloc.dart';


class LoginForm extends StatelessWidget {
  const LoginForm({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<LoginBloc, LoginState>(
      listener: (context, state) {
        if (state.status == FormzSubmissionStatus.failure) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              const SnackBar(content: Text('Authentication Failure')),
            );
        } else {
          final data =  state.status;
          log('state.status => $data', name: "Login form");
        }
      },
      child: Align(
        alignment: const Alignment(0, -1 / 3),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _EmailInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _PasswordInput(),
            const Padding(padding: EdgeInsets.all(12)),
            const _LoginButton(),
          ],
        ),
      ),
    );
  }
}

class _EmailInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.email != current.email,
      builder: (context, state) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 16.0),
          child: AuthTextField(
            hint: 'Email',
            labelText: 'Email',
            key: const Key('signInForm_emailInput_textField'),
            isRequiredField: true,
            keyboardType: TextInputType.text,
            onChanged: (String email) => context.read<LoginBloc>().add(LoginEmailChanged(email)),
            error: "",
          ),
        );
      },
    );
  }
}

class _PasswordInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.email != current.email,
      builder: (context, state) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 16.0),
          child: AuthTextField(
            hint: 'Password',
            labelText: 'Password',
            key: const Key('signInForm_passwordInput_textField'),
            isRequiredField: true,
            keyboardType: TextInputType.text,
            onChanged: (String password) => context.read<LoginBloc>().add(LoginPasswordChanged(password)),
            error: "",
          ),
        );
      },
    );
  }
}

class _LoginButton extends StatelessWidget {
  const _LoginButton({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.status != current.status,
      builder: (context, state) {
        return state.status.isInProgress ? const CircularProgressIndicator() : SizedBox(
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

class _SignUpButton extends StatelessWidget {
  const _SignUpButton({required Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.status != current.status,
      builder: (context, state) {
        return SizedBox(
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
            onPressed: () => Navigator.of(context).pushNamed('/login/signUp'),
            child: const Text("Sign up"),
          ),
        );
      },
    );
  }
}

