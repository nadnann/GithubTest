// Bağış Platformu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Sayfa yüklendiğinde animasyonları başlat
    initAnimations();
    
    // Form validasyonlarını başlat
    initFormValidations();
    
    // Smooth scroll için
    initSmoothScroll();
    
    // Tooltip'leri başlat
    initTooltips();
    
    // Alert'leri otomatik kapat
    initAutoCloseAlerts();
    
    // Loading spinner'ları
    initLoadingStates();
    
    // Arama özelliklerini geliştirir
    enhanceSearch();
    
    console.log('🎉 Bağış Platformu başarıyla yüklendi!');
});

// Animasyonları başlat
function initAnimations() {
    // Sayfa ilk yüklendiğinde fade in efekti
    const cards = document.querySelectorAll('.card, .alert');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Hero section animasyonu
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section p, .hero-section .btn');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200 + 300);
    });
}

// Form validasyonları
function initFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            this.classList.add('was-validated');
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    });
}

// Form doğrulama
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // E-posta doğrulama
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !validateEmail(field.value)) {
            showFieldError(field, 'Geçerli bir e-posta adresi girin');
            isValid = false;
        }
    });
    
    // Telefon doğrulama
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        if (field.value && !validatePhone(field.value)) {
            showFieldError(field, 'Geçerli bir telefon numarası girin');
            isValid = false;
        }
    });
    
    return isValid;
}

// Tek alan doğrulama
function validateField(field) {
    const value = field.value.trim();
    
    // Zorunlu alan kontrolü
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Bu alan zorunludur');
        return false;
    }
    
    // E-posta kontrolü
    if (field.type === 'email' && value && !validateEmail(value)) {
        showFieldError(field, 'Geçerli bir e-posta adresi girin');
        return false;
    }
    
    // Telefon kontrolü
    if (field.type === 'tel' && value && !validatePhone(value)) {
        showFieldError(field, 'Geçerli bir telefon numarası girin (05XX XXX XX XX)');
        return false;
    }
    
    // Minimum uzunluk kontrolü
    if (field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (value.length < minLength) {
            showFieldError(field, `En az ${minLength} karakter olmalıdır`);
            return false;
        }
    }
    
    showFieldSuccess(field);
    return true;
}

// E-posta doğrulama
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Telefon doğrulama
function validatePhone(phone) {
    const phoneRegex = /^(05)[0-9]{9}$/;
    const cleanPhone = phone.replace(/\s+/g, '');
    return phoneRegex.test(cleanPhone);
}

// Hata mesajı göster
function showFieldError(field, message) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    
    // Mevcut hata mesajını kaldır
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Yeni hata mesajı ekle
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Başarı mesajı göster
function showFieldSuccess(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    // Hata mesajını kaldır
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// Smooth scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tooltip'leri başlat
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Alert'leri otomatik kapat
function initAutoCloseAlerts() {
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    
    alerts.forEach(alert => {
        // 5 saniye sonra otomatik kapat
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            if (bsAlert) {
                bsAlert.close();
            }
        }, 5000);
    });
}

// Loading durumları
function initLoadingStates() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                showLoadingState(submitButton);
            }
        });
    });
}

// Loading durumu göster
function showLoadingState(button) {
    const originalText = button.innerHTML;
    const originalDisabled = button.disabled;
    
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';
    
    // Form submit edildiğinde, sayfanın yeniden yükleneceğini varsayıyoruz
    // Eğer AJAX kullanıyorsak, bu fonksiyonu manuel olarak tersine çevirmek gerekir
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = originalDisabled;
    }, 10000); // 10 saniye timeout
}

// Arama özelliklerini geliştir
function enhanceSearch() {
    const searchInput = document.querySelector('input[name="arama"]');
    const categorySelect = document.querySelector('select[name="kategori"]');
    
    if (searchInput) {
        // Arama kutusuna focus olduğunda placeholder'ı değiştir
        searchInput.addEventListener('focus', function() {
            this.placeholder = 'Örn: laptop, masa, kitap...';
        });
        
        searchInput.addEventListener('blur', function() {
            this.placeholder = 'Eşya adı veya açıklama...';
        });
        
        // Enter tuşuna basıldığında arama yap
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.closest('form').submit();
            }
        });
    }
    
    // Kategori değiştiğinde otomatik arama
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            this.closest('form').submit();
        });
    }
}

// Tarih formatları
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('tr-TR', options);
}

// Görseller için lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// LocalStorage yardımcı fonksiyonları
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage\'a kaydedilemedi:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.warn('LocalStorage\'dan okunamadı:', e);
        return null;
    }
}

// Sayfa performansını takip et
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Sayfa yükleme süresi: ${loadTime}ms`);
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript hatası:', e.error);
    // Production'da hata raporlama servisine gönderebiliriz
});

// Kullanıcı deneyimini geliştiren küçük özellikler
function enhanceUserExperience() {
    // Dış linkleri yeni sekmede aç
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Form alanlarında Türkçe karakterleri otomatik düzelt
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            // İsteğe bağlı: Büyük/küçük harf düzeltmeleri
        });
    });
}

// Sayfa yüklendiğinde ek özellikler
document.addEventListener('DOMContentLoaded', function() {
    enhanceUserExperience();
    trackPerformance();
    
    // Eğer IntersectionObserver destekleniyorsa lazy loading'i başlat
    if ('IntersectionObserver' in window) {
        initLazyLoading();
    }
});

// Responsive navbar toggle
function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar) {
        navbar.classList.toggle('show');
    }
}

// Cookie consent (gelecekte eklenebilir)
function initCookieConsent() {
    // Cookie onayı için kod buraya gelecek
}

// PWA Support (gelecekte eklenebilir)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker kayıt kodu buraya gelecek
    });
}