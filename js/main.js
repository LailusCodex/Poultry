// Shared helpers, navbar, footer and homepage featured section.
const BASE = document.body.dataset.base || "";   // "../" on admin pages
const CATS = {"4-months":"4 Months","5-months":"5 Months","6-months-and-older":"6 Months & Older"};
const peso = n => "₱" + Number(n).toLocaleString();
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// Image with fallback to placeholder.jpg if the photo is missing
const img = (src, alt="") => `<img src="${BASE}${src}" alt="${esc(alt)}" loading="lazy" onerror="this.onerror=null;this.src='${BASE}images/chickens/placeholder.jpg'">`;
const badge = c => `<span class="badge ${c.stock>0?"ok":"no"}">${c.stock>0?"In Stock":"Out of Stock"}</span>`;
const card = c => `<a class="card" href="${BASE}product.html?id=${c.id}">${img(c.image,c.name)}<div class="b">
  <h3>${esc(c.name)}</h3><div class="m">${esc(c.breed)} · ${c.ageMonths} months</div>
  <p class="m">${esc(c.description.slice(0,70))}…</p><div class="price">${peso(c.price)}</div>${badge(c)}</div></a>`;

document.getElementById("nav").className = "nav";
document.getElementById("nav").innerHTML = `<div class="wrap"><a class="logo" href="${BASE}index.html">Poultry Shop</a>
  <button id="burger" aria-label="Menu">☰</button>
  <nav class="links" id="links"><a href="${BASE}index.html">Home</a><a href="${BASE}products.html">Products</a><a href="${BASE}admin/login.html">Admin</a></nav></div>`;
document.getElementById("foot").className = "foot";
document.getElementById("foot").innerHTML = `<div class="wrap">© ${new Date().getFullYear()} Poultry Shop · Healthy, farm-raised chickens</div>`;
document.getElementById("burger").onclick = () => document.getElementById("links").classList.toggle("open");

const feat = document.getElementById("featured");
if (feat) {
  const list = loadChickens().filter(c => c.stock > 0).slice(0, 3);
  feat.innerHTML = list.map(card).join("") || '<p class="empty">No chickens available right now.</p>';
}
