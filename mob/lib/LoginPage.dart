import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:trademasterapp/main.dart';
import 'package:trademasterapp/MainPage.dart';
import 'dart:convert';
import 'package:trademasterapp/helpers/database_helper.dart';

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
      'http://192.168.0.2:3000'; // Change this to your actual server URL

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
        print('Attempting login for user: $_email');

        // Try to connect to backend first
        final response = await http
            .post(
              Uri.parse('$baseUrl/api/mobileauth/login'),
              headers: {'Content-Type': 'application/json'},
              body: jsonEncode({
                'HHUserName': _email,
                'HHUserPassword': _password,
              }),
            )
            .timeout(const Duration(seconds: 10));

        print('Response status: ${response.statusCode}');
        print('Response body: ${response.body}');

        if (response.statusCode == 200) {
          await _handleSuccessfulLogin(response.body);
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
        print('Backend connection failed, attempting offline login: $e');
        // Backend is not available, do not allow offline login
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
                'Cannot login while offline. Please connect to the internet.'),
            backgroundColor: Colors.red,
          ),
        );
        // Optionally, you can return here to prevent further execution
        return;
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _handleSuccessfulLogin(String responseBody) async {
    String token;
    Map<String, dynamic>? owner;

    try {
      // Try to parse as JSON first (new format)
      final responseData = jsonDecode(responseBody);
      token = responseData['token'];
      owner = responseData['owner'];
      print('Parsed as JSON successfully');
      print('Owner data: $owner');
    } catch (e) {
      // If JSON parsing fails, treat as old format (just token string)
      print('JSON parsing failed, treating as token string: $e');
      token = responseBody;
      owner = null;

      // Try to get owner info separately using the token
      try {
        final ownerResponse = await http.get(
          Uri.parse('$baseUrl/api/test/owner/1'),
          headers: {'Content-Type': 'application/json'},
        );

        if (ownerResponse.statusCode == 200) {
          final ownerData = jsonDecode(ownerResponse.body);
          if (ownerData['success']) {
            owner = ownerData['owner'];
            print('Got owner data separately: $owner');
          }
        }
      } catch (ownerError) {
        print('Failed to get owner data separately: $ownerError');
      }
    }

    final userData = {
      'id': 1,
      'email': _email,
      'token': token,
      'ownerName': owner != null ? owner['OwnerDescLan1'] : 'Test Owner',
      'ownerID': owner != null ? owner['OwnerID'] : 1,
    };

    print('Saving user data: $userData');
    await DatabaseHelper.insertUser(userData);

    // Also save owner info specifically
    if (owner != null) {
      await DatabaseHelper.saveOwnerInfo(
          owner['OwnerDescLan1'], owner['OwnerID']);
    } else {
      await DatabaseHelper.saveOwnerInfo('Test Owner', 1);
    }

    await DatabaseHelper.setLastSync(DateTime.now());

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
            'Login Successful! Welcome ${owner != null ? owner['OwnerDescLan1'] : 'Test Owner'}'),
        backgroundColor: Colors.green,
      ),
    );

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => MainScreen()),
    );
  }

  // Offline login is disabled. No _handleOfflineLogin method.

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