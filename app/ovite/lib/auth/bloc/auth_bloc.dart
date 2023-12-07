import 'dart:developer';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../shared/storage/preferences_manager.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(const AuthState()) {

    on<AuthCheckRequested>((event, emit) async {
      if (PreferencesManager().containsKey('access_token') == false) {
        emit(state.copyWith(status: AuthStatus.unknown));
      } else {
        dynamic storedToken = PreferencesManager().getToken('access_token');
        if (storedToken == null) {
          emit(state.copyWith(status: AuthStatus.unauthenticated));
        } else {
          emit(
            storedToken != null
                ? state.copyWith(status: AuthStatus.authenticated, token: storedToken)
                : state.copyWith(status: AuthStatus.unauthenticated),
          );
        }
      }
    });

    on<AuthStatusChanged>((event, emit) async {
      switch (event.status) {
        case AuthStatus.authenticated:
          dynamic storedToken = PreferencesManager().getToken('access_token');
          log("storedToken => '$storedToken'", name: "AUTH_BLOC");
          emit(
            storedToken != null
                ? state.copyWith(status: AuthStatus.authenticated, token: storedToken)
                : state.copyWith(status: AuthStatus.unauthenticated),
          );
          break;
        default:
          emit(state.copyWith(status: AuthStatus.unknown));
      }

    });

    on<AuthLogoutRequested>((event, emit) async {
      emit(state.copyWith(status: AuthStatus.unauthenticated, token: null));
      // TODO : type 'Null' is not a subtype of type 'String'
      await PreferencesManager().setToken('access_token', '');
    });

    /*AuthState authenticated(AuthStatus status, String token) {
      return AuthState.authenticated;
    }*/
  }
}
