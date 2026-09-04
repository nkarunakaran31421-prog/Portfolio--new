const form = document.getElementById("studentForm");

const nameInput = document.getElementById("studentName");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("studentEmail");
const phoneInput = document.getElementById("studentPhone");

const searchInput = document.getElementById("searchInput");
const studentList = document.getElementById("studentList");
const studentCount = document.getElementById("studentCount");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;


// Save students
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}


// Display students
function renderStudents(searchText = "") {

  const search = searchText.toLowerCase().trim();

  const filteredStudents = students
    .map((student, index) => ({
      ...student,
      index: index
    }))
    .filter(student =>
      student.name.toLowerCase().includes(search) ||
      student.id.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search)
    );

  studentCount.textContent =
    `${students.length} Student${students.length !== 1 ? "s" : ""}`;


  if (filteredStudents.length === 0) {

    studentList.innerHTML =
      `<div class="empty">No students found</div>`;

    return;
  }


  studentList.innerHTML = filteredStudents.map(student => `

    <div class="student-card">

      <div class="student-info">

        <h3>${escapeHtml(student.name)}</h3>

        <p>
          <strong>ID:</strong>
          ${escapeHtml(student.id)}
        </p>

        <p>
          📧 ${escapeHtml(student.email)}
        </p>

        <p>
          📱 ${escapeHtml(student.phone)}
        </p>

      </div>


      <div class="actions">

        <button
          class="edit-btn"
          onclick="editStudent(${student.index})">
          Edit
        </button>

        <button
          class="delete-btn"
          onclick="deleteStudent(${student.index})">
          Delete
        </button>

      </div>

    </div>

  `).join("");
}


// Prevent unsafe HTML
function escapeHtml(value) {

  const div = document.createElement("div");

  div.textContent = value;

  return div.innerHTML;
}


// Add / Update student
form.addEventListener("submit", function(event) {

  event.preventDefault();


  const student = {

    name: nameInput.value.trim(),

    id: idInput.value.trim(),

    email: emailInput.value.trim(),

    phone: phoneInput.value.trim()

  };


  if (editIndex === -1) {

    students.push(student);

  } else {

    students[editIndex] = student;

    editIndex = -1;

    form.querySelector("button").textContent =
      "Add Student";
  }


  saveStudents();

  form.reset();

  renderStudents(searchInput.value);

});


// Edit student
function editStudent(index) {

  const student = students[index];

  nameInput.value = student.name;
  idInput.value = student.id;
  emailInput.value = student.email;
  phoneInput.value = student.phone;

  editIndex = index;

  form.querySelector("button").textContent =
    "Update Student";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Delete student
function deleteStudent(index) {

  if (confirm("Delete this student?")) {

    students.splice(index, 1);

    saveStudents();

    renderStudents(searchInput.value);
  }
}


// Search student
searchInput.addEventListener("input", function() {

  renderStudents(searchInput.value);

});


// Load students when page opens
renderStudents();
