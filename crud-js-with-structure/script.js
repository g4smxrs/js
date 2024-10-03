// Classe para gerenciar itens
class ItemManager {
  constructor() {
    this.itemId = 0; // ID do item
    this.itemForm = document.getElementById("itemForm"); // Formulário de item
    this.itemNameInput = document.getElementById("itemName"); // Campo de entrada do nome do item
    this.itemsTableBody = document.querySelector("#itemsTable tbody"); // Corpo da tabela de itens
    this.searchForm = document.getElementById("searchForm"); // Formulário de pesquisa
    this.searchQueryInput = document.getElementById("searchQuery"); // Campo de entrada da pesquisa
    this.exportBtn = document.getElementById("exportBtn"); // Botão de exportação

    // Adiciona um evento de submissão ao formulário de item
    this.itemForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Previne o comportamento padrão do formulário
      this.addItem(this.itemNameInput.value); // Adiciona o item
      this.itemNameInput.value = ""; // Limpa o campo de entrada
    });

    // Adiciona um evento de submissão ao formulário de pesquisa
    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Previne o comportamento padrão do formulário
      this.searchItems(this.searchQueryInput.value); // Realiza a pesquisa
    });

    // Adiciona um evento de clique ao botão de exportação
    this.exportBtn.addEventListener("click", () => {
      this.exportToExcel(); // Exporta para Excel
    });
  }

  // Método para adicionar um item
  addItem(name) {
    this.itemId++; // Incrementa o ID do item
    const row = document.createElement("tr"); // Cria uma nova linha na tabela
    row.setAttribute("data-id", this.itemId); // Define o atributo data-id com o ID do item

    // Define o conteúdo da linha
    row.innerHTML = `
      <td>${this.itemId}</td>
      <td class="item-name">${name}</td>
      <td>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Remover</button>
      </td>
    `;

    this.itemsTableBody.appendChild(row); // Adiciona a linha à tabela

    // Adiciona eventos de clique aos botões de editar e remover
    row
      .querySelector(".edit-btn")
      .addEventListener("click", () => this.editItem(row));
    row
      .querySelector(".delete-btn")
      .addEventListener("click", () => this.deleteItem(row));
  }

  // Método para editar um item
  editItem(row) {
    const nameCell = row.querySelector(".item-name"); // Seleciona a célula do nome do item
    const newName = prompt("Editar nome do item:", nameCell.textContent); // Pede um novo nome ao usuário
    if (newName) {
      nameCell.textContent = newName; // Atualiza o nome do item
    }
  }

  // Método para remover um item
  deleteItem(row) {
    this.itemsTableBody.removeChild(row); // Remove a linha da tabela
  }

  // Método para pesquisar itens
  searchItems(query) {
    const rows = this.itemsTableBody.querySelectorAll("tr"); // Seleciona todas as linhas da tabela
    rows.forEach((row) => {
      const itemName = row
        .querySelector(".item-name")
        .textContent.toLowerCase(); // Obtém o nome do item em minúsculas
      if (itemName.includes(query.toLowerCase())) {
        row.style.display = ""; // Mostra a linha se corresponder à pesquisa
      } else {
        row.style.display = "none"; // Oculta a linha se não corresponder à pesquisa
      }
    });
  }

  // Método para exportar a tabela para Excel
  exportToExcel() {
    const rows = Array.from(this.itemsTableBody.querySelectorAll("tr")); // Converte as linhas da tabela em um array
    let csvContent = "ID,Nome\n"; // Inicializa o conteúdo CSV com cabeçalhos

    // Itera sobre as linhas da tabela
    rows.forEach((row) => {
      const id = row.querySelector("td:first-child").textContent; // Obtém o ID do item
      const name = row.querySelector(".item-name").textContent; // Obtém o nome do item
      const rowContent = `${id},${name}`; // Junta o ID e o nome com vírgula
      csvContent += rowContent + "\n"; // Adiciona a linha ao conteúdo CSV
    });

    // Cria um blob com o conteúdo CSV em UTF-8
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a"); // Cria um link
    const url = URL.createObjectURL(blob); // Cria uma URL para o blob
    link.setAttribute("href", url); // Define o href do link
    link.setAttribute("download", "items.csv"); // Define o nome do arquivo
    link.style.visibility = "hidden"; // Oculta o link
    document.body.appendChild(link); // Adiciona o link ao corpo do documento
    link.click(); // Clica no link para iniciar o download
    document.body.removeChild(link); // Remove o link do corpo do documento
  }
}

// Inicializa o gerenciador de itens quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new ItemManager();
});
