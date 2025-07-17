import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static Database? _db;

  // جلب قاعدة البيانات
  static Future<Database> get database async {
    if (_db != null) return _db!;
    _db = await initDB();
    return _db!;
  }

  // إنشاء قاعدة البيانات والجداول
  static Future<Database> initDB() async {
    String path = join(await getDatabasesPath(), 'user.db');
    return await openDatabase(path, version: 2, onCreate: (db, version) async {
      await db.execute('''
          CREATE TABLE user (
            id INTEGER PRIMARY KEY,
            token TEXT,
            email TEXT
          )
        ''');

      await db.execute('''
          CREATE TABLE sync_status (
            id INTEGER PRIMARY KEY,
            last_sync TEXT
          )
        ''');
    }, onUpgrade: (db, oldVersion, newVersion) async {
      if (oldVersion < 2) {
        await db.execute('''
        CREATE TABLE sync_status (
          id INTEGER PRIMARY KEY,
          last_sync TEXT
        )
      ''');
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
    await db.insert('user', user, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  // جلب بيانات المستخدم
  static Future<Map<String, dynamic>?> getUser() async {
    final db = await database;
    final result = await db.query('user', limit: 1);
    if (result.isNotEmpty) {
      return result.first;
    }
    return null;
  }

  // حذف بيانات المستخدم
  static Future<void> deleteUser() async {
    final db = await database;
    await db.delete('user');
  }
}
