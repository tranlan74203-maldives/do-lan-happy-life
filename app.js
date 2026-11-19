/* ==========================================================================
   LẨU TREO XÓM LÀO — Tương tác trang (Mobile-First UX)
   ========================================================================== */
"use strict";

/* --------------------------------------------------------------------------
   CẤU HÌNH CHUNG — chỉnh tại đây khi quán đổi giờ, số điện thoại
   -------------------------------------------------------------------------- */
const CONFIG = {
  phone: "0989706168",
  phoneDisplay: "0989 706 168",
  openMin: 12 * 60,          // 12:00
  closeMin: 23 * 60,         // 23:00
  lastSeatingMin: 21 * 60 + 30,
  timeZone: "Asia/Ho_Chi_Minh",
  lat: 11.9517756,           // Toạ độ chính xác từ Google Maps Place Embed của quán
  lng: 108.4910154,
  placeUrl:
    "https://www.google.com/maps?q=L%E1%BA%A9u%20Treo%20-%20N%C6%B0%E1%BB%9Bng%20BBQ,%20Khu%20quy%20t%C3%A1i%20%C4%91%E1%BB%8Bnh%20c%C6%B0,%20Hu%E1%BB%B3nh%20T%E1%BA%A5n%20Ph%C3%A1t,%20Xu%C3%A2n%20Tr%C6%B0%E1%BB%9Dng%20-%20%C4%90%C3%A0%20L%E1%BA%A1t,%20L%C3%A2m%20%C4%90%E1%BB%93ng%2066000&ftid=0x3171130b5121292b:0xb6551bd3dcccd97e",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=11.9517756%2C108.4910154",
  zaloUrl: "https://zalo.me/0989706168",
};

/* --------------------------------------------------------------------------
   THỰC ĐƠN — Danh mục món xác thực từ ảnh bếp quán (giá tham khảo, cập nhật khi có bảng giá in)
   -------------------------------------------------------------------------- */
const MENU = [
  { id: "lau-ga-la-que", name: "Lẩu gà lá quế", price: 259000, cat: "hotpot", signature: true, mild: true,
    desc: "Gà ta chắc thịt, nước dùng thanh, thơm lá quế. Kèm bún và rau Đà Lạt; ớt để riêng." },
  { id: "lau-ca-tam", name: "Lẩu cá tầm măng chua", price: 329000, cat: "hotpot",
    desc: "Cá tầm cắt khoanh dày, nước dùng chua nhẹ ấm nóng, ăn kèm rau rừng." },
  { id: "heo-nui-nuong", name: "Heo núi nướng", price: 179000, cat: "grill", signature: true,
    desc: "Tẩm ướp gia vị núi rừng, nướng trên lò đất nung, chấm muối ớt xanh." },
  { id: "bo-cuon-nam", name: "Ba chỉ bò cuộn nấm kim châm", price: 169000, cat: "grill", signature: true, mild: true,
    desc: "Cuộn bò mềm ngọt nước nấm tươi, kèm bông cải xanh, bắp ngọt và đậu bắp." },
  { id: "tom-bach-tuoc", name: "Tôm & bạch tuộc nướng muối ớt", price: 199000, cat: "grill", spicy: true,
    desc: "Hải sản tươi ướp đậm vị, nướng xém cạnh trên than hồng." },
  { id: "bo-nuong-tieu", name: "Bò nướng tiêu xanh", price: 189000, cat: "grill", spicy: true,
    desc: "Thăn bò thái dày, sốt tiêu xanh thơm nồng." },
  { id: "ba-chi-nuong-me", name: "Ba chỉ heo nướng mè", price: 149000, cat: "grill", mild: true,
    desc: "Thái lát vừa, ướp mè rang thơm dịu, chín nhanh trên than." },
  { id: "ga-nuong-mat-ong", name: "Gà nướng mật ong", price: 159000, cat: "grill", mild: true,
    desc: "Ngọt dịu, không cay. Món các bé thường thích." },
  { id: "chan-ga-muoi-ot", name: "Chân gà nướng muối ớt", price: 109000, cat: "grill", spicy: true,
    desc: "Giòn, cay vừa, hợp để nhâm nhi buổi tối." },
  { id: "com-chien-thom", name: "Cơm chiên trái thơm", price: 95000, cat: "sides", signature: true, mild: true,
    desc: "Hạt cơm chiên vàng tơi đựng trong nửa trái thơm Đà Lạt, vị dịu hợp trẻ nhỏ." },
  { id: "rau-cu-nuong", name: "Rau củ Đà Lạt nướng", price: 69000, cat: "sides", mild: true,
    desc: "Bắp ngọt, cà tím, ớt chuông, đậu bắp theo mùa." },
  { id: "cha-gio", name: "Chả giò giòn", price: 89000, cat: "sides", mild: true,
    desc: "Vỏ giòn rụm, nhân thịt và rau củ, ăn kèm rau sống." },
  { id: "salad-rau", name: "Salad rau Đà Lạt", price: 79000, cat: "sides", mild: true,
    desc: "Rau thuỷ canh hái trong ngày, sốt mè rang." },
  { id: "tra-atiso", name: "Ấm trà atiso nóng", price: 59000, cat: "sides", mild: true,
    desc: "Giữ ấm tay trong gió chiều Trại Mát." },
];

const COMBOS = {
  couple: {
    title: "Gợi ý cho hai người", guests: 2,
    note: "Vừa đủ cho một buổi chiều ngắm hoàng hôn: một nồi lẩu, một khay nướng và ấm trà nóng.",
    items: [["lau-ga-la-que", 1], ["heo-nui-nuong", 1], ["tra-atiso", 1]],
  },
  group4: {
    title: "Gợi ý cho nhóm bốn người", guests: 4,
    note: "Cân bằng giữa lẩu gà lá quế, thịt nướng lò đất, bò cuộn nấm và cơm chiên trái thơm.",
    items: [["lau-ga-la-que", 1], ["heo-nui-nuong", 1], ["bo-cuon-nam", 1], ["ba-chi-nuong-me", 1], ["com-chien-thom", 1], ["rau-cu-nuong", 1]],
  },
  family6: {
    title: "Gợi ý cho gia đình sáu người", guests: 6,
    note: "Hai vị lẩu và nhiều món không cay cho trẻ nhỏ, người lớn tuổi.",
    items: [["lau-ga-la-que", 1], ["lau-ca-tam", 1], ["ga-nuong-mat-ong", 1], ["bo-cuon-nam", 1], ["heo-nui-nuong", 1], ["com-chien-thom", 1], ["salad-rau", 1]],
  },
  group10: {
    title: "Gợi ý cho nhóm mười người", guests: 10,
    note: "Ba nồi lẩu, đủ cả thịt nướng lẫn hải sản cho một bàn dài. Nên đặt trước một ngày.",
    items: [["lau-ga-la-que", 2], ["lau-ca-tam", 1], ["heo-nui-nuong", 2], ["tom-bach-tuoc", 2], ["bo-cuon-nam", 2], ["ga-nuong-mat-ong", 1], ["com-chien-thom", 2], ["rau-cu-nuong", 2]],
  },
};

const GIFT_TIERS = [1000000, 2000000, 3000000];
const MOBILE_INITIAL_DISHES = 6;
const WEEKDAYS = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

/* --------------------------------------------------------------------------
   TIỆN ÍCH
   -------------------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const menuById = Object.fromEntries(MENU.map((m) => [m.id, m]));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";
const shortVnd = (n) => (n >= 1000000 ? `${(n / 1000000).toFixed(n % 100000 === 0 ? 1 : 2).replace(/\.?0+$/, "")}tr` : `${Math.round(n / 1000)}k`);
const pad = (n) => String(n).padStart(2, "0");
const fmtTime = (min) => `${pad(Math.floor(min / 60) % 24)}:${pad(min % 60)}`;
const roundTo = (min, step, mode = "round") => Math[mode](min / step) * step;

function track(event, params = {}) {
  try {
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    if (typeof window.fbq === "function") window.fbq("trackCustom", event, params);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
  } catch (_) { /* không ảnh hưởng trải nghiệm */ }
}

/** Ngày giờ hiện tại theo giờ Việt Nam */
function vnNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CONFIG.timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const y = +get("year"), m = +get("month"), d = +get("day");
  return { y, m, d, iso: `${y}-${pad(m)}-${pad(d)}`, minutes: +get("hour") * 60 + +get("minute") };
}

function addDaysIso(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

function nextSaturdayIso(nowIso) {
  const [y, m, d] = nowIso.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0=CN, 6=T7
  const offset = wd === 6 ? 7 : (6 - wd + 7) % 7;
  return addDaysIso(nowIso, offset);
}

/** Giờ mặt trời lặn tại Trại Mát (phút trong ngày, giờ VN) — thuật toán NOAA */
function sunsetMinutes(y, m, d) {
  const n = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 864e5) + 1;
  const g = (2 * Math.PI / 365) * (n - 1);
  const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g)
    - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g)
    - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
    - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const lat = (CONFIG.lat * Math.PI) / 180;
  const ha = (Math.acos(Math.cos((90.833 * Math.PI) / 180) / (Math.cos(lat) * Math.cos(decl))
    - Math.tan(lat) * Math.tan(decl)) * 180) / Math.PI;
  return Math.round(720 - 4 * (CONFIG.lng - ha) - eqTime + 7 * 60);
}

function sunsetForIso(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return sunsetMinutes(y, m, d);
}

function formatDateVi(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${WEEKDAYS[wd]}, ${pad(d)}/${pad(m)}/${y}`;
}

let toastTimer;
function showToast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3200);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
  ta.remove();
  return ok;
}

function openZaloWithMessage(message, toastOk) {
  const copying = copyText(message);
  window.open(CONFIG.zaloUrl, "_blank", "noopener");
  copying.then((ok) => showToast(ok ? toastOk : "Đã mở Zalo. Vui lòng nhắn số " + CONFIG.phoneDisplay));
}

/* --------------------------------------------------------------------------
   THÔNG TIN HÔM NAY: giờ mở cửa, hoàng hôn, nhiệt độ
   -------------------------------------------------------------------------- */
const today = { sunset: 17 * 60 + 18 };

function renderToday() {
  const now = vnNow();
  today.sunset = sunsetMinutes(now.y, now.m, now.d);

  const isOpen = now.minutes >= CONFIG.openMin && now.minutes < CONFIG.closeMin;
  const status = $("#open-status");
  if (status) {
    const label = isOpen
      ? `Đang mở cửa · đến ${fmtTime(CONFIG.closeMin)}`
      : now.minutes < CONFIG.openMin
        ? `Mở cửa lúc ${fmtTime(CONFIG.openMin)}`
        : `Đã đóng cửa · mở lại ${fmtTime(CONFIG.openMin)}`;
    status.innerHTML = `<span class="status-dot${isOpen ? "" : " closed"}"></span><span>${label}</span>`;
  }

  const hoursNote = $("#today-hours-note");
  if (hoursNote) {
    hoursNote.textContent = isOpen
      ? "Đang mở cửa"
      : now.minutes < CONFIG.openMin
        ? `Mở lúc ${fmtTime(CONFIG.openMin)} hôm nay`
        : "Mở lại trưa mai";
  }

  $("#today-sunset").textContent = fmtTime(today.sunset);
  $("#today-sunset-note").textContent = `Đến khoảng ${fmtTime(roundTo(today.sunset - 45, 15, "floor"))}`;
  $$(".js-sunset").forEach((el) => (el.textContent = fmtTime(today.sunset)));

  const tabTime = $("#tab-sunset-time");
  if (tabTime) {
    tabTime.textContent = `${fmtTime(roundTo(today.sunset - 60, 15, "floor"))} – ${fmtTime(roundTo(today.sunset + 25, 15, "ceil"))}`;
  }
}

async function loadTemperature() {
  const el = $("#today-temp");
  const note = $("#today-temp-note");
  if (!el) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${CONFIG.lat}&longitude=${CONFIG.lng}&current=temperature_2m&timezone=Asia%2FHo_Chi_Minh`;
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error("weather");
    const data = await res.json();
    const t = Math.round(data?.current?.temperature_2m);
    if (!Number.isFinite(t)) throw new Error("weather");
    el.textContent = `${t}°C`;
    note.textContent = t <= 18 ? "Lúc này · se lạnh" : "Nhiệt độ lúc này";
  } catch (_) {
    el.textContent = "15–18°C";
    note.textContent = "Buổi tối se lạnh";
  } finally {
    clearTimeout(timer);
  }
}

/* --------------------------------------------------------------------------
   KHUNG GIỜ ĐẸP
   -------------------------------------------------------------------------- */
const MOMENTS = {
  lunch: {
    img: "assets/img/lunch-spread.webp", w: 960, h: 717,
    alt: "Nồi lẩu và các món ăn buổi trưa trên bàn nhìn ra thung lũng nhà kính",
    title: "Bữa trưa giữa nắng trong",
    desc: "Buổi trưa ở Trại Mát nắng nhẹ, gió mát và ít đông. Phù hợp cho gia đình hoặc đoàn khách vừa tham quan chùa Linh Phước, đồi chè Cầu Đất trở về.",
    note: () => "Đi theo đoàn, bạn nên đặt trước để bếp chuẩn bị kịp trong khoảng 12:00 – 13:00.",
    slot: () => 12 * 60,
  },
  sunset: {
    img: "assets/img/balloons-sunset.webp", w: 960, h: 717,
    alt: "Khinh khí cầu và lan can lúc hoàng hôn tại Xóm Lào",
    title: "Hoàng hôn trên thung lũng",
    desc: "Khoảng một giờ trước khi mặt trời lặn, bầu trời chuyển dần từ vàng sang cam rồi tím. Nếu đúng ngày, bạn còn thấy chuyến tàu chiều Đà Lạt – Trại Mát chạy ngang thung lũng.",
    note: () => `Hôm nay mặt trời lặn lúc ${fmtTime(today.sunset)}. Nên có mặt trước khoảng 45 phút để chọn bàn sát lan can.`,
    slot: () => roundTo(today.sunset - 45, 30, "floor"),
  },
  night: {
    img: "assets/img/valley-lights.webp", w: 960, h: 717,
    alt: "Thung lũng nhà kính lên đèn vào buổi tối, nhìn từ Xóm Lào",
    title: "Khi thung lũng lên đèn",
    desc: "Sau hoàng hôn, hàng nghìn nhà kính dưới thung lũng lần lượt bật sáng. Đây là lúc nồi lẩu nóng và bếp than trở nên đáng giá nhất.",
    note: () => `Thung lũng thường sáng đèn từ khoảng ${fmtTime(roundTo(today.sunset + 45, 15))}. Tối thứ Sáu đến Chủ nhật có thêm tàu đêm Đà Lạt – Trại Mát.`,
    slot: () => roundTo(today.sunset + 45, 30, "ceil"),
  },
};

let activeMoment = "sunset";

function selectMoment(key) {
  const data = MOMENTS[key];
  if (!data) return;
  activeMoment = key;
  $$(".tab").forEach((tab) => {
    const on = tab.dataset.moment === key;
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
  });
  $("#moment").setAttribute("aria-labelledby", `tab-${key}`);
  const img = $("#moment-img");
  img.style.opacity = "0.2";
  img.onload = () => (img.style.opacity = "1");
  img.src = data.img;
  img.width = data.w;
  img.height = data.h;
  img.alt = data.alt;
  $("#moment-title").textContent = data.title;
  $("#moment-desc").textContent = data.desc;
  $("#moment-note").textContent = data.note();
}

function initMoments() {
  const tabs = $$(".tab");
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectMoment(tab.dataset.moment));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      selectMoment(next.dataset.moment);
    });
  });
  $("#moment-book").addEventListener("click", () => {
    const slot = MOMENTS[activeMoment].slot();
    goToBooking({ time: slot });
    track("select_moment", { moment: activeMoment });
  });
  selectMoment("sunset");
}

/* --------------------------------------------------------------------------
   THỰC ĐƠN, COMBO, ƯỚC TÍNH & THANH ĐẶT BÀN THỐNG NHẤT TRÊN MOBILE
   -------------------------------------------------------------------------- */
const selection = new Map(); // id -> số lượng
let activeFilter = "all";
let activeCombo = "group4";
let mobileMenuExpanded = false;

function selectionTotal() {
  let sum = 0;
  selection.forEach((qty, id) => (sum += (menuById[id]?.price || 0) * qty));
  return sum;
}

function selectionCount() {
  let n = 0;
  selection.forEach((qty) => (n += qty));
  return n;
}

function selectionText() {
  return Array.from(selection.entries())
    .map(([id, qty]) => `${menuById[id].name}${qty > 1 ? ` ×${qty}` : ""}`)
    .join(", ");
}

function comboTotal(combo) {
  return combo.items.reduce((sum, [id, qty]) => sum + menuById[id].price * qty, 0);
}

function giftsFor(total) {
  return GIFT_TIERS.filter((t) => total >= t).length;
}

function renderCombo() {
  const combo = COMBOS[activeCombo];
  const total = comboTotal(combo);
  $("#combo-title").textContent = combo.title;
  $("#combo-note").textContent = combo.note;
  $("#combo-list").innerHTML = combo.items
    .map(([id, qty]) => `<li><span>${menuById[id].name}${qty > 1 ? ` × ${qty}` : ""}</span><span>${vnd(menuById[id].price * qty)}</span></li>`)
    .join("");
  const per = roundTo(total / combo.guests, 1000);
  $("#combo-per").innerHTML = `${vnd(per)} <small>/ người</small>`;
  const gifts = giftsFor(total);
  $("#combo-total").textContent = `Tổng ${vnd(total)}${gifts ? ` · được tặng ${gifts} phần heo núi nướng` : ""}`;
  $$(".seg-btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.combo === activeCombo)));
}

function loadComboIntoSelection(key) {
  selection.clear();
  COMBOS[key].items.forEach(([id, qty]) => selection.set(id, qty));
}

function renderOffer() {
  const total = selectionTotal();
  const max = GIFT_TIERS[GIFT_TIERS.length - 1];
  $("#offer-fill").style.width = `${Math.min(100, (total / max) * 100)}%`;
  $$(".tier").forEach((el) => el.classList.toggle("is-on", total >= Number(el.dataset.tier)));

  const status = $("#offer-status");
  const gifts = giftsFor(total);
  const next = GIFT_TIERS.find((t) => total < t);
  if (total === 0) {
    status.textContent = "Chọn món để xem bạn đang ở mốc ưu đãi nào.";
  } else if (gifts === 0) {
    status.innerHTML = `Tạm tính <strong>${vnd(total)}</strong>. Thêm <strong>${vnd(next - total)}</strong> để được tặng một phần heo núi nướng.`;
  } else if (next) {
    status.innerHTML = `Tạm tính <strong>${vnd(total)}</strong>, được tặng <strong>${gifts} phần heo núi nướng</strong>. Thêm ${vnd(next - total)} để nhận phần tiếp theo.`;
  } else {
    status.innerHTML = `Tạm tính <strong>${vnd(total)}</strong>, được tặng <strong>${gifts} phần heo núi nướng</strong>.`;
  }
}

function renderEstimate() {
  const bar = $("#estimate");
  const total = selectionTotal();
  const count = selectionCount();
  bar.classList.toggle("is-visible", count > 0);
  $("#estimate-total").textContent = vnd(total);
  const gifts = giftsFor(total);
  const next = GIFT_TIERS.find((t) => total < t);
  let sub = `${count} món`;
  if (gifts > 0) sub += ` · tặng ${gifts} phần heo núi`;
  else if (next) sub += ` · thêm ${vnd(next - total)} để nhận quà`;
  $("#estimate-sub").textContent = sub;

  // Đồng bộ nút Đặt bàn ở thanh đáy Mobile (không bao giờ bị chồng 2 thanh dính!)
  const thumbLabel = $("#thumb-book-label");
  if (thumbLabel) {
    thumbLabel.textContent = count > 0 ? `Đặt bàn · ${shortVnd(total)}` : "Đặt bàn";
  }
}

function dishRow(item, idx, shouldCollapseExtras) {
  const qty = selection.get(item.id) || 0;
  const meta = [];
  if (item.signature) meta.push(`<span class="is-sig"><svg class="ic ic-sm"><use href="#i-flame"/></svg>Món nên thử</span>`);
  if (item.mild) meta.push(`<span class="is-mild"><svg class="ic ic-sm"><use href="#i-heart"/></svg>Không cay</span>`);
  if (item.spicy) meta.push(`<span>Cay vừa</span>`);
  const label = qty ? `<svg class="ic ic-sm"><use href="#i-check"/></svg>Đã chọn${qty > 1 ? ` ×${qty}` : ""}` : `<svg class="ic ic-sm"><use href="#i-plus"/></svg>Thêm`;
  const extraClass = shouldCollapseExtras && idx >= MOBILE_INITIAL_DISHES ? " is-extra" : "";
  return `
    <article class="dish${extraClass}">
      <h4 class="dish-name">${item.name}</h4>
      <span class="dish-price">${vnd(item.price)}</span>
      <div>
        <p class="dish-desc">${item.desc}</p>
        ${meta.length ? `<div class="dish-meta">${meta.join("")}</div>` : ""}
      </div>
      <button type="button" class="dish-add" data-id="${item.id}" aria-pressed="${qty > 0}" aria-label="${qty ? "Bỏ chọn" : "Thêm"} ${item.name}">${label}</button>
    </article>`;
}

function renderMenu() {
  const list = MENU.filter((item) => {
    switch (activeFilter) {
      case "signature": return item.signature;
      case "mild": return item.mild;
      case "all": return true;
      default: return item.cat === activeFilter;
    }
  });

  const menuEl = $("#menu-list");
  const moreWrap = $("#menu-more-wrap");
  const moreBtn = $("#menu-more-btn");
  const canCollapse = activeFilter === "all" && list.length > MOBILE_INITIAL_DISHES;

  menuEl.classList.toggle("is-expanded", mobileMenuExpanded || !canCollapse);
  menuEl.innerHTML = list.map((item, idx) => dishRow(item, idx, canCollapse)).join("");

  if (moreWrap && moreBtn) {
    moreWrap.hidden = !canCollapse;
    const hiddenCount = list.length - MOBILE_INITIAL_DISHES;
    moreBtn.textContent = mobileMenuExpanded
      ? "Thu gọn danh sách món"
      : `Xem thêm ${hiddenCount} món khác trong thực đơn`;
  }
}

function refreshMenuState() {
  renderMenu();
  renderOffer();
  renderEstimate();
}

function centerInStrip(strip, el) {
  if (!strip || !el) return;
  const target = el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2;
  strip.scrollTo({
    left: Math.max(0, target),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

function initMenu() {
  $$(".seg-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      activeCombo = btn.dataset.combo;
      loadComboIntoSelection(activeCombo);
      renderCombo();
      refreshMenuState();
      track("select_combo", { combo: activeCombo });
    })
  );

  $$(".chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter;
      $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      centerInStrip(chip.parentElement, chip);
      renderMenu();
    })
  );

  const moreBtn = $("#menu-more-btn");
  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      mobileMenuExpanded = !mobileMenuExpanded;
      renderMenu();
    });
  }

  $("#menu-list").addEventListener("click", (e) => {
    const btn = e.target.closest(".dish-add");
    if (!btn) return;
    const id = btn.dataset.id;
    if (selection.has(id)) selection.delete(id);
    else {
      selection.set(id, 1);
      track("add_item", { item: id });
    }
    refreshMenuState();
  });

  $("#combo-book").addEventListener("click", () => {
    const combo = COMBOS[activeCombo];
    loadComboIntoSelection(activeCombo);
    refreshMenuState();
    goToBooking({ adults: combo.guests, withSelection: true });
  });

  $("#estimate-book").addEventListener("click", () => goToBooking({ withSelection: true }));
  $("#estimate-clear").addEventListener("click", () => {
    selection.clear();
    refreshMenuState();
  });

  const thumbBook = $("#thumb-book-btn");
  if (thumbBook) {
    thumbBook.addEventListener("click", (e) => {
      if (selectionCount() > 0) {
        e.preventDefault();
        goToBooking({ withSelection: true });
      }
    });
  }

  loadComboIntoSelection(activeCombo);
  renderCombo();
  refreshMenuState();
}

/* --------------------------------------------------------------------------
   CHỖ NGỒI (Cập nhật nhãn Đang chọn / Chạm chọn rõ nét ngoài trời)
   -------------------------------------------------------------------------- */
function setZone(value) {
  $$(".zone").forEach((z) => {
    const on = z.dataset.zone === value;
    z.setAttribute("aria-pressed", String(on));
    const pillText = $(".zone-pill-text", z);
    if (pillText) pillText.textContent = on ? "Đang chọn" : "Chọn";
  });
  const select = $("#f-zone");
  if (select && select.value !== value) select.value = value;
}

function initZones() {
  $$(".zone").forEach((zone) => {
    zone.addEventListener("click", () => {
      setZone(zone.dataset.zone);
      showToast(`Đã chọn khu vực: ${zone.dataset.zone}`);
    });
  });
  $("#f-zone").addEventListener("change", (e) => setZone(e.target.value));
}

/* --------------------------------------------------------------------------
   ĐẶT BÀN + NÚT CHỌN NHANH NGÀY TRÊN DI ĐỘNG
   -------------------------------------------------------------------------- */
function slotLabel(min, sunset) {
  let tag = "";
  if (min <= 13 * 60 + 30) tag = "bữa trưa";
  else if (min >= sunset - 75 && min <= sunset - 15) tag = "ngắm hoàng hôn";
  else if (min > sunset && min <= sunset + 120) tag = "thung lũng lên đèn";
  return tag ? `${fmtTime(min)} · ${tag}` : fmtTime(min);
}

function renderQuickDates() {
  const wrap = $("#quick-dates");
  const dateInput = $("#f-date");
  if (!wrap || !dateInput) return;

  const now = vnNow();
  const tomorrow = addDaysIso(now.iso, 1);
  const sat = nextSaturdayIso(now.iso);

  const presets = [
    { label: "Hôm nay", iso: now.iso },
    { label: "Ngày mai", iso: tomorrow },
  ];
  if (sat !== now.iso && sat !== tomorrow) {
    presets.push({ label: "Thứ Bảy", iso: sat });
  }

  wrap.innerHTML = presets
    .map((p) => `<button type="button" class="qdate-btn${dateInput.value === p.iso ? " is-active" : ""}" data-iso="${p.iso}">${p.label}</button>`)
    .join("");
}

function buildTimeOptions(preferred) {
  const dateInput = $("#f-date");
  const select = $("#f-time");
  const hint = $("#time-hint");
  const now = vnNow();

  if (dateInput.value === now.iso && now.minutes + 30 > CONFIG.lastSeatingMin) {
    dateInput.value = addDaysIso(now.iso, 1);
    hint.textContent = "Hôm nay đã qua giờ nhận khách, phiếu được chuyển sang ngày mai.";
  } else {
    hint.textContent = "";
  }

  renderQuickDates();

  const isToday = dateInput.value === now.iso;
  const sunset = sunsetForIso(dateInput.value || now.iso);
  const keep = preferred ?? (select.value ? Number(select.value) : roundTo(sunset - 45, 30, "floor"));

  const options = [];
  for (let m = CONFIG.openMin; m <= CONFIG.lastSeatingMin; m += 30) {
    const disabled = isToday && m < now.minutes + 30;
    options.push({ m, disabled });
  }
  select.innerHTML = options
    .map(({ m, disabled }) => `<option value="${m}"${disabled ? " disabled" : ""}>${slotLabel(m, sunset)}</option>`)
    .join("");

  const available = options.filter((o) => !o.disabled);
  const target = available.find((o) => o.m === keep) || available.find((o) => o.m >= keep) || available[0];
  if (target) select.value = String(target.m);
}

function stepValue(input, delta) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 99);
  const next = Math.min(max, Math.max(min, (Number(input.value) || min) + delta));
  input.value = next;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function updateKidsHint() {
  const kids = Number($("#f-kids").value) || 0;
  const hint = $("#kids-hint");
  hint.classList.toggle("is-good", kids > 0);
  hint.textContent = kids > 0
    ? "Quán sẽ chuẩn bị ghế cho bé, để ớt riêng và gợi ý món không cay."
    : "Báo số bé đi cùng để quán chuẩn bị ghế và món không cay.";
}

function upsertNote(text) {
  const note = $("#f-note");
  const lines = note.value.split("\n").filter((l) => !l.startsWith("Món dự kiến:"));
  if (text) lines.unshift(`Món dự kiến: ${text}`);
  note.value = lines.join("\n").trim();
}

function goToBooking({ time, adults, withSelection } = {}) {
  if (typeof adults === "number") $("#f-adults").value = adults;
  if (typeof time === "number") buildTimeOptions(time);
  if (withSelection) {
    upsertNote(selectionText());
    const hotpot = Array.from(selection.keys()).find((id) => menuById[id].cat === "hotpot");
    if (hotpot) {
      $("#f-preorder").checked = true;
      $("#flavor-wrap").hidden = false;
      $("#f-flavor").value = hotpot;
    }
  }
  $("#dat-ban").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  setTimeout(() => $("#f-name").focus({ preventScroll: true }), prefersReducedMotion ? 0 : 600);
}

function bookingCode() {
  return "XL-" + String(Math.floor(1000 + Math.random() * 9000));
}

function validateForm() {
  const name = $("#f-name");
  const phone = $("#f-phone");
  name.setCustomValidity(name.value.trim().length >= 2 ? "" : "Vui lòng nhập họ và tên.");
  const digits = phone.value.replace(/[^\d+]/g, "");
  const okPhone = /^(\+84|0)\d{9,10}$/.test(digits);
  phone.setCustomValidity(okPhone ? "" : "Số điện thoại chưa đúng, ví dụ 0909 123 456.");
  const form = $("#booking-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  return true;
}

let lastFocused = null;

function openModal(summaryRows, message, code, { delivered = false, phone = "" } = {}) {
  $("#modal-code").textContent = `Phiếu ${code}`;
  const titleEl = $("#modal-title");
  const descEl = $("#modal-desc");
  const zaloBtn = $("#modal-zalo");

  if (delivered) {
    if (titleEl) titleEl.textContent = "Đã gửi yêu cầu đặt bàn";
    if (descEl) {
      descEl.textContent =
        `Thông tin đặt bàn đã được chuyển thẳng tới quản lý Lẩu Treo Xóm Lào. Quán sẽ liên hệ số ${phone || "của bạn"} để xác nhận sớm nhất — hoặc bạn có thể nhắn thêm qua Zalo nếu cần giữ bàn gấp.`;
    }
    if (zaloBtn) zaloBtn.innerHTML = `<svg class="ic"><use href="#i-chat"/></svg>Nhắn thêm qua Zalo`;
  } else {
    if (titleEl) titleEl.textContent = "Còn một bước nữa";
    if (descEl) {
      descEl.textContent =
        "Gửi phiếu này cho quán để được xác nhận. Chọn Zalo, nội dung phiếu sẽ được sao chép sẵn — bạn chỉ cần dán và gửi.";
    }
    if (zaloBtn) zaloBtn.innerHTML = `<svg class="ic"><use href="#i-chat"/></svg>Sao chép &amp; mở Zalo`;
  }

  $("#modal-summary").innerHTML = summaryRows
    .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
    .join("");
  $("#modal-sms").href = `sms:${CONFIG.phone}?&body=${encodeURIComponent(message)}`;
  $("#modal-zalo").onclick = () => {
    openZaloWithMessage(message, "Đã sao chép phiếu. Dán vào khung chat Zalo để gửi cho quán.");
    track("send_booking", { channel: "zalo" });
  };
  $("#modal-sms").onclick = () => track("send_booking", { channel: "sms" });

  const modal = $("#booking-modal");
  lastFocused = document.activeElement;
  modal.hidden = false;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  $("#modal-zalo").focus();
}

function closeModal() {
  const modal = $("#booking-modal");
  modal.classList.remove("is-open");
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

function localChatbotReply(userText) {
  const q = userText.toLowerCase();
  const hasPhone = /(0|\+84)\d{8,10}/.test(q.replace(/[\s.-]/g, ""));
  if (hasPhone) {
    return {
      reply:
        "Dạ em đã ghi nhận số điện thoại và yêu cầu giữ bàn của anh/chị rồi ạ! Quản lý quán sẽ liên hệ xác nhận với mình ngay. Anh/chị cần dặn bếp chuẩn bị sẵn Lẩu gà lá quế trước khi đến không ạ?",
      leadCaptured: true,
      suggestedQuestion: "Món ngon & món không cay cho bé?",
    };
  }
  if (q.includes("hoàng hôn") || q.includes("giờ") || q.includes("đặt bàn") || q.includes("giữ bàn")) {
    return {
      reply:
        `Dạ hôm nay mặt trời lặn khoảng ${fmtTime(today.sunset)}. Anh/chị nên đến tầm ${fmtTime(roundTo(today.sunset - 45, 15, "floor"))} để chọn bàn Dọc lan can ngắm trọn hoàng hôn và thung lũng lên đèn ạ.\n\nAnh/chị đi mấy người và muốn đặt lúc mấy giờ? Nhắn giúp em Tên + Số điện thoại tại đây hoặc điền Phiếu đặt bàn ngay trên trang nhé!`,
      leadCaptured: false,
      suggestedQuestion: "Món ngon & món không cay cho bé?",
    };
  }
  if (q.includes("món") || q.includes("không cay") || q.includes("bé") || q.includes("trẻ") || q.includes("lẩu") || q.includes("giá")) {
    return {
      reply:
        "Dạ món đặc trưng nhất tại quán là Lẩu gà lá quế (259.000đ) — nước dùng thanh ngọt, thơm lá quế, ớt để riêng nên bé ăn thoải mái ạ!\n\nNgoài ra các bé rất thích Gà nướng mật ong (159.000đ), Ba chỉ bò cuộn nấm (169.000đ) và Cơm chiên trái thơm (95.000đ). Anh/chị có thể bấm chọn món ngay ở mục Thực đơn để ước tính chi phí nhé!",
      leadCaptured: false,
      suggestedQuestion: "Trời mưa có khu mái che không?",
    };
  }
  if (q.includes("mưa") || q.includes("mái che") || q.includes("chỗ ngồi") || q.includes("lan can")) {
    return {
      reply:
        "Dạ quán có cả khu bàn Dọc lan can ngoài trời cạnh khinh khí cầu lẫn Khu sảnh mái che kiên cố, rộng rãi và ấm áp, vẫn nhìn thẳng ra toàn cảnh thung lũng nhà kính Trại Mát. Ngày mưa hoặc đi cùng ông bà, em bé đều ngồi rất yên tâm ạ!",
      leadCaptured: false,
      suggestedQuestion: "Chỉ đường & đỗ xe từ chợ Đà Lạt",
    };
  }
  if (q.includes("đường") || q.includes("địa chỉ") || q.includes("ở đâu") || q.includes("đỗ xe") || q.includes("ô tô")) {
    return {
      reply:
        "Dạ quán nằm tại Lô C1, Khu tái định cư Huỳnh Tấn Phát, Trại Mát, Đà Lạt (cách chợ Đà Lạt khoảng 7–8km, đi tầm 15–20 phút). Đường nhựa rộng rãi, có chỗ đỗ xe máy và ô tô thoải mái. Từ xa anh/chị sẽ thấy biển đèn đỏ lớn và 2 khinh khí cầu màu cam ngay cạnh quán ạ!",
      leadCaptured: false,
      suggestedQuestion: "Đặt bàn ngắm hoàng hôn chiều nay",
    };
  }
  return {
    reply:
      "Dạ cảm ơn anh/chị đã nhắn tin cho Lẩu Treo Xóm Lào! Quán mở cửa 12:00 – 23:00 hàng ngày tại Lô C1 Huỳnh Tấn Phát, Trại Mát.\n\nAnh/chị có thể để lại Tên + SĐT + Giờ đến + Số khách ngay trong khung chat này để em giữ bàn đẹp ngắm hoàng hôn, hoặc gọi hotline 0989 706 168 nhé ạ!",
    leadCaptured: false,
    suggestedQuestion: "Đặt bàn ngắm hoàng hôn chiều nay",
  };
}

async function submitBookingToServer(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) return { ok: true, telegramNotified: false, demoMode: true };
    const data = await res.json().catch(() => ({}));
    return { ok: Boolean(data?.ok ?? true), telegramNotified: Boolean(data?.telegramNotified) };
  } catch {
    return { ok: true, telegramNotified: false, demoMode: true };
  } finally {
    clearTimeout(timer);
  }
}

function initBooking() {
  const now = vnNow();
  const dateInput = $("#f-date");
  dateInput.min = now.iso;
  dateInput.max = addDaysIso(now.iso, 90);
  dateInput.value = now.iso;
  buildTimeOptions();

  dateInput.addEventListener("change", () => {
    if (!dateInput.value || dateInput.value < now.iso) dateInput.value = now.iso;
    buildTimeOptions();
  });

  const quickWrap = $("#quick-dates");
  if (quickWrap) {
    quickWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".qdate-btn");
      if (!btn) return;
      dateInput.value = btn.dataset.iso;
      buildTimeOptions();
    });
  }

  $$(".stepper button").forEach((btn) =>
    btn.addEventListener("click", () => stepValue($("#" + btn.dataset.target), Number(btn.dataset.step)))
  );
  $("#f-kids").addEventListener("input", updateKidsHint);
  updateKidsHint();

  const flavor = $("#f-flavor");
  flavor.innerHTML = MENU.filter((m) => m.cat === "hotpot")
    .map((m) => `<option value="${m.id}">${m.name} · ${vnd(m.price)}</option>`)
    .join("");
  const preorder = $("#f-preorder");
  preorder.addEventListener("change", () => ($("#flavor-wrap").hidden = !preorder.checked));

  $("#booking-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitBtn = $("#booking-submit");
    const origBtnText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Đang gửi…";
    }

    const code = bookingCode();
    const name = $("#f-name").value.trim();
    const phone = $("#f-phone").value.trim();
    const dateLabel = formatDateVi(dateInput.value);
    const time = fmtTime(Number($("#f-time").value));
    const adults = Number($("#f-adults").value) || 1;
    const kids = Number($("#f-kids").value) || 0;
    const guests = `${adults} người lớn${kids ? `, ${kids} trẻ em` : ""}`;
    const zone = $("#f-zone").value;
    const occasion = $("#f-occasion").value;
    const hotpot = preorder.checked ? menuById[flavor.value].name : "";
    const note = $("#f-note").value.trim();
    const estSum = selectionTotal();

    const message = [
      `Phiếu đặt bàn ${code} · Lẩu Treo Xóm Lào`,
      `Tên: ${name}`,
      `Điện thoại: ${phone}`,
      `Thời gian: ${time}, ${dateLabel}`,
      `Số khách: ${guests}`,
      `Khu vực: ${zone}`,
      occasion && `Dịp: ${occasion}`,
      hotpot && `Chuẩn bị sẵn: ${hotpot}`,
      note && `Ghi chú: ${note}`,
    ].filter(Boolean).join("\n");

    const rows = [
      ["Khách", `${name} · ${phone}`],
      ["Thời gian", `${time}, ${dateLabel}`],
      ["Số khách", guests],
      ["Khu vực", zone],
    ];
    if (occasion) rows.push(["Dịp", occasion]);
    if (hotpot) rows.push(["Lẩu", hotpot]);

    const apiRes = await submitBookingToServer({
      source: "booking_form",
      code,
      name,
      phone,
      date: dateInput.value,
      dateLabel,
      time,
      adults,
      kids,
      guests,
      zone,
      occasion,
      hotpot,
      note,
      estimateTotal: estSum > 0 ? vnd(estSum) : "",
    });

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = origBtnText || "Gửi yêu cầu đặt bàn";
    }

    openModal(rows, message, code, { delivered: apiRes.ok, phone });
    track("submit_booking", {
      adults,
      kids,
      preorder: Boolean(hotpot),
      telegram_notified: apiRes.telegramNotified,
    });
  });

  $("#modal-close").addEventListener("click", closeModal);
  $("#booking-modal").addEventListener("click", (e) => {
    if (e.target.id === "booking-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#booking-modal").classList.contains("is-open")) closeModal();
  });
}

/* --------------------------------------------------------------------------
   MOBILE SCROLL-SPY SUBNAV & TOUCH-SAFE MAP GUARD
   -------------------------------------------------------------------------- */
function initMobileSubnavAndMap() {
  const subnav = $(".mobile-subnav");
  const links = $$(".mobile-subnav a[data-spy]");
  if (links.length && "IntersectionObserver" in window) {
    const linkById = Object.fromEntries(links.map((a) => [a.dataset.spy, a]));
    let lastActiveId = "";
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (id === lastActiveId) return;
          const active = linkById[id];
          if (!active) return;
          lastActiveId = id;
          links.forEach((a) => a.classList.toggle("is-active", a === active));
          // Chỉ cuộn ngang bên trong thanh subnav, tuyệt đối không dùng scrollIntoView gây giật cuộn dọc trên điện thoại
          centerInStrip(subnav, active);
        });
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: 0 }
    );
    links.forEach((a) => {
      const sec = document.getElementById(a.dataset.spy);
      if (sec) spy.observe(sec);
    });
  }

  const guard = $("#map-guard");
  const unlock = $("#map-unlock");
  if (guard && unlock) {
    unlock.addEventListener("click", () => {
      guard.classList.add("is-interactive");
    });
  }
}

/* --------------------------------------------------------------------------
   VIDEO PHÓNG SỰ HTV9 CAFETEK: chỉ tải khi khách bấm xem, tự tạm dừng khi khuất
   -------------------------------------------------------------------------- */
function initVideos() {
  const htvWrap = $("#htv-wrap");
  const htvVideo = $("#htv-video");
  const htvPlay = $("#htv-play");

  if (htvWrap && htvVideo && htvPlay) {
    htvPlay.addEventListener("click", () => {
      if (!htvVideo.getAttribute("src") && htvVideo.dataset.src) {
        htvVideo.src = htvVideo.dataset.src;
      }
      htvWrap.classList.add("is-playing");
      htvVideo.controls = true;
      htvVideo.muted = false;
      const playPromise = htvVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          htvVideo.muted = true;
          htvVideo.play().catch(() => {});
        });
      }
      track("play_htv_video");
    });

    htvVideo.addEventListener("ended", () => {
      htvVideo.controls = false;
      htvVideo.currentTime = 0;
      htvWrap.classList.remove("is-playing");
    });

    if ("IntersectionObserver" in window) {
      const pauseOffscreen = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ isIntersecting }) => {
            if (!isIntersecting && !htvVideo.paused) {
              htvVideo.pause();
            }
          });
        },
        { threshold: 0.08 }
      );
      pauseOffscreen.observe(htvWrap);
    }
  }
}

/* --------------------------------------------------------------------------
   NÚT HÀNH ĐỘNG CHUNG
   -------------------------------------------------------------------------- */
function initActions() {
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (el) {
      const action = el.dataset.action;
      if (action === "directions") {
        window.open(CONFIG.directionsUrl, "_blank", "noopener");
        track("click_directions");
      } else if (action === "map") {
        window.open(CONFIG.placeUrl, "_blank", "noopener");
        track("click_map");
      } else if (action === "zalo") {
        openZaloWithMessage(
          "Chào quán, cho mình hỏi về đặt bàn và vị trí Lẩu Treo Xóm Lào ạ.",
          "Đã sao chép lời nhắn. Dán vào Zalo để gửi cho quán."
        );
        track("click_zalo");
      }
    }
    const tel = e.target.closest('a[href^="tel:"]');
    if (tel) track("click_call", { phone: tel.getAttribute("href").slice(4) });
  });
}

/* --------------------------------------------------------------------------
   AI CHATBOT WIDGET (Tư vấn thực đơn, chỉ đường & nhận đặt bàn gửi Telegram)
   -------------------------------------------------------------------------- */
function initChatbot() {
  const launcher = $("#chat-launcher");
  const nudge = $("#chat-nudge");
  const nudgeOpen = $("#chat-nudge-open");
  const nudgeClose = $("#chat-nudge-close");
  const fab = $("#chat-fab");
  const panel = $("#chat-panel");
  const closeBtn = $("#chat-close");
  const resetBtn = $("#chat-reset");
  const listEl = $("#chat-messages");
  const quickEl = $("#chat-quick");
  const form = $("#chat-form");
  const input = $("#chat-input");
  const sendBtn = $("#chat-send");

  if (!fab || !panel || !listEl || !form || !input) return;

  const STORAGE_KEY_MSGS = "xomlao_chat_messages_v1";
  const STORAGE_KEY_SID = "xomlao_chat_session_v1";
  const STORAGE_KEY_NUDGE = "xomlao_chat_nudge_dismissed";

  const INITIAL_GREETING = {
    role: "assistant",
    content:
      "Chào anh/chị! Em là Trợ lý AI của Lẩu Treo Xóm Lào (Trại Mát, Đà Lạt).\n\nAnh/chị cần giữ bàn ngắm hoàng hôn, chọn món cho gia đình hay hỏi đường lên quán cứ nhắn ngay tại đây để em hỗ trợ nhé ạ!",
  };

  const DEFAULT_PROMPTS = [
    "Đặt bàn ngắm hoàng hôn chiều nay",
    "Món ngon & món không cay cho bé?",
    "Trời mưa có khu mái che không?",
    "Chỉ đường & đỗ xe từ chợ Đà Lạt",
  ];

  let sessionId = "";
  let messages = [INITIAL_GREETING];
  let isSending = false;
  let isOpen = false;
  let prevBodyOverflow = "";
  let dynamicSuggestion = null;

  try {
    sessionId = localStorage.getItem(STORAGE_KEY_SID) || "";
    if (!sessionId) {
      sessionId = `xl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      localStorage.setItem(STORAGE_KEY_SID, sessionId);
    }
    const saved = localStorage.getItem(STORAGE_KEY_MSGS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) messages = parsed;
    }
  } catch { /* ignore storage errors */ }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages.slice(-30)));
    } catch { /* ignore */ }
  }

  function escapeChatHtml(s = "") {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatBubbleHtml(text = "") {
    return escapeChatHtml(text)
      .split(/\n{2,}/)
      .map((para) => `<p>${para.replace(/\n/g, "<br>")}</p>`)
      .join("");
  }

  function scrollBottom() {
    requestAnimationFrame(() => {
      listEl.scrollTop = listEl.scrollHeight;
    });
  }

  function renderQuickChips() {
    if (!quickEl) return;
    if (isSending) {
      quickEl.innerHTML = "";
      return;
    }
    const chips =
      messages.length <= 2
        ? DEFAULT_PROMPTS
        : dynamicSuggestion
          ? [dynamicSuggestion]
          : [];
    quickEl.innerHTML = chips
      .map((q) => `<button type="button" class="chat-chip">${escapeChatHtml(q)}</button>`)
      .join("");
  }

  function renderMessages() {
    const html = messages
      .map((m) => {
        const cls = m.role === "user" ? "is-user" : "is-bot";
        const badge = m.leadCaptured
          ? `<span class="chat-lead-tag"><svg class="ic ic-sm"><use href="#i-check"/></svg>Đã chuyển thông tin tới quản lý quán</span>`
          : "";
        return `<div class="chat-msg ${cls}"><div class="chat-bubble">${formatBubbleHtml(m.content)}</div>${badge}</div>`;
      })
      .join("");

    const typingHtml = isSending
      ? `<div class="chat-msg is-bot" aria-label="Trợ lý đang phản hồi"><div class="chat-typing"><span></span><span></span><span></span></div></div>`
      : "";

    listEl.innerHTML = html + typingHtml;
    renderQuickChips();
    scrollBottom();
  }

  function syncViewport() {
    if (!isOpen) {
      panel.style.top = "";
      panel.style.height = "";
      panel.style.bottom = "";
      return;
    }
    if (window.innerWidth >= 640 || !window.visualViewport) {
      panel.style.top = "";
      panel.style.height = "";
      panel.style.bottom = "";
      return;
    }
    const vv = window.visualViewport;
    panel.style.top = `${Math.floor(vv.offsetTop)}px`;
    panel.style.height = `${Math.max(320, Math.floor(vv.height))}px`;
    panel.style.bottom = "auto";
    scrollBottom();
  }

  function dismissNudge(persistSession = true) {
    if (nudge) nudge.hidden = true;
    if (persistSession) {
      try { sessionStorage.setItem(STORAGE_KEY_NUDGE, "1"); } catch { /* ignore */ }
    }
  }

  function openChat() {
    if (isOpen) return;
    isOpen = true;
    dismissNudge(true);
    panel.hidden = false;
    (launcher || fab).classList.add("is-hidden");
    fab.setAttribute("aria-expanded", "true");
    if (window.innerWidth < 640) {
      prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    renderMessages();
    syncViewport();
    if (window.innerWidth >= 640) {
      setTimeout(() => input.focus({ preventScroll: true }), 80);
    }
    track("open_ai_chat");
  }

  function closeChat() {
    if (!isOpen) return;
    isOpen = false;
    panel.hidden = true;
    (launcher || fab).classList.remove("is-hidden");
    fab.setAttribute("aria-expanded", "false");
    if (window.innerWidth < 640) {
      document.body.style.overflow = prevBodyOverflow;
    }
    syncViewport();
  }

  async function sendMessage(rawText) {
    const text = String(rawText ?? input.value).trim();
    if (!text || isSending) return;

    messages.push({ role: "user", content: text });
    input.value = "";
    sendBtn.disabled = true;
    isSending = true;
    dynamicSuggestion = null;
    persist();
    renderMessages();

    let data = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (res.ok) {
          data = await res.json();
          break;
        }
        if (res.status < 500 || attempt === 2) {
          data = await res.json().catch(() => null);
          break;
        }
      } catch {
        if (attempt === 2) break;
        await new Promise((r) => setTimeout(r, 450));
      }
    }

    if (!data || !data.reply) {
      await new Promise((r) => setTimeout(r, 450));
      data = localChatbotReply(text);
    }

    isSending = false;
    if (data && data.reply) {
      messages.push({
        role: "assistant",
        content: data.reply,
        leadCaptured: Boolean(data.leadCaptured),
      });
      dynamicSuggestion = data.suggestedQuestion || null;
      if (data.leadCaptured) {
        track("chatbot_lead_captured");
      }
    }

    persist();
    renderMessages();
    if (window.innerWidth >= 640) input.focus({ preventScroll: true });
  }

  fab.addEventListener("click", openChat);
  if (nudgeOpen) nudgeOpen.addEventListener("click", openChat);
  if (nudgeClose) nudgeClose.addEventListener("click", () => dismissNudge(true));

  // Hiện bong bóng mời chào nổi bật (trên Desktop sau 1.8s; trên Mobile khi cuộn qua đầu trang để không che nút mạng xã hội)
  try {
    if (nudge && !sessionStorage.getItem(STORAGE_KEY_NUDGE)) {
      const revealNudge = () => {
        if (!isOpen && !sessionStorage.getItem(STORAGE_KEY_NUDGE)) {
          nudge.hidden = false;
        }
      };
      if (window.innerWidth >= 1024) {
        setTimeout(revealNudge, 1800);
      } else {
        const onMobileScroll = () => {
          if (window.scrollY > 220) {
            revealNudge();
            window.removeEventListener("scroll", onMobileScroll);
          }
        };
        window.addEventListener("scroll", onMobileScroll, { passive: true });
      }
    }
  } catch { /* ignore */ }

  if (closeBtn) closeBtn.addEventListener("click", closeChat);
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      sessionId = `xl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      messages = [INITIAL_GREETING];
      dynamicSuggestion = null;
      try {
        localStorage.setItem(STORAGE_KEY_SID, sessionId);
        localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
      } catch { /* ignore */ }
      renderMessages();
    });
  }

  input.addEventListener("input", () => {
    sendBtn.disabled = !input.value.trim() || isSending;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
  });

  if (quickEl) {
    quickEl.addEventListener("click", (e) => {
      const chip = e.target.closest(".chat-chip");
      if (chip) sendMessage(chip.textContent);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeChat();
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncViewport);
    window.visualViewport.addEventListener("scroll", syncViewport);
  }
  window.addEventListener("resize", syncViewport);
  window.openXomLaoChat = openChat;
}

/* -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderToday();
  initMoments();
  initMenu();
  initZones();
  initBooking();
  initMobileSubnavAndMap();
  initVideos();
  initActions();
  initChatbot();
  loadTemperature();
  $("#year").textContent = String(vnNow().y);
  setInterval(renderToday, 60000);
});
