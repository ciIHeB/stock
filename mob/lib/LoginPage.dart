import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:trademasterapp/main.dart';
import 'package:trademasterapp/MainPage.dart';
import 'dart:convert';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool passToggle = true;
  bool _isLoading = false;
  String _email = '';
  String _password = '';
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Update this URL to match your backend server
  static const String baseUrl =
      'http://localhost:3000'; // Change this to your actual server URL

  String? validateEmail(String? email) {
    if (email!.isEmpty) {
      return 'Can\'t be empty';
    }
    if (email.length < 2) {
      return 'Too short';
    }
    if (!RegExp(r"^[a-zA-Z]").hasMatch(email)) {
      return 'Invalid Email Id';
    }
    return null;
  }

  String? validatePassword(String? password) {
    if (password!.isEmpty) {
      return 'Can\'t be empty';
    }
    if (password.length < 2) {
      return 'Password should not be less than 6 characters';
    }
    return null;
  }

  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      try {
        final response = await http.post(
          Uri.parse('$baseUrl/api/mobileauth/login'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'HHUserName': _email,
            'HHUserPassword': _password,
          }),
        );

        if (response.statusCode == 200) {
          final responseData = response.body;
          final token = responseData;
          //final user = responseData['user'];

          // Save token and user data to shared preferences or state management
          // For now, we'll just navigate to the main screen
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Login Successful! Welcome ${['test']}'),
              backgroundColor: Colors.green,
            ),
          );
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => MainScreen()),
          );
        } else {
          final errorData = jsonDecode(response.body);
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(errorData['error'] ?? 'Login failed'),
              backgroundColor: Colors.red,
            ),
          );
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Connection error: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: 90.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              Center(
                child: Image(
                  image: AssetImage('images/img.png'),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    top: 90.0, bottom: 5.0, left: 30.0, right: 30.0),
                child: TextFormField(
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Login',
                    prefixIcon: Icon(Icons.email),
                    hintText: 'Enter valid Login id',
                  ),
                  validator: validateEmail,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  onChanged: (text) => setState(() => _email = text),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 30.0, right: 30.0, top: 15, bottom: 10),
                child: TextFormField(
                  obscureText: passToggle,
                  decoration: InputDecoration(
                    border: const OutlineInputBorder(),
                    labelText: 'Password',
                    hintText: 'Enter secure password',
                    prefixIcon: const Icon(Icons.lock),
                    suffixIcon: InkWell(
                      onTap: () {
                        setState(() {
                          passToggle = !passToggle;
                        });
                      },
                      child: Icon(
                          passToggle ? Icons.visibility : Icons.visibility_off),
                    ),
                  ),
                  validator: validatePassword,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  onChanged: (text) => setState(() => _password = text),
                ),
              ),
              Container(
                alignment: Alignment.topRight,
                padding: const EdgeInsets.only(right: 18.0),
                child: TextButton(
                  onPressed: () {},
                  child: const Text(
                    'Forgot Password',
                    style: TextStyle(color: Colors.blue, fontSize: 15),
                  ),
                ),
              ),
              Container(
                width: 350.0,
                height: 70,
                padding: const EdgeInsets.only(
                    left: 30.0, right: 30.0, top: 10.0, bottom: 10.0),
                child: _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : FilledButton(
                        onPressed: _email.isNotEmpty && _password.isNotEmpty
                            ? _submit
                            : null,
                        child: const Text(
                          'Login',
                          style: TextStyle(color: Colors.white, fontSize: 22),
                        ),
                      ),
              ),
              TextButton(
                onPressed: () {},
                child: const Text(
                  'New User? Create Account',
                  style: TextStyle(color: Colors.black, fontSize: 15),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
