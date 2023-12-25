import 'package:shared_preferences/shared_preferences.dart';

class UserSession {
  static String? jwtToken;
  static String? userRole;

  static Future<void> setSession(String token, String role) async {
    jwtToken = token;
    userRole = role;

    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('jwt_token', token);
  }

  static Future<void> clearSession() async {
    jwtToken = null;
    userRole = null;

    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt_token');
  }

  static bool get isUserLoggedIn => jwtToken != null;
}
