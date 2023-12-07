import 'dart:io';
import 'dart:developer';

import 'package:ovite/core/errors/network_error.dart';
import 'package:ovite/core/errors/parsing_error.dart';
import 'package:ovite/core/errors/unknown_error.dart';
import 'package:dio/dio.dart';

import '../models/auth_models.dart';

class AuthApiServices {
  static const _baseUrl =  'https://reqres.in/api';
  //static const _olBaseUrl =  'https://dummyjson.com';

  static AuthApiServices? _instance;
  static AuthApiServices get instance {
    if (_instance != null) _instance!;
    _instance = AuthApiServices._internal();
    return _instance!;
  }
  AuthApiServices._internal();

  Dio? _dio;
  Dio get _client {
    if (_dio != null) return _dio!;
    _dio = Dio(BaseOptions(
      baseUrl: AuthApiServices._baseUrl,
    ));
    return _dio!;
  }

  //final Dio _dio = Dio();

  Future<dynamic> login(String email, String password) async {
    try {
      Response response = await _client.post(
        '$_baseUrl/login',
        data: {
          'email': email,
          'password': password,
        },
        //queryParameters: {'apikey': ApiSecret.apiKey},
      );

      //final dynamic jsonBody  = json.decode(response.data);
      //if(jsonBody is Map<String, dynamic>)  {
      final authToken = Auth.fromJson(response.data);
      final data = authToken.token;
      log('authToken: $data', name: 'AuthServices');

      //if (authToken == null) {        throw ParsingError();      }

      //await Future.delayed(const Duration(milliseconds: 500));
      // Mettre en place le AuthProvider
      return authToken.token;
      //}

    } on SocketException {
      throw NetworkError();
    } on DioError catch (error) {
      log('error: $error', name: 'AuthServices');
      throw UnknownError(message: error.toString());
    }
  }

  Future<dynamic> getUserProfileData({required String accessToken}) async {
    try {
      Response response = await _client.get(
        '$_baseUrl/users/2',
        //queryParameters: {'apikey': ApiSecret.apiKey},
        options: Options(
          headers: {'Authorization': 'Bearer $accessToken'},
        ),
      );
      return response.data;

    } on SocketException {
      throw NetworkError();
    } on DioError catch (error) {
      log('error: $error', name: 'AuthServices');
      throw UnknownError(message: error.toString());
    }
  }
}