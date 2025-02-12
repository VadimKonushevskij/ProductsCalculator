const nameElement = document.querySelector("#name");
const priceElement = document.querySelector("#price");
const amountElement = document.querySelector("#amount");
const addBtnElement = document.querySelector("#add");
const tableElement = document.querySelector("#table");
const totalElement = document.querySelector("#total");

addBtnElement.addEventListener("click", function () {
  let tr = document.createElement("tr");
  allowEdit(createCell(tr, nameElement.value, "name"));
  allowEdit(createCell(tr, priceElement.value, "price"));
  allowEdit(createCell(tr, amountElement.value, "amount"));
  createCell(tr, priceElement.value * amountElement.value, "cost");
  createCell(tr, "удалить", "remove").addEventListener("click", (event) => {
    event.target.parentElement.remove();
    recountTotal();
  });

  table.appendChild(tr);
  recountTotal();

  clearInput(nameElement);
  clearInput(priceElement);
  clearInput(amountElement);
});

function createCell(tr, value, name) {
  let td = document.createElement("td");
  td.textContent = value;
  td.classList.add(name);
  tr.appendChild(td);
  return td;
}

function recountTotal() {
  let costsElement = table.querySelectorAll(".cost");
  let totalCost = 0;

  if (costsElement) {
    for (let i = 0; i < costsElement.length; i++) {
      totalCost = totalCost + +costsElement[i].textContent;
    }
  }
  totalElement.textContent = totalCost;
}

function allowEdit(td) {
  td.addEventListener("dblclick", () => {
    let newInput = document.createElement("input");
    newInput.value = td.textContent;
    newInput.addEventListener("keypress", (event) => {
      if (event.code === "Enter") {
        td.textContent = newInput.value;
        newInput.replaceWith(td);
        if (td.classList.contains("price") || td.classList.contains("amount")) {
          const costElement = td.parentElement.querySelector(".cost");
          const currPriceElement = td.parentElement.querySelector(".price");
          const currAmountElement = td.parentElement.querySelector(".amount");
          costElement.textContent =
            +currPriceElement.textContent * +currAmountElement.textContent;
          recountTotal();
        }
      }
    });
    td.textContent = "";
    td.appendChild(newInput);
    newInput.focus();
  });
}

function clearInput(element) {
  element.value = "";
}
