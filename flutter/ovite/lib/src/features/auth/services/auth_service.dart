import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrl = "http://10.0.2.2:3000/auth";
  final String authBaseUrl = "http://10.0.2.2:3000/auth";
  final String clientsBaseUrl = "http://10.0.2.2:3000/clients";
  final String deliverersBaseUrl = "http://10.0.2.2:3000/deliverers";

  Future<dynamic> register(Map<String, dynamic> userData) async {
    String role = userData['role'];
    var url = role == 'deliverer' ? deliverersBaseUrl : clientsBaseUrl;

    var requestBody = role == 'deliverer'
        ? {
            'kbisNumber': int.tryParse(userData['kbisNumber']) ?? 0,
            "orders": null,
            'user': {
              'email': userData['email'],
              'password': userData['password'],
              'role': role,
              'firstName': userData['firstName'],
              'name': userData['name'],
              'phoneNumber': userData['phoneNumber'],
              'isVerified': false,
            }
          }
        : {
            "orders": null,
            'user': {
              'email': userData['email'],
              'password': userData['password'],
              'role': role,
              'firstName': userData['firstName'],
              'name': userData['name'],
              'phoneNumber': userData['phoneNumber'],
              'isVerified': false,
            }
          };

    final response = await http.post(
      Uri.parse('$url'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(requestBody),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Erreur lors de l\'inscription: ${response.body}');
    }
  }

  Future<dynamic> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$authBaseUrl/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Erreur lors de la connexion: ${response.body}');
    }
  }
}
