from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'gizli-anahtar-buraya'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bagis_platformu.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Veritabanı Modelleri
class Kullanici(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ad = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefon = db.Column(db.String(20), nullable=True)
    adres = db.Column(db.Text, nullable=True)
    kayit_tarihi = db.Column(db.DateTime, default=datetime.utcnow)
    
    bagislar = db.relationship('Esya', backref='bagislayan', lazy=True)
    talepler = db.relationship('Talep', backref='talep_eden', lazy=True)

class Esya(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    baslik = db.Column(db.String(200), nullable=False)
    aciklama = db.Column(db.Text, nullable=False)
    kategori = db.Column(db.String(50), nullable=False)
    durum = db.Column(db.String(20), default='mevcut')  # mevcut, rezerve, verildi
    bagis_tarihi = db.Column(db.DateTime, default=datetime.utcnow)
    bagislayan_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'), nullable=False)
    
    talepler = db.relationship('Talep', backref='esya', lazy=True)

class Talep(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    esya_id = db.Column(db.Integer, db.ForeignKey('esya.id'), nullable=False)
    talep_eden_id = db.Column(db.Integer, db.ForeignKey('kullanici.id'), nullable=False)
    mesaj = db.Column(db.Text, nullable=True)
    durum = db.Column(db.String(20), default='beklemede')  # beklemede, onaylandi, reddedildi
    talep_tarihi = db.Column(db.DateTime, default=datetime.utcnow)

# Ana Sayfa
@app.route('/')
def ana_sayfa():
    son_esyalar = Esya.query.filter_by(durum='mevcut').order_by(Esya.bagis_tarihi.desc()).limit(6).all()
    kategoriler = db.session.query(Esya.kategori).filter_by(durum='mevcut').distinct().all()
    return render_template('ana_sayfa.html', son_esyalar=son_esyalar, kategoriler=kategoriler)

# Tüm Eşyalar
@app.route('/esyalar')
def esyalar():
    kategori = request.args.get('kategori', '')
    arama = request.args.get('arama', '')
    
    query = Esya.query.filter_by(durum='mevcut')
    
    if kategori:
        query = query.filter_by(kategori=kategori)
    
    if arama:
        query = query.filter(Esya.baslik.contains(arama) | Esya.aciklama.contains(arama))
    
    esyalar = query.order_by(Esya.bagis_tarihi.desc()).all()
    kategoriler = db.session.query(Esya.kategori).filter_by(durum='mevcut').distinct().all()
    
    return render_template('esyalar.html', esyalar=esyalar, kategoriler=kategoriler, 
                         secili_kategori=kategori, arama_terimi=arama)

# Bağış Yap
@app.route('/bagis_yap', methods=['GET', 'POST'])
def bagis_yap():
    if request.method == 'POST':
        # Önce kullanıcı bilgilerini al
        ad = request.form['ad']
        email = request.form['email']
        telefon = request.form.get('telefon', '')
        adres = request.form.get('adres', '')
        
        # Kullanıcı var mı kontrol et
        kullanici = Kullanici.query.filter_by(email=email).first()
        if not kullanici:
            kullanici = Kullanici(ad=ad, email=email, telefon=telefon, adres=adres)
            db.session.add(kullanici)
            db.session.commit()
        
        # Eşya bilgilerini al
        baslik = request.form['baslik']
        aciklama = request.form['aciklama']
        kategori = request.form['kategori']
        
        # Yeni eşya oluştur
        yeni_esya = Esya(
            baslik=baslik,
            aciklama=aciklama,
            kategori=kategori,
            bagislayan_id=kullanici.id
        )
        
        db.session.add(yeni_esya)
        db.session.commit()
        
        flash('Bağışınız başarıyla kaydedildi! Teşekkürler.', 'success')
        return redirect(url_for('ana_sayfa'))
    
    return render_template('bagis_yap.html')

# Eşya Detay
@app.route('/esya/<int:esya_id>')
def esya_detay(esya_id):
    esya = Esya.query.get_or_404(esya_id)
    return render_template('esya_detay.html', esya=esya)

# Talep Et
@app.route('/talep_et/<int:esya_id>', methods=['GET', 'POST'])
def talep_et(esya_id):
    esya = Esya.query.get_or_404(esya_id)
    
    if esya.durum != 'mevcut':
        flash('Bu eşya artık mevcut değil.', 'warning')
        return redirect(url_for('esya_detay', esya_id=esya_id))
    
    if request.method == 'POST':
        # Kullanıcı bilgilerini al
        ad = request.form['ad']
        email = request.form['email']
        telefon = request.form.get('telefon', '')
        mesaj = request.form.get('mesaj', '')
        
        # Kullanıcı var mı kontrol et
        kullanici = Kullanici.query.filter_by(email=email).first()
        if not kullanici:
            kullanici = Kullanici(ad=ad, email=email, telefon=telefon)
            db.session.add(kullanici)
            db.session.commit()
        
        # Talep oluştur
        yeni_talep = Talep(
            esya_id=esya_id,
            talep_eden_id=kullanici.id,
            mesaj=mesaj
        )
        
        db.session.add(yeni_talep)
        db.session.commit()
        
        flash('Talebiniz gönderildi! Bağışçı sizinle iletişime geçecektir.', 'success')
        return redirect(url_for('esya_detay', esya_id=esya_id))
    
    return render_template('talep_et.html', esya=esya)

# Hakkımızda
@app.route('/hakkimizda')
def hakkimizda():
    return render_template('hakkimizda.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True, host='0.0.0.0', port=5000)