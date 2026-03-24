let cart = [];
let total = 0;

/* AGREGAR AL CARRITO */
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  actualizarCarrito();
}

/* ACTUALIZAR CARRITO */
function actualizarCarrito() {
  const lista = document.getElementById("cartItems");
  const contador = document.getElementById("count");
  const totalHTML = document.getElementById("total");

  lista.innerHTML = "";

  cart.forEach((producto, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${producto.name} - $${producto.price}
      <button onclick="eliminarProducto(${index})">❌</button>
    `;

    lista.appendChild(li);
  });

  contador.textContent = cart.length;
  totalHTML.textContent = total;
}

/* ELIMINAR PRODUCTO */
function eliminarProducto(index) {
  total -= cart[index].price;
  cart.splice(index, 1);

  actualizarCarrito();
}

/* ABRIR / CERRAR CARRITO */
function toggleCart() {
  document.getElementById("cartBox").classList.toggle("active");
}

/* BUSCADOR */
document.getElementById("search").addEventListener("input", function () {
  const texto = this.value.toLowerCase();
  const productos = document.querySelectorAll(".card");

  productos.forEach(producto => {
    const nombre = producto.dataset.name.toLowerCase();
    producto.style.display = nombre.includes(texto) ? "block" : "none";
  });
});

/* CALCULAR TOTAL */
function calcularTotal() {
  total = cart.reduce((acc, item) => acc + item.price, 0);
}

/* GUARDAR */
function guardarCarrito() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* AGREGAR */
function addToCart(name, price) {
  cart.push({ name, price });
  guardarCarrito();
  actualizarCarrito();
}

/* ACTUALIZAR */
function actualizarCarrito() {
  const lista = document.getElementById("cartItems");
  lista.innerHTML = "";

  calcularTotal();

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="eliminarProducto(${index})">❌</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("count").textContent = cart.length;
  document.getElementById("total").textContent = total;
}

/* ELIMINAR */
function eliminarProducto(index) {
  cart.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

/* TOGGLE */
function toggleCart() {
  document.getElementById("cartBox").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

/* BUSCADOR */
document.getElementById("search").addEventListener("input", function () {
  const texto = this.value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.dataset.name.includes(texto) ? "block" : "none";
  });
});

/* FILTRO */
document.getElementById("filter").addEventListener("change", function () {
  const val = this.value;

  document.querySelectorAll(".card").forEach(card => {
    card.style.display = (val === "all" || card.dataset.category === val) ? "block" : "none";
  });
});

/* PAGO */
function finalizarCompra() {
  if (cart.length === 0) {
    alert("Carrito vacío 🛒");
    return;
  }

  document.getElementById("paymentModal").classList.add("active");
}

function cerrarPago() {
  document.getElementById("paymentModal").classList.remove("active");
}

function procesarPago() {
  alert("Pago exitoso 💳🎉");

  cart = [];
  guardarCarrito();
  actualizarCarrito();
  cerrarPago();
  toggleCart();
}

/* FORM */
document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Mensaje enviado ✅");
  this.reset();
});

/* INICIAR */
actualizarCarrito();
/* FILTRO */
document.getElementById("filter").addEventListener("change", function () {
  const categoria = this.value;
  const productos = document.querySelectorAll(".card");

  productos.forEach(producto => {
    const cat = producto.dataset.category;

    if (categoria === "all" || categoria === cat) {
      producto.style.display = "block";
    } else {
      producto.style.display = "none";
    }
  });
});

/* FORMULARIO */
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Mensaje enviado correctamente ✅");
  this.reset();
});