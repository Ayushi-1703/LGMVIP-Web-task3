var form = document.querySelector("#userForm");
const allUsersData = [];

// ------------------function to reset the form------------------
const resetForm = function () {
  form.classList.remove('was-validated')
  const name = document.getElementById('name');
  name.value = "";

  const email = document.getElementById('email');
  email.value = "";

  const website = document.getElementById('website');
  website.value = "";

  const image = document.getElementById('image');
  image.value = "";

  const genderEl = document.querySelectorAll('input[name="gender"]');
  for (const rb of genderEl) {
    rb.checked = false;
  }

  const skillEl = document.querySelectorAll('input[name="skill"]');
  for (const rb of skillEl) {
    rb.checked = false;
  }
};

// --------------------function to get the data of the form----------------------

const getData = function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const website = document.getElementById('website').value;
  const image = document.getElementById('image').value;
  let gender;
  let skills = [];

  const genderEl = document.querySelectorAll('input[name="gender"]');
  for (const rb of genderEl) {
    if (rb.checked) {
      gender = rb.value;
      break;
    }
  };

  const skillEl = document.querySelectorAll('input[name="skill"]');
  for (const rb of skillEl) {
    if (rb.checked) {
      skills.push(rb.value);
    }
  }
  return { name, email, website, image, gender, skills };
};

//-----------------------adding event listner to the "enroll student" button with type submit to submit the form

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (form.checkValidity()) {
    const data = getData();
    allUsersData.push(data);
    printResult(data);
    resetForm();


  } else {
    form.classList.add('was-validated');
  };
  removeSpan();
});

// --------------function to remove the span tag ("fill the form to enroll the students")

function removeSpan() {
  var span = document.getElementById("span");
  if(span){
    span.remove();
  }
  
};

// ------------------function to print the form data in the right side of div by genrating html elments inside the div.

function printResult(data) {
  const resultEl = document.getElementById('enrolled-students');
  let sectionHeading = null;
  if (allUsersData.length == 1) {

    sectionHeading = document.createElement('div');
    const description = document.createElement('p');
    description.innerHTML = "Description";
    description.className = "description";

    const image = document.createElement('p');
    image.innerHTML = "Image"
    image.className = "Image";

    sectionHeading.className = "sectionHeading";
    sectionHeading.append(description, image);
  };

  const wrapper = document.createElement('div');
  wrapper.className = "wrapper";
  wrapper.addEventListener('click', function (e) {
    console.log(e.target.className);
    if (e.target.className.includes('userDeleteBtn')) {
      console.log('aaadfasdfasdf');
      e.currentTarget.remove();
    }

  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "+";
  deleteBtn.className = "userDeleteBtn";

  const textInfoContainer = document.createElement('div');
  textInfoContainer.className = "textInfoContainer";

  const imageContainer = document.createElement('div');
  imageContainer.className = "imageContainer";

  const imageHyperlink = document.createElement('a');
  imageHyperlink.href = data.image;
  imageHyperlink.target = "_blank";


  let name = document.createElement('p');
  name.className = "infoText userName";
  name.innerHTML = data.name;

  let gender = document.createElement('p');
  gender.className = "infoText gender";
  gender.innerHTML = data.gender;

  let email = document.createElement('p');
  email.className = "infoText email";
  email.innerHTML = data.email;

  let website = document.createElement('a');
  website.className = "infoText website";
  website.innerHTML = data.website;
  website.href = data.website;
  website.target = "_blank";

  let skills = document.createElement('p');
  skills.className = "infoText skills";
  skills.innerHTML = data.skills.join(', ');


  let userImage = document.createElement('img');
  userImage.className = "userImage";
  userImage.src = data.image;


  textInfoContainer.append(name, gender, email, website, skills);
  imageHyperlink.appendChild(userImage);
  imageContainer.appendChild(imageHyperlink);

  wrapper.append(textInfoContainer, imageContainer, deleteBtn);

  if (sectionHeading == null) {
    resultEl.append(wrapper);
  } else {
    resultEl.append(sectionHeading, wrapper)
  };

};

// The end------------------

/*var selectedRow = null;

function onFormSubmit(e) {
  event.preventDefault();
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["studentName"] = document.getElementById("studentName").value;
  formData["collegeName"] = document.getElementById("collegeName").value;
  formData["Email"] = document.getElementById("Email").value;
  formData["Gender"] = document.getElementById("Gender").value;
  formData["Skills"] = document.getElementById("Skills").value;

  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("storeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.studentName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.collegeName;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.Email;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.Gender;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.Skills;
  cell5 = newRow.insertCell(5);
  cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> 
                    <button onClick="onDelete(this)">Delete</button>;`
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("collegeName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("Email").value = selectedRow.cells[2].innerHTML;
  document.getElementById("Gender").value = selectedRow.cells[3].innerHTML;
  document.getElementById("Skills").value = selectedRow.cells[4].innerHTML;

}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.studentName;
  selectedRow.cells[1].innerHTML = formData.collegeName;
  selectedRow.cells[2].innerHTML = formData.Email;
  selectedRow.cells[3].innerHTML = formData.Gender;
  selectedRow.cells[4].innerHTML = formData.Skills;

}

function onDelete(td) {
  if (confirm("Do you want to delete this record?")) {
    row = td.parentElement.parentElement;
    document.getElementById("storeList").deleteRow(row.rowIndex);
    resetForm();
  }
}

function resetForm() {
  document.getElementById("studentName").value = "";
  document.getElementById("collegeName").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Gender").value = "";
  document.getElementById("Skills").value = "";

  selectedRow = null;
}*/