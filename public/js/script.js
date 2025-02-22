// Task Solution -- To understand refer booking appointment app

let url = "http://localhost:3000";

const amountInput = document.querySelector("#amount");
const descriptionInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");
const idInput = document.querySelector("#idInput");

const expenseForm = document.querySelector("#expenseForm");
expenseForm.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", refresh);

async function refresh() {
  try {
    let response = await axios.get(`${url}/user/allexpenses`);
    // console.log(response.data);

    for (let i = 0; i < response.data.length; i++) {
      displayExpenseOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

function onSubmit(event) {
  event.preventDefault();

  const expenseDetailsObj = {
    expenseAmount: `${amountInput.value}`,
    expenseDescription: `${descriptionInput.value}`,
    expenseCategory: `${categoryInput.value}`,
  };

  if (
    expenseDetailsObj.expenseAmount == "" ||
    expenseDetailsObj.expenseDescription == "" ||
    expenseDetailsObj.expenseCategory == ""
  ) {
    alert(`Fill all the details`);
  } else {
    if (idInput.value == "") {
      addExpense(expenseDetailsObj);
    } else {
      addEditedExpense(expenseDetailsObj, idInput.value);
    }
  }

  // empty input fields
  amountInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
}

async function addExpense(expenseDetailsObj) {
  try {
    let response = await axios.post(`${url}/user/form`, expenseDetailsObj);
    displayExpenseOnScreen(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteExpense(id) {
  try {
    await axios.delete(`${url}/user/expense/delete/${id}`);
    document.getElementById(`${id}`).remove();
  } catch (error) {
    console.log(error);
  }
}

function editExpense(expenseAmount, expenseDescription, expenseCategory, id) {
  amountInput.value = expenseAmount;
  descriptionInput.value = expenseDescription;
  categoryInput.value = expenseCategory;
  idInput.value = id;

  document.getElementById(`${id}`).style.display = "none";
}

async function addEditedExpense(expenseDetailsObj, id) {

  idInput.value = ""; 
  
  try {
    let response = await axios.put(
      `${url}/user/expense/edit/${id}`,
      expenseDetailsObj
    );
    // console.log(response);

    document.getElementById(`${id}`).style.display = "block";

    document.getElementById(`${id}`).innerHTML = `<div>
      <h5> ${response.data.expenseCategory} </h5>
      <h6> Description : ${response.data.expenseDescription} </h6>
      <h6> Amount : ${response.data.expenseAmount} Rs. </h6>
    </div>
    <div class ="d-flex justify-content-end">
      <button class="btn btn-danger m-2 p-2" onclick="deleteExpense(${response.data.id})">X</button>
      <button class="btn btn-primary m-2 p-2" onclick="editExpense('${response.data.expenseAmount}', '${response.data.expenseDescription}', '${response.data.expenseCategory}','${response.data.id}')">Edit</button>
    </div>`;
  } catch (error) {
    document.getElementById(`${id}`).style.display = "block";
    console.log(error);
  }
}

function displayExpenseOnScreen(expenseDetailsObj) {
  document.querySelector(".detailsObjectsDiv").innerHTML += `
  <div class="card"  id=${expenseDetailsObj.id}>
    <div>
      <h5> ${expenseDetailsObj.expenseCategory} </h5>
      <h6> Description : ${expenseDetailsObj.expenseDescription} </h6>
      <h6> Amount : ${expenseDetailsObj.expenseAmount} Rs. </h6>
    </div>
  <div class ="d-flex justify-content-end">
  <button class="btn btn-danger m-2 p-2" onclick="deleteExpense(${expenseDetailsObj.id})">X</button>
  <button class="btn btn-primary m-2 p-2" onclick="editExpense('${expenseDetailsObj.expenseAmount}', '${expenseDetailsObj.expenseDescription}', '${expenseDetailsObj.expenseCategory}','${expenseDetailsObj.id}')">Edit</button>
  </div>
  </div>`;
}
