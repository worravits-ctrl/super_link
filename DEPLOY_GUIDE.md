# 🚀 คู่มือ Deploy บน Vercel.com

## ขั้นตอนที่ 1: เตรียม GitHub Repository

### 1.1 สร้าง Repository ใหม่บน GitHub
1. ไปที่ [github.com](https://github.com)
2. คลิก "New repository"
3. ตั้งชื่อ repository เช่น `super-link-manager`
4. เลือก "Public" (แนะนำสำหรับ Vercel ฟรี)
5. คลิก "Create repository"

### 1.2 Upload โค้ดขึ้น GitHub
```bash
# ใน Command Prompt หรือ Terminal
cd d:\xampp\htdocs\super_link

# เริ่มต้น Git repository
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit การเปลี่ยนแปลง
git commit -m "Initial commit: Super Link Manager with GitHub sync"

# เชื่อมต่อกับ GitHub (แทนที่ yourusername ด้วยชื่อ GitHub ของคุณ)
git branch -M main
git remote add origin https://github.com/yourusername/super-link-manager.git
git push -u origin main
```

## ขั้นตอนที่ 2: Deploy บน Vercel

### 2.1 สร้างบัญชี Vercel
1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก "Sign Up"
3. เลือก "Continue with GitHub"
4. อนุญาตให้ Vercel เข้าถึง GitHub account ของคุณ

### 2.2 Import Project
1. หลังจาก login แล้ว คลิก "New Project"
2. เลือก repository `super-link-manager` ที่เพิ่งสร้าง
3. คลิก "Import"

### 2.3 ตั้งค่า Project
1. **Project Name**: ใส่ชื่อที่ต้องการ (เช่น `my-link-manager`)
2. **Framework Preset**: เลือก "Other"
3. **Root Directory**: ปล่อยว่าง (ใช้ค่าเริ่มต้น)
4. **Build Command**: ปล่อยว่างหรือใส่ `npm run build`
5. **Output Directory**: ปล่อยว่าง
6. **Install Command**: ปล่อยว่างหรือใส่ `npm install`

### 2.4 Deploy
1. คลิก "Deploy"
2. รอสักครู่ให้ Vercel build และ deploy
3. เมื่อเสร็จแล้วจะได้ URL เช่น `https://my-link-manager.vercel.app`

## ขั้นตอนที่ 3: ทดสอบการทำงาน

### 3.1 เปิดเว็บไซต์
1. คลิกที่ URL ที่ Vercel ให้มา
2. ควรเห็นหน้า Link Manager

### 3.2 ทดสอบ API
1. ลองเข้า `https://your-app.vercel.app/api/health`
2. ควรเห็นข้อความ `{"status":"ok","timestamp":"..."}`

### 3.3 ทดสอบการบันทึกข้อมูล
1. ลองเพิ่มลิงค์ใหม่
2. ตรวจสอบว่าลิงค์ถูกบันทึกและแสดงผล

## ขั้นตอนที่ 4: การตั้งค่าเพิ่มเติม

### 4.1 Custom Domain (ถ้าต้องการ)
1. ใน Vercel Dashboard ไปที่ Project Settings
2. คลิก "Domains"
3. เพิ่ม domain ที่ต้องการ

### 4.2 Environment Variables (ถ้าต้องการ)
1. ใน Vercel Dashboard ไปที่ Project Settings
2. คลิก "Environment Variables"
3. เพิ่มตัวแปรที่ต้องการ เช่น:
   - `NODE_ENV` = `production`
   - `API_URL` = `https://your-app.vercel.app/api`

## การอัปเดตเว็บไซต์

### อัปเดตอัตโนมัติ
เมื่อคุณ push โค้ดใหม่ขึ้น GitHub, Vercel จะ deploy อัตโนมัติ:

```bash
# แก้ไขโค้ด แล้วรัน
git add .
git commit -m "Updated features"
git push
```

### อัปเดตด้วยตนเอง
1. ไปที่ Vercel Dashboard
2. เลือก Project
3. คลิก "Redeploy"

## การแก้ไขปัญหา

### ปัญหา: Build Failed
1. ตรวจสอบ Logs ใน Vercel Dashboard
2. ตรวจสอบไฟล์ `package.json` ว่าถูกต้อง
3. ลองรัน `npm install` และ `npm start` ในเครื่องก่อน

### ปัญหา: API ไม่ทำงาน
1. ตรวจสอบว่า `server.js` อยู่ในโฟลเดอร์ root
2. ตรวจสอบ `vercel.json` ว่าถูกต้อง
3. ลองเข้า `/api/health` เพื่อทดสอบ

### ปัญหา: ไม่สามารถบันทึกข้อมูล
1. ตรวจสอบว่าใช้ URL ที่ถูกต้องใน API settings
2. เปิด Developer Tools (F12) ดู Console หาข้อผิดพลาด
3. ลองรีเซ็ต API settings ในแอป

## ลิงค์ที่เป็นประโยชน์

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Documentation](https://docs.github.com)
- [Node.js Documentation](https://nodejs.org/en/docs)

## ตัวอย่าง URL หลังจาก Deploy

- **เว็บไซต์หลัก**: `https://my-link-manager.vercel.app`
- **API Health Check**: `https://my-link-manager.vercel.app/api/health`
- **API Endpoint**: `https://my-link-manager.vercel.app/api/links`
