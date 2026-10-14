# Hasta Rapor Kayıt Sistemi

Hasta raporlarını yönetmeye yarayan React tabanlı web arayüzü. Hasta kaydı ekleme, listeleme, güncelleme, silme ve detay görüntüleme işlemlerini REST API üzerinden yapar.

> **Not:** Bu repo yalnızca frontend'i içerir. Arayüz, `http://localhost:4000` adresinde çalışan bir REST API'ye bağlanır. [Backend repo linki / kısa açıklama]


## Özellikler

- **Hasta listesi:** ad/soyada göre anlık arama, sütun başlığına tıklayarak sıralama, sayfalama (sayfa başına 5 kayıt)
- **Hasta ekleme:** 7 alanlı form, boş alan doğrulaması, görsel yükleme
- **Güncelleme ve detay:** kayıt bilgilerini düzenleme, tarih ve tanı detaylarını görüntüleme
- **Silme:** yanlışlıkla silmeyi önleyen onay penceresi
- **Geri bildirim:** işlem sonuçları için toast bildirimleri
- **Giriş ekranı:** yalnızca demo amaçlıdır, gerçek kimlik doğrulama değildir

## Kullanılan Teknolojiler

React 18 · React Router 6 · Axios · Semantic UI React · React Toastify

## Kurulum

```bash
git clone https://github.com/mustafa-alp/randevu_sistemi.git
cd randevu_sistemi
npm install
npm start
```

Uygulama `http://localhost:3000` adresinde açılır. Verilerin gelmesi için backend'in `http://localhost:4000` üzerinde çalışıyor olması gerekir.

## API Uç Noktaları

| İşlem | Metot | Yol |
|---|---|---|
| Listele | GET | `/rapor` |
| Detay | GET | `/rapor/:id` |
| Ekle | POST | `/addPatient` |
| Güncelle | PUT | `/rapor/update/:id` |
| Sil | DELETE | `/rapor/:id` |
| Arama | GET | `/rapor/search` |
| Görsel | GET | `/image/:id` |

## Proje Yapısı

```
src/
├── pages/      # Anasayfa, Ekle, Guncelle, Detail, Menubar, Footer
├── Service/    # Axios ile API çağrıları
└── login/      # Demo giriş ekranı
```
