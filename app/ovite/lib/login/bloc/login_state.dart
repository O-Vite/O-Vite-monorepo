part of 'login_bloc.dart';

enum LoginStatus {
  error,
  logging,
  success,
  failed,
}

class LoginState extends Equatable{
  final Email email;
  final Password password;
  final FormzSubmissionStatus status;
  final String exceptionError;
  final bool isValid;

  const LoginState({
    this.email = const Email.pure(),
    this.password = const Password.pure(),
    this.status = FormzSubmissionStatus.initial,
    this.exceptionError = '',
    this.isValid = false,
  });

  LoginState copyWith({
    Email? email,
    Password? password,
    FormzSubmissionStatus? status,
    String? error,
    bool? isValid,
  }) {
    return LoginState(
      email: email ?? this.email,
      password: password ?? this.password,
      status: status ?? this.status,
      exceptionError: error ?? exceptionError,
      isValid: isValid ?? this.isValid,
    );
  }

  @override
  List<Object> get props => [email, password, status, exceptionError];
}
