import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:trademasterapp/widgets/stock_page.dart';

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
              color: Colors.blue,
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
          _buildDrawerItem(Icons.store, 'Stock', context),
          _buildDrawerItem(Icons.receipt, 'Outstanding Invoice', context),
          _buildDrawerItem(Icons.route, 'Start Journey', context),
          _buildDrawerItem(Icons.shop, 'Stock Request', context), // Add this to navigate to InvoicePage
          _buildDrawerItem(Icons.sync, 'Synchronization', context),
          _buildDrawerItem(Icons.upload_file, 'Auto UnLoad', context),
          _buildDrawerItem(Icons.cloud_upload, 'Upload Request', context),
          _buildDrawerItem(Icons.file_upload, 'Manual Upload', context),
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
        if (title == 'Stock Request') {
          Navigator.pushNamed(context, '/invoice'); // Navigate to InvoicePage
        }
        if (title == 'SETTING') {
          Navigator.pushNamed(context, '/settingmenu');
        }
        if (title == 'Stock') {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const StockPage()),
          );
        }
      },
    );
  }
}
