const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

let SQL = null;

const dbDir = path.join(__dirname);
const userDbPath = path.join(dbDir, 'user.db');
const userDataDbPath = path.join(dbDir, 'userdata.db');

// Shared state object for databases
const state = {
  userDb: null,
  userDataDb: null
};

// Initialize SQL.js
async function initializeSql() {
  if (!SQL) {
    SQL = await initSqlJs();
  }
}

// Load or create database
function loadDb(dbPath) {
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    return new SQL.Database(fileBuffer);
  } else {
    return new SQL.Database();
  }
}

// Save database to file
function saveDb(db, dbPath) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

// Initialize databases
async function initializeDatabase() {
  await initializeSql();

  state.userDb = loadDb(userDbPath);
  state.userDataDb = loadDb(userDataDbPath);

  // Create tables if they don't exist
  state.userDb.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      username TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  state.userDataDb.run(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      bio TEXT,
      avatar_url TEXT,
      twitter TEXT,
      linkedin TEXT,
      github TEXT,
      instagram TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Save databases
  saveDb(state.userDb, userDbPath);
  saveDb(state.userDataDb, userDataDbPath);

  console.log('Connected to user.db');
  console.log('Connected to userdata.db');
}

// Helper function to get a single row
function get(db, sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row;
    }
    stmt.free();
    return null;
  } catch (error) {
    console.error('Get error:', error, sql);
    throw error;
  }
}

// Helper function to get all rows
function all(db, sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch (error) {
    console.error('All error:', error, sql);
    throw error;
  }
}

// Helper function to run a query (INSERT, UPDATE, DELETE)
function run(db, sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    stmt.step();
    stmt.free();
    
    // Save database - determine which db file based on db instance
    if (db === state.userDb) {
      saveDb(db, userDbPath);
    } else if (db === state.userDataDb) {
      saveDb(db, userDataDbPath);
    }
    
    // For INSERT, we need to get the last insert id
    if (sql.trim().toUpperCase().startsWith('INSERT')) {
      // Get the max id from the table
      const table = sql.match(/INTO\s+(\w+)/i)?.[1];
      if (table) {
        const maxIdStmt = db.prepare(`SELECT MAX(id) as max_id FROM ${table}`);
        maxIdStmt.step();
        const result = maxIdStmt.getAsObject();
        maxIdStmt.free();
        return { id: result.max_id, changes: 1 };
      }
    }
    
    return { changes: 1 };
  } catch (error) {
    console.error('Run error:', error, sql);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
  state,
  get,
  all,
  run
};
