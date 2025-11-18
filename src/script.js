//Data
let data = {};

//global element
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const workerList = document.getElementById("workerList");
const from = document.getElementById("form");

let idExp = 1;

///////////
openModal.addEventListener("click", () => {
  modal.classList.add("open");
});
closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
});

function loadImage() {
  const url = document.getElementById("imgUrl").value;
  const imgTag = document.getElementById("myimage");

  if (url.trim() === "") {
    alert("Please enter a valid URL");
    return;
  }

  imgTag.src = url;
}
//function pour ajouter un experinece
function ajouterExperienc() {
  const Experiences = document.getElementById("Experiences");

  const div = document.createElement("div");
  div.setAttribute("class", "experienc p-4 border-t-4");
  div.setAttribute("id", `${idExp++}`);
  Experiences.appendChild(div);
  div.innerHTML += `
                    <div >
                    <label for="">Company</label>
                    <input
                     
                      type="text"
                      class="nameCompany w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label for="">Role</label>
                    <input
                     
                      type="text"
                      class="role w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label for="">from</label>
                    <input
                    
                      type="date"
                      class="start w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label for="">to</label>
                    <input
                   
                      type="date"
                      class="end w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                    />
                  </div>
    `;
}
//ajouter employe
function ajouterEmploye() {}
function getValuesInputs(e) {
  e.preventDefault();
  let Experiences = document.querySelectorAll(".experienc");
  Experiences.forEach((dviExp, i) => {
    let company = dviExp.querySelector(".nameCompany").value;
    let role = dviExp.querySelector(".role").value;
    let start = dviExp.querySelector(".start").value;
    let end = dviExp.querySelector(".end").value;
    const inputs = { company, role, start, end };
    validateInputsExp(inputs);
  });

  let formD = new FormData(form);
  let objetData = Object.fromEntries(formD.entries());
  validateInputs(objetData);
}
function validateInputs() {}

function validateInputsExp() {}
