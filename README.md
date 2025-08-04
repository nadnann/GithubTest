# 🎁 Bağış Platformu

Kullanıcıların kullanmadığı eşyaları bağışlayabilecekleri ve ihtiyaç sahiplerinin bu eşyalara talip olup alabilecekleri modern bir web platformu.

## ✨ Özellikler

- 🎯 **Kolay Bağış Süreci**: Kullanmadığınız eşyaları kolayca paylaşın
- 🔍 **Akıllı Arama**: Kategori ve anahtar kelime ile eşya arama
- 📱 **Mobil Uyumlu**: Tüm cihazlarda mükemmel çalışır
- 🔒 **Güvenli İletişim**: Kullanıcı bilgileri korunur
- 💬 **Direkt İletişim**: Bağışçı ve talep eden doğrudan iletişim kurabilir
- 🎨 **Modern Tasarım**: Bootstrap 5 ile modern ve kullanıcı dostu arayüz

## 📋 Gereksinimler

- Python 3.8+
- Flask web framework
- SQLite veritabanı

## 🚀 Kurulum

### 1. Projeyi İndirin
```bash
git clone <repository-url>
cd bagis-platformu
```

### 2. Sanal Ortam Oluşturun
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Bağımlılıkları Yükleyin
```bash
pip install -r requirements.txt
```

### 4. Uygulamayı Çalıştırın
```bash
python app.py
```

Uygulama `http://localhost:5000` adresinde çalışmaya başlayacaktır.

## 📁 Proje Yapısı

```
bagis-platformu/
├── app.py                 # Ana uygulama dosyası
├── requirements.txt       # Python bağımlılıkları
├── README.md             # Bu dosya
├── templates/            # HTML şablonları
│   ├── base.html         # Temel şablon
│   ├── ana_sayfa.html    # Ana sayfa
│   ├── bagis_yap.html    # Bağış formu
│   ├── esyalar.html      # Eşya listesi
│   ├── esya_detay.html   # Eşya detay sayfası
│   ├── talep_et.html     # Talep formu
│   └── hakkimizda.html   # Hakkımızda sayfası
├── static/               # Statik dosyalar
│   ├── css/
│   │   └── style.css     # Özel CSS stilleri
│   └── js/
│       └── script.js     # JavaScript dosyası
└── bagis_platformu.db    # SQLite veritabanı (otomatik oluşur)
```

## 🛠️ Kullanılan Teknolojiler

### Backend
- **Flask**: Web framework
- **SQLAlchemy**: ORM (Object-Relational Mapping)
- **SQLite**: Veritabanı

### Frontend
- **HTML5**: Yapılandırma
- **CSS3**: Stil ve animasyonlar
- **JavaScript (ES6+)**: İnteraktivite
- **Bootstrap 5**: UI framework
- **Font Awesome**: İkonlar

## 📖 Kullanım

### Bağış Yapma
1. Ana sayfadan "Bağış Yap" butonuna tıklayın
2. Kişisel bilgilerinizi girin
3. Eşya bilgilerini detaylı olarak açıklayın
4. "Bağışı Yayınla" butonuna tıklayın

### Eşya Arama ve Talep Etme
1. "Tüm Eşyalar" sayfasına gidin
2. Arama kutusunu kullanın veya kategorilere göz atın
3. Beğendiğiniz eşyanın detayına gidin
4. "Talep Et" butonuna tıklayın
5. İletişim bilgilerinizi girin ve mesajınızı yazın

## 🗂️ Veritabanı Modeli

### Kullanici Tablosu
- `id`: Benzersiz kullanıcı ID'si
- `ad`: Kullanıcının adı soyadı
- `email`: E-posta adresi (benzersiz)
- `telefon`: Telefon numarası
- `adres`: Konum bilgisi
- `kayit_tarihi`: Kayıt zamanı

### Esya Tablosu
- `id`: Benzersiz eşya ID'si
- `baslik`: Eşya başlığı
- `aciklama`: Detaylı açıklama
- `kategori`: Eşya kategorisi
- `durum`: Mevcut/Rezerve/Verildi
- `bagis_tarihi`: Bağış zamanı
- `bagislayan_id`: Bağışçı kullanıcı ID'si

### Talep Tablosu
- `id`: Benzersiz talep ID'si
- `esya_id`: Talep edilen eşya ID'si
- `talep_eden_id`: Talep eden kullanıcı ID'si
- `mesaj`: Talep mesajı
- `durum`: Beklemede/Onaylandı/Reddedildi
- `talep_tarihi`: Talep zamanı

## 🎨 Özelleştirme

### CSS Stilleri
`static/css/style.css` dosyasında özel CSS stilleri bulunur. Renkleri ve görünümü buradan değiştirebilirsiniz.

### JavaScript İşlevleri
`static/js/script.js` dosyasında form validasyonları, animasyonlar ve kullanıcı etkileşimleri yönetilir.

## 🔧 Geliştirme

### Debug Modu
Geliştirme sırasında debug modunu açmak için `app.py` dosyasında:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

### Yeni Özellik Ekleme
1. Gerekirse yeni route'lar ekleyin (`app.py`)
2. HTML şablonları oluşturun (`templates/`)
3. CSS stilleri ekleyin (`static/css/style.css`)
4. JavaScript işlevleri ekleyin (`static/js/script.js`)

## 📱 Responsive Tasarım

Platform tüm cihaz boyutlarında mükemmel çalışır:
- 📱 **Mobil**: 576px ve altı
- 📲 **Tablet**: 768px ve altı
- 💻 **Masaüstü**: 992px ve üstü

## 🔒 Güvenlik

- Form validasyonları hem frontend hem backend'de yapılır
- SQL injection koruması (SQLAlchemy ORM)
- XSS koruması (Jinja2 template engine)
- CSRF koruması için Flask-WTF eklenebilir (gelecek sürümlerde)

## 📞 Destek

Sorunlar ve öneriler için:
- 📧 **E-posta**: info@bagisplatformu.com
- 📱 **Telefon**: +90 (555) 123-4567

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🎯 Gelecek Özellikler

- [ ] 📧 E-posta bildirimleri
- [ ] 📸 Eşya fotoğraf yükleme
- [ ] ⭐ Kullanıcı değerlendirme sistemi
- [ ] 🗺️ Konum tabanlı arama
- [ ] 📊 Kullanıcı profil sayfası
- [ ] 🔔 Push bildirimleri
- [ ] 🌐 Çoklu dil desteği
- [ ] 📱 PWA (Progressive Web App) desteği

## 👥 Takım

- **Backend Geliştirici**: Flask ve SQLAlchemy
- **Frontend Geliştirici**: HTML, CSS, JavaScript
- **UI/UX Tasarımcı**: Bootstrap ve Font Awesome

---

💝 **Paylaşmak güzeldir!** Bu platform ile ihtiyaç sahiplerinin hayatına dokunun ve çevreye katkıda bulunun.