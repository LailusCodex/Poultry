// Admin login + dashboard (add / edit / delete chickens). Demo login only: admin / admin123.
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  if (sessionStorage.getItem("admin")) location.href = "dashboard.html";
  loginForm.onsubmit = e => {
    e.preventDefault();
    if (document.getElementById("u").value === "admin" && document.getElementById("p").value === "admin123") {
      sessionStorage.setItem("admin","1"); location.href = "dashboard.html";
    } else document.getElementById("err").textContent = "Wrong username or password. Try again.";
  };
}
const tbody = document.getElementById("rows");
if (tbody) {
  if (!sessionStorage.getItem("admin")) location.href = "login.html";
  const dlg = document.getElementById("dlg"), f = document.getElementById("form");
  const photos = [1,2,3,4,5,6].map(i => `images/chickens/chicken-${i}.jpg`).concat("images/chickens/placeholder.jpg");
  f.image.innerHTML = photos.map(p => `<option>${p}</option>`).join("");
  f.category.innerHTML = Object.entries(CATS).map(([k,v]) => `<option value="${k}">${v}</option>`).join("");
  document.getElementById("logout").onclick = () => { sessionStorage.removeItem("admin"); location.href = "login.html"; };

  function render() {
    const a = loadChickens();
    const n = c => a.filter(x => x.category === c).length;
    document.getElementById("stats").innerHTML = [["Total",a.length],["In stock",a.filter(x=>x.stock>0).length],
      ["Out of stock",a.filter(x=>x.stock<=0).length],...Object.entries(CATS).map(([k,v])=>[v,n(k)])]
      .map(([l,v]) => `<div class="stat"><b>${v}</b>${l}</div>`).join("");
    tbody.innerHTML = a.map(c => `<tr><td>${img(c.image,c.name)}</td><td>${esc(c.name)}<br><small>${esc(c.breed)}</small></td>
      <td>${CATS[c.category]}</td><td>${peso(c.price)}</td><td>${c.stock}</td><td>${badge(c)}</td>
      <td><button class="btn sm o" data-e="${c.id}">Edit</button><button class="btn sm red" data-d="${c.id}">Delete</button></td></tr>`).join("");
  }
  function openForm(c) {
    f.reset(); document.getElementById("ftitle").textContent = c ? "Edit chicken" : "Add chicken";
    f.elements.id.value = c ? c.id : "";
    if (c) for (const k of ["name","breed","ageMonths","category","price","stock","sex","weight","temperament","description","image"]) f.elements[k].value = c[k];
    dlg.showModal();
  }
  document.getElementById("add").onclick = () => openForm();
  document.getElementById("cancel").onclick = () => dlg.close();
  tbody.onclick = e => {
    const ed = e.target.dataset.e, de = e.target.dataset.d;
    if (ed) openForm(getChickenById(ed));
    if (de && confirm("Delete this chicken? This cannot be undone.")) { deleteChicken(de); render(); }
  };
  f.onsubmit = e => {
    e.preventDefault();
    const x = f.elements, price = Number(x.price.value), stock = Number(x.stock.value), age = Number(x.ageMonths.value);
    if (!x.name.value.trim() || !x.breed.value.trim()) return alert("Name and breed are required.");
    if (price <= 0 || stock < 0 || age < 1) return alert("Enter a valid price, age, and stock.");
    const c = {id:x.id.value, name:x.name.value.trim(), breed:x.breed.value.trim(), ageMonths:age, category:x.category.value,
      price, stock, availability:stock>0?"In Stock":"Out of Stock", sex:x.sex.value, weight:x.weight.value,
      temperament:x.temperament.value, description:x.description.value.trim(), image:x.image.value};
    c.id ? updateChicken(c) : addChicken(c);
    dlg.close(); render();
  };
  render();
}
