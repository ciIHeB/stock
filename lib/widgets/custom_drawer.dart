import 'package:flutter/material.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
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
          _buildDrawerItem(Icons.home, 'HOME'),
         // _buildDrawerItem(Icons.add_circle_outline, 'EXTRA'),
          _buildDrawerItem(Icons.settings, 'SETTING'),
          const Divider(),
          _buildDrawerItem(Icons.inventory, 'My Stock'),
          _buildDrawerItem(Icons.receipt, 'Outstanding Invoice'),
          _buildDrawerItem(Icons.route, 'Start Journey'),
          _buildDrawerItem(Icons.shop, 'Stock Request'),
          _buildDrawerItem(Icons.sync, 'Synchronization'),
          _buildDrawerItem(Icons.upload_file, 'Auto UnLoad'),
          _buildDrawerItem(Icons.cloud_upload, 'Upload Request'),
          _buildDrawerItem(Icons.file_upload, 'Manual Upload'),
          const Divider(),
          _buildDrawerItem(Icons.logout, 'Sign out'),
          //_buildDrawerItem(Icons.timer, 'Break Time'),
        ],
      ),
    );
  }

  Widget _buildDrawerItem(IconData icon, String title) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {},
    );
  }
}