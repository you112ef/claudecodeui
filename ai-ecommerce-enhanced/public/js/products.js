async function fetchProducts() {
  const response = await fetch('/products.json');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  for (const product of products) {
    const card = document.createElement('a');
    card.href = `/pages/product.html?id=${encodeURIComponent(product.id)}`;
    card.className = 'block bg-white rounded-lg shadow hover:shadow-md transition p-4';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded" />
      <h3 class="mt-3 font-semibold">${product.name}</h3>
      <p class="text-gray-600 text-sm">${product.description}</p>
      <div class="mt-2 font-bold">${product.price} ${product.currency}</div>
    `;
    grid.appendChild(card);
  }
}

function populateCategories(products) {
  const select = document.getElementById('categorySelect');
  if (!select) return;
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  for (const category of categories) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  }
}

(async function init() {
  try {
    const products = await fetchProducts();
    populateCategories(products);

    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');

    function filterAndRender() {
      const term = (searchInput?.value || '').toLowerCase();
      const category = categorySelect?.value || '';
      const filtered = products.filter(product => {
        const matchesTerm = [product.name, product.description]
          .join(' ')
          .toLowerCase()
          .includes(term);
        const matchesCategory = !category || product.category === category;
        return matchesTerm && matchesCategory;
      });
      renderProducts(filtered);
    }

    searchInput?.addEventListener('input', filterAndRender);
    categorySelect?.addEventListener('change', filterAndRender);

    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
})();
async function fetchProducts() {
  const res = await fetch(/products.json);
  if (!res.ok) throw new Error(Failed
