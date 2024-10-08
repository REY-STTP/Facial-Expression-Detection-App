# Facial Expression Detection App

Aplikasi deteksi ekspresi wajah yang menggunakan teknologi AI `Face++` untuk mengenali berbagai ekspresi wajah dari gambar. Proyek ini dibangun dengan menggunakan teknologi terbaru untuk mendeteksi emosi dan menampilkan hasilnya secara real-time.

## Fitur

- **Deteksi Ekspresi Wajah**: Mendeteksi berbagai ekspresi wajah dari gambar yang diunggah.
- **Tampilkan Emosi**: Menampilkan emosi yang terdeteksi dalam bentuk label.
- **Pengaturan API**: Integrasi dengan AI API `Face++` untuk analisis ekspresi wajah.
- **Response Data Model Ekspresi Yang Dihasilkan**:

  - Marah
  - Jijik
  - Takut
  - Bahagia
  - Netral
  - Sedih
  - Terkejut

## Teknologi yang Digunakan

- **Node.js**: Lingkungan runtime untuk menjalankan server backend.
- **Express**: Framework web untuk Node.js, digunakan untuk membangun API.
- **MongoDB**: Database NoSQL untuk menyimpan data ekspresi wajah dan hasil analisis.
- **Axios**: Untuk melakukan permintaan HTTP dari frontend ke backend.
- **bcrypt**: Library untuk melakukan hashing dan verifikasi password secara aman.
- **jsonwebtoken (JWT)**: Library untuk membuat dan memverifikasi JSON Web Tokens, digunakan untuk otentikasi dan otorisasi.
- **validator**: Library untuk validasi dan sanitasi string, memastikan data input valid dan aman.
- **mongoose**: Library ODM (Object Data Modeling) untuk MongoDB, memudahkan interaksi dengan database MongoDB.
- **dotenv**: Library untuk memuat variabel lingkungan dari file `.env`, memudahkan konfigurasi aplikasi.
- **multer**: Middleware untuk menangani unggahan file, digunakan untuk memproses gambar yang diunggah.
- **form-data**: Library untuk membangun form-data untuk pengiriman data melalui HTTP.
- **nodemon**: Alat untuk memantau perubahan di file sumber dan otomatis me-restart server saat pengembangan.

## Dependensi Backend

Berikut adalah penjelasan mengenai beberapa dependensi utama yang digunakan dalam backend:

- **bcrypt**: 
  - **Deskripsi**: Library untuk melakukan hashing dan verifikasi password secara aman.
  - **Fungsi**: Mengamankan password pengguna dengan hashing sebelum disimpan di database, serta memverifikasi password saat login.

- **jsonwebtoken (JWT)**:
  - **Deskripsi**: Library untuk membuat dan memverifikasi JSON Web Tokens.
  - **Fungsi**: Digunakan untuk otentikasi dan otorisasi. JWT dibuat saat pengguna login dan dikirim dalam header permintaan untuk mengidentifikasi pengguna yang melakukan permintaan ke server.

- **validator**:
  - **Deskripsi**: Library untuk validasi dan sanitasi string.
  - **Fungsi**: Memvalidasi dan membersihkan data input dari pengguna untuk memastikan data yang diterima valid dan aman. Contohnya, memeriksa format email, panjang password, dll.

- **express**:
  - **Deskripsi**: Framework web untuk Node.js.
  - **Fungsi**: Menyediakan alat untuk membangun aplikasi web dan API dengan mudah. Menangani routing, middleware, dan berbagai fungsionalitas server lainnya.

- **mongoose**:
  - **Deskripsi**: Library ODM (Object Data Modeling) untuk MongoDB.
  - **Fungsi**: Memudahkan interaksi dengan database MongoDB. Menyediakan skema untuk data, validasi, dan metode untuk melakukan operasi CRUD.

- **dotenv**:
  - **Deskripsi**: Library untuk memuat variabel lingkungan dari file `.env`.
  - **Fungsi**: Memudahkan konfigurasi aplikasi dengan menyimpan variabel lingkungan (seperti kredensial database dan port) di file `.env`, yang kemudian dimuat ke dalam proses Node.js.

- **multer**:
  - **Deskripsi**: Middleware untuk menangani unggahan file.
  - **Fungsi**: Digunakan untuk memproses gambar yang diunggah oleh pengguna dan menyimpannya di server.

- **axios**:
  - **Deskripsi**: Library untuk melakukan permintaan HTTP.
  - **Fungsi**: Memudahkan pengiriman permintaan HTTP dari frontend ke backend.

- **form-data**:
  - **Deskripsi**: Library untuk membangun form-data.
  - **Fungsi**: Digunakan untuk mengirim data form melalui HTTP, termasuk saat mengunggah file.

- **nodemon**:
  - **Deskripsi**: Alat untuk memantau perubahan di file sumber.
  - **Fungsi**: Memudahkan pengembangan dengan otomatis me-restart server saat terjadi perubahan pada file sumber.

## Penggunaan API Face++

`Face++` adalah layanan API yang menyediakan kemampuan untuk mendeteksi dan menganalisis ekspresi wajah dalam gambar. Dengan API ini, Anda dapat mengenali berbagai emosi seperti senang, marah, sedih, dan lainnya dari gambar wajah.

### Cara Mendapatkan API Key dan Secret API Key

1. **Daftar Akun di Face++**:
   - Kunjungi [Face++](https://www.faceplusplus.com/) dan daftar untuk akun baru.

2. **Login ke Dashboard**:
   - Setelah mendaftar, login ke dashboard Face++ Anda.

3. **Buat Aplikasi Baru**:
   - Di dashboard, buat aplikasi baru untuk mendapatkan API key dan secret API key.

4. **Dapatkan API Key dan Secret API Key**:
   - Setelah aplikasi dibuat, Anda akan diberikan API key dan secret API key yang dapat digunakan untuk melakukan permintaan ke API Face++.

5. **Konfigurasi API Key**:
   - Masukkan API key dan secret API key ke dalam file `.env` di proyek Anda.

## Instalasi

1. **Clone repository**:

    ```bash
    git clone https://github.com/REY-STTP/Facial-Expression-Detection-App.git
    ```

2. **Masuk ke direktori proyek**:

    ```bash
    cd Facial-Expression-Detection-App
    ```

3. **Instal dependensi**:

    ```bash
    cd backend
    ```
    ```bash
    npm install
    ```

4. **Setup .env**:

    Buat file bernama `.env` di direktori root backend dan isi dengan:

    ```bash
    FACEPP_API_KEY=your_api_key
    FACEPP_API_SECRET=Your_secret_api_key
    MONGO_URI=mongodb://localhost:27017/Nama-Databasemu
    PORT=3000
    SECRET=abcdefghijklmnopqrstuvwxyz0123456789
    ```

5. **Jalankan Program**:

    ```bash
    npm run dev
    ```

## Penggunaan API dengan Postman

### 1. Signup

- **URL**: `http://localhost:3000/api/user/signup`
- **Method**: `POST`
- **Body**: Pilih `raw` dan `JSON` dari dropdown di bawah tab `Body`.
- **Contoh JSON**:

    ```json
    {
      "nama": "Rey Re",
      "username": "reyree",
      "email": "Reyre2@gmail.com",
      "password": "Reyre@123"
    }
    ```

### 2. Login

- **URL**: `http://localhost:3000/api/user/login`
- **Method**: `POST`
- **Body**: Pilih `raw` dan `JSON` dari dropdown di bawah tab `Body`.
- **Contoh JSON**:

    ```json
    {
      "usernameOrEmail": "reyree",
      "password": "Reyre@123"
    }
    ```

- **Catatan**: Setelah login berhasil, Anda akan menerima token authorization `Bearer eyxxxxxx`. Simpan token ini untuk digunakan dalam permintaan API berikutnya.

### 3. Operasi API Images

Setelah mendapatkan token authorization `Bearer eyxxxxxx`, Anda dapat melakukan permintaan berikut pada endpoint `/api/images`:

1. **Get All Images**
    - **URL**: `http://localhost:3000/api/images/`
    - **Method**: `GET`
    - **Authorization**: Pilih `Bearer Token` pada tab `Authorization` dan masukkan token yang didapatkan sebelumnya `Bearer eyxxxxxx`.

2. **Get an Image by ID**
    - **URL**: `http://localhost:3000/api/images/123` (ganti `123` dengan ID gambar yang diinginkan)
    - **Method**: `GET`
    - **Authorization**: Pilih `Bearer Token` pada tab `Authorization` dan masukkan token yang didapatkan sebelumnya `Bearer eyxxxxxx`.

3. **Post an Image**
    - **URL**: `http://localhost:3000/api/images/`
    - **Method**: `POST`
    - **Body**: Pilih `form-data` pada tab `Body`.
    - **Key**: `file`
    - **Value**: Pilih `File` dari dropdown, lalu unggah gambar wajah dari direktori penyimpanan laptop/PC Anda.
    - **Authorization**: Pilih `Bearer Token` pada tab `Authorization` dan masukkan token yang didapatkan sebelumnya `Bearer eyxxxxxx`.

4. **Delete an Image By ID**
    - **URL**: `http://localhost:3000/api/images/123` (ganti `123` dengan ID gambar yang ingin dihapus)
    - **Method**: `DELETE`
    - **Authorization**: Pilih `Bearer Token` pada tab `Authorization` dan masukkan token yang didapatkan sebelumnya `Bearer eyxxxxxx`.

5. **Patch an Image By ID**
    - **URL**: `http://localhost:3000/api/images/123` (ganti `123` dengan ID gambar yang ingin diperbarui)
    - **Method**: `PATCH`
    - **Body**: Pilih `form-data` atau `raw` sesuai dengan data yang akan diperbarui.
    - **Key**: Jika menggunakan `form-data`, tambahkan field sesuai dengan data yang ingin diperbarui.
    - **Authorization**: Pilih `Bearer Token` pada tab `Authorization` dan masukkan token yang didapatkan sebelumnya `Bearer eyxxxxxx`.

## Penutup

**Terima Kasih Telah Menggunakan Facial Expression Detection App**

Kami berharap aplikasi ini dapat membantu Anda dalam mendeteksi dan menganalisis ekspresi wajah dengan mudah. Jika Anda memiliki pertanyaan, umpan balik, atau ingin berkontribusi pada proyek ini, jangan ragu untuk membuka *issue* atau *pull request* di repository GitHub kami.

- **Repository GitHub**: [Facial Expression Detection App](https://github.com/REY-STTP/Facial-Expression-Detection-App)

- **Kontak**: 

  - <a href="mailto:rey.zakaria123@gmail.com">Email</a>
  - <a href="https://www.facebook.com/reyvaldi.zakaria.18" target="_blank" rel="noopener noreferrer">Facebook</a>

Terima kasih atas dukungan dan kontribusi Anda!