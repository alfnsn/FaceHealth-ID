# FaceHealth-ID
> Solusi Cerdas Klasifikasi Jerawat dan Rekomendasi Skincare Berbasis AI

---

## Daftar Isi
- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Struktur Repository](#struktur-repository)
- [Tech Stack](#tech-stack)
- [Arsitektur Sistem](#arsitektur-sistem)
- [AI Engineer](#ai-engineer)
- [Data Science](#data-science)
- [Fullstack Developer](#fullstack-developer)
- [Tim](#tim)

---

## Tentang Proyek

**FaceHealth-ID**  merupakan platform berbasis kecerdasan buatan (AI) yang dirancang untuk membantu deteksi dini dan klasifikasi jenis jerawat melalui analisis foto wajah serta data gejala klinis pengguna.

Banyak individu mengalami kesulitan mengenali jenis jerawat yang mereka alami sehingga sering memilih produk skincare yang kurang sesuai. FaceHealth ID hadir untuk memberikan solusi yang lebih mudah diakses, cepat, dan personal melalui teknologi Deep Learning dan sistem rekomendasi berbasis data.

### Permasalahan
Beberapa permasalahan yang ingin diselesaikan:

Sulit mengenali jenis jerawat secara mandiri.
Kesalahan pemilihan produk skincare.
Terbatasnya akses konsultasi dermatologi yang cepat dan terjangkau.
Tingginya praktik self-diagnosis yang berpotensi menghasilkan keputusan perawatan yang kurang tepat.

Model AI dilatih menggunakan dataset jerawat klinis dan mampu mengklasifikasikan 5 jenis jerawat:

| Jenis Jerawat | Deskripsi |
|---|---|
| **Blackheads** | Komedo terbuka berwarna gelap di permukaan kulit |
| **Cyst** | Jerawat kistik dalam yang meradang dan menyakitkan |
| **Papules** | Benjolan kecil kemerahan tanpa kepala |
| **Pustules** | Jerawat berisi nanah dengan ujung putih/kuning |
| **Whiteheads** | Komedo tertutup di bawah permukaan kulit |

---

## Fitur Utama

- Klasifikasi 5 jenis jerawat dari foto wajah dengan akurasi **83.66%**
- Rekomendasi produk skincare berdasarkan jenis jerawat terdeteksi
- REST API siap produksi berbasis FastAPI
- Dashboard analisis data interaktif dengan Streamlit
- Aplikasi web modern dengan React + Tailwind CSS
- Autentikasi pengguna dan manajemen profil
- Model disimpan dalam format `.keras` siap produksi

---

## Struktur Repository

```
FaceHealth-ID/
├── AIEngineer/
│   ├── controllers/                # Logic handler untuk setiap endpoint
│   ├── inference/                  # Pipeline inferensi model
│   ├── models/                     # Definisi schema dan struktur data
│   ├── routes/                     # Routing endpoint FastAPI
│   ├── saved_models/               # File model terlatih
│   ├── services/                   # Business logic dan integrasi model
│   ├── test_images/                # Gambar sampel untuk testing
│   ├── CapstoneProject.ipynb       # Notebook training model klasifikasi jerawat
│   ├── Model_Rekomendasi.ipynb     # Notebook model rekomendasi skincare
│   ├── convert_model.py            # Script konversi format model
│   ├── main.py                     # Entry point FastAPI server
│   ├── Dockerfile                  # Konfigurasi Docker untuk deployment
│   └── requirements.txt
│
├── DataScience/
│   ├── dashboard-capstone/         # Dashboard Streamlit
│   │   ├── .streamlit/             # Konfigurasi tema Streamlit
│   │   ├── app.py                  # Aplikasi dashboard utama
│   │   ├── skincare_clean.csv      # Dataset bersih untuk dashboard
│   │   └── requirements.txt
│   ├── dataset/
│   │   ├── Skincare Treatment Dataset.csv   # Dataset mentah
│   │   └── skincare_clean.csv               # Dataset setelah cleaning
│   ├── notebook_Data_Science.ipynb # Notebook EDA dan analisis
│   ├── DATA DICTIONARY.xlsx        # Kamus data lengkap
│   ├── note.txt
│   └── requirements.txt
│
├── FullstackDev/
│   ├── backend/                    # Server Express.js + MongoDB
│   │   ├── config/
│   │   │   └── db.js               # Koneksi MongoDB
│   │   ├── controllers/
│   │   │   ├── recommendationController.js
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   └── User.js             # Schema user MongoDB
│   │   ├── routes/
│   │   │   ├── recommendationRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── server.js               # Entry point backend
│   │   ├── swagger.json            # Dokumentasi API
│   │   ├── vercel.json
│   │   └── package.json
│   │
│   └── frontend/                   # Aplikasi React + Vite
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/         # Komponen UI yang dapat digunakan ulang
│       │   ├── pages/              # Halaman-halaman aplikasi
│       │   ├── styles/
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── index.html
│       ├── tailwind.config.js
│       ├── vite.config.js
│       ├── vercel.json
│       └── package.json
│
├── .devcontainer/                  # Konfigurasi Dev Container
├── .gitignore
└── README.md
```

---

## Tech Stack

| Bagian | Teknologi |
|--------|-----------|
| **AI - Klasifikasi** | TensorFlow 2.15, Keras, ResNet50, Python |
| **AI - Rekomendasi** | Scikit-learn, Random Forest, Joblib, Python |
| **AI Server** | FastAPI, Uvicorn |
| **Data Science** | Python, Pandas, Streamlit |
| **Backend** | Node.js, Express.js, MongoDB |
| **Frontend** | React, Vite, Tailwind CSS |
| **Deployment** | Vercel (Frontend & Backend), Hugging Face Space (AI Server) |

---

## Arsitektur Sistem

```
[Pengguna]
    │
    ▼
[Frontend - React + Vite]              → Vercel
    │
    ├──► [Backend - Express.js]        → Vercel + MongoDB
    │         │
    │         └──► Manajemen user & autentikasi
    │
    └──► [AI Server - FastAPI]         → Hugging Face Space
              │
              ├──► Model ResNet50 Fine-Tuned (.keras)
              │         │
              │         └──► Klasifikasi 5 jenis jerawat
              │                   │
              │                   ▼
              └──► Model Rekomendasi (Rule-Based + Random Forest)
                            │
                            └──► Rekomendasi paket skincare
                                 berdasarkan jenis jerawat,
                                 tipe kulit, dan sensitivitas
```

---

## AI Engineer

### Tentang
Membangun dan melatih dua model untuk AI Server:
1. **Model Klasifikasi Jerawat** — Deep Learning (ResNet50 Fine-Tuned) untuk mengidentifikasi jenis jerawat dari foto wajah.
2. **Model Rekomendasi Skincare** — Rule-Based + Random Forest untuk merekomendasikan paket perawatan berdasarkan profil kulit pengguna.

Kedua model diekspos melalui REST API berbasis FastAPI yang di-deploy ke Hugging Face Space.

### Dataset Klasifikasi Jerawat

| Split | Blackheads | Cyst | Papules | Pustules | Whiteheads | Total |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|
| Train | 735 | 645 | 621 | 584 | 193 | **2.778** |
| Valid | 240 | 206 | 209 | 217 | 49 | **921** |
| Test  | 265 | 189 | 202 | 205 | 57 | **918** |

> Ketidakseimbangan kelas (khususnya Whiteheads) ditangani dengan **class weighting** saat training.

### Perbandingan Model

| Model | Test Accuracy | Test Loss | Top-2 Accuracy |
|-------|:---:|:---:|:---:|
| Custom CNN | 64.05% | 1.074 | 83.99% |
| ResNet50 | 70.37% | 1.013 | 86.93% |
| EfficientNetB0 | 70.92% | 0.932 | 88.56% |
| EfficientNetB0 Fine-Tuned | 75.82% | 0.828 | 91.07% |
| **ResNet50 Fine-Tuned** | **83.66%** | **0.793** | **93.25%** |

**Model terpilih: ResNet50 Fine-Tuned** dengan fine-tuning pada 22 layer `conv5_block` terakhir.

### Classification Report (Model Final)

| Kelas | Precision | Recall | F1-Score | Support |
|-------|:---------:|:------:|:--------:|:-------:|
| Blackheads | 0.957 | 0.849 | 0.900 | 265 |
| Cyst | 0.811 | 0.862 | 0.836 | 189 |
| Papules | 0.798 | 0.723 | 0.758 | 202 |
| Pustules | 0.767 | 0.868 | 0.815 | 205 |
| Whiteheads | 0.836 | 0.983 | 0.903 | 57 |
| **Weighted Avg** | **0.842** | **0.837** | **0.837** | **918** |

### Model Rekomendasi Skincare

Model rekomendasi menggunakan pendekatan **Rule-Based + Random Forest**. Logika aturan dibuat berdasarkan kombinasi jenis jerawat dan sensitivitas kulit, lalu dipelajari oleh Random Forest classifier.

**6 Paket Rekomendasi yang Tersedia:**

| Paket | Kondisi |
|-------|---------|
| Gentle Cyst Package (Azelaic Acid + Niacinamide) | Cyst + Kulit Sensitif |
| Intense Cyst Package (Benzoyl Peroxide + Azelaic Acid) | Cyst + Kulit Normal |
| Calming Acne Package (Green Tea Extract + Zinc PCA) | Inflammatory + Kulit Sensitif |
| Active Acne Package (Salicylic Acid + Benzoyl Peroxide) | Inflammatory + Kulit Normal |
| Mild Comedonal Package (Niacinamide + Zinc PCA) | Comedonal + Kulit Sensitif |
| Deep Cleansing Package (Salicylic Acid + Niacinamide) | Comedonal + Kulit Normal |

**Input yang dibutuhkan:** Age Group, Skin Type, Skin Subtype, Sensitivity, Acne Type

**Hasil evaluasi model:**

| Metrik | Nilai |
|--------|-------|
| Accuracy | **100%** |
| Total Kelas | 6 |
| Algoritma | Random Forest (100 estimators) |

> Akurasi 100% dicapai karena target label dibuat langsung dari aturan deterministik (rule-based), sehingga model mempelajari pola yang konsisten dan tidak ambigu.

**File model disimpan dalam format `.joblib`:**
```
saved_models/
├── rf_model_rekomendasi.joblib
├── preprocessor_rekomendasi.joblib
└── label_encoder_rekomendasi.joblib
```

**Contoh prediksi:**
```python
# Input: Usia 25-36, kulit Oily, tidak sensitif, jerawat Cyst
# Output: "Intense Cyst Package (Benzoyl Peroxide + Azelaic Acid)"
```

---

### Setup & Menjalankan AI Server

**1. Buat virtual environment**
```bash
python -m venv Capstone2
```

**2. Aktifkan environment**
```bash
# Windows
.\Capstone2\Scripts\activate.bat
```

**3. Upgrade pip**
```bash
python -m pip install --upgrade pip
```

**4. Install dependencies**
```bash
cd AIEngineer
pip install -r requirements.txt --no-cache-dir
```

**5. Download model**

Buka file `AIEngineer/saved_models/NOTE(MODEL Deep Learning).md`, download model dari link Google Drive yang tersedia, lalu simpan file model ke folder `AIEngineer/saved_models/`.

**6. Jalankan server**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Server berjalan di `http://localhost:8000`.
Dokumentasi API interaktif tersedia di `http://localhost:8000/docs`.

### Deployment ke Hugging Face Space

AI Server di-deploy ke [Hugging Face Space](https://huggingface.co/spaces) menggunakan Docker SDK. Pastikan file `Dockerfile` sudah tersedia di folder `AIEngineer/`.

### Endpoint AI Server

#### POST `/predict` — Klasifikasi Jerawat
Upload foto wajah untuk mendapatkan prediksi jenis jerawat.

**Request:** `multipart/form-data`
```
file: <image_file>
```

**Response:**
```json
{
  "predicted_class": "Cyst",
  "confidence": 0.9637,
  "all_probabilities": {
    "Blackheads": 0.0017,
    "Cyst": 0.9637,
    "Papules": 0.0001,
    "Pustules": 0.0335,
    "Whiteheads": 0.0010
  }
}
```

#### POST `/recommend` — Rekomendasi Skincare
Dapatkan rekomendasi paket perawatan berdasarkan profil kulit dan jenis jerawat.

**Nilai yang valid:**

| Field | Pilihan |
|-------|---------|
| `age_group` | `14-18`, `19-24`, `25-36`, `37-45`, `45+` |
| `skin_type` | `Oily`, `Dry`, `Combination`, `Normal` |
| `sensitivity` | `Yes`, `No` |
| `acne_type` | `Cyst`, `Inflammatory`, `Comedonal` |

---

## Data Science

### Tentang
Melakukan eksplorasi, pembersihan, dan analisis dataset skincare treatment untuk mendukung fitur rekomendasi produk. Hasil analisis divisualisasikan melalui dashboard interaktif berbasis Streamlit.

### Notebook

| File | Deskripsi |
|------|-----------|
| `notebook_Data_Science.ipynb` | EDA, data cleaning, dan analisis dataset skincare |
| `DATA DICTIONARY.xlsx` | Penjelasan lengkap setiap kolom pada dataset |

### Dataset

| File | Deskripsi |
|------|-----------|
| `Skincare Treatment Dataset.csv` | Dataset mentah produk skincare |
| `skincare_clean.csv` | Dataset setelah proses cleaning dan preprocessing |

### Setup & Menjalankan Dashboard

**1. Masuk ke folder dashboard**
```bash
cd DataScience/dashboard-capstone
```

**2. Install dependencies**
```bash
pip install -r requirements.txt
```

**3. Jalankan dashboard**
```bash
streamlit run app.py
```

Dashboard akan terbuka otomatis di browser pada `http://localhost:8501`.

---

## Fullstack Developer

### Tentang
Membangun aplikasi web lengkap dengan frontend React dan backend Express.js yang terhubung ke MongoDB Atlas. Frontend dan backend masing-masing di-deploy ke Vercel.

### Setup Backend (Express.js + MongoDB)

**1. Masuk ke folder backend**
```bash
cd FullstackDev/backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Buat file `.env`** di folder `FullstackDev/backend/`
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

> Cara mendapatkan `MONGODB_URI`:
> 1. Buka [MongoDB Atlas](https://cloud.mongodb.com)
> 2. Buat cluster baru atau gunakan yang sudah ada
> 3. Klik **Connect** lalu pilih **Connect your application**
> 4. Copy connection string dan ganti `<password>` dengan password database kamu

**4. Jalankan server**
```bash
node server.js
```

Backend berjalan di `http://localhost:5000`.
Dokumentasi API tersedia di `swagger.json`.

### Setup Frontend (React + Vite + Tailwind)

**1. Masuk ke folder frontend**
```bash
cd FullstackDev/frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Buat file `.env`** di folder `FullstackDev/frontend/`
```env
VITE_API_URL=http://localhost:5000
VITE_AI_URL=http://localhost:8000
```

**4. Jalankan development server**
```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:5173`.

### Build untuk Produksi

```bash
npm run build
```

### Endpoint Backend

#### Users

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/users/register` | Registrasi pengguna baru |
| POST | `/api/users/login` | Login pengguna |
| GET | `/api/users/profile` | Ambil profil pengguna |

#### Recommendations

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/recommendations` | Ambil rekomendasi skincare |
| POST | `/api/recommendations` | Buat rekomendasi berdasarkan jenis jerawat |

---

## Menjalankan Seluruh Sistem Secara Bersamaan

Untuk menjalankan semua service sekaligus, buka **3 terminal terpisah**:

**Terminal 1 — AI Server**
```bash
cd AIEngineer
.\Capstone2\Scripts\activate.bat   # Windows
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Terminal 2 — Backend**
```bash
cd FullstackDev/backend
node server.js
```

**Terminal 3 — Frontend**
```bash
cd FullstackDev/frontend
npm run dev
```

Setelah semua berjalan, buka `http://localhost:5173` di browser.

---

## Tim

Proyek ini dikembangkan oleh tim capstone yang terdiri dari tiga peran:

| Peran | Tanggung Jawab |
|-------|----------------|
| **AI Engineer** | Training model Deep Learning, evaluasi, FastAPI server |
| **Data Scientist** | EDA, analisis dataset skincare, dashboard Streamlit |
| **Fullstack Developer** | Aplikasi web React, backend Express.js, deployment |

---

> **Disclaimer:** Model AI dalam proyek ini tidak menggunakan TensorFlow Hub, AutoML, atau layanan API model eksternal. Semua model dibangun dan dilatih secara mandiri menggunakan TensorFlow/Keras dengan dataset yang dikurasi khusus.