let mylist = [
  { name: "Banane", checked: 0 },
  { name: "jus orange", checked: 1 },
  { name: "lait entier", checked: 0 },
];

const btnAdd = document.querySelector("#addNew");
const output = document.querySelector(".output");
const newItem = document.querySelector("#addItem");

function build() {
  // Ceci permet d'ajouter une balise dans le DOM à partir du JS à travers innerHTML
  output.innerHTML = "<h1>My Auchan Shopping List</h1>";

  const table = document.createElement("table");
  // Ajouter une classe a la table qu'on a cree
  table.classList.add("shopping-list");

  for (let i = 0; i < mylist.length; i++) {
    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    if (mylist[i].checked === 1) {
      cell1.innerHTML = `<strike>${mylist[i].name}</strike>`;
    } else {
      cell1.innerHTML = mylist[i].name;
    }

    // Ajout du gestionnaire de clic pour barrer/débarrer l'élément
    cell1.addEventListener("click", function () {
      toggleCheck(i);
    });

    const cell2 = document.createElement("td");
    const deleteBtn = document.createElement("a");
    deleteBtn.href = "#";
    deleteBtn.title = "Delete";
    deleteBtn.classList.add("btn-danger");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.dataset.index = i;
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      deleteItem(i);
    });
    cell2.appendChild(deleteBtn);

    const cell3 = document.createElement("td");
    const editBtn = document.createElement("a");
    editBtn.href = "#";
    editBtn.title = "Edit";
    editBtn.classList.add("btn-warning");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.dataset.index = i;
    editBtn.addEventListener("click", function (e) {
      e.preventDefault();
      editItem(i);
    });
    cell3.appendChild(editBtn);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
  }

  output.appendChild(table);
}

function deleteItem(index) {
  mylist.splice(index, 1);
  build();
}

function editItem(index) {
  const newName = prompt("Entrer un nom:", mylist[index].name);
  if (newName) {
    mylist[index].name = newName;
    build();
  }
}

function toggleCheck(index) {
  mylist[index].checked = mylist[index].checked === 1 ? 0 : 1;
  build();
}

btnAdd.addEventListener("click", function () {
  if (newItem.value) {
    mylist.push({ name: newItem.value, checked: 0 });
    build();
    newItem.value = "";
  }
  console.log(mylist);
});

window.onload = build;
