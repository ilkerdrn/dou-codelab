# DOU CodeLab — Okul Sunucusu Geçiş Paketi

Bu klasör, prototipten Doğuş Üniversitesi tarafından işletilen üretim ortamına
geçiş için hazırlanmıştır. Parolalar ve erişim anahtarları Git'e eklenmez.

## Üniversite BT biriminden gerekli bilgiler

1. Linux sanal sunucu: Ubuntu 24.04 LTS, en az 4 vCPU, 8 GB RAM, 100 GB SSD.
2. `codelab.dogus.edu.tr` DNS kaydı ve TLS sertifikası.
3. Dış erişime yalnızca 80/443; SSH için üniversite VPN/IP kısıtı.
4. Microsoft Entra ID uygulaması: Tenant ID, Client ID ve Client Secret.
5. Redirect URI: `https://codelab.dogus.edu.tr/api/auth/callback/microsoft-entra-id`.
6. Öğrenci ve öğretim görevlisi rollerinin hangi Entra grup/claim bilgisiyle
   ayrılacağı.
7. OBS/LMS entegrasyonu varsa API dokümanı, test hesabı ve yetki kapsamı.
8. SMTP bilgileri veya Microsoft Graph üzerinden e-posta gönderim yetkisi.
9. Yedeklerin tutulacağı üniversite içi güvenli depolama alanı.
10. KVKK veri sorumlusu, saklama süresi ve silme/anonimleştirme politikası.

## İlk kurulum

```bash
cp .env.example .env
# .env içindeki CHANGE_ME ve REQUEST_FROM_DOGUS_IT değerlerini doldurun.
docker compose up -d
docker compose ps
```

Nginx örneğini `/etc/nginx/sites-available/dou-codelab` konumuna taşıyıp alan
adı ve sertifika yollarını doğrulayın. Uygulama servisi port 3000'de yalnızca
localhost üzerinden dinlemelidir.

## Canlıya geçmeden önce zorunlu kapılar

- Entra ID ile `@dogus.edu.tr` giriş testi
- Öğrenci, öğretim görevlisi ve yönetici rol testleri
- Yetkisiz API erişimi ve dosya yükleme güvenlik testi
- Veritabanı migration ve geri dönüş testi
- Günlük otomatik yedek ve örnek geri yükleme testi
- KVKK aydınlatma/açık rıza metni ve veri envanteri
- Loglarda parola, token, öğrenci notu bulunmadığının kontrolü
- Yük, mobil, erişilebilirlik ve tarayıcı testleri
- İzleme/uyarı: sağlık kontrolü, disk, CPU, hata oranı, sertifika süresi

## Sağlık kontrolü

Uygulama yayına alındığında izleme sistemi aşağıdaki adresi her dakika kontrol
etmelidir:

`GET https://codelab.dogus.edu.tr/api/health`

Başarılı yanıt HTTP 200 ve `status: ok` içermelidir.

## Yedekleme

`backup.sh` PostgreSQL için sıkıştırılmış yedek üretir ve 30 günden eski yerel
yedekleri temizler. Üretimde dosya ayrıca üniversitenin farklı bir sunucusuna
aktarılmalı, aylık geri yükleme provası yapılmalıdır.

## Uygulama tarafında sonraki geliştirme sırası

1. Entra ID ve rol eşleme
2. PostgreSQL veri erişim katmanı ve migration'lar
3. Öğretmen içerik yönetimi ve öğrenci ilerleme kayıtları
4. Güvenli kod çalıştırıcı (ayrı izole servis)
5. Proje/dosya depolama ve GitHub doğrulaması
6. OBS/LMS, e-posta ve raporlama entegrasyonları

Kod çalıştırıcı ana uygulama konteynerinin içinde çalıştırılmamalıdır. Ağ erişimi
kapalı, CPU/RAM/süre limitli ve tek kullanımlık konteynerler kullanılmalıdır.
