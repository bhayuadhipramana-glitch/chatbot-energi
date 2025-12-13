# 🚨 Fix CORS Error - Production Deployment

## ❌ Error yang Terjadi

```
Access to XMLHttpRequest at 'http://localhost:5000/api/auth/login' 
from origin 'https://enernova.undiksha.cloud' has been blocked by CORS policy
```

## 🔍 Penyebab Masalah

1. Frontend production (`https://enernova.undiksha.cloud`) mencoba fetch ke `http://localhost:5000`
2. Variable `NEXT_PUBLIC_API_URL` tidak diset di production environment
3. Fallback ke default value: `http://localhost:5000` (hanya bisa diakses dari komputer lokal)

## ✅ Solusi yang Sudah Dilakukan

### 1. Update CORS di Backend ([server.js](api/server.js))

Backend sekarang accept request dari:
- ✅ `https://enernova.undiksha.cloud`
- ✅ `https://www.enernova.undiksha.cloud`
- ✅ Semua IP local (20.2.81.1, 10.21.0.55, dll)
- ✅ localhost (untuk development)

## 🚀 Langkah Selanjutnya

### Opsi 1: Deploy Backend ke Server yang Sama (Recommended)

Jika backend juga di-deploy di server undiksha.cloud:

1. **Deploy backend API** ke subdomain (misal: `api.enernova.undiksha.cloud`)

2. **Set environment variable di platform deployment:**
   ```bash
   NEXT_PUBLIC_API_URL=https://api.enernova.undiksha.cloud
   ```

3. **Rebuild/Redeploy frontend** setelah set environment variable

### Opsi 2: Akses Backend dari IP Public (Kurang Aman)

Jika backend masih di komputer lokal tapi ingin diakses public:

1. **Set environment variable di platform deployment:**
   ```bash
   NEXT_PUBLIC_API_URL=http://[IP_PUBLIC_SERVER]:5000
   ```
   Ganti `[IP_PUBLIC_SERVER]` dengan IP public komputer/server backend

2. **Buka port 5000** di firewall dan router

3. **⚠️ WARNING:** Tidak aman untuk production, gunakan hanya untuk testing

### Opsi 3: Akses Backend dari IP Local Network (Testing Only)

Untuk testing di network lokal saja:

1. **Set environment variable:**
   ```bash
   NEXT_PUBLIC_API_URL=http://20.2.81.1:5000
   ```

2. **Device yang akses HARUS di network yang sama** dengan server backend

## 📝 Cara Set Environment Variable

### Jika menggunakan Vercel:

```bash
# Via CLI
vercel env add NEXT_PUBLIC_API_URL production
# Masukkan value: https://api.enernova.undiksha.cloud

# Via Dashboard
1. Buka project di Vercel Dashboard
2. Settings → Environment Variables
3. Add new:
   - Name: NEXT_PUBLIC_API_URL
   - Value: https://api.enernova.undiksha.cloud
   - Environment: Production
4. Redeploy project
```

### Jika menggunakan Netlify:

```bash
1. Site settings → Environment variables
2. Add variable:
   - Key: NEXT_PUBLIC_API_URL
   - Value: https://api.enernova.undiksha.cloud
3. Trigger redeploy
```

### Jika menggunakan Railway/Render/Custom Server:

```bash
# Set di .env atau environment config
NEXT_PUBLIC_API_URL=https://api.enernova.undiksha.cloud

# Rebuild
npm run build
npm start
```

## 🔐 Deploy Backend API (Recommended)

### Deploy backend ke Railway (Free tier):

1. **Push backend code ke GitHub**

2. **Deploy di Railway:**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Deploy
   cd api
   railway init
   railway up
   ```

3. **Get URL backend** (misal: `https://enernova-api.up.railway.app`)

4. **Update CORS** di server.js untuk allow domain Railway

5. **Set environment variable frontend:**
   ```bash
   NEXT_PUBLIC_API_URL=https://enernova-api.up.railway.app
   ```

## ✅ Verifikasi Setelah Fix

1. **Check environment variable sudah terload:**
   - Buka browser console di `https://enernova.undiksha.cloud`
   - Ketik: `console.log(process.env.NEXT_PUBLIC_API_URL)`
   - Harus tampil URL yang benar (bukan localhost)

2. **Test login:**
   - Buka Network tab di DevTools
   - Coba login
   - Check request URL di Network tab
   - Harus request ke URL yang benar, bukan localhost

3. **Check response:**
   - Response harus sukses (200 OK)
   - Tidak ada CORS error

## 📞 Kontak Jika Masih Error

Jika masih ada error setelah set environment variable:

1. **Screenshot error message** di console
2. **Screenshot Network tab** (request/response headers)
3. **Konfirmasi platform deployment** yang digunakan
4. **URL backend** yang digunakan

## 🎯 Quick Fix Summary

**Yang HARUS dilakukan SEKARANG:**

1. ✅ Backend CORS sudah diperbaiki (done)
2. ⏳ **Set `NEXT_PUBLIC_API_URL` di production environment** (action required)
3. ⏳ **Redeploy frontend** setelah set env var (action required)

**Environment variable yang harus di-set:**
```
NEXT_PUBLIC_API_URL=[URL_BACKEND_PRODUCTION]
```

Ganti `[URL_BACKEND_PRODUCTION]` dengan:
- `https://api.enernova.undiksha.cloud` (jika backend di-deploy)
- atau `http://[IP_PUBLIC]:5000` (jika backend di server local)
