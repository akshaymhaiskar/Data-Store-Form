var employee = [];
var user = {};
var selectRow = null;
var dataForm = document.getElementById("dataForm");
var table = document.getElementById("table");
var tbody = table.querySelector("tbody");

document.addEventListener("submit", function (event) {
  event.preventDefault();
  formData = getData(employee);
  if (selectRow == null) {
    addData();
    dataForm.reset();
  } else {
    updateRecord();
    dataForm.reset();
  }
});

function getData() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var mob = document.getElementById("mob").value;
  var date = document.getElementById("date").value;
  var mail = document.getElementById("mail").value;
  var hobbies = getSelectedHobbies();
  var gender = getGender();
  var crickter = document.getElementById("crickter").value;
  var img = document.getElementById("img").files[0];
  user = {
    name,
    age,
    mob,
    date,
    mail,
    hobbies,
    gender,
    crickter,
    img: URL.createObjectURL(img),
  };
  console.log(user);
  employee.push(user);
  return employee;
}

function addData() {
  tbody.innerHTML = "";

  employee.forEach((element) => {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.mob}</td>
      <td>${element.date}</td>
      <td>${element.mail}</td>
      <td>${element.hobbies}</td>
      <td>${element.gender}</td>
      <td>${element.crickter}</td>
      <td><img src="${element.img}" ></td>
      <td><button onclick="onEdit(this)">Edit</button></td>
      <td><button onclick="deleteData(this)">Delete</button></td>
      
      `;
    tbody.appendChild(row);
  });
}

function deleteData(button) {
  if (confirm("Are you Sure to delete this record ?")) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
}

function getSelectedHobbies() {
  var hobbies = [];
  var driving = document.getElementById("driving");
  var treaking = document.getElementById("treaking");
  var swiming = document.getElementById("swiming");
  if (driving.checked) {
    hobbies.push(driving.value);
  }
  if (treaking.checked) {
    hobbies.push(treaking.value);
  }
  if (swiming.checked) {
    hobbies.push(swiming.value);
  }
  return hobbies;
}

function getGender() {
  var Gender = [];
  var Male = document.getElementById("male");
  var Female = document.getElementById("female");
  var other = document.getElementById("other");
  if (male.checked) {
    Gender.push(Male.value);
  }
  if (female.checked) {
    Gender.push(Female.value);
  }
  if (other.checked) {
    Gender.push(other.value);
  }
  return Gender;
}
    
function onEdit(td) {
  selectRow = td.parentNode.parentNode;
  document.getElementById("name").value = selectRow.cells[0].innerHTML;
  document.getElementById("age").value = selectRow.cells[1].innerHTML;
  document.getElementById("mob").value = selectRow.cells[2].innerHTML;
  document.getElementById("date").value = selectRow.cells[3].innerHTML;
  document.getElementById("mail").value = selectRow.cells[4].innerHTML;
  getSelectedHobbies().value = selectRow.cells[5];
  getGender().value = selectRow.cells[6];
  document.getElementById("crickter").value = selectRow.cells[7].innerHTML;
  document.getElementById("img").value.files[0] = selectRow.cells[8].innerHTML;
}
function updateRecord() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var mob = document.getElementById("mob").value;
  var date = document.getElementById("date").value;
  var mail = document.getElementById("mail").value;
  var hobbies = getSelectedHobbies();
  var gender = getGender();
  var crickter = document.getElementById("crickter").value;
  var img = document.getElementById("img").files[0];
  var user = {
    name,
    age,
    mob,
    date,
    mail,
    hobbies,
    gender,
    crickter,
    img: URL.createObjectURL(img),
  };
  employee.push(user);

  employee.forEach((element) => {
    selectRow.innerHTML = `
      <td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.mob}</td>
      <td>${element.date}</td>
      <td>${element.mail}</td>
      <td>${element.hobbies}</td>
      <td>${element.gender}</td>
      <td>${element.crickter}</td>
      <td><img src="${element.img}" ></td>
      <td><button onclick="onEdit(this)">Edit</button></td>
      <td><button onclick="deleteData(this)">Delete</button></td>
      `;
    tbody.appendChild(selectRow);
  });
}

const e = document.getElementById("json");
e.innerHTML = JSON.stringify(employee);

function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function onDownload() {
  download(JSON.stringify(employee), "yourfile.json", "text/plain");
}

