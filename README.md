# Project Fullstack: Frontend & Backend

Project ini terdiri dari dua bagian utama: **frontend** menggunakan Next.js + TailwindCSS, dan **backend** menggunakan Node.js, Express, TypeScript, PostgreSQL, dan Redis. Aplikasi ini juga telah disiapkan untuk dijalankan menggunakan **Docker** dan **docker-compose**.

---

## Struktur Direktori

\`\`\`
root/
├── backend/          # Backend Node.js + TypeScript
├── frontend/         # Frontend Next.js + TailwindCSS
├── docker-compose.yml
├── Dockerfile        # Untuk backend
└── README.md
\`\`\`

---

## Frontend

### Teknologi
- Next.js 15
- React 19
- TailwindCSS 4
- Framer Motion
- Axios
- Heroicons & Lucide Icons
- TypeScript

### Setup Lokal
1. Masuk ke direktori frontend:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Jalankan development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Build production:
   \`\`\`bash
   npm run build
   npm run start
   \`\`\`

---

## Backend

### Teknologi
- Node.js 20 + TypeScript
- Express 5
- PostgreSQL 15
- Redis 7
- Drizzle ORM
- Zod (validation)
- JWT, bcrypt, multer, nodemailer
- Swagger untuk dokumentasi API
- Jest untuk testing

### Setup Lokal
1. Masuk ke direktori backend:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Jalankan development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Build TypeScript:
   \`\`\`bash
   npm run build
   \`\`\`
5. Jalankan production:
   \`\`\`bash
   npm run start
   \`\`\`

---

## Docker

Project sudah disiapkan untuk dijalankan menggunakan Docker.

### Build & Run dengan Docker Compose

1. Pastikan Docker dan Docker Compose sudah terinstall.
2. Jalankan perintah berikut di root direktori:
   \`\`\`bash
   docker-compose up --build
   \`\`\`
3. Layanan akan berjalan di:
   - **Backend**: http://localhost:8000
   - **PostgreSQL**: port 5432
   - **Redis**: port 6379

### Dockerfile Backend

- Base image: \`node:20-alpine\`
- Menggunakan \`nodemon\` untuk hot-reload saat development.
- Source code dipetakan ke container melalui volume.

### Docker Compose Services

- **backend**: Node.js + Express + TypeScript
- **db**: PostgreSQL
- **redis**: Redis cache

---

## Environment Variables

Buat file \`.env\` di root backend dengan minimal variabel berikut:

\`\`\`env
PORT=8000
DATABASE_URL=postgres://postgres:password@db:5432/inamfalahuddin_fdtest
REDIS_URL=redis://redis:6379
JWT_SECRET=your_jwt_secret
\`\`\`

---

## Testing

Backend menggunakan Jest untuk unit testing:

\`\`\`bash
npm run test
\`\`\`

---

## API Documentation

Swagger tersedia di backend (setelah server berjalan):

http://localhost:8000/api-docs


---

## Notes

- Direktori \`uploads\` di backend sudah dipetakan sebagai volume untuk menyimpan file secara persisten.
- Pastikan PostgreSQL dan Redis berjalan sebelum backend dijalankan.
- Gunakan \`nodemon\` untuk development agar perubahan file otomatis direload.

---

## License

[ISC](https://opensource.org/licenses/ISC)
EOF
