import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'dart:io';

class DatabaseHelper {
  static Database? _db;

  // Initialize database factory for different platforms
  static Future<void> initializeDatabase() async {
    if (Platform.isWindows || Platform.isLinux) {
      // Initialize FFI for desktop platforms
      sqfliteFfiInit();
      databaseFactory = databaseFactoryFfi;
    }
  }

  // جلب قاعدة البيانات
  static Future<Database> get database async {
    if (_db != null) return _db!;
    await initializeDatabase();
    _db = await initDB();
    return _db!;
  }

  // إنشاء قاعدة البيانات والجداول
  static Future<Database> initDB() async {
    String path = join(await getDatabasesPath(), 'user.db');
    return await openDatabase(
      path,
      version: 4,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE user (
            id INTEGER PRIMARY KEY,
            token TEXT,
            email TEXT,
            ownerName TEXT,
            ownerID INTEGER
          )
        ''');

        await db.execute('''
          CREATE TABLE sync_status (
            id INTEGER PRIMARY KEY,
            last_sync TEXT
          )
        ''');
        await db.execute('''
          CREATE TABLE owners (
            ownerID INTEGER PRIMARY KEY,
            ownerName TEXT NOT NULL,
            OwnerDefaultWHID INTEGER
          )
        ''');

        await db.execute('''
        CREATE TABLE items (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        barcode TEXT,
        category TEXT,
        unit TEXT,
        price REAL,
        cost REAL,
        box INTEGER,
        image_path TEXT
        )
      ''');

        await db.execute('''
      CREATE TABLE stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER,
        store_id INTEGER,
        quantity INTEGER,
        last_updated TEXT,
        FOREIGN KEY (item_id) REFERENCES items(item_id),
        FOREIGN KEY (store_id) REFERENCES stores(store_id)

      );
      ''');
        await db.execute('''
      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER,
        store_id INTEGER,
        quantity INTEGER,
        type TEXT, -- 'in' or 'out'
        date TEXT,
        note TEXT,
        FOREIGN KEY (item_id) REFERENCES items(item_id),
        FOREIGN KEY (store_id) REFERENCES stores(store_id)

      );
      ''');
      },
      onUpgrade: (db, oldVersion, newVersion) async {
        if (oldVersion < 2) {
          await db.execute('''
        CREATE TABLE sync_status (
          id INTEGER PRIMARY KEY,
          last_sync TEXT
        )
      ''');
        }
        if (oldVersion < 3) {
          // Check if columns already exist by querying table info
          final tableInfo = await db.rawQuery("PRAGMA table_info(user)");
          final columnNames =
              tableInfo.map((col) => col['name'] as String).toList();

          if (!columnNames.contains('ownerName')) {
            await db.execute('ALTER TABLE user ADD COLUMN ownerName TEXT');
          }
          if (!columnNames.contains('ownerID')) {
            await db.execute('ALTER TABLE user ADD COLUMN ownerID INTEGER');
          }
        }
        if (oldVersion < 4) {
          // Add this for the new version
          await db.execute('''
            CREATE TABLE IF NOT EXISTS owners (
              ownerID INTEGER PRIMARY KEY,
              ownerName TEXT NOT NULL,
              OwnerDefaultWHID INTEGER
            )
          ''');
          // Add other CREATE TABLE IF NOT EXISTS statements for any new tables
        }
      },
    );
  }

  // حفظ آخر مزامنة
  static Future<void> setLastSync(DateTime dateTime) async {
    final db = await database;
    await db.insert(
      'sync_status',
      {'id': 1, 'last_sync': dateTime.toIso8601String()},
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  // جلب آخر مزامنة
  static Future<String?> getLastSync() async {
    final db = await database;
    final result =
        await db.query('sync_status', where: 'id = ?', whereArgs: [1]);
    if (result.isNotEmpty) {
      return result.first['last_sync'] as String;
    }
    return null;
  }

  // تخزين بيانات المستخدم
  static Future<void> insertUser(Map<String, dynamic> user) async {
    final db = await database;
    print('DatabaseHelper: Inserting user data: $user');
    await db.insert('user', user, conflictAlgorithm: ConflictAlgorithm.replace);
    print('DatabaseHelper: User data saved successfully');
  }

  // Get default owner info
  static Future<Map<String, dynamic>> getDefaultOwnerInfo() async {
    return {
      'ownerName': 'Test Owner',
      'ownerID': 1,
    };
  }

  // جلب بيانات المستخدم
  static Future<Map<String, dynamic>?> getUser() async {
    final db = await database;
    final result = await db.query('user', limit: 1);
    if (result.isNotEmpty) {
      print('DatabaseHelper: Retrieved user data:  [32m${result.first} [0m');
      return result.first;
    }
    print('DatabaseHelper: No user data found, returning default');
    return {
      'id': 1,
      'email': '',
      'token': '',
      'ownerName': 'Test Owner',
      'ownerID': 1,
    };
  }

  // حذف بيانات المستخدم
  static Future<void> deleteUser() async {
    final db = await database;
    await db.delete('user');
    print('DatabaseHelper: User data deleted');
  }

  // Save owner information specifically
  static Future<void> saveOwnerInfo(String ownerName, int ownerID) async {
    final db = await database;
    final user = await getUser();
    if (user != null) {
      final updatedUser = {
        ...user,
        'ownerName': ownerName,
        'ownerID': ownerID,
      };
      await insertUser(updatedUser);
      print(
          'DatabaseHelper: Owner info saved - Name: $ownerName, ID: $ownerID');
    }
  }

  // Get owner information
  static Future<Map<String, dynamic>?> getOwnerInfo() async {
    final user = await getUser();
    if (user != null && user['ownerName'] != null) {
      return {
        'ownerName': user['ownerName'],
        'ownerID': user['ownerID'],
      };
    }
    // Return default owner info if not found
    return await getDefaultOwnerInfo();
  }

  // Update owner name
  static Future<void> updateOwnerName(String ownerName) async {
    await saveOwnerInfo(ownerName, 1); // Default ownerID
  }

  // Get current owner from user table
  static Future<Map<String, dynamic>?> getCurrentOwner() async {
    final db = await database;
    final result = await db.query('user', limit: 1);
    if (result.isNotEmpty) {
      return result.first;
    }
    return null;
  }

  // Get default warehouse for owner
  static Future<Map<String, dynamic>?> getDefaultWarehouseForOwner(
      int ownerID) async {
    final db = await database;
    final result = await db.query('owners',
        where: 'ownerID = ?', whereArgs: [ownerID], limit: 1);
    if (result.isNotEmpty && result.first['OwnerDefaultWHID'] != null) {
      final storeID = result.first['OwnerDefaultWHID'];
      final store = await db.query('stores',
          where: 'store_id = ?', whereArgs: [storeID], limit: 1);
      if (store.isNotEmpty) {
        return store.first;
      }
    }
    return null;
  }

  // Get branch for warehouse
  static Future<Map<String, dynamic>?> getBranchForWarehouse(
      int storeID) async {
    final db = await database;
    final store = await db.query('stores',
        where: 'store_id = ?', whereArgs: [storeID], limit: 1);
    if (store.isNotEmpty && store.first['ownerID'] != null) {
      final ownerID = store.first['ownerID'];
      final owner = await db.query('owners',
          where: 'ownerID = ?', whereArgs: [ownerID], limit: 1);
      if (owner.isNotEmpty) {
        return owner.first;
      }
    }
    return null;
  }

  // Get items for owner (simulate HhOwnerItem)
  static Future<List<Map<String, dynamic>>> getOwnerItems(int ownerID) async {
    final db = await database;
    // Assuming items table has ownerID (if not, you need a join table)
    // For now, return all items (customize as needed)
    final result = await db.query('items');
    return result;
  }

  // Get item details for a list of item IDs
  static Future<List<Map<String, dynamic>>> getItemDetails(
      List<int> itemIDs) async {
    final db = await database;
    if (itemIDs.isEmpty) return [];
    final ids = itemIDs.join(',');
    final result =
        await db.rawQuery('SELECT * FROM items WHERE item_id IN ($ids)');
    return result;
  }

  // Get item prices for a list of item IDs (simulate SalPriceList)
  static Future<List<Map<String, dynamic>>> getItemPrices(
      List<int> itemIDs) async {
    final db = await database;
    // Assuming price is in items table (customize if you have a separate price table)
    if (itemIDs.isEmpty) return [];
    final ids = itemIDs.join(',');
    final result = await db
        .rawQuery('SELECT item_id, price FROM items WHERE item_id IN ($ids)');
    return result;
  }
}