class Auth {
  final String token;

  Auth({required this.token});

  factory Auth.fromJson(Map<String, dynamic> json) {
    return Auth(
      token: json['token'],
    );
  }
}