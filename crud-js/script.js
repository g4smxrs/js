// Classe para gerenciar itens
class ItemManager {
  constructor() {
    this.itemId = 0; // ID do item
    this.itemForm = document.getElementById("itemForm"); // Formulário de item
    this.itemNameInput = document.getElementById("itemName"); // Campo de entrada do nome do item
    this.itemsTableBody = document.querySelector("#itemsTable tbody"); // Corpo da tabela de itens

    // Adiciona um evento de submissão ao formulário
    this.itemForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Previne o comportamento padrão do formulário
      this.addItem(this.itemNameInput.value); // Adiciona o item
      this.itemNameInput.value = ""; // Limpa o campo de entrada
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
}

// Inicializa o gerenciador de itens quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new ItemManager();
});
