# Base image node alpine
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /backend

# Install dependencies di dalam container
COPY package*.json ./
RUN npm install

# Install nodemon untuk hot-reloading selama development
RUN npm install -g nodemon

# Salin seluruh source code ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 8000

# Jalankan aplikasi menggunakan nodemon agar bisa auto-reload
# CMD ["nodemon", "src/index.ts"]
CMD ["nodemon"]