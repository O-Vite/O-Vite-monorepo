import 'dart:developer';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:formz/formz.dart';

import '../../auth/bloc/auth_bloc.dart';
import '../../core/models/login_models/email.dart';
import '../../core/models/login_models/password.dart';
import '../../core/services/auth_api_services.dart';
import '../../shared/storage/preferences_manager.dart';

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final AuthBloc authBloc;

  LoginBloc({required this.authBloc}) : super(const LoginState()) {

    on<LoginEmailChanged>((event, emit) {
      final email = Email.dirty(event.email);
      emit(state.copyWith(email: email, isValid: Formz.validate([state.password, email])));
    });

    on<LoginPasswordChanged>((event, emit) {
      final password = Password.dirty(event.password);
      emit(state.copyWith(password: password, isValid: Formz.validate([state.email, password])));
    });

    on<LoginFormSubmitted>((event, emit) async {
      //if (state.isValid) {
        emit(state.copyWith(status: FormzSubmissionStatus.inProgress));
        try {
          final response = await AuthApiServices.instance.login(
              state.email.value,
              state.password.value,
          );

          //if (response['token'] != null) {
          log("LoginFormSubmitted, login response => '$response'", name: "LOGIN BLOC");
          if (response != null) {


            // Save token in local storage
            String accessToken = response;
            await PreferencesManager().setToken('access_token', accessToken);
            emit(state.copyWith(status: FormzSubmissionStatus.success));
            // Emet le changement d'état à AuthBloc
            //if (authBloc != null) {
              authBloc.add(const AuthStatusChanged(AuthStatus.authenticated));
              log("AuthStatusChanged TO AUTHENTICATED | TOKEN => '$accessToken'", name: "LOGIN BLOC");
            //}
          } else if (response['error'] != null) {
            emit(state.copyWith(status: FormzSubmissionStatus.failure));
          }

        } catch (_) {
          emit(state.copyWith(status: FormzSubmissionStatus.failure));
        }
      }
    //}
    );
  }
}
