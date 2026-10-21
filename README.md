# Health Prompt Studio

เว็บแอปแบบ static (HTML/CSS/JS ล้วน ไม่ต้อง build) สำหรับสร้าง **Master Prompt** สำหรับ AI Image Generator ที่ใช้งานด้านสุขภาพและราชการไทยโดยเฉพาะ — ปกรายงาน โปสเตอร์ อินโฟกราฟิก แดชบอร์ด และหัวเอกสาร

🔗 **เว็บที่รันได้จริง:** https://maruzakuno.github.io/Color-Palette-Studio/

## วิธีใช้

เปิดไฟล์ `index.html` ในเบราว์เซอร์ได้ทันที ไม่ต้องติดตั้งอะไร

1. **เลือกพาเลตสี** — ค้นหาหรือเลือกจากหมวด Healthcare, Government Luxury, Modern Tech, Corporate, Neutral
2. **กำหนดเนื้อหา** — ใส่หัวข้อ (CONTENT) เลือกประเภทเนื้อหา (CONTENT_TYPE) และอัตราส่วนภาพ (ASPECT_RATIO)
3. **ดูพรีวิวสด** — กล่องพรีวิวแสดงสีและมีกราฟิกเคลื่อนไหว (shimmer sweep, floating particles) ตามพาเลตที่เลือก
4. **คัดลอก Master Prompt** — พรอมป์ที่สร้างขึ้นตามโครงสร้าง [01]–[07] พร้อมคัดลอกไปวางในเครื่องมือ AI image generator หรือ export เป็น JSON / CSS variables

## โครงสร้างพรอมป์

- `[01]` ตัวแปรหลัก: COLOR_THEME, CONTENT, CONTENT_TYPE, ASPECT_RATIO
- `[02]` แนวคิดการออกแบบ
- `[03]` ระบบสีที่ต้องยึดจาก [01] เท่านั้น
- `[04]` องค์ประกอบและลำดับความสำคัญของภาพ
- `[05]` แนวทางภาพตามประเภทเนื้อหา
- `[06]` คุณภาพและข้อกำหนดผลลัพธ์
- `[07]` ข้อห้าม/สิ่งที่ไม่ต้องการ

## ไฟล์

- `index.html` — โครงหน้า
- `style.css` — สไตล์และกราฟิกเคลื่อนไหว (CSS keyframes)
- `script.js` — ข้อมูลพาเลต, state, ตัวสร้างพรอมป์, localStorage
