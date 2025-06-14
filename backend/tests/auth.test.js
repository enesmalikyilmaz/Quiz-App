import test from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

test('Veritabanı bağlantısı başarılı mı?', async () => {
  await connectDB();
  assert.ok(mongoose.connection.readyState === 1);
});
