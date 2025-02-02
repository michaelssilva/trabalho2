
//Menu e Rodapé

function carregarElementos() {
    // Carregar cabeçalho
    var xhrHeader = new XMLHttpRequest();
    xhrHeader.open("GET", "/index.html", true);
    xhrHeader.onreadystatechange = function () {
        if (xhrHeader.readyState == 4 && xhrHeader.status == 200) {
            document.querySelector(".header-content").innerHTML = xhrHeader.responseText;
        }
    };
    xhrHeader.send();

    // Carregar rodapé
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open("GET", "/index-footer.html", true);
    xhrFooter.onreadystatechange = function () {
        if (xhrFooter.readyState == 4 && xhrFooter.status == 200) {
            document.querySelector(".footer").innerHTML = xhrFooter.responseText;
        }
    };
    xhrFooter.send();

}

document.addEventListener("DOMContentLoaded", function () {
    carregarElementos();
});


//Fim do Menu e Rodapé



//filtro

document.addEventListener("DOMContentLoaded", function () {
    carregarElementos();
    loadProducts(currentPage);
    setupFilter();
});

function setupFilter() {
    // Obtenha referências aos controles de filtro
    const brandFilter = document.getElementById('brand-filter');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const applyFiltersButton = document.getElementById('apply-filters');

    applyFiltersButton.addEventListener('click', () => {
        // Obtenha valores selecionados dos filtros
        const selectedBrand = brandFilter.value;
        const selectedCategory = categoryFilter.value;
        const maxPrice = parseFloat(priceFilter.value) || Infinity;

        // Filtra os produtos com base nos critérios selecionados
        const filteredProducts = data.filter(product => {
            const meetsBrandCriteria = !selectedBrand || product.watch_brand === selectedBrand;
            const meetsCategoryCriteria = !selectedCategory || product.category === selectedCategory;
            const meetsPriceCriteria = product.price <= maxPrice;

            return meetsBrandCriteria && meetsCategoryCriteria && meetsPriceCriteria;
        });

        // Atualiza a página para exibir os produtos filtrados
        totalProducts = filteredProducts.length;
        currentPage = 1;
        loadProducts(currentPage);

        console.log(uniqueBrands);
        console.log(uniqueCategories);
    });
}


//Fim do Filtro




//Paginação


let currentPage = 1;
const pageSize = 28; // Limite o número de produtos por página
let totalProducts = 0;

function loadProducts(page) {
  fetch(`/model/repositories/ProductRepository.json`)
    .then(response => response.json())
    .then(data => {
      totalProducts = data.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const productsToShow = data.slice(startIndex, endIndex);

      const cardContainer = document.getElementById('card-container');
      cardContainer.innerHTML = ''; // Limpa o conteúdo dos cartões antes de adicionar novos dados


      // Adicione os dados aos cartões
      productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = `/model/repositories/src/images/${product.watch_brand}/${product.image}`;
        img.alt = 'Imagem do Produto';

        const name = document.createElement('div');
        name.textContent = product.watch_name;

        const price = document.createElement('div');
        price.textContent = `R$ ${product.price.toFixed(2)}`;

        const descount = document.createElement('div');
        price.textContent = `R$ ${product.price.toFixed(2)}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        cardContainer.appendChild(card);
      });

      // Atualize o número da página atual na interface do usuário
      document.getElementById('current-page').textContent = page;
      // Calcule e atualize o número total de páginas
      const totalPages = Math.ceil(totalProducts / pageSize);
      document.getElementById('total-pages').textContent = totalPages;

      // Habilita ou desabilita os botões de navegação com base na página atual
      document.getElementById('prev-page').disabled = page === 1;
      document.getElementById('next-page').disabled = page === totalPages;
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadProducts(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage < Math.ceil(totalProducts / pageSize)) {
    currentPage++;
    loadProducts(currentPage);
  }
});

// Inicialmente, carregue a primeira página ao iniciar a aplicação
loadProducts(currentPage);


//Fim da Paginação