# คู่มือ Deploy Next.js ด้วย Docker บน Linux Server

## สารบัญ
1. [ข้อกำหนดเบื้องต้น](#ข้อกำหนดเบื้องต้น)
2. [ทำความเข้าใจ: Subdomain ทำงานอย่างไร](#ทำความเข้าใจ-subdomain-ทำงานอย่างไร)
3. [ขั้นตอนที่ 1: ตั้งค่า DNS สำหรับ Subdomain](#ขั้นตอนที่-1-ตั้งค่า-dns-สำหรับ-subdomain)
4. [ขั้นตอนที่ 2: เตรียมไฟล์บนเครื่อง Local](#ขั้นตอนที่-2-เตรียมไฟล์บนเครื่อง-local)
5. [ขั้นตอนที่ 3: Upload ไฟล์ไปยัง Server](#ขั้นตอนที่-3-upload-ไฟล์ไปยัง-server)
6. [ขั้นตอนที่ 4: Build และรัน Docker บน Server](#ขั้นตอนที่-4-build-และรัน-docker-บน-server)
7. [ขั้นตอนที่ 5: ตั้งค่า Nginx สำหรับ Subdomain](#ขั้นตอนที่-5-ตั้งค่า-nginx-สำหรับ-subdomain)
8. [ขั้นตอนที่ 6: ทดสอบเว็บไซต์](#ขั้นตอนที่-6-ทดสอบเว็บไซต์)
9. [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
10. [การแก้ไขปัญหา](#การแก้ไขปัญหา)

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

## ทำความเข้าใจ: Subdomain ทำงานอย่างไร

### ภาพรวมการทำงาน

เมื่อ User เข้า `http://agent.softtechnw.com` จะเกิดขั้นตอนดังนี้:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Flow การทำงานของ Subdomain                        │
└─────────────────────────────────────────────────────────────────────────┘

    User Browser
         │
         │ 1. พิมพ์ http://agent.softtechnw.com
         ▼
    ┌─────────────┐
    │     DNS     │  2. ถาม DNS ว่า agent.softtechnw.com อยู่ที่ IP ไหน?
    │   Server    │     DNS ตอบ: 203.78.103.157
    └─────────────┘
         │
         │ 3. Browser ส่ง request ไปที่ 203.78.103.157:80
         ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Server 203.78.103.157                         │
    │  ┌─────────────┐                                                │
    │  │    Nginx    │  4. Nginx รับ request                          │
    │  │   Port 80   │     เห็น Host: agent.softtechnw.com            │
    │  └──────┬──────┘     จึงส่งต่อไปที่ 127.0.0.1:3000              │
    │         │                                                        │
    │         │ proxy_pass http://127.0.0.1:3000                      │
    │         ▼                                                        │
    │  ┌─────────────┐                                                │
    │  │   Docker    │  5. Next.js App รับ request                    │
    │  │ Container   │     ประมวลผลและส่ง HTML กลับ                    │
    │  │  Port 3000  │                                                │
    │  └─────────────┘                                                │
    └─────────────────────────────────────────────────────────────────┘
         │
         │ 6. HTML Response กลับไปที่ Browser
         ▼
    User เห็นหน้าเว็บ
```

### สิ่งที่ต้องตั้งค่า 2 อย่าง

| ลำดับ | ตั้งค่าที่ไหน | ทำอะไร |
|-------|--------------|--------|
| 1 | Domain Provider (เช่น GoDaddy, Cloudflare) | ตั้ง DNS Record ให้ subdomain ชี้ไป IP ของ server |
| 2 | Server (Nginx) | ตั้งค่า reverse proxy ให้ส่ง request ไปที่ Docker container |

---

## ขั้นตอนที่ 1: ตั้งค่า DNS สำหรับ Subdomain

### 1.1 เข้าไปที่ Domain Provider

ไปที่เว็บไซต์ที่คุณซื้อ domain `softtechnw.com` เช่น:
- GoDaddy
- Namecheap
- Cloudflare
- Google Domains

### 1.2 ไปที่หน้า DNS Management

หาเมนู "DNS", "DNS Management", "DNS Settings" หรือ "Manage DNS"

### 1.3 เพิ่ม DNS Record

กดปุ่ม "Add Record" หรือ "เพิ่ม Record" แล้วใส่ข้อมูลดังนี้:

| Field | ค่าที่ใส่ | คำอธิบาย |
|-------|----------|----------|
| Type | `A` | ประเภท Record (A = ชี้ไป IP address) |
| Name / Host | `agent` | ชื่อ subdomain (จะกลายเป็น agent.softtechnw.com) |
| Value / Points to | `203.78.103.157` | IP ของ server |
| TTL | `Auto` หรือ `3600` | Time to live (ปล่อยค่า default ได้) |

### 1.4 บันทึกการตั้งค่า

กด "Save" หรือ "บันทึก"

### 1.5 รอ DNS Propagate

DNS อาจใช้เวลา 5 นาที - 24 ชั่วโมง ในการ propagate (แพร่กระจายไปทั่วโลก)

### 1.6 ตรวจสอบว่า DNS ทำงาน

รันคำสั่งนี้ใน Terminal:

```bash
nslookup agent.softtechnw.com
```

หรือ

```bash
dig agent.softtechnw.com
```

**ผลลัพธ์ที่ถูกต้อง:** ควรเห็น IP `203.78.103.157`

```
Name:    agent.softtechnw.com
Address: 203.78.103.157
```

> **หมายเหตุ:** ถ้ายังไม่เห็น IP ที่ถูกต้อง ให้รอสักครู่แล้วลองใหม่

---

## ขั้นตอนที่ 2: เตรียมไฟล์บนเครื่อง Local

### 2.1 สร้างไฟล์ Dockerfile

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

### 2.2 สร้างไฟล์ docker-compose.yml

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

### 2.3 สร้างไฟล์ .dockerignore

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

### 2.4 แก้ไข next.config.ts

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

## ขั้นตอนที่ 3: Upload ไฟล์ไปยัง Server

### 3.1 เปิด Terminal

### 3.2 Upload โปรเจคด้วย rsync

รันคำสั่งนี้ (เปลี่ยน path ตามโปรเจคของคุณ):

```bash
rsync -avz --delete \
  -e "sshpass -p '@pe\$ajEr3d8#' ssh -o StrictHostKeyChecking=no -p 6789" \
  --exclude 'node_modules' \
  --exclude '.next' \
  "/Users/w/Desktop/Softtech Application/project/frontend/softtechnw-agent/" \
  root@203.78.103.157:/root/softtech-agent-web/
```

**อธิบายคำสั่ง:**
- `rsync -avz` = sync ไฟล์แบบ archive, verbose, compressed
- `--delete` = ลบไฟล์ที่ไม่มีบน local ออกจาก server
- `--exclude 'node_modules'` = ไม่ upload node_modules (จะ install ใหม่บน server)
- `--exclude '.next'` = ไม่ upload build files (จะ build ใหม่บน server)

### 3.3 รอจนเสร็จ

จะเห็นรายการไฟล์ที่ถูก upload ขึ้นมา รอจนเสร็จ

---

## ขั้นตอนที่ 4: Build และรัน Docker บน Server

### 4.1 SSH เข้า Server

```bash
sshpass -p '@pe$ajEr3d8#' ssh -o StrictHostKeyChecking=no -p 6789 root@203.78.103.157
```

หรือถ้าไม่มี sshpass:
```bash
ssh -p 6789 root@203.78.103.157
# แล้วพิมพ์ password: @pe$ajEr3d8#
```

### 4.2 ไปที่โฟลเดอร์โปรเจค

```bash
cd /root/softtech-agent-web
```

### 4.3 Build และรัน Docker

```bash
docker compose up -d --build
```

**อธิบายคำสั่ง:**
- `docker compose up` = สร้างและรัน container
- `-d` = รันใน background (detached mode)
- `--build` = build image ใหม่

### 4.4 รอ Build เสร็จ (ประมาณ 3-5 นาที)

ดู logs ระหว่าง build:
```bash
docker compose logs -f
```

กด `Ctrl+C` เพื่อออกจาก logs

### 4.5 ตรวจสอบว่า Container ทำงาน

```bash
docker ps
```

จะเห็น container ชื่อ `softtech-agent-web` ที่มี STATUS เป็น `Up`

---

## ขั้นตอนที่ 5: ตั้งค่า Nginx สำหรับ Subdomain

### 5.1 สร้างไฟล์ Config สำหรับ Subdomain

```bash
nano /etc/nginx/conf.d/agent.softtechnw.com.conf
```

### 5.2 ใส่เนื้อหานี้

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

### 5.3 บันทึกไฟล์

กด `Ctrl+O` แล้ว `Enter` เพื่อบันทึก
กด `Ctrl+X` เพื่อออก

### 5.4 ทดสอบ Config

```bash
nginx -t
```

จะต้องเห็น:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 5.5 Reload Nginx

```bash
nginx -s reload
```

หรือ
```bash
systemctl reload nginx
```

---

## ขั้นตอนที่ 6: ทดสอบเว็บไซต์

### 6.1 ทดสอบจาก Server

```bash
curl http://127.0.0.1:3000
```

ถ้าเห็น HTML แสดงว่า Next.js ทำงาน

### 6.2 ทดสอบจาก Browser

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
  "/Users/w/Desktop/Softtech Application/project/frontend/softtechnw-agent/" \
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
















## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
## วิธี Deploy (Build ในเครื่อง แล้ว Upload)

### ขั้นตอนที่ 1: Build Docker Image ในเครื่อง

```bash
docker build --platform linux/amd64 -t softtech-agent-web . 
```

รอ ~2-3 นาที

---

### ขั้นตอนที่ 2: Save Image เป็นไฟล์

```bash
docker save softtech-agent-web | gzip > softtech-agent-web.tar.gz
```

---

### ขั้นตอนที่ 3: Upload ไฟล์ไป Server

```bash
scp -P 6789 softtech-agent-web.tar.gz root@203.78.103.157:/root/
```

ใส่ password เมื่อถาม (ไฟล์ ~200-300MB อาจใช้เวลาสักครู่)

---

### ขั้นตอนที่ 4: SSH เข้า Server แล้ว Load Image

```bash
ssh root@203.78.103.157 -p 6789
@pe$ajEr3d8#
```

แล้วรัน:

```bash
# Load image
docker load < /root/softtech-agent-web.tar.gz

# หยุด container เก่า (ถ้ามี)
docker stop softtech-agent-web 2>/dev/null
docker rm softtech-agent-web 2>/dev/null

# Start container ใหม่ (ใช้ host network)
docker run -d --name softtech-agent-web --restart unless-stopped --network host -e NODE_ENV=production -e PORT=3000 -e HOSTNAME=0.0.0.0 softtech-agent-web

# เช็คว่าทำงาน
docker ps | grep softtechnw
```

---

