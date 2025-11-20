//Data
let data = {};

//global element

const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const closeModalWorker = document.getElementById("closeWorkerInfo");
const modalAjouter = document.getElementById("modal");
const workerInfoModal = document.getElementById("workerInfoModal");
const workerList = document.getElementById("workerList");
const from = document.getElementById("form");

let idExp = 1;
const tableExperiences = [];
const tabelInfoEmploye = [];
const employes = [];

///////////modal for fourmulaire d'ajoute
openModal.addEventListener("click", () => {
  modalAjouter.classList.add("open");
});

closeModal.addEventListener("click", () => {
  modalAjouter.classList.remove("open");
});
closeModalWorker.addEventListener("click", () => {
  workerInfoModal.classList.add("hidden");
});

function loadImage() {
  const url = document.getElementById("imgUrl").value;
  const imgTag = document.getElementById("myimage");
  imgTag.src = url;
}
//function pour ajouter un experinece
function ajouterExperienc(exp = null) {
  const Experiences = document.getElementById("Experiences");

  const div = document.createElement("div");
  div.setAttribute("class", "experienc p-4 border-t-4");
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
  if (exp) {
    div.querySelector(".nameCompany").value = exp.company;
    div.querySelector(".role").value = exp.role;
    div.querySelector(".start").value = exp.start;
    div.querySelector(".end").value = exp.end;
  }
}

function getValuesInputs(e) {
  e.preventDefault();
  let Experiences = document.querySelectorAll(".experienc");
  Experiences.forEach((dviExp, i) => {
    let id = i;
    let company = dviExp.querySelector(".nameCompany").value;
    let role = dviExp.querySelector(".role").value;
    let start = dviExp.querySelector(".start").value;
    let end = dviExp.querySelector(".end").value;
    const inputs = { id, company, role, start, end };
    tableExperiences.push(inputs);
  });

  let formD = new FormData(form);
  let objetData = Object.fromEntries(formD.entries());
  tabelInfoEmploye.push(objetData);
  //appel fc ajouter
  ajouterEmploye(tabelInfoEmploye, tableExperiences);
}

//ajouter employe
function ajouterEmploye(info, Experiences) {
  let newEmploye = {
    id: Math.random().toString(16).slice(2),
    name: info[0].name,
    roleInCompany: info[0].roleInCompany,
    email: info[0].email,
    tele: info[0].tele,
    img: info[0].imgUrl,
    experiences: Experiences,
  };
  let employes = getData();
  employes.push(newEmploye);
  localStorage.setItem("employes", JSON.stringify(employes));
}

//get Data from local Storage
function getData() {
  let data = JSON.parse(localStorage.getItem("employes")) || [];
  return data;
}

//affiches les employes a sideBar
function afficheEmployes() {
  let employes = getData();
  let workerList = document.querySelector(".workerList");
  employes.forEach((employe) => {
    let divEmploye = document.createElement("div");
    divEmploye.setAttribute(
      "class",
      "w-[90%] h-13 border-1 rounded-2xl ml-2 bg-white-300 flex justify-around items-center mt-2"
    );
    workerList.appendChild(divEmploye);
    divEmploye.innerHTML = ` <div class="w-[50%] flex">
                  <div class="pr-2 pt-1.5">
                    <img
                      src="${employe.img}"
                      alt=""
                      class=" w-10 h-10 rounded-full"
                      onclick="afficheEmploye('${employe.id}')"
                      
                    />
                  </div>
                  <div class="">
                    <p class="font-mono">${employe.name}</p>
                    <p class="pb-2 font-light text-gray-500">${employe.roleInCompany}</p>
                  </div>
                </div>
                <div>
                  <p class="edit-btn text-amber-600 font-bold"  employe-id="${employe.id}"  >Edit</p>
                </div>
              </div>
            </div>
          </div>`;
  });
}

//find un employe
function afficheEmploye(empID) {
  let data = getData();
  let worker = data.find((emp) => emp.id == empID);
  const name = document.getElementById("workerName");
  const role = document.getElementById("workerRole");
  const email = document.getElementById("workerEmail");
  const tele = document.getElementById("workerTele");
  const imgUrl = document.getElementById("imgModal");
  const listExperiences = document.getElementById("experiences");
  name.textContent = worker.name;
  role.textContent = worker.roleInCompany;
  email.textContent = worker.email;
  tele.textContent = worker.tele;
  imgUrl.src = worker.img;

  worker.experiences.forEach((exp) => {
    listExperiences.innerHTML = "";
    const workerDiv = document.createElement("div");
    workerDiv.className = "bg-white p-3 rounded-lg shadow mb-2 border";
    workerDiv.innerHTML = `
      <p><strong>Company:</strong> ${exp.company}</p>
      <p><strong>Role:</strong> ${exp.role}</p>
      <p><strong>From:</strong> ${exp.start}</p>
      <p><strong>To:</strong> ${exp.end}</p>
    `;
    listExperiences.appendChild(workerDiv);
  });
  workerInfoModal.classList.remove("hidden");
}

//localStorage.clear();

function updateEmploye() {
  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      const employeId = editButton.getAttribute("employe-id");
      modalAjouter.classList.add("open");
      openModalUpdate(employeId);
    });
  });
}

function openModalUpdate(editBtn) {
  let inputName = form.querySelector("#workerName");
  let inputRole = from.querySelector("#role");
  let inputEmail = from.querySelector("#email");
  let inputTele = from.querySelector("#tele");
  let inputUrl = from.querySelector("#imgUrl");
  let imgUrl = from.querySelector("#myimage");

  let data = getData();

  let updateEmp = data.filter((emp) => emp.id == editBtn);

  inputName.value = updateEmp[0].name;
  inputRole.selected = updateEmp[0].role;
  inputEmail.value = updateEmp[0].email;
  inputTele.value = updateEmp[0].tele;
  inputUrl.value = updateEmp[0].img;
  imgUrl.src = updateEmp[0].img;
  updateEmp[0].experiences.forEach((exp) => {
    ajouterExperienc(exp);
  });
}

function initializeApp() {
  afficheEmployes();
  updateEmploye();
}
initializeApp();
