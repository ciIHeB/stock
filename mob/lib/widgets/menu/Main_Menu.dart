import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:trademasterapp/services/auth_service.dart';

class MainMenu extends StatelessWidget {
  const MainMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: const Color.fromARGB(255, 24, 100, 162),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  backgroundColor: Colors.white,
                  child: Text('C'),
                ),
                SizedBox(height: 16),
                Text(
                  'CEREALIS',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
                Text(
                  'Cité El Ferdawes-Jedaida',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Expanded(
                child: _buildDrawerItem(Icons.home, 'HOME', context),
              ),
              Expanded(
                child: _buildDrawerItem(Icons.settings, 'SETTING', context),
              ),
            ],
          ),
          const Divider(),
          _buildDrawerItem(Icons.inventory, 'My Stock', context),
          _buildDrawerItem(Icons.add_shopping_cart, 'Stock Request', context),
          _buildDrawerItem(Icons.route, 'Start Journey', context),
          _buildDrawerItem(Icons.sync, 'Syncronisation', context),
          const Divider(),
          _buildDrawerItem(Icons.logout, 'Sign out', context),
        ],
      ),
    );
  }

  Widget _buildDrawerItem(IconData icon, String title, BuildContext context) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {
        if (title == 'SETTING') {
          Navigator.pop(context);
          Navigator.pushNamed(context, '/settingmenu');
        } else if (title == 'HOME') {
          Navigator.pop(context);
          Navigator.pushNamed(context, '/dashboard');
        } else if (title == 'My Stock') {
          Navigator.pop(context);
          Navigator.pushNamed(context, '/mystock');
        } else if (title == 'Stock Request') {
          Navigator.pop(context);
          Navigator.pushNamed(context, '/stockrequest');
        } else if (title == 'Start Journey') {
          Navigator.pop(context);
          Navigator.pushNamed(context, '/startjourney');
        } else if (title == 'Sign out') {
          Navigator.pop(context);
          // Clear user session and navigate to login
          AuthService.logout().then((_) {
            Navigator.pushReplacementNamed(context, '/login');
          });
        }
      },
    );
  }
}
