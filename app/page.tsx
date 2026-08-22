"use client";
import { useMemo, useState } from "react";
type Role = "student" | "teacher";
type View =
  | "home"
  | "paths"
  | "tasks"
  | "calendar"
  | "lab"
  | "progress"
  | "assessment"
  | "projects"
  | "mentor"
  | "analytics"
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
      "sayilar = [4, 7, 12, 19, 24]\n\nfor sayi in sayilar:\n    # koşulu buraya yaz\n    pass",
    ),
    [output, setOutput] = useState("Hazır · Kodunu çalıştırabilirsin.");
  const [title, setTitle] = useState(""),
    [summary, setSummary] = useState(""),
    [studioTab, setStudioTab] = useState("İçerik");
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
    setLogged(true);
    setError("");
    setView(role === "teacher" ? "studio" : "home");
  }
  function open(c = selected) {
    setSelected(c);
    setView("lab");
  }
  function run() {
    const ok =
      /if\s+sayi\s*%\s*2\s*==\s*0/.test(code) &&
      /print\s*\(\s*sayi\s*\)/.test(code);
    setOutput(
      ok
        ? "4\n12\n24\n\n✓ 3/3 test geçti · +80 XP"
        : "✕ Test başarısız\nİpucu: sayi % 2 == 0 koşulunu kullan.",
    );
    if (ok) note("Görev tamamlandı. 80 XP kazandın!");
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
    ["tasks", "▣", "Görevlerim"],
    ["projects", "◆", "Projelerim"],
    ["calendar", "□", "Takvim"],
    ["lab", "</>", "Kod laboratuvarı"],
    ["mentor", "✦", "AI Kod Koçu"],
    ["progress", "↗", "Gelişimim"],
    ["news", "◉", "Duyurular"],
  ];
  const teacherNav: any = [
    ["studio", "＋", "İçerik stüdyosu"],
    ["analytics", "▥", "Analitik merkez"],
    ["tasks", "▣", "Görev yönetimi"],
    ["projects", "◆", "Proje inceleme"],
    ["paths", "⌘", "Ders patikaları"],
    ["calendar", "□", "Ders takvimi"],
    ["progress", "↗", "Yayınlananlar"],
    ["news", "◉", "Duyurular"],
  ];
  const nav = role === "student" ? studentNav : teacherNav;
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
          {nav.map((n: any) => (
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
          onClick={() => note("Yardım merkezi açılacak.")}
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
function Lab({ course, code, setCode, output, run, note }: any) {
  return (
    <section className="lab">
      <aside className="topics">
        <small>{course.code}</small>
        <h2>{course.name}</h2>
        {topics.map((t, i) => (
          <button
            key={t}
            className={i === 4 ? "on" : i < 4 ? "done" : ""}
            onClick={() => note(`${t} konusu açıldı.`)}
          >
            <i>{i < 4 ? "✓" : i + 1}</i>
            {t}
          </button>
        ))}
      </aside>
      <article className="lesson">
        <div className="crumb">{course.code} / Uygulama 05</div>
        <h1>Döngülerle veri filtreleme</h1>
        <p className="lead">
          Bir koleksiyondaki değerleri sırayla incelemek için <code>for</code>{" "}
          döngüsü kullanılır.
        </p>
        <aside>
          <b>Hedef</b> Listedeki çift sayıları koşul kullanarak bul ve ekrana
          yazdır.
        </aside>
        <h2>Örnek</h2>
        <pre>for sayi in sayilar:{"\n"} print(sayi)</pre>
        <div className="editor">
          <header>
            <span>main.py</span>
            <div>
              <button
                onClick={() => note("İpucu: Mod alma operatörü % kullan.")}
              >
                İpucu
              </button>
              <button
                onClick={() =>
                  setCode(
                    "sayilar = [4, 7, 12, 19, 24]\n\nfor sayi in sayilar:\n    if sayi % 2 == 0:\n        print(sayi)",
                  )
                }
              >
                Çözümü göster
              </button>
              <button onClick={run}>▶ Çalıştır</button>
            </div>
          </header>
          <textarea
            value={code}
            onChange={(e: any) => setCode(e.target.value)}
            spellCheck={false}
          />
          <footer>
            <b>ÇIKTI</b>
            <pre>{output}</pre>
          </footer>
        </div>
        <button
          className="next"
          onClick={() => note("Bir sonraki uygulama açıldı.")}
        >
          Sonraki uygulama →
        </button>
      </article>
      <aside className="labInfo">
        <article>
          <small>DERS İLERLEMESİ</small>
          <b>5 / 26</b>
          <div>
            <i />
          </div>
          <span>12 dakika kaldı</span>
        </article>
        <article>
          <small>KAZANIM</small>
          <p>
            Başarıyla tamamla: <b>80 XP</b>
          </p>
        </article>
        <article>
          <small>TESTLER</small>
          <p>Çıktı · Koşul · Kod kalitesi</p>
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
              <label>
                Ders anlatımı
                <textarea
                  className="long"
                  placeholder="Kavramı özgün ve sade biçimde anlatın..."
                />
              </label>
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
function Toast({ text }: { text: string }) {
  return <div className="toast">{text}</div>;
}
