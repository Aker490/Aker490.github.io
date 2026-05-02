const WORDS = [
  "Shadow","Nova","Echo","Blaze","Storm",
  "Wolf","Knight","Void","Zen","Pixel",
  "Ghost","Rogue","Flame","Cyber"
];

const MAX_LEN = 12;
const DELAY = 1300;

// 🔴 URL Worker ของคุณ
const API = "https://weathered-bird-0dfd.dhhdhdhdhdjrjdhdjdjdu.workers.dev";

function log(msg, cls = "") {
  const el = document.getElementById("log");
  el.innerHTML += `<span class="${cls}">${msg}</span>\n`;
  el.scrollTop = el.scrollHeight;
}

function generateName() {
  const w1 = WORDS[Math.floor(Math.random() * WORDS.length)];
  const w2 = WORDS[Math.floor(Math.random() * WORDS.length)];
  const num = Math.random() < 0.5 ? Math.floor(Math.random() * 999) : "";

  const useUnderscore = document.getElementById("useUnderscore").checked;
  const separator = useUnderscore ? "_" : "";

  return `${w1}${separator}${w2}${num}`.slice(0, MAX_LEN);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function start() {
  document.getElementById("log").textContent = "";

  const wanted = Number(document.getElementById("count").value);
  let found = 0;
  const checked = new Set();

  log("⏳ กำลังตรวจสอบ...\n");

  while (found < wanted) {
    const name = generateName();

    if (checked.has(name)) continue;
    checked.add(name);

    await sleep(DELAY);

    try {
      const res = await fetch(`${API}/check?name=${encodeURIComponent(name)}`);
      const data = await res.json();

      if (data.exist) {
        log(`[ซ้ำ] ${name}`, "warn");
      } 
      else if (!data.valid) {
        log(`[โดนกรอง] ${name}`, "bad");
      } 
      else {
        log(`[ใช้ได้] ${name}`, "good");
        found++;
      }

    } catch (err) {
      log(`[ERROR] ${name}`, "bad");
    }
  }

  log("\n✅ เสร็จสิ้น");
}

// 🔥 สำคัญมาก แก้ onclick ใช้ไม่ได้
window.start = start;
