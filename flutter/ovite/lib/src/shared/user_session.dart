import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decode/jwt_decode.dart';

class UserSession {
  static String? jwtToken;
  static String? userRole;
  static int? currentTabIndex;
  static String? userId;

  static Future<void> setSession(
    String token,
    String role,
  ) async {
    jwtToken = token;
    userRole = role;
    Map<String, dynamic> tokenData = Jwt.parseJwt(token);
    userId = tokenData['id'];

    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('jwt_token', token);
    await prefs.setString('user_role', role);
    await prefs.setString('user_id', userId!);
  }

  static Future<void> clearSession() async {
    jwtToken = null;
    userRole = null;
    currentTabIndex = null;
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt_token');
    await prefs.remove('user_role');
    await prefs.remove('current_tab_index');
    await prefs.remove('user_id');
  }

  static Future<void> setTabIndex(int index) async {
    currentTabIndex = index;
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setInt('current_tab_index', index);
  }

  static Future<void> init() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    jwtToken = prefs.getString('jwt_token');
    userRole = prefs.getString('user_role');
    userId = prefs.getString('user_id');
    currentTabIndex = prefs.getInt('current_tab_index') ?? 0;
  }

  static bool get isUserLoggedIn => jwtToken != null;
}
