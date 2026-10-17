// Product listing (products.html) and product details (product.html).
const params = new URLSearchParams(location.search);
const grid = document.getElementById("grid");
if (grid) {
  const cat = params.get("category") || "all";
  const tabs = {all:"All", ...CATS};
  document.getElementById("pills").innerHTML = Object.entries(tabs).map(([k,v]) =>
    `<a class="pill ${k===cat?"on":""}" href="products.html${k==="all"?"":"?category="+k}">${v}</a>`).join("");
  const list = loadChickens().filter(c => cat === "all" || c.category === cat);
  grid.innerHTML = list.map(card).join("") || '<p class="empty">No chickens found in this category yet.</p>';
}
const detail = document.getElementById("detail");
if (detail) {
  const c = getChickenById(params.get("id"));
  detail.innerHTML = !c ? '<p class="empty">Sorry, we could not find that chicken.</p>' : `
    <div>${img(c.image,c.name)}</div>
    <div><h1>${esc(c.name)}</h1><p style="color:var(--mute)">${esc(c.breed)}</p>
    <p class="price" style="font-size:1.8rem;margin:10px 0">${peso(c.price)}</p>${badge(c)}
    <dl class="spec"><dt>Age</dt><dd>${c.ageMonths} months (${CATS[c.category]})</dd><dt>Sex</dt><dd>${esc(c.sex)}</dd>
    <dt>Weight</dt><dd>${esc(c.weight)}</dd><dt>Temperament</dt><dd>${esc(c.temperament)}</dd>
    <dt>Stock</dt><dd>${c.stock} available</dd></dl><p>${esc(c.description)}</p></div>`;
}
