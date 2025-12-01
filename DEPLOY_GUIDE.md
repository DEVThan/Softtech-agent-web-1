# คู่มือ Deploy Next.js ด้วย Docker บน Linux Server

## สารบัญ
1. [ข้อกำหนดเบื้องต้น](#ข้อกำหนดเบื้องต้น)
2. [ขั้นตอนที่ 1: เตรียมไฟล์บนเครื่อง Local](#ขั้นตอนที่-1-เตรียมไฟล์บนเครื่อง-local)
3. [ขั้นตอนที่ 2: Upload ไฟล์ไปยัง Server](#ขั้นตอนที่-2-upload-ไฟล์ไปยัง-server)
4. [ขั้นตอนที่ 3: Build และรัน Docker บน Server](#ขั้นตอนที่-3-build-และรัน-docker-บน-server)
5. [ขั้นตอนที่ 4: ตั้งค่า Nginx สำหรับ Subdomain](#ขั้นตอนที่-4-ตั้งค่า-nginx-สำหรับ-subdomain)
6. [ขั้นตอนที่ 5: ทดสอบเว็บไซต์](#ขั้นตอนที่-5-ทดสอบเว็บไซต์)
7. [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
8. [การแก้ไขปัญหา](#การแก้ไขปัญหา)

---

## ข้อกำหนดเบื้องต้น

### บนเครื่อง Local (Mac/Windows/Linux)
- ติดตั้ง `sshpass` (สำหรับ SSH ด้วย password)
  ```bash
  # Mac
  brew install sshpass

  # Ubuntu/Debian
  sudo apt install sshpass
  ```

### บน Server
- Docker และ Docker Compose ติดตั้งแล้ว
- Nginx ติดตั้งแล้ว
- DNS ของ subdomain ชี้มาที่ IP ของ server แล้ว

### ข้อมูล Server ที่ต้องมี
- IP Address: `203.78.103.157`
- SSH Port: `6789`
- Username: `root`
- Password: `@pe$ajEr3d8#`
- Subdomain: `agent.softtechnw.com`

---

## ขั้นตอนที่ 1: เตรียมไฟล์บนเครื่อง Local

### 1.1 สร้างไฟล์ Dockerfile

สร้างไฟล์ชื่อ `Dockerfile` ในโฟลเดอร์โปรเจค:

```dockerfile
# Build stage - ใช้ node:20-slim สำหรับ build
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files และ source code
COPY package.json package-lock.json* ./
COPY . .

# ติดตั้ง dependencies
RUN npm install --legacy-peer-deps

# Build แอพพลิเคชัน
RUN npm run build

# Production stage - ใช้ node:20-alpine ที่เบากว่า
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# สร้าง user ที่ไม่ใช่ root เพื่อความปลอดภัย
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy ไฟล์ที่จำเป็นจาก builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# ตั้งค่า permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 1.2 สร้างไฟล์ docker-compose.yml

สร้างไฟล์ชื่อ `docker-compose.yml` ในโฟลเดอร์โปรเจค:

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: softtech-agent-web
    restart: unless-stopped
    network_mode: host
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
      - PUBLIC_HOST_API=203.78.103.157
      - PUBLIC_PORT_API=3006
      - NEXT_PUBLIC_API_URL=http://203.78.103.157:3006
      - NEXT_PUBLIC_API_KEY=abcdef123456
```

> **หมายเหตุ:** `network_mode: host` ทำให้ container ใช้ network ของ host โดยตรง แก้ปัญหา Docker networking

### 1.3 สร้างไฟล์ .dockerignore

สร้างไฟล์ชื่อ `.dockerignore` เพื่อไม่ให้ copy ไฟล์ที่ไม่จำเป็น:

```
node_modules
.next
.git
*.log
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 1.4 แก้ไข next.config.ts

เปิดไฟล์ `next.config.ts` และเพิ่ม `output: 'standalone'`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',  // เพิ่มบรรทัดนี้
  // ... config อื่นๆ ที่มีอยู่
};

export default nextConfig;
```

---

## ขั้นตอนที่ 2: Upload ไฟล์ไปยัง Server

### 2.1 เปิด Terminal

### 2.2 Upload โปรเจคด้วย rsync

รันคำสั่งนี้ (เปลี่ยน path ตามโปรเจคของคุณ):

```bash
rsync -avz --delete \
  -e "sshpass -p '@pe\$ajEr3d8#' ssh -o StrictHostKeyChecking=no -p 6789" \
  --exclude 'node_modules' \
  --exclude '.next' \
  /path/to/your/project/ \
  root@203.78.103.157:/root/softtech-agent-web/
```

**อธิบายคำสั่ง:**
- `rsync -avz` = sync ไฟล์แบบ archive, verbose, compressed
- `--delete` = ลบไฟล์ที่ไม่มีบน local ออกจาก server
- `--exclude 'node_modules'` = ไม่ upload node_modules (จะ install ใหม่บน server)
- `--exclude '.next'` = ไม่ upload build files (จะ build ใหม่บน server)

### 2.3 รอจนเสร็จ

จะเห็นรายการไฟล์ที่ถูก upload ขึ้นมา รอจนเสร็จ

---

## ขั้นตอนที่ 3: Build และรัน Docker บน Server

### 3.1 SSH เข้า Server

```bash
sshpass -p '@pe$ajEr3d8#' ssh -o StrictHostKeyChecking=no -p 6789 root@203.78.103.157
```

หรือถ้าไม่มี sshpass:
```bash
ssh -p 6789 root@203.78.103.157
# แล้วพิมพ์ password: @pe$ajEr3d8#
```

### 3.2 ไปที่โฟลเดอร์โปรเจค

```bash
cd /root/softtech-agent-web
```

### 3.3 Build และรัน Docker

```bash
docker compose up -d --build
```

**อธิบายคำสั่ง:**
- `docker compose up` = สร้างและรัน container
- `-d` = รันใน background (detached mode)
- `--build` = build image ใหม่

### 3.4 รอ Build เสร็จ (ประมาณ 3-5 นาที)

ดู logs ระหว่าง build:
```bash
docker compose logs -f
```

กด `Ctrl+C` เพื่อออกจาก logs

### 3.5 ตรวจสอบว่า Container ทำงาน

```bash
docker ps
```

จะเห็น container ชื่อ `softtech-agent-web` ที่มี STATUS เป็น `Up`

---

## ขั้นตอนที่ 4: ตั้งค่า Nginx สำหรับ Subdomain

### 4.1 สร้างไฟล์ Config สำหรับ Subdomain

```bash
nano /etc/nginx/conf.d/agent.softtechnw.com.conf
```

### 4.2 ใส่เนื้อหานี้

```nginx
server {
    listen 80;
    server_name agent.softtechnw.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4.3 บันทึกไฟล์

กด `Ctrl+O` แล้ว `Enter` เพื่อบันทึก
กด `Ctrl+X` เพื่อออก

### 4.4 ทดสอบ Config

```bash
nginx -t
```

จะต้องเห็น:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 4.5 Reload Nginx

```bash
nginx -s reload
```

หรือ
```bash
systemctl reload nginx
```

---

## ขั้นตอนที่ 5: ทดสอบเว็บไซต์

### 5.1 ทดสอบจาก Server

```bash
curl http://127.0.0.1:3000
```

ถ้าเห็น HTML แสดงว่า Next.js ทำงาน

### 5.2 ทดสอบจาก Browser

เปิด Browser แล้วไปที่:
```
http://agent.softtechnw.com
```

---

## คำสั่งที่ใช้บ่อย

### ดู Container ที่รันอยู่
```bash
docker ps
```

### ดู Logs ของ Container
```bash
docker logs softtech-agent-web
```

### ดู Logs แบบ Real-time
```bash
docker logs -f softtech-agent-web
```

### Restart Container
```bash
docker compose restart
```

### Stop Container
```bash
docker compose down
```

### Start Container
```bash
docker compose up -d
```

### Rebuild และ Restart
```bash
docker compose down
docker compose up -d --build
```

### ลบ Container และ Images ทั้งหมด (ใช้เมื่อต้องการ Clean Build)
```bash
docker compose down
docker system prune -a
docker compose up -d --build
```

---

## การแก้ไขปัญหา

### ปัญหา: 502 Bad Gateway

**สาเหตุ:** Nginx ไม่สามารถเชื่อมต่อกับ Next.js ได้

**แก้ไข:**
1. ตรวจสอบว่า Container ทำงาน:
   ```bash
   docker ps
   ```

2. ตรวจสอบ logs:
   ```bash
   docker logs softtech-agent-web
   ```

3. ตรวจสอบว่า port 3000 เปิดอยู่:
   ```bash
   netstat -tlnp | grep 3000
   ```

### ปัญหา: Build ล้มเหลว

**แก้ไข:**
1. ดู logs:
   ```bash
   docker compose logs
   ```

2. ถ้าเป็น memory error ให้เพิ่ม swap:
   ```bash
   fallocate -l 2G /swapfile
   chmod 600 /swapfile
   mkswap /swapfile
   swapon /swapfile
   ```

### ปัญหา: ไม่สามารถ SSH เข้า Server

**แก้ไข:**
1. ตรวจสอบ IP และ Port
2. ตรวจสอบว่า Server เปิดอยู่
3. ตรวจสอบ Firewall

### ปัญหา: Container Restart ตลอด

**แก้ไข:**
1. ดู logs:
   ```bash
   docker logs softtech-agent-web
   ```

2. ถ้าเป็น error เกี่ยวกับ module ให้ rebuild:
   ```bash
   docker compose down
   docker compose up -d --build
   ```

---

## การ Update เว็บไซต์

เมื่อมีการแก้ไข code ใหม่:

### 1. Upload ไฟล์ใหม่ (จากเครื่อง Local)
```bash
rsync -avz --delete \
  -e "sshpass -p '@pe\$ajEr3d8#' ssh -o StrictHostKeyChecking=no -p 6789" \
  --exclude 'node_modules' \
  --exclude '.next' \
  /path/to/your/project/ \
  root@203.78.103.157:/root/softtech-agent-web/
```

### 2. Rebuild Container (บน Server)
```bash
cd /root/softtech-agent-web
docker compose down
docker compose up -d --build
```

---

## ข้อมูลสำคัญ

| รายการ | ค่า |
|--------|-----|
| Server IP | 203.78.103.157 |
| SSH Port | 6789 |
| Username | root |
| Password | @pe$ajEr3d8# |
| URL | http://agent.softtechnw.com |
| Container Name | softtech-agent-web |
| App Port | 3000 |
| Project Path (Server) | /root/softtech-agent-web |

---

*สร้างเมื่อ: 1 ธันวาคม 2025*
