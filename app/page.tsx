"use client";
import { useEffect, useMemo, useState } from "react";
type Role = "student" | "teacher";
type View =
  | "home"
  | "paths"
  | "lesson"
  | "tasks"
  | "calendar"
  | "lab"
  | "progress"
  | "assessment"
  | "projects"
  | "mentor"
  | "analytics"
  | "passport"
  | "curriculum"
  | "arena"
  | "reviews"
  | "career"
  | "questionbank"
  | "learningplan"
  | "mentoring"
  | "notifications"
  | "classroom"
  | "reports"
  | "projectworkspace"
  | "achievements"
  | "settings"
  | "helpcenter"
  | "governance"
  | "systemready"
  | "news"
  | "studio";
const courses = [
  {
    code: "BLP 101",
    tag: "PY",
    name: "Algoritma ve Programlama",
    topic: "Döngüler",
    progress: 46,
    color: "#3478a8",
    lessons: 26,
  },
  {
    code: "BLP 105",
    tag: "SQL",
    name: "Veritabanı Yönetimi",
    topic: "GROUP BY",
    progress: 28,
    color: "#7951a8",
    lessons: 22,
  },
  {
    code: "BLP 203",
    tag: "JV",
    name: "Nesne Tabanlı Programlama",
    topic: "Sınıflar",
    progress: 17,
    color: "#df7726",
    lessons: 24,
  },
  {
    code: "BLP 108",
    tag: "WEB",
    name: "Web Tasarım Temelleri",
    topic: "CSS Grid",
    progress: 64,
    color: "#b20e2a",
    lessons: 20,
  },
  {
    code: "BLP 276",
    tag: "AI",
    name: "Python ve Veri İşleme",
    topic: "Pandas",
    progress: 9,
    color: "#23806a",
    lessons: 28,
  },
  {
    code: "BLT 103",
    tag: "NET",
    name: "Ağ Temelleri",
    topic: "TCP/IP",
    progress: 0,
    color: "#273242",
    lessons: 18,
  },
];
const assignments = [
  {
    course: "BLP 101",
    title: "Döngüler · Çift sayı analizi",
    due: "Bugün, 23:59",
    xp: 80,
    status: "Devam ediyor",
    hot: true,
  },
  {
    course: "BLP 105",
    title: "Satış verisinde gruplama",
    due: "19 Ağustos",
    xp: 100,
    status: "Başlanmadı",
  },
  {
    course: "BLP 203",
    title: "Kütüphane sınıfı oluştur",
    due: "22 Ağustos",
    xp: 140,
    status: "Başlanmadı",
  },
  {
    course: "BLP 108",
    title: "Duyarlı öğrenci kartı",
    due: "25 Ağustos",
    xp: 120,
    status: "Tamamlandı",
  },
];
const topics = [
  "Giriş",
  "Değişkenler",
  "Operatörler",
  "Koşullar",
  "Döngüler",
  "Fonksiyonlar",
  "Listeler",
  "Dosya işlemleri",
];
const lessonTracks: Record<string, string[]> = {
  "BLP 101": ["Algoritma mantığı", "Değişkenler", "Koşullar", "Döngüler", "Fonksiyonlar"],
  "BLP 105": ["Veri modeli", "SELECT", "Filtreleme", "JOIN", "GROUP BY"],
  "BLP 203": ["Nesne mantığı", "Sınıflar", "Metotlar", "Kalıtım", "Arayüzler"],
  "BLP 108": ["HTML iskeleti", "CSS seçiciler", "Flexbox", "CSS Grid", "Duyarlı tasarım"],
  "BLP 276": ["Python tekrarı", "NumPy", "Pandas", "Veri temizleme", "Görselleştirme"],
  "BLT 103": ["OSI modeli", "TCP/IP", "IPv4", "Alt ağlar", "Yönlendirme"],
};
const lessonContent: Record<
  string,
  { intro: string; objective: string; example: string; question: string; options: string[]; correct: number; practice: string }
> = {
  "BLP 101": {
    intro: "Döngüler, aynı işlem adımlarını belirli bir koşul boyunca tekrar etmemizi sağlar. Python'da for döngüsü bir koleksiyondaki değerleri sırayla işler.",
    objective: "Bir listedeki değerleri dolaşmak, koşulla filtrelemek ve sonucu ekrana yazdırmak.",
    example: "sayilar = [4, 7, 12]\nfor sayi in sayilar:\n    if sayi % 2 == 0:\n        print(sayi)",
    question: "Bir sayının çift olduğunu kontrol eden doğru koşul hangisidir?",
    options: ["sayi / 2 == 0", "sayi % 2 == 0", "sayi == 2", "sayi % 2 == 1"],
    correct: 1,
    practice: "Listedeki yalnızca çift sayıları bulan kodu tamamla ve üç otomatik testi geçir.",
  },
  "BLP 105": {
    intro: "GROUP BY, aynı değere sahip satırları gruplar ve COUNT, SUM veya AVG gibi özet fonksiyonlarla analiz eder.",
    objective: "Satış kayıtlarını kategoriye göre gruplamak ve toplam satış tutarını hesaplamak.",
    example: "SELECT kategori, SUM(tutar) AS toplam\nFROM satislar\nGROUP BY kategori;",
    question: "Gruplanan kayıtların toplamını almak için hangi fonksiyon kullanılır?",
    options: ["ORDER", "SUM", "WHERE", "JOIN"],
    correct: 1,
    practice: "Her ürün kategorisinin toplam cirosunu büyükten küçüğe sıralayan sorguyu yaz.",
  },
  "BLP 203": {
    intro: "Sınıf, ortak özellik ve davranışları tek bir yapı altında tanımlayan nesne şablonudur.",
    objective: "Alanları ve metotları olan yeniden kullanılabilir bir sınıf oluşturmak.",
    example: "class Kitap {\n  string Ad;\n  void Yazdir() { Console.WriteLine(Ad); }\n}",
    question: "Bir sınıftan üretilen somut örneğe ne ad verilir?",
    options: ["Döngü", "Nesne", "Paket", "Koşul"],
    correct: 1,
    practice: "Kitap adı ve yazarı tutan, bilgileri yazdıran bir Kütüphane sınıfı geliştir.",
  },
  "BLP 108": {
    intro: "CSS Grid, satır ve sütunlardan oluşan iki boyutlu yerleşimleri okunabilir kurallarla kurmayı sağlar.",
    objective: "Duyarlı bir kart alanını grid sütunları ve boşluklarla düzenlemek.",
    example: ".kartlar {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
    question: "Grid sütunlarını tanımlayan özellik hangisidir?",
    options: ["grid-template-columns", "font-grid", "align-text", "display-column"],
    correct: 0,
    practice: "Masaüstünde üç, mobilde tek sütun gösteren öğrenci kartları oluştur.",
  },
  "BLP 276": {
    intro: "Pandas, tablo biçimindeki veriyi DataFrame yapısıyla okuma, temizleme ve analiz etme imkânı verir.",
    objective: "CSV verisini okumak, eksik değerleri incelemek ve temel özet üretmek.",
    example: "import pandas as pd\ndf = pd.read_csv('notlar.csv')\nprint(df.describe())",
    question: "CSV dosyasını DataFrame'e aktaran fonksiyon hangisidir?",
    options: ["pd.open", "pd.read_csv", "pd.table", "pd.import"],
    correct: 1,
    practice: "Not verisini oku, eksik değerleri temizle ve ders ortalamalarını hesapla.",
  },
  "BLT 103": {
    intro: "TCP/IP, cihazların ağ üzerinde adreslenmesini ve verinin güvenilir biçimde taşınmasını sağlayan protokol ailesidir.",
    objective: "IP, taşıma ve uygulama katmanlarının temel görevlerini ayırt etmek.",
    example: "İstemci → TCP bağlantısı → IP yönlendirme → Sunucu\nHTTP: 80 · HTTPS: 443 · SSH: 22",
    question: "Güvenilir ve bağlantı yönelimli taşıma protokolü hangisidir?",
    options: ["UDP", "ARP", "TCP", "ICMP"],
    correct: 2,
    practice: "Bir web isteğinin istemciden sunucuya giderken geçtiği katmanları sırala.",
  },
};
const labConfigs: Record<
  string,
  {
    file: string;
    title: string;
    lead: string;
    objective: string;
    example: string;
    starter: string;
    solution: string;
    hint: string;
    checks: { label: string; test: (code: string) => boolean }[];
    success: string;
  }
> = {
  "BLP 101": {
    file: "main.py",
    title: "Döngülerle veri filtreleme",
    lead: "Bir listedeki değerleri sırayla incele ve yalnızca çift sayıları ekrana yazdır.",
    objective: "Koşulu for döngüsünün içinde kur ve üç otomatik testi geçir.",
    example: "for sayi in sayilar:\n    print(sayi)",
    starter: "sayilar = [4, 7, 12, 19, 24]\n\nfor sayi in sayilar:\n    # çift sayı koşulunu yaz\n    pass",
    solution: "sayilar = [4, 7, 12, 19, 24]\n\nfor sayi in sayilar:\n    if sayi % 2 == 0:\n        print(sayi)",
    hint: "Mod alma operatörü % ile sayının 2'ye bölümünden kalanı kontrol et.",
    checks: [
      { label: "Döngü kuruldu", test: (value) => /for\s+sayi\s+in\s+sayilar/.test(value) },
      { label: "Çift sayı koşulu doğru", test: (value) => /sayi\s*%\s*2\s*==\s*0/.test(value) },
      { label: "Sonuç yazdırıldı", test: (value) => /print\s*\(\s*sayi\s*\)/.test(value) },
    ],
    success: "4\n12\n24",
  },
  "BLP 105": {
    file: "query.sql",
    title: "Satış verisini gruplama",
    lead: "Satışları kategoriye göre grupla, toplam ciroyu hesapla ve sonucu büyükten küçüğe sırala.",
    objective: "GROUP BY, SUM ve ORDER BY ifadelerini aynı sorguda doğru kullan.",
    example: "SELECT kategori, SUM(tutar) AS toplam\nFROM satislar\nGROUP BY kategori;",
    starter: "SELECT kategori\nFROM satislar\n-- gruplama ve toplam işlemini tamamla",
    solution: "SELECT kategori, SUM(tutar) AS toplam_ciro\nFROM satislar\nGROUP BY kategori\nORDER BY toplam_ciro DESC;",
    hint: "Önce SUM(tutar), ardından GROUP BY kategori ve son olarak ORDER BY kullan.",
    checks: [
      { label: "Toplam hesaplandı", test: (value) => /SUM\s*\(\s*tutar\s*\)/i.test(value) },
      { label: "Kategoriye göre gruplandı", test: (value) => /GROUP\s+BY\s+kategori/i.test(value) },
      { label: "Büyükten küçüğe sıralandı", test: (value) => /ORDER\s+BY[\s\S]*DESC/i.test(value) },
    ],
    success: "Yazılım | 48.500\nDonanım | 31.200\nAğ | 18.750",
  },
  "BLP 203": {
    file: "Kitap.cs",
    title: "Kitap sınıfı oluşturma",
    lead: "Ad ve yazar bilgilerini tutan, bilgileri ekrana yazdıran bir C# sınıfı geliştir.",
    objective: "Sınıf, özellik ve metot yapılarını birlikte kullan.",
    example: "class Kitap {\n    public string Ad { get; set; }\n}",
    starter: "class Kitap\n{\n    // Ad ve Yazar özelliklerini ekle\n    // BilgiYazdir metodunu oluştur\n}",
    solution: "class Kitap\n{\n    public string Ad { get; set; }\n    public string Yazar { get; set; }\n\n    public void BilgiYazdir()\n    {\n        Console.WriteLine($\"{Ad} - {Yazar}\");\n    }\n}",
    hint: "İki public string özellik ve geriye değer döndürmeyen public void metot kullan.",
    checks: [
      { label: "Kitap sınıfı tanımlandı", test: (value) => /class\s+Kitap/.test(value) },
      { label: "Ad ve Yazar özellikleri var", test: (value) => /string\s+Ad/.test(value) && /string\s+Yazar/.test(value) },
      { label: "BilgiYazdir metodu var", test: (value) => /void\s+BilgiYazdir\s*\(/.test(value) },
    ],
    success: "Simyacı - Paulo Coelho",
  },
  "BLP 108": {
    file: "style.css",
    title: "Duyarlı kart yerleşimi",
    lead: "Kartları masaüstünde üç, mobilde tek sütun gösterecek CSS Grid yapısını kur.",
    objective: "Grid sütunları, boşluk ve mobil medya sorgusunu tamamla.",
    example: ".kartlar {\n  display: grid;\n  gap: 16px;\n}",
    starter: ".kartlar {\n  /* grid yerleşimini tamamla */\n}\n\n/* 700px altında tek sütun */",
    solution: ".kartlar {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n@media (max-width: 700px) {\n  .kartlar { grid-template-columns: 1fr; }\n}",
    hint: "display: grid, repeat(3, 1fr) ve max-width medya sorgusunu birlikte kullan.",
    checks: [
      { label: "Grid etkinleştirildi", test: (value) => /display\s*:\s*grid/.test(value) },
      { label: "Üç sütun tanımlandı", test: (value) => /repeat\s*\(\s*3\s*,\s*1fr\s*\)/.test(value) },
      { label: "Mobil görünüm eklendi", test: (value) => /@media[\s\S]*max-width[\s\S]*grid-template-columns\s*:\s*1fr/.test(value) },
    ],
    success: "✓ Masaüstü: 3 sütun\n✓ Mobil: 1 sütun\n✓ Taşma yok",
  },
  "BLP 276": {
    file: "analysis.py",
    title: "Pandas ile not analizi",
    lead: "CSV verisini oku, eksik değerleri temizle ve ders ortalamalarını hesapla.",
    objective: "read_csv, fillna ve groupby işlemlerini doğru sırada uygula.",
    example: "df = pd.read_csv('notlar.csv')\nprint(df.head())",
    starter: "import pandas as pd\n\ndf = pd.read_csv('notlar.csv')\n# eksik notları 0 ile doldur\n# ders bazında ortalamayı yazdır",
    solution: "import pandas as pd\n\ndf = pd.read_csv('notlar.csv')\ndf['not'] = df['not'].fillna(0)\nortalama = df.groupby('ders')['not'].mean()\nprint(ortalama)",
    hint: "not sütununda fillna(0), ardından groupby('ders') ve mean() kullan.",
    checks: [
      { label: "CSV okundu", test: (value) => /pd\.read_csv\s*\(/.test(value) },
      { label: "Eksik değerler temizlendi", test: (value) => /fillna\s*\(\s*0\s*\)/.test(value) },
      { label: "Ders ortalaması hesaplandı", test: (value) => /groupby\s*\(\s*['\"]ders['\"]\s*\)[\s\S]*mean\s*\(/.test(value) },
    ],
    success: "Algoritma 78.4\nVeritabanı 82.1\nWeb Tasarım 74.8",
  },
  "BLT 103": {
    file: "network-flow.txt",
    title: "Web isteğinin ağ yolculuğu",
    lead: "Bir HTTPS isteğinin istemciden sunucuya giderken kullandığı protokolleri doğru sırala.",
    objective: "DNS, TCP, TLS, IP ve HTTPS rollerini doğru akışta göster.",
    example: "İstemci → DNS → TCP → TLS → HTTPS → Sunucu",
    starter: "İstemci → [DNS] → [???] → [TLS] → [???] → Sunucu",
    solution: "İstemci → DNS → TCP → TLS → HTTPS → Sunucu\nTaşıma: TCP\nAğ: IP\nUygulama: HTTPS (443)",
    hint: "DNS alan adını çözer; TCP bağlantıyı kurar; TLS şifreler; HTTPS isteği taşır.",
    checks: [
      { label: "TCP bağlantısı gösterildi", test: (value) => /TCP/i.test(value) },
      { label: "HTTPS katmanı gösterildi", test: (value) => /HTTPS/i.test(value) },
      { label: "IP ağ katmanı belirtildi", test: (value) => /\bIP\b/i.test(value) },
    ],
    success: "DNS ✓\nTCP bağlantısı ✓\nTLS güvenliği ✓\nHTTPS/443 ✓\nIP yönlendirme ✓",
  },
};
function Mark() {
  return (
    <span className="mark">
      <b>DOU</b> CodeLab
    </span>
  );
}
export default function App() {
  const [role, setRole] = useState<Role>("student"),
    [logged, setLogged] = useState(false),
    [view, setView] = useState<View>("home"),
    [query, setQuery] = useState("");
  const [email, setEmail] = useState(""),
    [pass, setPass] = useState(""),
    [error, setError] = useState(""),
    [toast, setToast] = useState(""),
    [selected, setSelected] = useState(courses[0]);
  const [code, setCode] = useState(
      labConfigs["BLP 101"].starter,
    ),
    [output, setOutput] = useState("Hazır · Kodunu çalıştırabilirsin.");
  const [title, setTitle] = useState(""),
    [summary, setSummary] = useState(""),
    [studioTab, setStudioTab] = useState("İçerik");
  useEffect(() => {
    const savedCode = window.localStorage.getItem("dou-codelab:code");
    const savedTitle = window.localStorage.getItem("dou-codelab:studio-title");
    const savedSummary = window.localStorage.getItem("dou-codelab:studio-summary");
    if (savedCode) setCode(savedCode);
    if (savedTitle) setTitle(savedTitle);
    if (savedSummary) setSummary(savedSummary);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("dou-codelab:code", code);
  }, [code]);
  useEffect(() => {
    window.localStorage.setItem("dou-codelab:studio-title", title);
    window.localStorage.setItem("dou-codelab:studio-summary", summary);
  }, [title, summary]);
  const filtered = useMemo(
    () =>
      courses.filter((c) =>
        (c.name + c.code + c.topic)
          .toLocaleLowerCase("tr")
          .includes(query.toLocaleLowerCase("tr")),
      ),
    [query],
  );
  function note(s: string) {
    setToast(s);
    setTimeout(() => setToast(""), 2400);
  }
  function login(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !pass) return setError("E-posta ve şifreni gir.");
    if (!email.toLocaleLowerCase("tr").endsWith("@dogus.edu.tr"))
      return setError("Yalnızca @dogus.edu.tr kurumsal hesabı kullanılabilir.");
    if (pass.length < 8)
      return setError("Şifre en az 8 karakter olmalıdır.");
    setLogged(true);
    setError("");
    setView(role === "teacher" ? "studio" : "home");
  }
  function open(c = selected) {
    setSelected(c);
    const saved = window.localStorage.getItem(`dou-codelab:lab:${c.code}`);
    setCode(saved ?? labConfigs[c.code]?.starter ?? labConfigs["BLP 101"].starter);
    setOutput("Hazır · Kodunu çalıştırabilirsin.");
    setView("lesson");
  }
  function run() {
    const config = labConfigs[selected.code] ?? labConfigs["BLP 101"];
    const results = config.checks.map((check) => ({
      label: check.label,
      passed: check.test(code),
    }));
    const passed = results.filter((result) => result.passed).length;
    const report = results
      .map((result) => `${result.passed ? "✓" : "✕"} ${result.label}`)
      .join("\n");
    if (passed === results.length) {
      setOutput(
        `${config.success}\n\n${report}\n\n✓ ${passed}/${results.length} test geçti · +80 XP`,
      );
      window.localStorage.setItem(`dou-codelab:lab:${selected.code}`, code);
      note("Görev tamamlandı. 80 XP kazandın!");
      return;
    }
    setOutput(
      `${report}\n\n✕ ${passed}/${results.length} test geçti\nİpucu: ${config.hint}`,
    );
  }
  if (!logged)
    return (
      <main className="login">
        <section className="loginHero">
          <Mark />
          <div>
            <small>MYO · DİJİTAL ÖĞRENME ORTAMI</small>
            <h1>
              Ders, pratik ve gelişim
              <br />
              <em>tek bir yerde.</em>
            </h1>
            <p>
              Doğuş Üniversitesi öğrencileri için derslerle eşleşen interaktif
              yazılım patikaları.
            </p>
            <div className="benefits">
              <span>
                <b>01</b>Konuyu öğren<small>Kısa ve sade anlatım</small>
              </span>
              <span>
                <b>02</b>Tarayıcıda uygula<small>Kurulum gerektirmez</small>
              </span>
              <span>
                <b>03</b>Gelişimini izle<small>XP, derece ve portfolyo</small>
              </span>
            </div>
          </div>
        </section>
        <section className="loginPanel">
          <form onSubmit={login}>
            <Mark />
            <small>HESABINA GİRİŞ YAP</small>
            <h2>Tekrar hoş geldin</h2>
            <p>Kurumsal hesabınla öğrenmeye kaldığın yerden devam et.</p>
            <div className="roles">
              <button
                type="button"
                className={role === "student" ? "on" : ""}
                onClick={() => setRole("student")}
              >
                Ö{" "}
                <span>
                  <b>Öğrenci</b>
                  <small>Dersler ve görevler</small>
                </span>
              </button>
              <button
                type="button"
                className={role === "teacher" ? "on" : ""}
                onClick={() => setRole("teacher")}
              >
                ÖE{" "}
                <span>
                  <b>Öğretim Elemanı</b>
                  <small>İçerik ve atamalar</small>
                </span>
              </button>
            </div>
            <label>
              Kurumsal e-posta
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ad.soyad@dogus.edu.tr"
              />
            </label>
            <label>
              <span>
                Şifre
                <button
                  type="button"
                  onClick={() =>
                    note("Şifre yenileme bağlantısı gönderilecek.")
                  }
                >
                  Şifremi unuttum
                </button>
              </span>
              <input
                value={pass}
                type="password"
                onChange={(e) => setPass(e.target.value)}
                placeholder="Şifren"
              />
            </label>
            {error && <div className="error">{error}</div>}
            <button className="red">
              {role === "student" ? "Öğrenci paneline" : "İçerik stüdyosuna"}{" "}
              gir →
            </button>
            <button
              type="button"
              className="demo"
              onClick={() => {
                setEmail(
                  role === "student"
                    ? "ogrenci@dogus.edu.tr"
                    : "ogretim@dogus.edu.tr",
                );
                setPass("Demo2026!");
                note("Demo bilgileri hazır.");
              }}
            >
              Demo bilgilerini doldur
            </button>
            <footer>🔒 Güvenli kurumsal erişim</footer>
          </form>
        </section>
        {toast && <Toast text={toast} />}
      </main>
    );
  const studentNav: [[View, string, string]] | any = [
    ["home", "⌂", "Ana sayfa"],
    ["paths", "⌘", "Dersler & patikalar"],
    ["assessment", "◫", "Seviye tespiti"],
    ["learningplan", "◌", "Akıllı planım"],
    ["tasks", "▣", "Görevlerim"],
    ["projects", "◆", "Projelerim"],
    ["projectworkspace", "⌥", "Proje teslim alanı"],
    ["calendar", "□", "Takvim"],
    ["lab", "</>", "Kod laboratuvarı"],
    ["mentor", "✦", "AI Kod Koçu"],
    ["passport", "◈", "Skill Passport"],
    ["arena", "⚑", "CodeLab Arena"],
    ["achievements", "♛", "Rozet & ünvanlar"],
    ["career", "◎", "Kariyer eşleşmesi"],
    ["mentoring", "♧", "Mentorluk"],
    ["notifications", "◉", "Bildirim merkezi"],
    ["settings", "⚙", "Ayarlar"],
    ["helpcenter", "?", "Yardım merkezi"],
    ["governance", "◒", "Gizlilik & erişim"],
    ["news", "◉", "Duyurular"],
  ];
  const teacherNav: any = [
    ["studio", "＋", "İçerik stüdyosu"],
    ["questionbank", "▤", "Soru & uygulama bankası"],
    ["analytics", "▥", "Analitik merkez"],
    ["curriculum", "⌗", "ÖÇ–PÇ haritası"],
    ["classroom", "♙", "Sınıf yönetimi"],
    ["tasks", "▣", "Görev yönetimi"],
    ["projects", "◆", "Proje inceleme"],
    ["reviews", "◇", "Kod inceleme"],
    ["reports", "▦", "Rapor merkezi"],
    ["systemready", "⌁", "Sistem hazırlığı"],
    ["governance", "◒", "Gizlilik & erişim"],
    ["paths", "⌘", "Ders patikaları"],
    ["calendar", "□", "Ders takvimi"],
    ["progress", "↗", "Yayınlananlar"],
    ["news", "◉", "Duyurular"],
  ];
  const navGroups =
    role === "student"
      ? [
          ["ÖĞREN", studentNav.slice(0, 4)],
          ["UYGULA", studentNav.slice(4, 10)],
          ["GELİŞİM & KARİYER", studentNav.slice(10)],
        ]
      : [
          ["ÜRET & YÖNET", teacherNav.slice(0, 5)],
          ["DEĞERLENDİR", teacherNav.slice(5, 10)],
          ["DERS AKIŞI", teacherNav.slice(10)],
        ];
  return (
    <main className="shell">
      <header className="top">
        <button
          className="brand"
          onClick={() => setView(role === "student" ? "home" : "studio")}
        >
          <Mark />
        </button>
        <label className="search">
          ⌕
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setView("paths")}
            placeholder="Ders, konu veya görev ara..."
          />
        </label>
        <button className="bell" onClick={() => setView("news")}>
          ◉<i>3</i>
        </button>
        <div className="profile">
          <i>{role === "student" ? "AY" : "İD"}</i>
          <span>
            <b>{role === "student" ? "Ayşe Yılmaz" : "İlker Duran"}</b>
            <small>
              {role === "student"
                ? "Bilgisayar Programcılığı"
                : "Öğretim Elemanı"}
            </small>
          </span>
          <button onClick={() => setLogged(false)}>↪</button>
        </div>
      </header>
      <aside className="side">
        <nav>
          {navGroups.map((group: any) => (
            <section className="navGroup" key={group[0]}>
              <small>{group[0]}</small>
              {group[1].map((n: any) => (
                <button
                  key={n[0]}
                  className={view === n[0] ? "on" : ""}
                  onClick={() => setView(n[0])}
                >
                  <i>{n[1]}</i>
                  <span>{n[2]}</span>
                  {n[0] === "news" && <em>3</em>}
                </button>
              ))}
            </section>
          ))}
        </nav>
        <article>
          <small>
            {role === "student" ? "HAFTALIK HEDEF" : "YAYIN DURUMU"}
          </small>
          <b>{role === "student" ? "4 / 5" : "12 aktif"}</b>
          <div>
            <i />
          </div>
          <span>
            {role === "student" ? "1 görev kaldı" : "4 içerik taslakta"}
          </span>
        </article>
        <button
          className="help"
          onClick={() => setView("helpcenter")}
        >
          ? <span>Yardım ve destek</span>
        </button>
      </aside>
      <div className="content">
        {view === "home" && <Home open={open} go={setView} />}{" "}
        {view === "paths" && (
          <Paths
            data={filtered}
            query={query}
            clear={() => setQuery("")}
            open={open}
          />
        )}{" "}
        {view === "lesson" && (
          <LessonPlayer
            key={selected.code}
            course={selected}
            go={setView}
            note={note}
          />
        )}{" "}
        {view === "tasks" && (
          <Tasks role={role} note={note} open={() => open(courses[0])} />
        )}{" "}
        {view === "calendar" && <Calendar note={note} />}{" "}
        {view === "lab" && (
          <Lab
            course={selected}
            code={code}
            setCode={setCode}
            output={output}
            run={run}
            note={note}
            go={setView}
          />
        )}{" "}
        {view === "progress" && (
          <Progress
            role={role}
            edit={(x: string) => {
              setTitle(x);
              setView("studio");
            }}
          />
        )}{" "}
        {view === "assessment" && <Assessment go={setView} note={note} />}{" "}
        {view === "projects" && <Projects role={role} note={note} />}{" "}
        {view === "mentor" && <Mentor code={code} note={note} />}{" "}
        {view === "analytics" && <Analytics note={note} />}{" "}
        {view === "passport" && <SkillPassport note={note} go={setView} />}{" "}
        {view === "curriculum" && <CurriculumMap note={note} />}{" "}
        {view === "arena" && <Arena note={note} go={setView} />}{" "}
        {view === "reviews" && <ReviewQueue note={note} />}{" "}
        {view === "career" && <CareerMatch note={note} go={setView} />}{" "}
        {view === "questionbank" && <QuestionBank note={note} />}{" "}
        {view === "learningplan" && <LearningPlan note={note} go={setView} />}{" "}
        {view === "mentoring" && <Mentoring note={note} />}{" "}
        {view === "notifications" && (
          <NotificationCenter note={note} go={setView} />
        )}{" "}
        {view === "classroom" && <Classroom note={note} />}{" "}
        {view === "reports" && <ReportCenter note={note} />}{" "}
        {view === "projectworkspace" && (
          <ProjectWorkspace note={note} go={setView} />
        )}{" "}
        {view === "achievements" && <Achievements note={note} />}{" "}
        {view === "settings" && <Settings note={note} />}{" "}
        {view === "helpcenter" && <HelpCenter note={note} />}{" "}
        {view === "governance" && <Governance note={note} />}{" "}
        {view === "systemready" && <SystemReady note={note} />}{" "}
        {view === "news" && <News note={note} />}{" "}
        {view === "studio" && (
          <Studio
            title={title}
            setTitle={setTitle}
            summary={summary}
            setSummary={setSummary}
            tab={studioTab}
            setTab={setStudioTab}
            note={note}
          />
        )}
      </div>
      {toast && <Toast text={toast} />}
    </main>
  );
}
function Home({ open, go }: { open: (c: any) => void; go: (v: View) => void }) {
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>2026 BAHAR · 3. HAFTA</small>
          <h1>Günaydın, Ayşe.</h1>
          <p>Bugünkü planın hazır. Yaklaşık 32 dakikada tamamlayabilirsin.</p>
        </div>
        <aside>
          🔥
          <span>
            <b>7 gün</b>
            <small>çalışma serisi</small>
          </span>
        </aside>
      </div>
      <div className="quickLaunch" aria-label="Hızlı erişim">
        <button onClick={() => open(courses[0])}>
          <i>&lt;/&gt;</i>
          <span>
            <b>Kod yaz</b>
            <small>Laboratuvarı aç</small>
          </span>
          <em>→</em>
        </button>
        <button onClick={() => go("mentor")}>
          <i>✦</i>
          <span>
            <b>Koça sor</b>
            <small>Kodunda destek al</small>
          </span>
          <em>→</em>
        </button>
        <button onClick={() => go("arena")}>
          <i>⚑</i>
          <span>
            <b>Arena</b>
            <small>Boss challenge</small>
          </span>
          <em>→</em>
        </button>
        <button onClick={() => go("passport")}>
          <i>◈</i>
          <span>
            <b>Skill Passport</b>
            <small>%78 role hazır</small>
          </span>
          <em>→</em>
        </button>
      </div>
      <div className="homeGrid">
        <article className="continue">
          <div>
            <small>ŞİMDİ DEVAM ET · BLP 101</small>
            <h2>Döngüler ve koşullu tekrar</h2>
            <p>
              Çift sayıları filtreleyen algoritmayı tamamla ve testleri
              çalıştır.
            </p>
            <div className="bar">
              <i style={{ width: "46%" }} />
            </div>
            <footer>
              <span>%46 tamamlandı</span>
              <button onClick={() => open(courses[0])}>Derse devam et →</button>
            </footer>
          </div>
          <pre>
            <b>for</b> sayi <i>in</i> sayilar:{"\n"} if sayi % 2 == 0:{"\n"}{" "}
            print(sayi)
          </pre>
        </article>
        <aside className="today">
          <small>BUGÜNÜN PLANI</small>
          <h2>3 odak görevi</h2>
          {[
            ["✓", "Kısa tekrar", "4 dk"],
            ["2", "Döngü uygulaması", "16 dk"],
            ["3", "Hata avı", "12 dk"],
          ].map((x) => (
            <button key={x[1]} onClick={() => x[0] !== "✓" && open(courses[0])}>
              <i>{x[0]}</i>
              <span>
                <b>{x[1]}</b>
                <small>{x[2]}</small>
              </span>
              <em>→</em>
            </button>
          ))}
        </aside>
      </div>
      <div className="metrics">
        {[
          ["✓", "TAMAMLANAN", "24 ders", "+5 bu hafta"],
          ["⚡", "TOPLAM XP", "1.960", "Problem Çözücü"],
          ["◎", "DOĞRULUK", "%84", "Son 30 görev"],
          ["♛", "MYO SIRASI", "#5", "2 sıra yükseldin"],
        ].map((x) => (
          <article key={x[1]}>
            <i>{x[0]}</i>
            <span>
              <small>{x[1]}</small>
              <b>{x[2]}</b>
              <em>{x[3]}</em>
            </span>
          </article>
        ))}
      </div>
      <div className="dashGrid">
        <section className="panel">
          <header>
            <div>
              <small>YAKLAŞAN GÖREVLER</small>
              <h2>Bu hafta teslim edilecekler</h2>
            </div>
            <button onClick={() => go("tasks")}>Tümünü gör →</button>
          </header>
          {assignments.slice(0, 3).map((a) => (
            <button
              className="taskRow"
              key={a.title}
              onClick={() => go("tasks")}
            >
              <time>{a.due.split(",")[0]}</time>
              <i className={a.hot ? "hot" : ""} />
              <span>
                <b>{a.title}</b>
                <small>
                  {a.course} · {a.xp} XP
                </small>
              </span>
              <em>{a.status}</em>
              <strong>→</strong>
            </button>
          ))}
        </section>
        <aside className="panel agenda">
          <header>
            <div>
              <small>BUGÜN</small>
              <h2>Ders akışı</h2>
            </div>
            <button onClick={() => go("calendar")}>Takvim →</button>
          </header>
          {[
            ["10:00", "BLP 101", "Döngüler"],
            ["13:30", "BLP 105", "SQL Gruplama"],
            ["16:00", "CodeLab", "Serbest pratik"],
          ].map((x) => (
            <article key={x[0]}>
              <time>{x[0]}</time>
              <span>
                <b>{x[1]}</b>
                <small>{x[2]}</small>
              </span>
            </article>
          ))}
        </aside>
      </div>
      <div className="sectionHead">
        <div>
          <small>AKTİF DERSLER</small>
          <h2>Dönem patikaların</h2>
        </div>
        <button onClick={() => go("paths")}>Tüm dersleri gör →</button>
      </div>
      <div className="courseGrid">
        {courses.slice(0, 4).map((c) => (
          <Course key={c.code} c={c} open={() => open(c)} />
        ))}
      </div>
    </section>
  );
}
function Paths({ data, query, clear, open }: any) {
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>MYO DERSLERİYLE EŞLEŞTİRİLDİ</small>
          <h1>Dersler ve yazılım patikaları</h1>
          <p>
            Konuyu öğren, örneği incele, tarayıcıda uygula ve projeyle tamamla.
          </p>
        </div>
        <strong>
          {data.length}
          <small>aktif ders</small>
        </strong>
      </div>
      {query && (
        <div className="result">
          “{query}” için {data.length} sonuç
          <button onClick={clear}>Temizle</button>
        </div>
      )}
      <div className="courseGrid">
        {data.map((c: any) => (
          <Course key={c.code} c={c} open={() => open(c)} />
        ))}
      </div>
    </section>
  );
}
function Course({ c, open }: any) {
  return (
    <article className="course">
      <i style={{ background: c.color }}>{c.tag}</i>
      <small>{c.code}</small>
      <h3>{c.name}</h3>
      <p>
        Sıradaki konu: <b>{c.topic}</b>
      </p>
      <span>
        {c.lessons} ders<em>%{c.progress}</em>
      </span>
      <div className="bar">
        <i style={{ width: `${c.progress}%`, background: c.color }} />
      </div>
      <button onClick={open}>
        {c.progress ? "Devam et" : "Patikaya başla"} →
      </button>
    </article>
  );
}
function LessonPlayer({ course, go, note }: any) {
  const track = lessonTracks[course.code] ?? topics.slice(0, 5);
  const content = lessonContent[course.code] ?? lessonContent["BLP 101"];
  const [topicIndex, setTopicIndex] = useState(() =>
    Math.max(0, track.findIndex((item) => item === course.topic)),
  );
  const [phase, setPhase] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const phases = ["Anlatım", "Örnek", "Mini kontrol", "Uygulama", "Tamamlandı"];

  useEffect(() => {
    const raw = window.localStorage.getItem(`dou-codelab:lessons:${course.code}`);
    if (raw) {
      try {
        setCompleted(JSON.parse(raw));
      } catch {
        setCompleted([]);
      }
    }
  }, [course.code]);

  function chooseTopic(index: number) {
    if (index !== topicIndex) {
      note("Bu konu, mevcut dersi tamamladıktan sonra açılacak.");
      return;
    }
    setTopicIndex(index);
    setPhase(completed.includes(index) ? 4 : 0);
    setAnswer(null);
  }
  function finishTopic() {
    const next = Array.from(new Set([...completed, topicIndex]));
    setCompleted(next);
    window.localStorage.setItem(
      `dou-codelab:lessons:${course.code}`,
      JSON.stringify(next),
    );
    setPhase(4);
    note(`${track[topicIndex]} tamamlandı · +40 XP`);
  }
  function nextTopic() {
    go("paths");
    note("İlerlemen kaydedildi. Sıradaki konu patikanda açıldı.");
  }

  return (
    <section className="lessonPlayer">
      <header className="lessonTopbar">
        <button onClick={() => go("paths")}>← Dersler</button>
        <div>
          <small>{course.code}</small>
          <b>{course.name}</b>
        </div>
        <span>
          {completed.length} / {track.length} konu
        </span>
      </header>
      <aside className="lessonOutline">
        <small>DERS İÇERİĞİ</small>
        <h2>{course.name}</h2>
        <div className="lessonOverall">
          <span>
            <b>%{Math.round((completed.length / track.length) * 100)}</b>
            tamamlandı
          </span>
          <i>
            <em
              style={{ width: `${(completed.length / track.length) * 100}%` }}
            />
          </i>
        </div>
        <nav>
          {track.map((item, index) => (
            <button
              key={item}
              className={`${topicIndex === index ? "on" : ""} ${completed.includes(index) ? "done" : ""} ${topicIndex !== index ? "locked" : ""}`}
              onClick={() => chooseTopic(index)}
            >
              <i>{completed.includes(index) ? "✓" : index + 1}</i>
              <span>
                <b>{item}</b>
                <small>
                  {completed.includes(index)
                    ? "Tamamlandı"
                    : index === topicIndex
                      ? "Devam ediyor"
                      : "Sırayla açılır"}
                </small>
              </span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="lessonStage">
        <div className="phaseRail">
          {phases.map((item, index) => (
            <span
              key={item}
              className={index === phase ? "on" : index < phase ? "done" : ""}
            >
              <i>{index < phase ? "✓" : index + 1}</i>
              {item}
            </span>
          ))}
        </div>
        <article className="lessonCanvas">
          <div className="lessonMeta">
            <span>{track[topicIndex]}</span>
            <small>Yaklaşık 10 dakika · 40 XP</small>
          </div>
          {phase === 0 && (
            <>
              <small className="eyebrow">01 · KONUYU ANLA</small>
              <h1>{track[topicIndex]}</h1>
              <p className="lessonLead">{content.intro}</p>
              <div className="objectiveBox">
                <i>◎</i>
                <span>
                  <b>Bu bölümün sonunda</b>
                  <p>{content.objective}</p>
                </span>
              </div>
              <div className="conceptCards">
                <article>
                  <b>Neden önemli?</b>
                  <p>Gerçek projelerde tekrar eden işi azaltır ve çözümü okunabilir hale getirir.</p>
                </article>
                <article>
                  <b>Sık yapılan hata</b>
                  <p>Sözdizimini ezberleyip problemin giriş–işlem–çıktı akışını kurmadan başlamak.</p>
                </article>
              </div>
              <button className="lessonNext" onClick={() => setPhase(1)}>
                Örneği incele →
              </button>
            </>
          )}
          {phase === 1 && (
            <>
              <small className="eyebrow">02 · ÇALIŞAN ÖRNEK</small>
              <h1>Adım adım görelim</h1>
              <p className="lessonLead">
                Kodu veya yapılandırmayı satır satır incele; önemli bölüm renkli
                açıklamalarla ayrıldı.
              </p>
              <div className="guidedCode">
                <header>
                  <span>örnek</span>
                  <button onClick={() => note("Örnek panoya kopyalandı.")}>
                    Kopyala
                  </button>
                </header>
                <pre>{content.example}</pre>
              </div>
              <ol className="codeSteps">
                <li><i>1</i><span><b>Girdiyi tanı</b><small>İşlenecek veri veya isteği belirle.</small></span></li>
                <li><i>2</i><span><b>Kuralı uygula</b><small>Problemi küçük ve sıralı adımlara böl.</small></span></li>
                <li><i>3</i><span><b>Çıktıyı doğrula</b><small>Beklenen sonuçla gerçek sonucu karşılaştır.</small></span></li>
              </ol>
              <div className="lessonActions">
                <button onClick={() => setPhase(0)}>← Geri</button>
                <button className="lessonNext" onClick={() => setPhase(2)}>
                  Kendini kontrol et →
                </button>
              </div>
            </>
          )}
          {phase === 2 && (
            <>
              <small className="eyebrow">03 · MİNİ KONTROL</small>
              <h1>Bir dakikada kontrol et</h1>
              <p className="lessonLead">{content.question}</p>
              <div className="knowledgeOptions">
                {content.options.map((item, index) => (
                  <button
                    key={item}
                    className={
                      answer === index
                        ? index === content.correct
                          ? "correct"
                          : "wrong"
                        : ""
                    }
                    onClick={() => setAnswer(index)}
                  >
                    <i>{String.fromCharCode(65 + index)}</i>
                    <span>{item}</span>
                    {answer === index && <em>{index === content.correct ? "✓" : "×"}</em>}
                  </button>
                ))}
              </div>
              {answer !== null && (
                <div className={answer === content.correct ? "quizNote ok" : "quizNote"}>
                  <b>{answer === content.correct ? "Doğru cevap" : "Bir kez daha düşün"}</b>
                  <span>
                    {answer === content.correct
                      ? "Kavramı doğru yorumladın. Şimdi kısa uygulamaya geçebilirsin."
                      : "Örnekte kullanılan ana işlemi tekrar incele ve yeniden seç."}
                  </span>
                </div>
              )}
              <div className="lessonActions">
                <button onClick={() => setPhase(1)}>← Örneğe dön</button>
                <button
                  className="lessonNext"
                  disabled={answer !== content.correct}
                  onClick={() => setPhase(3)}
                >
                  Uygulamaya geç →
                </button>
              </div>
            </>
          )}
          {phase === 3 && (
            <>
              <small className="eyebrow">04 · UYGULAYARAK ÖĞREN</small>
              <h1>Sıra sende</h1>
              <p className="lessonLead">{content.practice}</p>
              <div className="practiceBrief">
                <div>
                  <span><i>1</i> Görevi analiz et</span>
                  <span><i>2</i> Çözümü tasarla</span>
                  <span><i>3</i> Testlerle doğrula</span>
                </div>
                <aside>
                  <small>BAŞARI ÖLÇÜTÜ</small>
                  <b>En az 3/3 test</b>
                  <p>Çıktı · doğru kural · okunabilir çözüm</p>
                </aside>
              </div>
              <div className="lessonActions">
                <button onClick={() => setPhase(2)}>← Kontrole dön</button>
                <button className="lessonNext" onClick={finishTopic}>
                  Uygulamayı tamamla →
                </button>
              </div>
            </>
          )}
          {phase === 4 && (
            <div className="lessonComplete">
              <i>✓</i>
              <small>KONU TAMAMLANDI</small>
              <h1>Harika ilerliyorsun!</h1>
              <p>
                {track[topicIndex]} için anlatım, örnek, kontrol ve uygulama
                adımlarını tamamladın.
              </p>
              <div>
                <span><b>+40</b><small>XP</small></span>
                <span><b>1</b><small>Tamamlanan konu</small></span>
                <span><b>✓</b><small>Skill Passport kanıtı</small></span>
              </div>
              <section>
                <button onClick={() => go("lab")}>Kod laboratuvarını aç</button>
                <button className="lessonNext" onClick={nextTopic}>
                  Patikaya dön →
                </button>
              </section>
            </div>
          )}
        </article>
      </main>
    </section>
  );
}
function Tasks({ role, note, open }: any) {
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>
            {role === "student" ? "ÇALIŞMA ALANI" : "ÖĞRETİM ELEMANI"}
          </small>
          <h1>{role === "student" ? "Görevlerim" : "Görev yönetimi"}</h1>
          <p>
            {role === "student"
              ? "Teslim tarihlerini, ilerlemeni ve kazanacağın XP’yi takip et."
              : "Görev oluştur, sınıfa ata ve teslim koşullarını yönet."}
          </p>
        </div>
        {role === "teacher" && (
          <button
            className="primary"
            onClick={() => note("Yeni görev formu açıldı.")}
          >
            ＋ Yeni görev
          </button>
        )}
      </div>
      <div className="filters">
        <button className="on">Tümü · 8</button>
        <button>Devam eden · 3</button>
        <button>Yaklaşan · 4</button>
        <button>Tamamlanan · 1</button>
      </div>
      <section className="taskTable">
        <header>
          <span>Görev</span>
          <span>Teslim</span>
          <span>Ödül</span>
          <span>Durum</span>
          <span />
        </header>
        {assignments.map((a) => (
          <article key={a.title}>
            <div>
              <small>{a.course}</small>
              <b>{a.title}</b>
            </div>
            <time className={a.hot ? "hotText" : ""}>{a.due}</time>
            <strong>{a.xp} XP</strong>
            <em className={a.status === "Tamamlandı" ? "done" : ""}>
              {a.status}
            </em>
            <button
              onClick={() =>
                role === "student"
                  ? open()
                  : note(`${a.title} düzenleme ekranı açıldı.`)
              }
            >
              {role === "student" ? "Aç →" : "Düzenle"}
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}
function Calendar({ note }: any) {
  const days = ["Pzt 17", "Sal 18", "Çar 19", "Per 20", "Cum 21"];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>HAFTALIK PLAN</small>
          <h1>Ders ve çalışma takvimi</h1>
          <p>Canlı dersler, teslim tarihleri ve kişisel pratik blokları.</p>
        </div>
        <button
          className="primary"
          onClick={() => note("Kişisel çalışma bloğu eklendi.")}
        >
          ＋ Çalışma ekle
        </button>
      </div>
      <div className="week">
        {days.map((d, i) => (
          <section key={d}>
            <header>
              <b>{d}</b>
              <small>{i === 0 ? "Bugün" : ""}</small>
            </header>
            {i === 0 && (
              <>
                <button onClick={() => note("BLP 101 ders detayı açıldı.")}>
                  <time>10:00</time>
                  <b>BLP 101</b>
                  <span>Döngüler</span>
                </button>
                <button
                  className="redEvent"
                  onClick={() => note("Görev detayı açıldı.")}
                >
                  <time>23:59</time>
                  <b>TESLİM</b>
                  <span>Çift sayı analizi</span>
                </button>
              </>
            )}
            {i === 1 && (
              <button>
                <time>13:30</time>
                <b>BLP 105</b>
                <span>SQL Gruplama</span>
              </button>
            )}
            {i === 2 && (
              <button className="redEvent">
                <time>23:59</time>
                <b>TESLİM</b>
                <span>Satış verisi</span>
              </button>
            )}
            {i === 3 && (
              <button>
                <time>11:00</time>
                <b>BLP 203</b>
                <span>Sınıflar</span>
              </button>
            )}
            {i === 4 && (
              <button>
                <time>16:00</time>
                <b>CODELAB</b>
                <span>Serbest pratik</span>
              </button>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
function Lab({ course, code, setCode, output, run, note, go }: any) {
  const config = labConfigs[course.code] ?? labConfigs["BLP 101"];
  const track = lessonTracks[course.code] ?? topics.slice(0, 5);
  const [showTests, setShowTests] = useState(true);
  function reset() {
    setCode(config.starter);
    window.localStorage.removeItem(`dou-codelab:lab:${course.code}`);
    note("Başlangıç kodu geri yüklendi.");
  }
  return (
    <section className="lab">
      <aside className="topics">
        <small>{course.code}</small>
        <h2>{course.name}</h2>
        {track.map((topic, index) => (
          <button
            key={topic}
            className={topic === course.topic ? "on" : index < 3 ? "done" : ""}
            onClick={() =>
              topic === course.topic
                ? note(`${topic} uygulamasındasın.`)
                : note("Bu uygulama ders akışından sırayla açılır.")
            }
          >
            <i>{index < 3 ? "✓" : index + 1}</i>
            {topic}
          </button>
        ))}
        <button className="backLesson" onClick={() => go("lesson")}>
          ← Konu anlatımına dön
        </button>
      </aside>
      <article className="lesson">
        <div className="crumb">{course.code} / Etkileşimli uygulama</div>
        <h1>{config.title}</h1>
        <p className="lead">{config.lead}</p>
        <aside>
          <b>Hedef</b> {config.objective}
        </aside>
        <h2>Örnek</h2>
        <pre>{config.example}</pre>
        <div className="editor">
          <header>
            <span>{config.file}</span>
            <div>
              <button onClick={() => note(config.hint)}>İpucu</button>
              <button onClick={reset}>Sıfırla</button>
              <button
                onClick={() => {
                  setCode(config.solution);
                  note("Örnek çözüm editöre yerleştirildi.");
                }}
              >
                Çözümü göster
              </button>
              <button className="runCode" onClick={run}>
                ▶ Çalıştır ve test et
              </button>
            </div>
          </header>
          <textarea
            value={code}
            onChange={(event: any) => {
              setCode(event.target.value);
              window.localStorage.setItem(
                `dou-codelab:lab:${course.code}`,
                event.target.value,
              );
            }}
            spellCheck={false}
            aria-label={`${course.name} kod editörü`}
          />
          <footer>
            <button onClick={() => setShowTests((value) => !value)}>
              {showTests ? "▾" : "▸"} TEST ÇIKTISI
            </button>
            {showTests && <pre>{output}</pre>}
          </footer>
        </div>
        <div className="labBottomActions">
          <span>Değişikliklerin bu cihazda otomatik kaydedilir.</span>
          <button onClick={run}>Testleri yeniden çalıştır →</button>
        </div>
      </article>
      <aside className="labInfo">
        <article>
          <small>DERS İLERLEMESİ</small>
          <b>%{course.progress}</b>
          <div>
            <i style={{ width: `${course.progress}%` }} />
          </div>
          <span>Yaklaşık 12 dakika</span>
        </article>
        <article>
          <small>KAZANIM</small>
          <p>
            Tüm testleri geçir: <b>80 XP</b>
          </p>
        </article>
        <article>
          <small>OTOMATİK TESTLER</small>
          {config.checks.map((check, index) => (
            <p key={check.label}>
              <i>{index + 1}</i> {check.label}
            </p>
          ))}
        </article>
        <article className="labSafety">
          <small>GÜVENLİ ÇALIŞMA</small>
          <p>Önizleme testleri tarayıcıda çalışır; sunucuda kod izole ortamda çalıştırılacaktır.</p>
        </article>
      </aside>
    </section>
  );
}

function Assessment({ go, note }: any) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const questions = [
    {
      area: "Algoritmik düşünme",
      question:
        "Bir listedeki en büyük değeri bulmak için en uygun ilk adım hangisidir?",
      options: [
        "Listeyi silmek",
        "İlk değeri geçici en büyük kabul etmek",
        "Her değeri iki kez yazmak",
      ],
      correct: 1,
    },
    {
      area: "Python",
      question:
        "Bir koşul yalnızca doğru olduğunda kod çalıştırmak için hangi yapı kullanılır?",
      options: ["if", "import", "class"],
      correct: 0,
    },
    {
      area: "SQL",
      question: "Tekrarlanan kayıtları gruplamak için hangi ifade kullanılır?",
      options: ["ORDER BY", "GROUP BY", "DROP TABLE"],
      correct: 1,
    },
  ];
  const finished = step >= questions.length;
  const score = answers.filter(
    (answer, index) => answer === questions[index].correct,
  ).length;
  function answer(index: number) {
    setAnswers([...answers, index]);
    setStep(step + 1);
  }
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>KİŞİSEL BAŞLANGIÇ NOKTASI</small>
          <h1>Seviye tespiti</h1>
          <p>
            10 dakikalık uygulamalı ölçümle güçlü yönlerini ve eksik konularını
            belirle.
          </p>
        </div>
        <strong>
          {finished ? "%73" : `${step + 1}/3`}
          <small>{finished ? "hazırbulunuşluk" : "örnek soru"}</small>
        </strong>
      </div>
      {!finished ? (
        <div className="assessmentShell">
          <section className="assessmentMain">
            <header>
              <span>{questions[step].area}</span>
              <em>
                Soru {step + 1} / {questions.length}
              </em>
            </header>
            <div className="assessmentProgress">
              <i
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
            <h2>{questions[step].question}</h2>
            <div className="answerGrid">
              {questions[step].options.map((option, index) => (
                <button key={option} onClick={() => answer(index)}>
                  <i>{String.fromCharCode(65 + index)}</i>
                  {option}
                  <span>→</span>
                </button>
              ))}
            </div>
          </section>
          <aside className="assessmentAside">
            <small>ÖLÇÜLEN BECERİLER</small>
            {["Algoritma", "Python", "SQL", "Web", "Hata ayıklama"].map(
              (skill, index) => (
                <span key={skill} className={index <= step ? "active" : ""}>
                  <i>{index < step ? "✓" : index + 1}</i>
                  {skill}
                </span>
              ),
            )}
          </aside>
        </div>
      ) : (
        <div className="assessmentResult">
          <div className="scoreRing">
            <b>{score}/3</b>
            <small>doğru</small>
          </div>
          <section>
            <small>KİŞİSEL ÖNERİ</small>
            <h2>Temel yapıların iyi, SQL pratiğini güçlendirelim.</h2>
            <p>
              Sonucuna göre BLP 105 patikasında “Filtreleme ve Gruplama” modülü
              önceliklendirildi.
            </p>
            <div className="skillChips">
              <span>Python · Yetkin</span>
              <span>Algoritma · Gelişiyor</span>
              <span>SQL · Odak alanı</span>
            </div>
            <button className="primary" onClick={() => go("paths")}>
              Önerilen rotayı aç →
            </button>
          </section>
        </div>
      )}
      <button
        className="ghostAction"
        onClick={() =>
          note("Sonuç raporu öğretim elemanınla paylaşılmak üzere hazırlandı.")
        }
      >
        Sonucu öğretim elemanımla paylaş
      </button>
    </section>
  );
}

function Projects({ role, note }: any) {
  const projects = [
    {
      title: "Akıllı Kampüs Görev Takibi",
      stack: "Python · SQLite",
      status: "Geliştiriliyor",
      progress: 68,
      review: "2 geri bildirim",
    },
    {
      title: "MYO Etkinlik Portalı",
      stack: "HTML · CSS · JavaScript",
      status: "İncelemede",
      progress: 92,
      review: "Öğretmen incelemesi",
    },
    {
      title: "Satış Analiz Panosu",
      stack: "SQL · Python",
      status: "Fikir",
      progress: 15,
      review: "Takım arkadaşı aranıyor",
    },
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>GERÇEK İŞ KANITI</small>
          <h1>
            {role === "student" ? "Proje stüdyosu" : "Proje inceleme merkezi"}
          </h1>
          <p>
            {role === "student"
              ? "Derslerde öğrendiklerini gerçek projeye dönüştür, portfolyona ekle."
              : "Öğrenci projelerine rubrik üzerinden geri bildirim ver ve gelişimi izle."}
          </p>
        </div>
        <button
          className="primary"
          onClick={() =>
            note(
              role === "student"
                ? "Yeni proje sihirbazı açıldı."
                : "İnceleme kuyruğu açıldı.",
            )
          }
        >
          {role === "student" ? "＋ Yeni proje" : "7 proje bekliyor"}
        </button>
      </div>
      <div className="projectStats">
        {[
          ["3", "Aktif proje"],
          ["14", "Doğrulanmış beceri"],
          ["5", "Akademik geri bildirim"],
          ["1", "Portfolyoda"],
        ].map((x) => (
          <article key={x[1]}>
            <b>{x[0]}</b>
            <span>{x[1]}</span>
          </article>
        ))}
      </div>
      <div className="projectGrid">
        {projects.map((project, index) => (
          <article key={project.title}>
            <header>
              <i>0{index + 1}</i>
              <span>{project.status}</span>
            </header>
            <h2>{project.title}</h2>
            <p>{project.stack}</p>
            <div className="projectProgress">
              <i style={{ width: `${project.progress}%` }} />
            </div>
            <small>%{project.progress} tamamlandı</small>
            <footer>
              <em>{project.review}</em>
              <button
                onClick={() => note(`${project.title} çalışma alanı açıldı.`)}
              >
                {role === "student" ? "Projeyi aç" : "İncele"} →
              </button>
            </footer>
          </article>
        ))}
      </div>
      <section className="portfolioBanner">
        <div>
          <small>DOĞRULANMIŞ PORTFOLYO</small>
          <h2>Not değil, ürettiğin iş konuşsun.</h2>
          <p>
            Testlerden geçen kod, öğretmen geri bildirimi ve beceri kanıtlarını
            tek bağlantıda sun.
          </p>
        </div>
        <button onClick={() => note("Portfolyo önizlemesi açıldı.")}>
          Portfolyomu önizle →
        </button>
      </section>
    </section>
  );
}

function Mentor({ code, note }: any) {
  const [messages, setMessages] = useState([
    {
      from: "coach",
      text: "Kodunu ve görev hedefini görüyorum. Nerede takıldın?",
    },
  ]);
  const [input, setInput] = useState("");
  function send(text = input) {
    if (!text.trim()) return;
    setMessages([
      ...messages,
      { from: "student", text },
      {
        from: "coach",
        text: "Döngün doğru yönde. Çiftliği kontrol etmek için `% 2 == 0` koşulunu `pass` satırının yerine eklemeyi dene. Çözümü doğrudan vermeden bir sonraki adımı birlikte bulabiliriz.",
      },
    ]);
    setInput("");
  }
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>BAĞLAMA DUYARLI REHBER</small>
          <h1>AI Kod Koçu</h1>
          <p>
            Ders hedefini ve mevcut kodunu anlayan, çözümü vermeden düşündüren
            kişisel yardımcı.
          </p>
        </div>
        <span className="mentorStatus">
          <i /> Kod bağlamı bağlı
        </span>
      </div>
      <div className="mentorLayout">
        <section className="mentorChat">
          <header>
            <div>
              <i>✦</i>
              <span>
                <b>CodeLab Koç</b>
                <small>BLP 101 · Döngüler görevini görüyor</small>
              </span>
            </div>
            <button onClick={() => note("Yeni koç görüşmesi başlatıldı.")}>
              Yeni görüşme
            </button>
          </header>
          <div className="messages">
            {messages.map((message, index) => (
              <article className={message.from} key={index}>
                <i>{message.from === "coach" ? "✦" : "AY"}</i>
                <p>{message.text}</p>
              </article>
            ))}
          </div>
          <div className="quickPrompts">
            {["Hatamı açıkla", "Bir ipucu ver", "Kodumu değerlendir"].map(
              (x) => (
                <button onClick={() => send(x)} key={x}>
                  {x}
                </button>
              ),
            )}
          </div>
          <footer>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Koça sor..."
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={() => send()}>Gönder →</button>
          </footer>
        </section>
        <aside className="contextPanel">
          <small>AKTİF BAĞLAM</small>
          <h3>Döngülerle veri filtreleme</h3>
          <p>Hedef: çift sayıları bul ve yazdır.</p>
          <pre>{code}</pre>
          <div>
            <b>Koç ilkeleri</b>
            <span>✓ Doğrudan çözümü vermez</span>
            <span>✓ Öğrencinin koduna göre yönlendirir</span>
            <span>✓ Hata örüntüsünü kaydeder</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Analytics({ note }: any) {
  const skills = [
    ["Döngüler", 82, 12],
    ["Koşullar", 76, 18],
    ["Fonksiyonlar", 58, 31],
    ["SQL Gruplama", 44, 39],
    ["Hata ayıklama", 69, 22],
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>ÖĞRETİM ELEMANI · VERİ ODAKLI İYİLEŞTİRME</small>
          <h1>Analitik merkez</h1>
          <p>
            Sınıfın hangi beceride, hangi soruda ve neden zorlandığını görünür
            kıl.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Haftalık öğrenme raporu oluşturuldu.")}
        >
          Rapor oluştur ↓
        </button>
      </div>
      <div className="analyticsMetrics">
        {[
          ["126", "Aktif öğrenci", "+8 bu hafta"],
          ["%74", "Tamamlama", "↑ %6"],
          ["18 dk", "Ortalama pratik", "+4 dk"],
          ["7", "Destek bekleyen", "Öncelikli"],
        ].map((x) => (
          <article key={x[1]}>
            <small>{x[1]}</small>
            <b>{x[0]}</b>
            <em>{x[2]}</em>
          </article>
        ))}
      </div>
      <div className="analyticsGrid">
        <section className="masteryPanel">
          <header>
            <div>
              <small>BECERİ USTALIĞI</small>
              <h2>Sınıfın güçlü ve açık alanları</h2>
            </div>
            <select>
              <option>BLP 101 · Algoritma</option>
              <option>BLP 105 · Veritabanı</option>
            </select>
          </header>
          {skills.map((x) => (
            <article key={String(x[0])}>
              <span>
                <b>{x[0]}</b>
                <small>{x[2]} öğrenci destek bekliyor</small>
              </span>
              <div>
                <i style={{ width: `${x[1]}%` }} />
              </div>
              <strong>%{x[1]}</strong>
            </article>
          ))}
        </section>
        <aside className="errorPanel">
          <small>TEKRAR EDEN HATALAR</small>
          <h2>Müdahale önerileri</h2>
          {[
            ["01", "Döngü koşulu yanlış yerde", "18 öğrenci"],
            ["02", "Fonksiyonda return eksik", "14 öğrenci"],
            ["03", "GROUP BY mantığı", "11 öğrenci"],
          ].map((x) => (
            <button
              key={x[0]}
              onClick={() =>
                note(`${x[1]} için hedefli mini ders taslağı açıldı.`)
              }
            >
              <i>{x[0]}</i>
              <span>
                <b>{x[1]}</b>
                <small>{x[2]}</small>
              </span>
              <em>Mini ders oluştur →</em>
            </button>
          ))}
        </aside>
      </div>
      <section className="studentWatch">
        <header>
          <div>
            <small>ERKEN UYARI</small>
            <h2>Desteğe ihtiyaç duyan öğrenciler</h2>
          </div>
          <button
            onClick={() => note("Öğrenci destek listesi dışa aktarıldı.")}
          >
            Listeyi dışa aktar ↓
          </button>
        </header>
        {[
          ["EA", "Emir Aksoy", "3 gündür aktif değil", "SQL · %28"],
          ["SD", "Selin Demir", "4 başarısız deneme", "Fonksiyonlar · %35"],
          ["MK", "Mert Kaya", "Görev gecikiyor", "Döngüler · %42"],
        ].map((x) => (
          <article key={x[1]}>
            <i>{x[0]}</i>
            <span>
              <b>{x[1]}</b>
              <small>{x[2]}</small>
            </span>
            <em>{x[3]}</em>
            <button
              onClick={() => note(`${x[1]} için destek notu oluşturuldu.`)}
            >
              Destek planla
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}
function Progress({ role, edit }: any) {
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>
            {role === "student" ? "BECERİ PROFİLİ" : "İÇERİK YÖNETİMİ"}
          </small>
          <h1>{role === "student" ? "Gelişimim" : "Yayınlanan içerikler"}</h1>
          <p>
            {role === "student"
              ? "Doğrulanmış görevlerden oluşan beceri ve ünvan görünümün."
              : "Öğrencilere açık dersleri ve kullanım sayılarını izle."}
          </p>
        </div>
      </div>
      {role === "student" ? (
        <div className="progressGrid">
          <article className="level">
            <small>MEVCUT ÜNVAN</small>
            <h2>Problem Çözücü</h2>
            <b>Seviye 12 · 1.960 XP</b>
            <div>
              <i />
            </div>
            <span>Uygulama Geliştirici ünvanına 1.040 XP</span>
            <footer>
              <em>24 ders</em>
              <em>18 uygulama</em>
              <em>3 proje</em>
            </footer>
          </article>
          <section className="skills">
            {[
              ["Algoritmik düşünme", 86],
              ["Python", 78],
              ["Web geliştirme", 64],
              ["SQL ve veri", 42],
              ["Hata ayıklama", 71],
            ].map((x) => (
              <article key={String(x[0])}>
                <span>
                  <b>{x[0]}</b>
                  <em>%{x[1]}</em>
                </span>
                <div>
                  <i style={{ width: `${x[1]}%` }} />
                </div>
              </article>
            ))}
          </section>
        </div>
      ) : (
        <section className="published">
          {[
            "Python Döngüleri",
            "HTML Formları",
            "SQL Gruplama",
            "CSS Grid",
            "Java Sınıflar",
          ].map((x, i) => (
            <article key={x}>
              <i>{i + 1}</i>
              <span>
                <b>{x}</b>
                <small>
                  {i + 3} etkinlik · {24 + i * 9} öğrenci
                </small>
              </span>
              <em>Yayında</em>
              <button onClick={() => edit(x)}>Düzenle</button>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
function News({ note }: any) {
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>AKADEMİK AKIŞ</small>
          <h1>Duyurular</h1>
          <p>Ders güncellemeleri, yeni görevler ve CodeLab haberleri.</p>
        </div>
        <button
          className="primary"
          onClick={() => note("Tüm duyurular okundu olarak işaretlendi.")}
        >
          Tümünü okundu işaretle
        </button>
      </div>
      <div className="news">
        {[
          [
            "YENİ GÖREV",
            "BLP 101 · Döngüler uygulaması yayınlandı",
            "Bugün 09:15",
          ],
          [
            "DERS GÜNCELLEMESİ",
            "SQL patikasına 3 yeni alıştırma eklendi",
            "Dün 16:40",
          ],
          [
            "CODELAB",
            "Haftalık sıralama ve XP puanları güncellendi",
            "15 Ağustos",
          ],
          ["HATIRLATMA", "Web Tasarım projesi için son 7 gün", "14 Ağustos"],
        ].map((x, i) => (
          <button key={x[1]} onClick={() => note(`${x[1]} detayı açıldı.`)}>
            <i className={i < 2 ? "unread" : ""} />
            <span>
              <small>{x[0]}</small>
              <b>{x[1]}</b>
              <em>{x[2]}</em>
            </span>
            <strong>→</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
function Studio({
  title,
  setTitle,
  summary,
  setSummary,
  tab,
  setTab,
  note,
}: any) {
  const [blocks, setBlocks] = useState(["Metin", "Bilgi kutusu", "Kod örneği"]);
  const addBlock = (block: string) => {
    setBlocks((current) => [...current, block]);
    note(`${block} bloğu derse eklendi.`);
  };
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>ÖĞRETİM ELEMANI · İÇERİK ÜRETİMİ</small>
          <h1>İçerik stüdyosu</h1>
          <p>Ders anlatımı, kod örneği, test ve görevi aynı modülde hazırla.</p>
        </div>
        <button
          className="primary"
          onClick={() => {
            setTitle("");
            setSummary("");
            note("Yeni boş içerik açıldı.");
          }}
        >
          ＋ Yeni içerik
        </button>
      </div>
      <div className="studioStats">
        {[
          ["12", "Yayında"],
          ["4", "Taslak"],
          ["326", "Tamamlama"],
          ["%82", "Başarı"],
        ].map((x) => (
          <article key={x[1]}>
            <b>{x[0]}</b>
            <span>{x[1]}</span>
          </article>
        ))}
      </div>
      <div className="studio">
        <aside className="tree">
          <header>
            <b>Ders yapısı</b>
            <button onClick={() => note("Yeni modül eklendi.")}>＋</button>
          </header>
          <select>
            <option>BLP 101 · Algoritma</option>
            <option>BLP 105 · Veritabanı</option>
          </select>
          {[
            "01 · Başlangıç",
            "02 · Karar yapıları",
            "03 · Döngüler",
            "04 · Fonksiyonlar",
          ].map((x, i) => (
            <section key={x}>
              <b>{x}</b>
              {i === 2 && (
                <>
                  <button className="on">Python for döngüsü</button>
                  <button>while döngüsü</button>
                  <button>Hata laboratuvarı</button>
                </>
              )}
            </section>
          ))}
        </aside>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            title ? note("İçerik kaydedildi.") : note("Önce başlık gir.");
          }}
        >
          <div className="studioContext">
            <label>
              Ders
              <select>
                <option>BLP 101 · Algoritma</option>
                <option>BLP 105 · Veritabanı</option>
              </select>
            </label>
            <label>
              Hafta
              <select>
                <option>3. Hafta · Döngüler</option>
                <option>4. Hafta · Fonksiyonlar</option>
              </select>
            </label>
            <label>
              Öğrenme çıktısı
              <select>
                <option>ÖÇ2 · Programlama yapılarını uygular</option>
                <option>ÖÇ4 · Test ve hata ayıklama yapar</option>
              </select>
            </label>
            <label>
              Zorluk
              <select>
                <option>Başlangıç</option>
                <option>Orta</option>
                <option>İleri</option>
              </select>
            </label>
          </div>
          <nav>
            {["İçerik", "Başlangıç kodu", "Testler", "Yayın"].map((x) => (
              <button
                type="button"
                className={tab === x ? "on" : ""}
                onClick={() => setTab(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </nav>
          {tab === "İçerik" && (
            <>
              <label>
                İçerik başlığı
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn. Python for döngüsü"
                />
              </label>
              <label>
                Kısa açıklama
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Öğrenme hedefini açıkla."
                />
              </label>
              <div className="blockBuilder">
                <header>
                  <div>
                    <small>BLOK TABANLI DERS</small>
                    <b>İçerik akışı</b>
                  </div>
                  <span>{blocks.length} blok</span>
                </header>
                <div className="blockToolbar">
                  {[
                    "Metin",
                    "Görsel",
                    "Video",
                    "Kod örneği",
                    "Bilgi kutusu",
                    "Mini soru",
                  ].map((block) => (
                    <button
                      type="button"
                      key={block}
                      onClick={() => addBlock(block)}
                    >
                      ＋ {block}
                    </button>
                  ))}
                </div>
                <div className="lessonBlocks">
                  {blocks.map((block, index) => (
                    <article key={`${block}-${index}`}>
                      <i>⋮⋮</i>
                      <span>
                        <small>
                          {String(index + 1).padStart(2, "0")} ·{" "}
                          {block.toUpperCase()}
                        </small>
                        <b>
                          {block === "Metin"
                            ? "Döngüler, tekrar eden işlemleri daha kısa ve okunabilir hale getirir."
                            : block === "Bilgi kutusu"
                              ? "İpucu: range() fonksiyonu başlangıç, bitiş ve adım değerleri alabilir."
                              : block === "Kod örneği"
                                ? "for sayi in range(1, 6): print(sayi)"
                                : `${block} içeriğini düzenlemek için tıkla.`}
                        </b>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          note(`${block} düzenleme paneli açıldı.`)
                        }
                      >
                        Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setBlocks(blocks.filter((_, i) => i !== index))
                        }
                      >
                        ×
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
          {tab === "Başlangıç kodu" && (
            <label>
              Öğrenciye verilecek kod
              <textarea
                className="code"
                defaultValue={
                  "sayilar = [4, 7, 12]\n\nfor sayi in sayilar:\n    pass"
                }
              />
            </label>
          )}
          {tab === "Testler" && (
            <div className="testList">
              {[
                "Çıktı doğru mu?",
                "Koşul kullanıldı mı?",
                "Kod çalışıyor mu?",
              ].map((x, i) => (
                <article key={x}>
                  <i>0{i + 1}</i>
                  <b>{x}</b>
                  <select>
                    <option>Zorunlu</option>
                    <option>Bonus</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => note("Test düzenleme açıldı.")}
                  >
                    Düzenle
                  </button>
                </article>
              ))}
              <button type="button" onClick={() => note("Yeni test eklendi.")}>
                ＋ Test ekle
              </button>
            </div>
          )}
          {tab === "Yayın" && (
            <div className="publishBox">
              <h2>Yayın ayarları</h2>
              <label>
                <input type="checkbox" defaultChecked /> BLP 101 öğrencilerine
                aç
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Tamamlanınca 80 XP ver
              </label>
              <label>
                Yayın tarihi
                <input type="date" defaultValue="2026-08-17" />
              </label>
            </div>
          )}
          <footer>
            <button type="button" onClick={() => note("Taslak kaydedildi.")}>
              Taslak kaydet
            </button>
            <button>Kaydet ve önizle →</button>
          </footer>
        </form>
        <aside className="preview">
          <small>ÖĞRENCİ ÖNİZLEMESİ</small>
          <article>
            <span>KONU ANLATIMI</span>
            <h2>{title || "İçerik başlığı"}</h2>
            <p>{summary || "Öğrenme hedefi burada görünecek."}</p>
            <pre>for sayi in sayilar:{"\n"} # kodunu yaz</pre>
            <button onClick={() => note("Önizleme çalışıyor.")}>
              Uygulamayı başlat
            </button>
          </article>
          <button
            onClick={() =>
              title ? note("İçerik yayınlandı.") : note("Önce başlık gir.")
            }
          >
            Yayınla
          </button>
        </aside>
      </div>
    </section>
  );
}
function ProjectWorkspace({ note, go }: any) {
  const [step, setStep] = useState(4);
  const steps = [
    "Problem",
    "Analiz",
    "Tasarım",
    "Geliştirme",
    "Test",
    "Teslim",
    "Doğrulama",
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>UÇTAN UCA PROJE TESLİMİ</small>
          <h1>Akıllı Kampüs API Projesi</h1>
          <p>
            Fikirden doğrulanmış portfolyo kanıtına kadar bütün aşamalar tek
            yerde.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Proje paylaşım bağlantısı kopyalandı.")}
        >
          Projeyi paylaş ↗
        </button>
      </div>
      <div className="projectStepper">
        {steps.map((x, i) => (
          <button
            className={i < step ? "done" : i === step ? "on" : ""}
            onClick={() => setStep(i)}
            key={x}
          >
            <i>{i < step ? "✓" : i + 1}</i>
            <span>{x}</span>
          </button>
        ))}
      </div>
      <div className="workspaceGrid">
        <section className="projectMain">
          <header>
            <div>
              <small>04 · GELİŞTİRME</small>
              <h2>Çalışan prototip ve kaynak kod</h2>
            </div>
            <span>Teslime 6 gün</span>
          </header>
          <div className="repoCard">
            <i>⌘</i>
            <div>
              <small>GITHUB DEPOSU</small>
              <b>ayseyilmaz/dou-campus-api</b>
              <span>main · 24 commit · 18 dk önce</span>
            </div>
            <button
              onClick={() =>
                note("GitHub deposu ve commit geçmişi doğrulandı.")
              }
            >
              Depoyu doğrula
            </button>
          </div>
          <label>
            Canlı demo bağlantısı
            <input defaultValue="https://dou-campus-api.example.dev" />
          </label>
          <div className="deliverables">
            <header>
              <b>Teslim kanıtları</b>
              <button onClick={() => note("Dosya yükleme alanı açıldı.")}>
                ＋ Dosya ekle
              </button>
            </header>
            {[
              ["README.md", "Dokümantasyon"],
              ["api-demo.png", "Ekran görüntüsü"],
              ["test-report.pdf", "Test raporu"],
            ].map((x) => (
              <article key={x[0]}>
                <i>▤</i>
                <span>
                  <b>{x[0]}</b>
                  <small>{x[1]}</small>
                </span>
                <button onClick={() => note(`${x[0]} görüntülendi.`)}>
                  Görüntüle
                </button>
              </article>
            ))}
          </div>
          <footer>
            <button onClick={() => note("Taslak kaydedildi.")}>
              Taslak kaydet
            </button>
            <button
              onClick={() => {
                setStep(5);
                note("Proje değerlendirmeye gönderildi.");
              }}
            >
              Değerlendirmeye gönder →
            </button>
          </footer>
        </section>
        <aside className="revisionPanel">
          <small>REVİZYON GEÇMİŞİ</small>
          <h2>2 değerlendirme</h2>
          {[
            ["v1.2", "API hata yanıtlarını standartlaştır.", "Bugün"],
            ["v1.1", "README kurulum adımlarını ekle.", "18 Ağustos"],
          ].map((x) => (
            <article key={x[0]}>
              <header>
                <b>{x[0]}</b>
                <time>{x[2]}</time>
              </header>
              <p>{x[1]}</p>
              <span>İlker Duran</span>
            </article>
          ))}
          <div className="rubricMini">
            <b>Güncel rubrik</b>
            {[
              ["İşlevsellik", 92],
              ["Kod kalitesi", 84],
              ["Test", 78],
              ["Dokümantasyon", 88],
            ].map((x) => (
              <span key={String(x[0])}>
                {x[0]}
                <em>%{x[1]}</em>
              </span>
            ))}
          </div>
          <button onClick={() => go("passport")}>
            Skill Passport kanıtı →
          </button>
        </aside>
      </div>
    </section>
  );
}

function Achievements({ note }: any) {
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>AKADEMİK OYUNLAŞTIRMA</small>
          <h1>Rozetler ve ünvanlar</h1>
          <p>
            Doğrulanmış uygulama, proje, mentorluk ve akademik katkıların
            ödüllendirilir.
          </p>
        </div>
        <strong>
          #5<small>sezon sırası</small>
        </strong>
      </div>
      <div className="rankHero">
        <div>
          <small>MEVCUT ÜNVAN</small>
          <h2>Problem Çözücü</h2>
          <p>Seviye 12 · 2.840 XP</p>
          <div>
            <i style={{ width: "72%" }} />
          </div>
          <span>Uygulama Geliştirici ünvanına 460 XP</span>
        </div>
        <i>♛</i>
      </div>
      <div className="achievementGrid">
        <section>
          <header>
            <div>
              <small>ROZET KOLEKSİYONU</small>
              <h2>9 / 18 kazanıldı</h2>
            </div>
          </header>
          <div className="badgeGrid">
            {[
              ["⚡", "Hızlı Başlangıç", true],
              ["⌘", "Git Ustası", true],
              ["◆", "Proje Mimarı", true],
              ["♧", "Yardımsever", true],
              ["◎", "Hata Avcısı", false],
              ["♛", "Code Mentor", false],
            ].map((x) => (
              <article
                className={x[2] ? "earned" : "locked"}
                key={String(x[1])}
              >
                <i>{x[0]}</i>
                <b>{x[1]}</b>
                <span>{x[2] ? "Kazanıldı" : "Kilitli"}</span>
              </article>
            ))}
          </div>
        </section>
        <aside className="xpRules">
          <small>XP KURALLARI</small>
          <h2>Puan nasıl kazanılır?</h2>
          {[
            ["Uygulama testleri", "+40–120"],
            ["Doğrulanmış proje", "+300"],
            ["Kod incelemesi", "+50"],
            ["7 günlük seri", "+100"],
            ["Boss Challenge", "+320"],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]} XP</b>
            </article>
          ))}
          <button onClick={() => note("XP geçmişi açıldı.")}>
            XP geçmişim →
          </button>
        </aside>
      </div>
      <section className="titleTimeline">
        <small>ÜNVAN YOLCULUĞU</small>
        <div>
          {[
            "Çırak",
            "Kod Kaşifi",
            "Problem Çözücü",
            "Uygulama Geliştirici",
            "Teknoloji Uzmanı",
            "DOU Code Mentor",
          ].map((x, i) => (
            <article className={i < 3 ? "done" : i === 3 ? "next" : ""} key={x}>
              <i>{i < 3 ? "✓" : i + 1}</i>
              <b>{x}</b>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function Settings({ note }: any) {
  const [saved, setSaved] = useState(false);
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>PROFİL & TERCİHLER</small>
          <h1>Hesap ayarları</h1>
          <p>Profil, öğrenme hedefi, bildirim ve görünürlük ayarları.</p>
        </div>
      </div>
      <div className="settingsLayout">
        <aside>
          {[
            "Profil",
            "Öğrenme",
            "Bildirimler",
            "Gizlilik",
            "Bağlı hesaplar",
          ].map((x, i) => (
            <button className={i === 0 ? "on" : ""} key={x}>
              {x}
            </button>
          ))}
        </aside>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
            note("Ayarların kaydedildi.");
          }}
        >
          <section className="profileEdit">
            <i>AY</i>
            <div>
              <h2>Profil bilgileri</h2>
              <p>Skill Passport’ta görünen akademik bilgiler.</p>
            </div>
          </section>
          <div className="formGrid">
            <label>
              Ad soyad
              <input defaultValue="Ayşe Yılmaz" />
            </label>
            <label>
              Öğrenci numarası
              <input defaultValue="202601284" disabled />
            </label>
            <label>
              Kurumsal e-posta
              <input defaultValue="ayse.yilmaz@dogus.edu.tr" disabled />
            </label>
            <label>
              Hedef rol
              <select>
                <option>Backend Developer</option>
                <option>Veri Analisti</option>
              </select>
            </label>
          </div>
          <div className="settingToggles">
            {[
              ["Günlük plan hatırlatması", "Her gün 09:00"],
              ["Teslim uyarıları", "24 ve 2 saat önce"],
              ["Skill Passport görünürlüğü", "Bağlantıya sahip kişiler"],
            ].map((x) => (
              <label key={x[0]}>
                <span>
                  <b>{x[0]}</b>
                  <small>{x[1]}</small>
                </span>
                <input type="checkbox" defaultChecked />
              </label>
            ))}
          </div>
          <footer>
            <span>
              {saved ? "✓ Değişiklikler kaydedildi" : "Değişiklik yapılmadı"}
            </span>
            <button>Kaydet</button>
          </footer>
        </form>
      </div>
    </section>
  );
}

function HelpCenter({ note }: any) {
  const [q, setQ] = useState("");
  const topics = [
    ["</>", "Kod Laboratuvarı"],
    ["◆", "Proje teslimi"],
    ["✦", "AI Kod Koçu"],
    ["◈", "Skill Passport"],
    ["♧", "Mentorluk"],
    ["?", "Teknik destek"],
  ];
  return (
    <section>
      <div className="helpHero">
        <small>DOU CODELAB DESTEK</small>
        <h1>Nasıl yardımcı olabiliriz?</h1>
        <label>
          ⌕
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Bir özellik veya sorun ara..."
          />
        </label>
      </div>
      <div className="helpTopics">
        {topics
          .filter((x) =>
            x[1].toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")),
          )
          .map((x) => (
            <button key={x[1]} onClick={() => note(`${x[1]} rehberi açıldı.`)}>
              <i>{x[0]}</i>
              <b>{x[1]}</b>
              <em>→</em>
            </button>
          ))}
      </div>
      <div className="faqGrid">
        <section>
          {[
            "Kodum neden testten geçmiyor?",
            "Projeyi nasıl tekrar teslim ederim?",
            "XP nasıl hesaplanır?",
            "Skill Passport’u kimler görebilir?",
          ].map((x) => (
            <details key={x}>
              <summary>{x}</summary>
              <p>
                İlgili ekranın yönergelerini kontrol et. Sorun sürerse destek
                talebine kod ve ekran görüntüsü ekle.
              </p>
            </details>
          ))}
        </section>
        <aside>
          <h2>Çözüm bulamadın mı?</h2>
          <p>Destek ekibine veya Code Mentor’a ulaş.</p>
          <button onClick={() => note("Destek talebi oluşturuldu.")}>
            Destek talebi oluştur
          </button>
        </aside>
      </div>
    </section>
  );
}

function Governance({ note }: any) {
  const [consent, setConsent] = useState({
    leaderboard: true,
    portfolio: true,
    research: false,
  });
  const toggle = (key: keyof typeof consent) =>
    setConsent((current) => ({ ...current, [key]: !current[key] }));
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>GÜVENLİ VE KAPSAYICI ÖĞRENME</small>
          <h1>Gizlilik, erişim ve akademik dürüstlük</h1>
          <p>
            Verinin nasıl kullanıldığını, profil görünürlüğünü ve destek
            seçeneklerini tek yerden yönetin.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Tercihlerin güvenli biçimde kaydedildi.")}
        >
          Tercihleri kaydet
        </button>
      </div>
      <div className="governanceGrid">
        <article>
          <i>01</i>
          <div>
            <b>KVKK ve veri minimizasyonu</b>
            <p>
              Yalnızca öğrenme süreci için gerekli kimlik, ilerleme, teslim ve
              değerlendirme kayıtları tutulur.
            </p>
            <button onClick={() => note("KVKK aydınlatma özeti açıldı.")}>
              Aydınlatma özetini görüntüle →
            </button>
          </div>
        </article>
        <article>
          <i>02</i>
          <div>
            <b>Erişilebilirlik</b>
            <p>
              Klavye kullanımı, yüksek kontrast, açıklayıcı etiketler ve mobil
              uyum temel deneyimin parçasıdır.
            </p>
            <button onClick={() => note("Erişilebilirlik geri bildirimi açıldı.")}>
              Erişim sorunu bildir →
            </button>
          </div>
        </article>
        <article>
          <i>03</i>
          <div>
            <b>Akademik dürüstlük</b>
            <p>
              AI desteği çözümü doğrudan vermek yerine ipucu ve açıklama üretir;
              teslimlerde kaynak ve katkı beyanı istenir.
            </p>
            <button onClick={() => note("Akademik dürüstlük ilkeleri açıldı.")}>
              İlkeleri incele →
            </button>
          </div>
        </article>
      </div>
      <div className="privacyPanel">
        <header>
          <div>
            <small>GÖRÜNÜRLÜK TERCİHLERİ</small>
            <h2>Kontrol sende</h2>
          </div>
          <span>Değişiklikler yalnızca hesabını etkiler</span>
        </header>
        {[
          ["leaderboard", "Liderlik tablosunda adımı göster", "Kapalıysa rumuz kullanılır."],
          ["portfolio", "Skill Passport profilimi paylaş", "Doğrulanmış yetkinlikler bağlantıyla görüntülenebilir."],
          ["research", "Anonim öğrenme araştırmasına katkı ver", "Not ve kimlik bilgisi araştırma verisine dahil edilmez."],
        ].map((item) => {
          const key = item[0] as keyof typeof consent;
          return (
            <label key={key}>
              <span>
                <b>{item[1]}</b>
                <small>{item[2]}</small>
              </span>
              <input
                type="checkbox"
                checked={consent[key]}
                onChange={() => toggle(key)}
              />
            </label>
          );
        })}
      </div>
      <div className="dataRights">
        <span>
          <b>Veri hakların</b>
          <small>Erişim, düzeltme, dışa aktarma ve silme talebi oluşturabilirsin.</small>
        </span>
        <button onClick={() => note("Veri talep formu hazırlandı.")}>
          Veri talebi oluştur
        </button>
      </div>
    </section>
  );
}

function SystemReady({ note }: any) {
  const items = [
    ["Arayüz ve rol panelleri", "Hazır"],
    ["İçerik & soru motoru", "Hazır"],
    ["ÖÇ–PÇ ve MEDEK", "Hazır"],
    ["Sunucu kurulum paketi", "Hazır"],
    ["Sağlık, yedek ve güvenlik planı", "Hazır"],
    ["Office 365 / Entra ID", "Sunucu"],
    ["PostgreSQL kalıcı veri", "Sunucu"],
    ["Güvenli kod çalıştırma", "Sunucu"],
    ["AI Kod Koçu API", "Sunucu"],
    ["OBS / LMS entegrasyonu", "Planlandı"],
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>CANLI KURULUMA HAZIRLIK</small>
          <h1>Sistem Hazırlık Merkezi</h1>
          <p>
            Prototip tamamlandı; okul altyapısında etkinleştirilecek servisleri
            takip edin.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Bilgi İşlem gereksinim özeti hazırlandı.")}
        >
          Gereksinim özeti ↓
        </button>
      </div>
      <div className="readyHero">
        <div>
          <small>PROTOTİP HAZIRLIK</small>
          <strong>%100</strong>
          <div>
            <i style={{ width: "100%" }} />
          </div>
          <p>
            Sunucu erişimi gerektirmeyen ürün ve geçiş hazırlıkları tamamlandı.
          </p>
        </div>
        <aside>
          ✓
          <span>
            <b>Prototip ve geçiş paketi hazır</b>
            <small>Kurumsal servisler okul altyapısında etkinleştirilecek</small>
          </span>
        </aside>
      </div>
      <section className="readinessList">
        <header>
          <span>Bileşen</span>
          <span>Durum</span>
          <span>Sonraki işlem</span>
        </header>
        {items.map((x) => (
          <article key={x[0]}>
            <div>
              <i className={x[1] === "Hazır" ? "done" : "server"}>
                {x[1] === "Hazır" ? "✓" : "○"}
              </i>
              <b>{x[0]}</b>
            </div>
            <em>{x[1]}</em>
            <span>
              {x[1] === "Hazır"
                ? "Ek işlem yok"
                : x[1] === "Sunucu"
                  ? "Bilgi İşlem erişimi"
                  : "Entegrasyon takvimi"}
            </span>
          </article>
        ))}
      </section>
      <div className="deploymentSteps">
        {[
          ["01", "Altyapı", "Linux, SSL, PostgreSQL"],
          ["02", "Kimlik", "Entra ID ve @dogus.edu.tr"],
          ["03", "Servisler", "Kod, dosya ve AI"],
          ["04", "Pilot", "1 bölüm, 2 ders"],
          ["05", "Yaygınlaştırma", "OBS/LMS ve programlar"],
        ].map((x) => (
          <article key={x[0]}>
            <i>{x[0]}</i>
            <span>
              <b>{x[1]}</b>
              <small>{x[2]}</small>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function LearningPlan({ note, go }: any) {
  const [done, setDone] = useState([true, false, false, false]);
  const tasks = [
    ["Kısa tekrar", "Döngü koşulları", "6 dk", "Tekrar"],
    ["Hata avı", "Sonsuz döngüyü düzelt", "12 dk", "ÖÇ4"],
    ["Uygulama", "Liste filtreleme", "18 dk", "ÖÇ2"],
    ["Mini ölçme", "5 soruluk ustalık kontrolü", "9 dk", "Test"],
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>KİŞİSELLEŞTİRİLMİŞ ÖĞRENME</small>
          <h1>Akıllı çalışma planım</h1>
          <p>
            Ön testin, son hataların ve kazanım seviyelerine göre her gün
            yeniden oluşturulur.
          </p>
        </div>
        <aside>
          ✦
          <span>
            <b>45 dakika</b>
            <small>bugünkü odak</small>
          </span>
        </aside>
      </div>
      <div className="planHero">
        <div>
          <small>BUGÜNÜN ÖNCELİĞİ</small>
          <h2>Hata ayıklama becerisini güçlendir</h2>
          <p>
            Son 6 uygulamada döngü bitiş koşullarında tekrar eden hata görüldü.
            Bugünkü plan bu açığı kapatmaya odaklanıyor.
          </p>
          <div className="planSignals">
            <span>ÖÇ4 · %58</span>
            <span>3 tekrar eden hata</span>
            <span>+180 XP</span>
          </div>
        </div>
        <div className="masteryDial">
          <strong>%68</strong>
          <span>Haftalık ustalık</span>
          <small>Geçen haftaya göre +9</small>
        </div>
      </div>
      <div className="planGrid">
        <section className="dailyPlan">
          <header>
            <div>
              <small>ADIM ADIM PLAN</small>
              <h2>Bugünün 4 görevi</h2>
            </div>
            <span>{done.filter(Boolean).length}/4 tamamlandı</span>
          </header>
          {tasks.map((t, i) => (
            <button
              className={done[i] ? "done" : ""}
              key={t[0]}
              onClick={() => {
                const next = [...done];
                next[i] = true;
                setDone(next);
                note(`${t[0]} tamamlandı. Planın güncellendi.`);
              }}
            >
              <i>{done[i] ? "✓" : i + 1}</i>
              <span>
                <small>{t[3]}</small>
                <b>
                  {t[0]} · {t[1]}
                </b>
              </span>
              <em>{t[2]}</em>
              <strong>→</strong>
            </button>
          ))}
        </section>
        <aside className="gapPanel">
          <small>BECERİ AÇIKLARI</small>
          <h2>Neye odaklanıyoruz?</h2>
          {[
            ["Hata ayıklama", 58],
            ["SQL gruplama", 64],
            ["Git akışı", 68],
            ["Python döngüler", 84],
          ].map((x) => (
            <article key={String(x[0])}>
              <span>
                <b>{x[0]}</b>
                <em>%{x[1]}</em>
              </span>
              <div>
                <i style={{ width: `${x[1]}%` }} />
              </div>
            </article>
          ))}
          <button onClick={() => go("assessment")}>
            Ayrıntılı beceri analizim →
          </button>
        </aside>
      </div>
      <div className="adaptiveRule">
        <i>⌁</i>
        <div>
          <b>Uyarlanabilir ilerleme kuralı</b>
          <p>
            ÖÇ4 ustalığın %70’e ulaşınca “Fonksiyonlar” modülünün ileri
            uygulamaları otomatik açılacak.
          </p>
        </div>
        <button onClick={() => note("Ustalık ölçütleri açıldı.")}>
          Kuralı gör
        </button>
      </div>
    </section>
  );
}

function Mentoring({ note }: any) {
  const [request, setRequest] = useState(false);
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>İNSAN DESTEĞİ & CODE CLINIC</small>
          <h1>Mentorluk Merkezi</h1>
          <p>
            Takıldığın kodu paylaş, akademisyen veya doğrulanmış Code Mentor’dan
            yönlendirici geri bildirim al.
          </p>
        </div>
        <button className="primary" onClick={() => setRequest(!request)}>
          ＋ Yardım talebi
        </button>
      </div>
      {request && (
        <form
          className="mentorRequest"
          onSubmit={(e) => {
            e.preventDefault();
            setRequest(false);
            note("Yardım talebin mentor kuyruğuna alındı.");
          }}
        >
          <label>
            Konu
            <input placeholder="Örn. Python döngüsünde koşul çalışmıyor" />
          </label>
          <div>
            <label>
              Ders
              <select>
                <option>BLP 101</option>
                <option>BLP 105</option>
              </select>
            </label>
            <label>
              Aciliyet
              <select>
                <option>Normal</option>
                <option>Bugün gerekli</option>
              </select>
            </label>
          </div>
          <label>
            Açıklama
            <textarea placeholder="Neyi denedin, hangi sonucu bekliyorsun?" />
          </label>
          <footer>
            <button type="button" onClick={() => setRequest(false)}>
              Vazgeç
            </button>
            <button>Talep oluştur</button>
          </footer>
        </form>
      )}
      <div className="mentorGrid">
        <section className="activeHelp">
          <header>
            <div>
              <small>AKTİF TALEPLERİM</small>
              <h2>Devam eden görüşmeler</h2>
            </div>
            <span>2 açık</span>
          </header>
          {[
            [
              "Python for döngüsü",
              "İlker Duran",
              "Yanıt geldi · 8 dk önce",
              "İD",
            ],
            [
              "SQL GROUP BY sonucu",
              "Zeynep Akın · Code Mentor",
              "İnceleniyor",
              "ZA",
            ],
          ].map((x) => (
            <article key={x[0]}>
              <i>{x[3]}</i>
              <span>
                <b>{x[0]}</b>
                <small>
                  {x[1]} · {x[2]}
                </small>
              </span>
              <button onClick={() => note(`${x[0]} görüşmesi açıldı.`)}>
                Mesajlar →
              </button>
            </article>
          ))}
        </section>
        <aside className="clinic">
          <small>SONRAKİ CODE CLINIC</small>
          <h2>Canlı Hata Ayıklama</h2>
          <p>
            Salı · 16:00–16:40
            <br />
            B-204 Laboratuvar + çevrim içi
          </p>
          <div>
            <span>İD</span>
            <span>SA</span>
            <span>+8</span>
          </div>
          <button onClick={() => note("Code Clinic takvimine eklendi.")}>
            Yer ayır
          </button>
        </aside>
      </div>
      <section className="mentorRoster">
        <header>
          <div>
            <small>DOU CODE MENTORLARI</small>
            <h2>Uzmanlık alanına göre destek</h2>
          </div>
        </header>
        {[
          ["MK", "Mehmet Kaya", "Python · Algoritma", "4.9"],
          ["ZA", "Zeynep Akın", "SQL · Veri", "4.8"],
          ["EA", "Ece Aydın", "Web · JavaScript", "4.7"],
        ].map((x) => (
          <article key={x[1]}>
            <i>{x[0]}</i>
            <span>
              <b>{x[1]}</b>
              <small>{x[2]}</small>
            </span>
            <em>★ {x[3]}</em>
            <button
              onClick={() => note(`${x[1]} için yardım talebi hazırlandı.`)}
            >
              Destek iste
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}

function NotificationCenter({ note, go }: any) {
  const [filter, setFilter] = useState("Tümü");
  const items = [
    ["Teslim", "BLP 101 görevi bugün 23:59’da kapanıyor", "Bugün", "tasks"],
    [
      "Geri bildirim",
      "REST API projen için revizyon istendi",
      "12 dk",
      "projects",
    ],
    ["Başarı", "Problem Çözücü ünvanını kazandın", "1 saat", "passport"],
    ["Ders", "SQL patikasına 3 yeni uygulama eklendi", "Dün", "paths"],
    ["Mentorluk", "Kod yardım talebine yanıt geldi", "Dün", "mentoring"],
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>TEK MERKEZDE AKADEMİK AKIŞ</small>
          <h1>Bildirim Merkezi</h1>
          <p>
            Teslim, geri bildirim, ders, başarı ve mentorluk güncellemelerini
            kaçırma.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Tüm bildirimler okundu olarak işaretlendi.")}
        >
          Tümünü okundu yap
        </button>
      </div>
      <div className="notificationLayout">
        <aside>
          {[
            "Tümü",
            "Teslim",
            "Geri bildirim",
            "Ders",
            "Başarı",
            "Mentorluk",
          ].map((x) => (
            <button
              className={filter === x ? "on" : ""}
              onClick={() => setFilter(x)}
              key={x}
            >
              {x}
              <em>{x === "Tümü" ? 5 : x === "Teslim" ? 1 : ""}</em>
            </button>
          ))}
        </aside>
        <section>
          {items
            .filter((x) => filter === "Tümü" || x[0] === filter)
            .map((x, i) => (
              <button
                className={i < 2 ? "unread" : ""}
                key={x[1]}
                onClick={() => go(x[3] as View)}
              >
                <i>{x[0].slice(0, 1)}</i>
                <span>
                  <small>
                    {x[0]} · {x[2]}
                  </small>
                  <b>{x[1]}</b>
                  <p>
                    {x[0] === "Geri bildirim"
                      ? "Rubrikte dokümantasyon bölümünü güncelle ve tekrar gönder."
                      : "Detayı görüntülemek için aç."}
                  </p>
                </span>
                <em>→</em>
              </button>
            ))}
        </section>
      </div>
    </section>
  );
}

function Classroom({ note }: any) {
  const [tab, setTab] = useState("Öğrenciler");
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>DERS, ŞUBE & ÖĞRENCİ YÖNETİMİ</small>
          <h1>Sınıf Yönetimi</h1>
          <p>
            Öğrencileri, grupları, görev atamalarını ve bireysel destek
            planlarını yönetin.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Excel öğrenci aktarım sihirbazı açıldı.")}
        >
          Excel’den öğrenci aktar
        </button>
      </div>
      <div className="classHeader">
        <div>
          <small>2026 BAHAR</small>
          <h2>BLP 101 · Algoritma ve Programlama</h2>
          <p>Bilgisayar Programcılığı · 1. Sınıf · A Şubesi</p>
        </div>
        <div>
          <span>
            <b>42</b> öğrenci
          </span>
          <span>
            <b>%81</b> aktiflik
          </span>
          <span>
            <b>7</b> riskli
          </span>
        </div>
      </div>
      <div className="classTabs">
        {["Öğrenciler", "Gruplar", "Atamalar", "Destek planları"].map((x) => (
          <button
            className={tab === x ? "on" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === "Öğrenciler" ? (
        <section className="studentTable">
          <header>
            <span>Öğrenci</span>
            <span>İlerleme</span>
            <span>Ustalık</span>
            <span>Son etkinlik</span>
            <span>Durum</span>
            <span />
          </header>
          {[
            ["AY", "Ayşe Yılmaz", 72, 78, "Bugün", "Aktif"],
            ["CD", "Can Demir", 41, 55, "4 gün önce", "Riskli"],
            ["EA", "Ece Aydın", 84, 86, "Bugün", "Aktif"],
            ["MK", "Mehmet Kaya", 63, 71, "Dün", "İzlenmeli"],
          ].map((x) => (
            <article key={String(x[1])}>
              <div>
                <i>{x[0]}</i>
                <span>
                  <b>{x[1]}</b>
                  <small>202601{Math.floor(Number(x[2]) * 13)}</small>
                </span>
              </div>
              <div>
                <i style={{ width: `${x[2]}%` }} />
                <small>%{x[2]}</small>
              </div>
              <strong>%{x[3]}</strong>
              <time>{x[4]}</time>
              <em
                className={
                  x[5] === "Riskli"
                    ? "risk"
                    : x[5] === "İzlenmeli"
                      ? "watch"
                      : ""
                }
              >
                {x[5]}
              </em>
              <button onClick={() => note(`${x[1]} öğrenci profili açıldı.`)}>
                Profil →
              </button>
            </article>
          ))}
        </section>
      ) : (
        <div className="tabPlaceholder">
          <i>{tab === "Gruplar" ? "♟" : tab === "Atamalar" ? "▣" : "✦"}</i>
          <h2>{tab}</h2>
          <p>
            {tab === "Gruplar"
              ? "Proje ve destek gruplarını oluştur, öğrencileri sürükleyerek gruplara dağıt."
              : tab === "Atamalar"
                ? "Görevleri tüm sınıfa, gruba veya seçili öğrencilere ata."
                : "Riskli öğrenciler için otomatik ve bireysel destek planları oluştur."}
          </p>
          <button onClick={() => note(`${tab} için yeni kayıt oluşturuldu.`)}>
            ＋ Yeni oluştur
          </button>
        </div>
      )}
    </section>
  );
}

function ReportCenter({ note }: any) {
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>KURUMSAL KARAR & KANIT MERKEZİ</small>
          <h1>Rapor Merkezi</h1>
          <p>
            Ders performansını, kazanımları ve MEDEK kanıtlarını yönetim için
            hazır raporlara dönüştür.
          </p>
        </div>
        <button
          className="primary"
          onClick={() =>
            note("2026 Bahar yönetim özeti PDF olarak hazırlandı.")
          }
        >
          Yönetim özeti oluştur ↓
        </button>
      </div>
      <div className="reportFilters">
        <select>
          <option>2026 Bahar</option>
        </select>
        <select>
          <option>BLP 101 · Algoritma</option>
          <option>Tüm dersler</option>
        </select>
        <select>
          <option>A Şubesi</option>
          <option>Tüm şubeler</option>
        </select>
        <button onClick={() => note("Rapor filtreleri uygulandı.")}>
          Uygula
        </button>
      </div>
      <div className="reportKpis">
        {[
          ["%81", "Aktif öğrenci", "+6 puan"],
          ["%73", "ÖÇ karşılama", "Hedef %70"],
          ["%76", "Görev tamamlama", "-3 puan"],
          ["7", "Riskli öğrenci", "Müdahale gerekli"],
        ].map((x) => (
          <article key={x[1]}>
            <small>{x[1]}</small>
            <b>{x[0]}</b>
            <em>{x[2]}</em>
          </article>
        ))}
      </div>
      <div className="reportGrid">
        <section className="outcomeReport">
          <header>
            <div>
              <small>KAZANIM PERFORMANSI</small>
              <h2>ÖÇ başarı dağılımı</h2>
            </div>
            <button
              onClick={() => note("Kazanım raporu Excel olarak hazırlandı.")}
            >
              Excel ↓
            </button>
          </header>
          {[
            ["ÖÇ1 · Algoritmik düşünme", 86],
            ["ÖÇ2 · Programlama yapıları", 78],
            ["ÖÇ3 · Veri yönetimi", 64],
            ["ÖÇ4 · Test ve hata ayıklama", 58],
            ["ÖÇ5 · Dokümantasyon", 72],
          ].map((x) => (
            <article key={String(x[0])}>
              <b>{x[0]}</b>
              <div>
                <i style={{ width: `${x[1]}%` }} />
              </div>
              <strong>%{x[1]}</strong>
            </article>
          ))}
        </section>
        <aside className="evidencePack">
          <small>MEDEK KANIT PAKETİ</small>
          <h2>2026 Bahar hazır</h2>
          <p>
            Ders izlencesi, ÖÇ–PÇ matrisi, ölçme sonuçları ve iyileştirme
            kanıtları tek pakette.
          </p>
          {[
            ["Ders izlencesi", "Hazır"],
            ["ÖÇ–PÇ matrisi", "Hazır"],
            ["Soru analizleri", "Hazır"],
            ["İyileştirme planı", "1 eksik"],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]}</b>
            </article>
          ))}
          <button onClick={() => note("MEDEK kanıt paketi oluşturuldu.")}>
            Paketi oluştur →
          </button>
        </aside>
      </div>
      <section className="reportCards">
        {[
          [
            "Soru Kalite Analizi",
            "Ayırt edicilik, başarı ve güçlük değerleri",
            "▤",
          ],
          ["Öğrenci Risk Raporu", "Devam, görev ve ustalık sinyalleri", "!"],
          [
            "Proje & Rubrik Raporu",
            "Proje aşamaları ve yetkinlik kanıtları",
            "◆",
          ],
        ].map((x) => (
          <button key={x[0]} onClick={() => note(`${x[0]} açıldı.`)}>
            <i>{x[2]}</i>
            <span>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </span>
            <em>→</em>
          </button>
        ))}
      </section>
    </section>
  );
}

function QuestionBank({ note }: any) {
  const [type, setType] = useState("Tümü");
  const [selected, setSelected] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);
  const questions = [
    {
      id: "Q-104",
      type: "Kod tamamlama",
      title: "Çift sayıları filtreleyen koşulu tamamla",
      course: "BLP 101",
      outcome: "ÖÇ2",
      level: "Orta",
      uses: 18,
      success: 74,
    },
    {
      id: "Q-103",
      type: "Hata bulma",
      title: "Sonsuz döngünün nedenini belirle",
      course: "BLP 101",
      outcome: "ÖÇ4",
      level: "Zor",
      uses: 11,
      success: 52,
    },
    {
      id: "Q-102",
      type: "Çıktı tahmini",
      title: "İç içe döngünün çıktısı nedir?",
      course: "BLP 101",
      outcome: "ÖÇ2",
      level: "Orta",
      uses: 24,
      success: 68,
    },
    {
      id: "Q-101",
      type: "Çoktan seçmeli",
      title: "GROUP BY hangi amaçla kullanılır?",
      course: "BLP 105",
      outcome: "ÖÇ3",
      level: "Başlangıç",
      uses: 31,
      success: 83,
    },
    {
      id: "Q-100",
      type: "Mini proje",
      title: "Satış verilerinden haftalık rapor üret",
      course: "BLP 105",
      outcome: "ÖÇ5",
      level: "Zor",
      uses: 7,
      success: 61,
    },
  ];
  const visible =
    type === "Tümü" ? questions : questions.filter((q) => q.type === type);
  const toggle = (id: string) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  return (
    <section className="bankPage">
      <div className="pageTitle">
        <div>
          <small>ÖLÇME & UYGULAMA KÜTÜPHANESİ</small>
          <h1>Soru ve Uygulama Bankası</h1>
          <p>
            Soruları kazanım, ders, zorluk ve soru türüne göre yönet;
            seçtiklerinden saniyeler içinde görev seti oluştur.
          </p>
        </div>
        <button className="primary" onClick={() => setCreating(!creating)}>
          ＋ Yeni soru
        </button>
      </div>
      <div className="bankStats">
        {[
          ["148", "Toplam içerik"],
          ["36", "Kod sorusu"],
          ["21", "Mini proje"],
          ["%72", "Ortalama başarı"],
        ].map((x) => (
          <article key={x[1]}>
            <b>{x[0]}</b>
            <span>{x[1]}</span>
          </article>
        ))}
      </div>
      {creating && (
        <form
          className="questionComposer"
          onSubmit={(e) => {
            e.preventDefault();
            setCreating(false);
            note("Yeni soru taslak olarak bankaya eklendi.");
          }}
        >
          <header>
            <div>
              <small>YENİ İÇERİK</small>
              <h2>Soru oluştur</h2>
            </div>
            <button type="button" onClick={() => setCreating(false)}>
              ×
            </button>
          </header>
          <div>
            <label>
              Soru türü
              <select>
                <option>Kod tamamlama</option>
                <option>Hata bulma</option>
                <option>Çoktan seçmeli</option>
                <option>Mini proje</option>
              </select>
            </label>
            <label>
              Ders
              <select>
                <option>BLP 101 · Algoritma</option>
                <option>BLP 105 · Veritabanı</option>
              </select>
            </label>
            <label>
              ÖÇ / PÇ
              <select>
                <option>ÖÇ2 · PÇ2, PÇ5</option>
                <option>ÖÇ4 · PÇ3, PÇ7</option>
              </select>
            </label>
            <label>
              Zorluk
              <select>
                <option>Başlangıç</option>
                <option>Orta</option>
                <option>Zor</option>
              </select>
            </label>
          </div>
          <label>
            Soru veya görev metni
            <textarea placeholder="Öğrencinin yapmasını istediğiniz işlemi açık ve ölçülebilir biçimde yazın..." />
          </label>
          <label>
            Başlangıç kodu
            <textarea
              className="code"
              defaultValue={
                "sayilar = [4, 7, 12, 19]\n\nfor sayi in sayilar:\n    # koşulu tamamla"
              }
            />
          </label>
          <footer>
            <button
              type="button"
              onClick={() => note("Soru önizlemesi açıldı.")}
            >
              Önizle
            </button>
            <button>Bankaya kaydet</button>
          </footer>
        </form>
      )}
      <div className="bankToolbar">
        <div className="bankTypes">
          {[
            "Tümü",
            "Kod tamamlama",
            "Hata bulma",
            "Çıktı tahmini",
            "Çoktan seçmeli",
            "Mini proje",
          ].map((t) => (
            <button
              className={type === t ? "on" : ""}
              onClick={() => setType(t)}
              key={t}
            >
              {t}
            </button>
          ))}
        </div>
        <div>
          <select aria-label="Ders filtresi">
            <option>Tüm dersler</option>
            <option>BLP 101</option>
            <option>BLP 105</option>
          </select>
          <select aria-label="Zorluk filtresi">
            <option>Tüm seviyeler</option>
            <option>Başlangıç</option>
            <option>Orta</option>
            <option>Zor</option>
          </select>
        </div>
      </div>
      {selected.length > 0 && (
        <div className="selectionBar">
          <span>
            <b>{selected.length} içerik seçildi</b> · Toplam 240 XP önerildi
          </span>
          <div>
            <button
              onClick={() => {
                note("Seçili içerikler başka derse kopyalandı.");
                setSelected([]);
              }}
            >
              Derse kopyala
            </button>
            <button
              onClick={() => {
                note("Görev seti oluşturuldu ve yayın ayarları açıldı.");
                setSelected([]);
              }}
            >
              Görev seti oluştur →
            </button>
          </div>
        </div>
      )}
      <section className="bankTable">
        <header>
          <span />
          <span>İçerik</span>
          <span>Ders / Kazanım</span>
          <span>Seviye</span>
          <span>Kullanım</span>
          <span>Başarı</span>
          <span />
        </header>
        {visible.map((q) => (
          <article key={q.id}>
            <input
              type="checkbox"
              checked={selected.includes(q.id)}
              onChange={() => toggle(q.id)}
              aria-label={`${q.id} seç`}
            />
            <div>
              <small>
                {q.id} · {q.type}
              </small>
              <b>{q.title}</b>
            </div>
            <span>
              <b>{q.course}</b>
              <small>{q.outcome}</small>
            </span>
            <em
              className={
                q.level === "Zor" ? "hard" : q.level === "Orta" ? "medium" : ""
              }
            >
              {q.level}
            </em>
            <strong>{q.uses} kez</strong>
            <div className="successRate">
              <i style={{ width: `${q.success}%` }} />
              <small>%{q.success}</small>
            </div>
            <button onClick={() => note(`${q.id} düzenleme ekranı açıldı.`)}>
              •••
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}

function SkillPassport({ note, go }: any) {
  const skills = [
    ["Python", 84, "Doğrulandı"],
    ["SQL ve veri", 76, "Doğrulandı"],
    ["Git & GitHub", 68, "Gelişiyor"],
    ["REST API", 61, "Gelişiyor"],
    ["Hata ayıklama", 79, "Doğrulandı"],
  ];
  return (
    <section className="passportPage">
      <div className="pageTitle">
        <div>
          <small>DOĞRULANMIŞ BECERİ PROFİLİ</small>
          <h1>DOU Skill Passport</h1>
          <p>
            Ders notundan fazlası: uygulama, proje ve akademisyen onayıyla
            oluşan canlı beceri kimliğin.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Paylaşılabilir profil bağlantısı kopyalandı.")}
        >
          Profili paylaş ↗
        </button>
      </div>
      <div className="passportHero">
        <div className="identity">
          <i>AY</i>
          <div>
            <small>DOĞUŞ ÜNİVERSİTESİ · MYO</small>
            <h2>Ayşe Yılmaz</h2>
            <p>Bilgisayar Programcılığı · Backend Developer Adayı</p>
            <span>◉ Akademisyen tarafından doğrulandı</span>
          </div>
        </div>
        <div className="readiness">
          <small>ROL UYGUNLUĞU</small>
          <strong>%78</strong>
          <span>Junior Backend Stajı</span>
          <div>
            <i style={{ width: "78%" }} />
          </div>
        </div>
        <button
          className="qr"
          onClick={() => note("Doğrulama QR kodu büyütüldü.")}
          aria-label="Doğrulama QR kodu"
        >
          ▦<small>DOĞRULA</small>
        </button>
      </div>
      <div className="passportStats">
        {[
          ["2.840", "Toplam XP"],
          ["137", "Uygulama"],
          ["4", "Doğrulanmış proje"],
          ["12", "Hafta seri"],
        ].map((x) => (
          <article key={x[1]}>
            <b>{x[0]}</b>
            <span>{x[1]}</span>
          </article>
        ))}
      </div>
      <div className="passportGrid">
        <section className="skillEvidence">
          <header>
            <div>
              <small>BECERİ KANITLARI</small>
              <h2>Teknik yetkinlikler</h2>
            </div>
            <button onClick={() => go("assessment")}>Yeniden ölç →</button>
          </header>
          {skills.map((s) => (
            <article key={String(s[0])}>
              <div>
                <b>{s[0]}</b>
                <span>{s[2]}</span>
              </div>
              <div className="skillTrack">
                <i style={{ width: `${s[1]}%` }} />
              </div>
              <strong>%{s[1]}</strong>
            </article>
          ))}
        </section>
        <aside className="verifiedWork">
          <header>
            <small>SEÇİLİ KANITLAR</small>
            <h2>Doğrulanmış çalışmalar</h2>
          </header>
          {[
            ["REST API Projesi", "92 / 100", "İD"],
            ["SQL Veri Analizi", "88 / 100", "SA"],
            ["Python Otomasyon", "90 / 100", "İD"],
          ].map((x) => (
            <button key={x[0]} onClick={() => go("projects")}>
              <i>◆</i>
              <span>
                <b>{x[0]}</b>
                <small>
                  Akademisyen: {x[2]} · {x[1]}
                </small>
              </span>
              <em>→</em>
            </button>
          ))}
        </aside>
      </div>
    </section>
  );
}

function CurriculumMap({ note }: any) {
  const rows = [
    ["ÖÇ1", "Algoritmik problem çözme", "PÇ1 · PÇ3", 86, "Güçlü"],
    [
      "ÖÇ2",
      "Temel programlama yapılarını uygulama",
      "PÇ2 · PÇ5",
      78,
      "Beklenen",
    ],
    ["ÖÇ3", "Veri tabanı sorguları geliştirme", "PÇ4 · PÇ6", 64, "İzlenmeli"],
    ["ÖÇ4", "Hata ayıklama ve test", "PÇ3 · PÇ7", 58, "Müdahale"],
    ["ÖÇ5", "Takım çalışması ve dokümantasyon", "PÇ8 · PÇ9", 72, "Beklenen"],
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>MEDEK UYUMLU AKADEMİK MOTOR</small>
          <h1>ÖÇ–PÇ Kazanım Haritası</h1>
          <p>
            Ders, etkinlik ve ölçme kanıtlarını program çıktılarıyla aynı
            ekranda ilişkilendir.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("MEDEK kanıt raporu PDF için hazırlandı.")}
        >
          Rapor oluştur ↓
        </button>
      </div>
      <div className="curriculumSummary">
        {[
          ["7", "Öğrenme çıktısı"],
          ["9", "Program çıktısı"],
          ["42", "Kanıt noktası"],
          ["%73", "Genel karşılama"],
        ].map((x) => (
          <article key={x[1]}>
            <b>{x[0]}</b>
            <span>{x[1]}</span>
          </article>
        ))}
      </div>
      <section className="curriculumTable">
        <header>
          <div>
            <small>AKTİF DERS</small>
            <h2>BLP 101 · Algoritma ve Programlama</h2>
          </div>
          <select aria-label="Ders seç">
            <option>BLP 101 · Algoritma ve Programlama</option>
            <option>BLP 105 · Veritabanı Yönetimi</option>
            <option>BLP 203 · Nesne Tabanlı Programlama</option>
          </select>
        </header>
        <div className="ctHead">
          <span>Çıktı</span>
          <span>Kazanım</span>
          <span>PÇ ilişkisi</span>
          <span>Başarı</span>
          <span>Durum</span>
          <span />
        </div>
        {rows.map((r) => (
          <article key={String(r[0])}>
            <b>{r[0]}</b>
            <span>{r[1]}</span>
            <em>{r[2]}</em>
            <div>
              <i style={{ width: `${r[3]}%` }} />
              <small>%{r[3]}</small>
            </div>
            <strong
              className={
                Number(r[3]) < 60 ? "danger" : Number(r[3]) < 70 ? "watch" : ""
              }
            >
              {r[4]}
            </strong>
            <button onClick={() => note(`${r[0]} için 8 ölçme kanıtı açıldı.`)}>
              Kanıtlar →
            </button>
          </article>
        ))}
      </section>
      <div className="intervention">
        <div>
          <i>!</i>
          <span>
            <b>Akademik müdahale önerisi</b>
            <p>
              ÖÇ4 başarı oranı hedefin altında. “Hata Ayıklama Laboratuvarı”nı
              18 öğrenciye destek görevi olarak atayabilirsin.
            </p>
          </span>
        </div>
        <button onClick={() => note("Destek görevi 18 öğrenciye atandı.")}>
          Destek görevi ata
        </button>
      </div>
    </section>
  );
}

function Arena({ note, go }: any) {
  const [joined, setJoined] = useState(false);
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>HAFTALIK UYGULAMA LİGİ</small>
          <h1>CodeLab Arena</h1>
          <p>
            Hızdan önce doğruluk, kod kalitesi ve farklı çözüm yaklaşımı
            puanlanır.
          </p>
        </div>
        <aside>
          🏆
          <span>
            <b>Bronz Lig · #5</b>
            <small>Üst lige 140 XP</small>
          </span>
        </aside>
      </div>
      <div className="bossCard">
        <div>
          <small>HAFTANIN BOSS CHALLENGE’I · 320 XP</small>
          <h2>Akıllı Kampüs Enerji Analizi</h2>
          <p>
            Saatlik tüketim verisini işle, anormal değerleri bul ve en verimli
            zaman aralığını hesapla.
          </p>
          <div className="bossMeta">
            <span>Python</span>
            <span>Veri işleme</span>
            <span>45 dakika</span>
            <span>3 gizli test</span>
          </div>
          <button
            onClick={() => {
              setJoined(true);
              note("Arena çalışma alanın hazırlandı.");
            }}
          >
            {joined ? "Meydan okumaya devam et →" : "Meydan okumayı kabul et →"}
          </button>
        </div>
        <pre>
          <b>def</b> analiz_et(veri):{"\n"} <i># örüntüyü keşfet</i>
          {"\n"} return sonuç
        </pre>
      </div>
      <div className="arenaGrid">
        <section className="league">
          <header>
            <div>
              <small>MYO HAFTALIK LİGİ</small>
              <h2>İlk 5</h2>
            </div>
            <button onClick={() => note("Tam sıralama açıldı.")}>Tümü →</button>
          </header>
          {[
            ["1", "Mehmet Kaya", "3.840", "MK"],
            ["2", "Zeynep Akın", "3.620", "ZA"],
            ["3", "Can Demir", "3.410", "CD"],
            ["4", "Ece Aydın", "3.080", "EA"],
            ["5", "Ayşe Yılmaz", "2.840", "AY"],
          ].map((x) => (
            <article className={x[0] === "5" ? "me" : ""} key={x[0]}>
              <strong>{x[0]}</strong>
              <i>{x[3]}</i>
              <span>
                <b>{x[1]}</b>
                <small>Problem Çözücü</small>
              </span>
              <em>{x[2]} XP</em>
            </article>
          ))}
        </section>
        <aside className="teamLeague">
          <small>TAKIM MÜCADELESİ</small>
          <h2>API Avcıları</h2>
          <p>Bu hafta takımın 2. sırada. Ortak hedefe 4 görev kaldı.</p>
          <div>
            <i style={{ width: "72%" }} />
          </div>
          <span>
            <b>%72</b> · 18 / 25 görev
          </span>
          <button onClick={() => go("lab")}>Takıma katkı yap →</button>
        </aside>
      </div>
    </section>
  );
}

function ReviewQueue({ note }: any) {
  const [active, setActive] = useState(0);
  const submissions = [
    "Ayşe Yılmaz · REST API",
    "Can Demir · SQL Raporlama",
    "Ece Aydın · Python Otomasyon",
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>İNSAN GERİ BİLDİRİMİ</small>
          <h1>Kod İnceleme Kuyruğu</h1>
          <p>
            Otomatik testten geçen teslimleri kod kalitesi, yaklaşım ve
            açıklanabilirlik açısından değerlendir.
          </p>
        </div>
        <strong>
          7<small>inceleme bekliyor</small>
        </strong>
      </div>
      <div className="reviewWorkspace">
        <aside>
          {submissions.map((x, i) => (
            <button
              className={active === i ? "on" : ""}
              onClick={() => setActive(i)}
              key={x}
            >
              <i>{i + 1}</i>
              <span>
                <b>{x.split(" · ")[0]}</b>
                <small>{x.split(" · ")[1]} · Az önce</small>
              </span>
            </button>
          ))}
        </aside>
        <article>
          <header>
            <div>
              <small>TESLİM #CL-2048</small>
              <h2>{submissions[active]}</h2>
            </div>
            <span>✓ 8/8 test geçti</span>
          </header>
          <pre>
            <code>
              <b>def</b> filtrele_kayitlar(kayitlar):{"\n"} sonuc = []{"\n"}{" "}
              <b>for</b> kayit <b>in</b> kayitlar:{"\n"} <b>if</b> kayit[
              <i>"aktif"</i>]:{"\n"} sonuc.append(kayit){"\n"} <b>return</b>{" "}
              sonuc
            </code>
          </pre>
          <div className="rubric">
            {[
              ["İşlevsellik", "25 / 25"],
              ["Kod kalitesi", "20 / 25"],
              ["Test yaklaşımı", "18 / 25"],
              ["Dokümantasyon", "21 / 25"],
            ].map((x) => (
              <label key={x[0]}>
                <span>
                  <b>{x[0]}</b>
                  <em>{x[1]}</em>
                </span>
                <input
                  type="range"
                  min="0"
                  max="25"
                  defaultValue={Number(x[1].split(" ")[0])}
                />
              </label>
            ))}
          </div>
          <textarea placeholder="Kod satırına veya teslimin geneline akademik geri bildirim yaz..." />
          <footer>
            <button
              onClick={() => note("Teslim revizyon için öğrenciye gönderildi.")}
            >
              Revizyon iste
            </button>
            <button
              onClick={() =>
                note("Proje doğrulandı ve Skill Passport’a işlendi.")
              }
            >
              Doğrula · 84 puan
            </button>
          </footer>
        </article>
      </div>
    </section>
  );
}

function CareerMatch({ note, go }: any) {
  const roles = [
    [
      "Junior Backend Developer",
      78,
      ["Python", "SQL", "REST API"],
      "Git %68 → %75",
    ],
    [
      "Veri Analizi Stajyeri",
      72,
      ["Python", "Pandas", "SQL"],
      "Pandas projesi",
    ],
    ["QA Automation Intern", 66, ["Python", "Test", "Git"], "Test otomasyonu"],
  ];
  return (
    <section>
      <div className="pageTitle">
        <div>
          <small>BECERİDEN KARİYERE</small>
          <h1>Kariyer Eşleşmesi</h1>
          <p>
            Skill Passport verilerin, proje kanıtların ve hedeflerinle uygun
            rolleri keşfet.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => note("Kariyer hedefi düzenleme ekranı açıldı.")}
        >
          Hedefimi düzenle
        </button>
      </div>
      <div className="careerHero">
        <div>
          <small>HEDEF ROL</small>
          <h2>Backend Developer</h2>
          <p>
            Mevcut beceri profilinle başlangıç seviyesi rollere{" "}
            <b>%78 hazırsın.</b>
          </p>
          <div>
            <i style={{ width: "78%" }} />
          </div>
        </div>
        <aside>
          <small>BU HAFTAKİ EN ETKİLİ ADIM</small>
          <b>REST API projesini tamamla</b>
          <p>Hazırlık skoruna yaklaşık +7 puan kazandırır.</p>
          <button onClick={() => go("projects")}>Projeye git →</button>
        </aside>
      </div>
      <div className="roleGrid">
        {roles.map((r, i) => (
          <article key={String(r[0])}>
            <header>
              <i>{i + 1}</i>
              <strong>%{r[1]} eşleşme</strong>
            </header>
            <h2>{r[0]}</h2>
            <div className="roleTags">
              {(r[2] as string[]).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p>
              <b>Sonraki gelişim adımı:</b> {r[3]}
            </p>
            <footer>
              <button onClick={() => note(`${r[0]} rol haritası açıldı.`)}>
                Rol haritası
              </button>
              <button
                onClick={() => note("Skill Passport bu role göre güncellendi.")}
              >
                Hedefle
              </button>
            </footer>
          </article>
        ))}
      </div>
      <section className="careerEvidence">
        <div>
          <small>İŞVERENE GÖSTERİLEBİLİR KANIT</small>
          <h2>CV cümlesi değil, çalışan proje.</h2>
          <p>
            Her eşleşme; test sonucu, akademisyen değerlendirmesi ve
            doğrulanabilir proje bağlantısıyla desteklenir.
          </p>
        </div>
        <button onClick={() => go("passport")}>
          Skill Passport’u görüntüle →
        </button>
      </section>
    </section>
  );
}

function Toast({ text }: { text: string }) {
  return <div className="toast">{text}</div>;
}
