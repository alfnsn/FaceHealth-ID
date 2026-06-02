# Skincare Treatment — Capstone Project

Proyek ini bertujuan membangun sistem rekomendasi perawatan kulit berbasis analisis data, dengan fokus pada identifikasi jenis jerawat dan rekomendasi bahan aktif yang tepat.

---

## Identifikasi Permasalahan

Kesulitan pengguna dalam mengenali jenis jerawat sejak gejala awal sering berujung pada pemilihan perawatan yang salah, sehingga berisiko memperparah kondisi kulit.

**Solusi Utama:** Membangun sistem yang memadukan analisis gejala klinis untuk memberikan rekomendasi perawatan kulit yang tepat berdasarkan profil kulit pengguna.

---

## Pertanyaan Bisnis

1. Bagaimana distribusi jenis jerawat (Comedonal, Inflammatory, Cyst) berdasarkan rentang usia dan sensitivitas kulit pengguna?
2. Bahan aktif apa yang memiliki efektivitas tertinggi untuk masing-masing kondisi jerawat?
3. Bagaimana distribusi jenis jerawat berdasarkan tipe kulit pengguna?

---

## Data Dictionary

| No | Nama Kolom | Tipe Data | Deskripsi | Contoh Nilai | Nilai Unik |
|----|------------|-----------|-----------|--------------|------------|
| 1 | `Age_Group` | string | Kelompok usia pengguna skincare | 14-18, 19-24, 25-36, 37-45, 45+ | 5 |
| 2 | `Skin_Type` | string | Jenis kulit dasar pengguna | Normal, Dry, Oily, Combination | 4 |
| 3 | `Skin_Subtype` | string | Sub-tipe kulit yang lebih spesifik | Normal to Dry, Oily to Combination | 8 |
| 4 | `Sensitivity` | string | Apakah kulit pengguna sensitif atau tidak | Yes, No | 2 |
| 5 | `Concern` | string | Masalah kulit utama yang dialami pengguna | Acne, Dark Circles, Dark Spots, Wrinkles | 10 |
| 6 | `Internal_Type` | string | Tipe spesifik dari masalah kulit (sub-kategori Concern) | Comedonal, Inflammatory, Cystic, Nodular | 7 |
| 7 | `Ingredients` | string | Kombinasi bahan aktif yang direkomendasikan | Salicylic Acid + Benzoyl Peroxide + Zinc PCA | 504 |
| 8 | `Concentrations` | string | Konsentrasi masing-masing bahan aktif | 2% + 5% + 0.5% | 210 |
| 9 | `Effects` | string | Efek klinis dari kombinasi bahan aktif | Unclogs pores, Kills acne-causing bacteria | 504 |

> **Info Dataset:** 1.120 baris · 9 kolom · 0 missing values · 0 duplikat

---

## Data Wrangling

- **Gathering:** Dataset diambil dari file CSV lokal
- **Assessing:** Tidak ditemukan missing values maupun data duplikat
- **Cleaning:** Data difilter hanya pada 3 tipe jerawat utama (Comedonal, Inflammatory, Cyst) menghasilkan 240 baris

---

## Insight Utama

- Distribusi tipe jerawat merata sempurna di semua rentang usia dan tipe kulit (balanced dataset)
- **Salicylic Acid** adalah bahan aktif paling dominan untuk jerawat Comedonal (51 kemunculan)
- **Benzoyl Peroxide** paling efektif untuk jerawat Inflammatory (46 kemunculan)
- **Zinc PCA** dan **Green Tea Extract** bersifat fleksibel dan muncul di hampir semua tipe jerawat
- Hasil A/B Testing menunjukkan distribusi bahan aktif berbeda secara signifikan antara tipe jerawat Comedonal dan Inflammatory

---

## Library yang Digunakan

```python
pandas
matplotlib
seaborn
scipy
```
