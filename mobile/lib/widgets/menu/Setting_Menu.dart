import 'package:flutter/material.dart';

class SettingMenu extends StatelessWidget {
  const SettingMenu({super.key});

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
          _buildDrawerItem(Icons.bolt, 'About', context),
          _buildDrawerItem(Icons.settings, 'Setting', context),

        ],
      ),
    );
  }

  Widget _buildDrawerItem(IconData icon, String title, BuildContext context) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {
        if (title == 'HOME') {
          Navigator.pop(context);
          Navigator.pushNamed(context,'/dashboard'); // Navigate to InvoicePage
        } else {
          // Handle other navigation if needed
        }
      },
    );
  }
}
