# 🗄️ Supabase Setup Guide

## การติดตั้ง Supabase สำหรับ Link Manager

### 1. สร้าง Supabase Project

1. ไปที่ [Supabase Dashboard](https://supabase.com/dashboard)
2. Sign up/Login ด้วย GitHub account
3. คลิก "New project"
4. ใส่ชื่อโปรเจ็กต์: `super-link-manager`
5. เลือก Organization (ใช้ default)
6. เลือก Region: **"Southeast Asia (Singapore)"**
7. สร้าง Database Password ที่แข็งแรง
8. คลิก "Create new project"

### 2. สร้าง Database Table

ใน **"Table Editor"**:

1. คลิก "Create a new table"
2. ใส่ชื่อ table: `links`
3. เพิ่ม columns:

```sql
-- Table: links
id (int8) - Primary Key, Auto-increment ✅
user_id (text) - Not null ✅
url (text) - Not null ✅  
title (text) - Not null ✅
favicon (text) - Nullable ✅
order_index (int4) - Default 0 ✅
created_at (timestamptz) - Default now() ✅
updated_at (timestamptz) - Default now() ✅
```

### 3. ตั้งค่า Row Level Security (RLS)

ใน **"SQL Editor"** รันคำสั่ง:

```sql
-- Enable RLS
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own links
CREATE POLICY "Users can view own links" ON links
    FOR SELECT USING (user_id = auth.uid()::text);

-- Policy: Users can insert their own links  
CREATE POLICY "Users can insert own links" ON links
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- Policy: Users can update their own links
CREATE POLICY "Users can update own links" ON links
    FOR UPDATE USING (user_id = auth.uid()::text);

-- Policy: Users can delete their own links
CREATE POLICY "Users can delete own links" ON links
    FOR DELETE USING (user_id = auth.uid()::text);
```

### 4. เปิดใช้งาน Anonymous Authentication

ใน **"Authentication" → "Settings"**:

1. เลื่อนลงไปหา **"Anonymous sign-in"**
2. **เปิดใช้งาน** Anonymous sign-in
3. คลิก "Save"

### 5. ดึง API Keys

ไปที่ **"Settings" → "API"**:

1. คัดลอก **Project URL**
2. คัดลอก **anon public key**

### 6. อัปเดต Configuration ในโค้ด

แก้ไขใน `index.html` บรรทัดที่ ~560:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 7. ทดสอบ

1. เปิดเว็บไซต์
2. ควรเห็นข้อความ "🗄️ Supabase พร้อมใช้งาน!"
3. เพิ่มลิงค์ใหม่ - จะบันทึกไปยัง Supabase อัตโนมัติ
4. ลองเปิดหน้าใหม่หรือรีเฟรช - ข้อมูลควรโหลดจาก Supabase

## ข้อดีของ Supabase vs Firebase

✅ **500,000+ API calls/month** (vs Firebase 50,000)  
✅ **ไม่มี quota ที่ซับซ้อน** - ใช้งานได้เรื่อยๆ  
✅ **PostgreSQL** - Database ที่มีความสามารถสูง  
✅ **Real-time subscriptions** - ข้อมูลอัปเดตทันที  
✅ **Row Level Security** - ความปลอดภัยระดับแถว  
✅ **Auto-generated REST API** - API สร้างอัตโนมัติ  
✅ **Unlimited database size** ในแผนฟรี  

## การแก้ปัญหา

**ปัญหา**: ไม่สามารถเชื่อมต่อ Supabase  
**วิธีแก้**: ตรวจสอบ URL และ API key ใน config

**ปัญหา**: ข้อมูลไม่บันทึก  
**วิธีแก้**: ตรวจสอบ RLS policies และ Anonymous auth

**ปัญหา**: "Row Level Security policy violation"  
**วิธีแก้**: ตรวจสอบว่า RLS policies ถูกต้อง และเปิด Anonymous auth
