// Data layer: chickens live in localStorage. Sample data below is used the first time the site loads.
const KEY = "poultry_chickens_v1";
function mk(id,name,breed,age,price,stock,sex,weight,temperament,description,n){
  return {id,name,breed,ageMonths:age,category:age>=6?"6-months-and-older":age+"-months",price,description,
    availability:stock>0?"In Stock":"Out of Stock",stock,image:"images/chickens/chicken-"+n+".jpg",sex,weight,temperament};
}
const SEED = [
  mk(1,"Rusty","Rhode Island Red",4,650,12,"Male","1.4 kg","Active and friendly","Hardy young rooster with deep red feathers. Grows fast and adapts well to free-range raising.",1),
  mk(2,"Dalag","Native Chicken (Bisaya)",4,550,20,"Female","1.1 kg","Calm","Healthy native pullet, vaccinated and used to open yards. Good layer when grown.",2),
  mk(3,"Snowy","White Leghorn",4,600,8,"Female","1.2 kg","Alert","Slim white pullet from a strong egg-laying line. Lays large white eggs.",3),
  mk(4,"Itim","Black Australorp",5,800,6,"Male","1.9 kg","Docile","Glossy black rooster with a strong frame. Easy to handle and good for breeding.",4),
  mk(5,"Brownie","Brahma",5,900,4,"Female","2.1 kg","Gentle","Large, feathered-footed hen that handles heat and cold well. Calm around people.",5),
  mk(6,"Tinola","Broiler Cross",5,520,0,"Male","2.4 kg","Quiet","Fast-growing meat bird. Currently sold out, check back soon.",6),
  mk(7,"Kapitan","Native Rooster",6,1200,3,"Male","2.6 kg","Bold","Mature native rooster with strong legs and bright plumage. Ideal for breeding stock.",1),
  mk(8,"Mayang","Brown Layer Hen",7,850,10,"Female","2.0 kg","Friendly","Reliable brown layer already in production. Healthy and well fed.",5),
  mk(9,"Puti","White Leghorn",8,950,5,"Female","2.1 kg","Active","Adult layer with excellent egg output. Comes from a vaccinated flock.",3)
];
function saveChickens(a){ localStorage.setItem(KEY, JSON.stringify(a)); }
function loadChickens(){
  let d = null;
  try { d = JSON.parse(localStorage.getItem(KEY)); } catch(e) {}
  if (!Array.isArray(d)) { d = SEED; saveChickens(d); }
  return d;
}
function getChickenById(id){ return loadChickens().find(c => c.id == id); }
function addChicken(c){ const a = loadChickens(); c.id = Math.max(0, ...a.map(x => x.id)) + 1; a.push(c); saveChickens(a); }
function updateChicken(c){ saveChickens(loadChickens().map(x => x.id == c.id ? c : x)); }
function deleteChicken(id){ saveChickens(loadChickens().filter(x => x.id != id)); }
