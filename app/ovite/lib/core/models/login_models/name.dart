import 'package:formz/formz.dart';

enum NameError {
  empty,
  invalid
}

class Name extends FormzInput<String, NameError> {
  const Name.pure([String value = '']) : super.pure(value);
  const Name.dirty([String value = '']) : super.dirty(value);

  static final RegExp _nameRegExp = RegExp(
    r'^(?=.*[a-z])[A-Za-z ]{6,}$',
  );



  @override
  NameError? validator(String value) {
    if (value.isNotEmpty == false) {
      return NameError.empty;
    }
    return _nameRegExp.hasMatch(value)
        ? null
        : NameError.invalid;
  }
}

extension Explanation on NameError {
  String? get name {
    switch(this) {
      case NameError.invalid:
        return "🚩 Please enter a valid name (At least 6 characters).";
      default:
        return null;
    }
  }
}