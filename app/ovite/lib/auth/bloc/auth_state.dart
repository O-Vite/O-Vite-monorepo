part of 'auth_bloc.dart';

enum AuthStatus {
  unknown,
  authenticated,
  unauthenticated,
}

class AuthState extends Equatable{
  final AuthStatus status;
//  final dynamic token;

  const AuthState({
    this.status = AuthStatus.unknown,
    //this.token,
  });

  AuthState copyWith({
    AuthStatus? status,
    dynamic token,
  }) {
    return AuthState(
      status: status ?? this.status,
      //token : token ?? this.token,
    );
  }

  @override
  List<Object> get props => [status];
}
