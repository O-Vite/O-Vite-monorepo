import 'package:shared_preferences/shared_preferences.dart';

class PreferencesManager {
  static final PreferencesManager _instance = PreferencesManager._internal();
  late SharedPreferences _prefs;

  factory PreferencesManager() {
    return _instance;
  }

  PreferencesManager._internal();

  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  dynamic getToken(String tokenKey) {
    return _prefs.getString(tokenKey); // Could be null
  }

  Future<void> setToken(String tokenKey, dynamic tokenValue) async {
    await _prefs.setString(tokenKey, tokenValue);
  }

  bool containsKey(String key) {
    return _prefs.containsKey(key);
  }
}
