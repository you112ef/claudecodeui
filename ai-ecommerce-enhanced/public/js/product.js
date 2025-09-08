async function fetchProducts() {
  const response = await fetch('/products.json');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderProduct(product) {
  const container = document.getElementById('productDetail');
  if (!container) return;
  container.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 h-64 object-cover rounded" />
      <div class="flex-1">
        <h1 class="text-2xl font-bold">${product.name}</h1>
        <div class="mt-2 text-xl font-semibold">${product.price} ${product.currency}</div>
        <p class="mt-4 text-gray-700">${product.description}</p>
        <button class="mt-6 px-4 py-2 bg-black text-white rounded">Add to Cart</button>
      </div>
    </div>
  `;
}

(async function init() {
  try {
    const id = getQueryParam('id');
    const products = await fetchProducts();
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    renderProduct(product);
  } catch (error) {
    console.error(error);
  }
})();

