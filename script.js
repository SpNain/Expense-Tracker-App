// Task Solution -- To understand refer booking appointment app

const amountInput = document.querySelector("#amount");
const descriptionInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");

const expenseForm = document.querySelector("#expenseForm");
expenseForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  addDetailsCard(event);
  // console.log(event);
  
  // empty input fields
  amountInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
}

function addDetailsCard(event) {

  const expenseDetailsObj = {
    userAmount: `${amountInput.value}`,
    userDescription: `${descriptionInput.value}`,
    userCategory: `${categoryInput.value}`,
    uniqueKey: `${new Date().getTime()}` // whenever we create a obj a different time we will have so i make that time uniquekey
  };

  // adding element to local storage
  localStorage.setItem(
    expenseDetailsObj.uniqueKey,
    JSON.stringify(expenseDetailsObj)
  );

  // on UI
  document.querySelector(
    ".detailsObjectsDiv"
  ).innerHTML += `<div class="card"  id="${expenseDetailsObj.uniqueKey}">
            <div>
                <h5> ${expenseDetailsObj.userCategory} </h5>
                <h6> Description : ${expenseDetailsObj.userDescription} </h6>
                <h6> Amount : ${expenseDetailsObj.userAmount} Rs. </h6>
            </div>
            <div class ="d-flex justify-content-end">
                <button class="btn btn-danger m-2 p-2" onclick="deleteDetailsCard(event)">X</button>
                <button class="btn btn-primary m-2 p-2" onclick="editDetailsCard(event)">Edit</button>
            </div>
        </div>`;
}

function deleteDetailsCard(event) {

  // from local storage
  localStorage.removeItem(event.target.parentNode.parentNode.id);

  // from UI
  event.target.parentNode.parentNode.remove();
}

function editDetailsCard(event) {

  // get object from local storage
  let expenseDetailsObj = JSON.parse(
    localStorage.getItem(event.target.parentNode.parentNode.id)
  );

  // set details into input fields
  amountInput.value = expenseDetailsObj.userAmount;
  descriptionInput.value = expenseDetailsObj.userDescription;
  categoryInput.value = expenseDetailsObj.userCategory;

  // delete from UI & local Storage
  deleteDetailsCard(event);
}
