const form = document.querySelector("form");
const nameInput = document.querySelector('input[placeholder="Student Name"]');
const idInput = document.querySelector('input[placeholder="Student ID"]');
const heading = document.querySelector("h2");

const studentList = document.createElement("ul");
document.body.appendChild(studentList);

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const id = idInput.value.trim();

  if (name === "" || id === "") {
    alert("Please enter Student Name and Student ID");
    return;
  }

  const student = document.createElement("li");
  student.innerHTML = `
    ${name} - ${id}
    <button onclick="this.parentElement.remove()">Delete</button>
  `;

  studentList.appendChild(student);

  nameInput.value = "";
  idInput.value = "";
});
