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


// Quando o documento estiver pronto, chamar a função para carregar os elementos


document.addEventListener("DOMContentLoaded", function () {
    carregarElementos();
});


let loading = false;
let page = 1;
let pageSize = 10;

function loadProducts() {
  if (loading) return;

  loading = true;

  fetch(`/model/repositories/ProductRepository.json?page=${page}&pageSize=${pageSize}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados do servidor');
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.querySelector('#product-table tbody');

      data.forEach(product => {
        const row = document.createElement('tr');
        
        // Adicionando classes aos elementos
        const imgCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = `/model/src/images/${product.watch_brand}/${product.image}`;
        img.alt = 'Imagem do Produto';
        img.classList.add('product-image'); // Adicionando a classe 'product-image' à imagem
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.watch_name;
        nameCell.classList.add('product-name'); // Adicionando a classe 'product-name' ao nome
        row.appendChild(nameCell);

        const brandCell = document.createElement('td');
        brandCell.textContent = product.watch_brand;
        brandCell.classList.add('product-brand'); // Adicionando a classe 'product-brand' à marca
        row.appendChild(brandCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.category;
        categoryCell.classList.add('product-category'); // Adicionando a classe 'product-category' à categoria
        row.appendChild(categoryCell);

        // Adicionando a quantidade e o preço
        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;
        quantityCell.classList.add('product-quantity'); // Adicione a classe 'product-quantity' à célula de quantidade
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        priceCell.classList.add('product-price'); // Adicione a classe 'product-price' à célula de preço
        row.appendChild(priceCell);

        tableBody.appendChild(row);
      });

      loading = false;
      page++;
    })
    .catch(error => {
      console.error('Erro:', error);
      loading = false;
    });
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadProducts();
  }
}

window.addEventListener('scroll', handleScroll);

// Inicialmente, carregue os produtos
loadProducts();
