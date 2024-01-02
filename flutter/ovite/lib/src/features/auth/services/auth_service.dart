import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrl = "http://localhost:3000/auth";

  Future<dynamic> register(String email, String password, String role,
      String firstName, String lastName,
      [String? kbisNumber]) async {
    var requestBody = {
      'email': email,
      'password': password,
      'role': role,
      'firstName': firstName,
      'lastName': lastName,
    };

    // Ajouter kbisNumber au corps de la requête si le rôle est 'deliverer'
    if (role == 'deliverer' && kbisNumber != null) {
      requestBody['kbisNumber'] = kbisNumber;
    }

    final response = await http.post(
      Uri.parse('$baseUrl/register'),
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
      Uri.parse('$baseUrl/login'),
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
