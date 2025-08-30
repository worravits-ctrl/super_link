# Super Link Manager

🔗 ระบบจัดการลิงค์ออนไลน์ที่สามารถซิงค์ข้อมูลผ่าน GitHub และแสดงผลบน Vercel

## คุณสมบัติ

- ✅ จัดการลิงค์ออนไลน์
- ✅ ค้นหาและกรองลิงค์
- ✅ นำเข้า Bookmarks จาก HTML/JSON
- ✅ ลบลิงค์ซ้ำ
- ✅ ตรวจสอบลิงค์ที่ไม่ปลอดภัย
- ✅ ซิงค์ข้อมูลอัตโนมัติ
- ✅ รองรับการใช้งานบนมือถือ
- ✅ Deploy บน Vercel.com
- ✅ Backup ข้อมูลบน GitHub

## การติดตั้งและ Deploy

### 1. เตรียมโปรเจค

```bash
# Clone หรือ download โปรเจค
git clone https://github.com/yourusername/super-link-manager.git
cd super-link-manager

# ติดตั้ง dependencies
npm install
```

### 2. ทดสอบในเครื่อง

```bash
# รันเซิร์ฟเวอร์
npm start

# เปิดเบราว์เซอร์ไปที่
http://localhost:3000
```

### 3. Deploy บน Vercel

#### วิธีที่ 1: ผ่าน Vercel CLI
```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login เข้า Vercel
vercel login

# Deploy
vercel

# สำหรับ production
vercel --prod
```

#### วิธีที่ 2: ผ่าน Vercel Dashboard
1. ไปที่ [vercel.com](https://vercel.com)
2. เชื่อมต่อกับ GitHub account
3. Import โปรเจคจาก GitHub repository
4. Vercel จะ deploy อัตโนมัติ

### 4. ตั้งค่า GitHub Repository

1. สร้าง repository ใหม่บน GitHub
2. เพิ่มไฟล์ทั้งหมดเข้า repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/super-link-manager.git
git push -u origin main
```

## การใช้งาน

### การตั้งค่า API
1. เปิดแอปพลิเคชัน
2. คลิกปุ่ม "⚙️ ตั้งค่า API"
3. ใส่ URL ของ API เช่น `https://your-app.vercel.app/api`

### การเพิ่มลิงค์
- กรอก URL ในช่อง input
- กรอกชื่อลิงค์ (ไม่บังคับ)
- คลิก "➕ เพิ่มลิงค์"
- หรือลากลิงค์มาวางในกล่อง Drop Zone

### การนำเข้า Bookmarks
1. คลิกปุ่ม "📁 นำเข้า Bookmarks"
2. เลือกไฟล์ HTML หรือ JSON
3. ระบบจะนำเข้าลิงค์อัตโนมัติ

### ฟีเจอร์อื่นๆ
- **ค้นหา**: ใช้ช่องค้นหาด้านบน
- **ลบลิงค์ซ้ำ**: คลิก "🔗 ลบลิ้งก์ซ้ำ"
- **ตรวจสอบความปลอดภัย**: คลิก "🛡️ ตรวจและลบลิงก์ไม่ปลอดภัย"
- **เลือกหลายรายการ**: คลิก "✅ เลือกหลายรายการ"

## โครงสร้างโปรเจค

```
super-link-manager/
├── index.html          # หน้าเว็บหลัก
├── server.js           # Node.js server สำหรับ Vercel
├── package.json        # ข้อมูลโปรเจคและ dependencies
├── vercel.json         # การตั้งค่า Vercel
├── api/
│   └── links.php       # PHP API (สำหรับ XAMPP)
├── data/
│   └── links.json      # ไฟล์เก็บข้อมูลลิงค์
└── README.md           # คู่มือนี้
```

## API Endpoints

- `GET /api/links` - ดึงข้อมูลลิงค์ทั้งหมด
- `POST /api/links` - เพิ่มลิงค์ใหม่
- `PUT /api/links` - อัปเดตลิงค์ทั้งหมด
- `DELETE /api/links` - ลบลิงค์ที่ระบุ
- `GET /api/health` - ตรวจสอบสถานะเซิร์ฟเวอร์

## Environment Variables (ถ้าต้องการ)

สำหรับการตั้งค่าเพิ่มเติมใน Vercel:

```bash
# ตั้งค่าใน Vercel Dashboard > Settings > Environment Variables
NODE_ENV=production
API_URL=https://your-app.vercel.app/api
```

## การ Backup และ Sync

ข้อมูลลิงค์จะถูกเก็บในไฟล์ `data/links.json` และจะถูก sync กับ GitHub repository อัตโนมัติ
เมื่อมีการ deploy ใหม่บน Vercel

## การแก้ไขปัญหา

### ปัญหา: API ไม่ทำงาน
- ตรวจสอบ URL ใน "⚙️ ตั้งค่า API"
- ลองเข้า `/api/health` เพื่อตรวจสอบสถานะ

### ปัญหา: ไม่สามารถบันทึกข้อมูล
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
- ตรวจสอบว่า Vercel app ทำงานปกติ

### ปัญหา: Deploy ไม่สำเร็จ
- ตรวจสอบไฟล์ `package.json` และ `vercel.json`
- ตรวจสอบ logs ใน Vercel Dashboard

## ใบอนุญาต

MIT License - ใช้งานได้ฟรี

## การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ กรุณาสร้าง Issue ใน GitHub Repository
