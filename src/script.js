//Data
let data = {};
const regex = {
  name: /^[A-Za-z\s]{2,}$/,
  role: /^[A-Za-z\s]{2,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  tele: /^\d{5}$/,
};

//global element

const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const salleWorkersModal = document.getElementById("salleWorkersModal");
const closeSalleWorkers = document.getElementById("closeSalleWorkers");
const closeModalWorker = document.getElementById("closeWorkerInfo");
const modalAjouter = document.getElementById("modal");
const workerInfoModal = document.getElementById("workerInfoModal");
const workerList = document.getElementById("workerList");
const from = document.getElementById("form");

let idExp = 1;
const tableExperiences = [];
const tabelInfoEmploye = [];
const employes = [];
const salles = [];

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
closeSalleWorkers.addEventListener("click", () => {
  salleWorkersModal.classList.add("hidden");
});

function loadImage() {
  const url = document.getElementById("imgUrl").value;
  const imgTag = document.getElementById("myimage");
  imgTag.src = url;
}
//
function validateInputs(info) {
  hideAllErrors();
  let isValid = true;
  // Name
  if (!regex.name.test(info[0].name)) {
    showError("nameError", "Le nom est invalide minimum 2 lettres");
    isValid = false;
  }

  // Role
  if (!regex.role.test(info[0].roleInCompany)) {
    showError("roleError", "Le role est invalide minimum 2 lettres");
    isValid = false;
  }

  // Email
  if (!regex.email.test(info[0].email)) {
    showError("emailError", "Email invalide.");
    isValid = false;
  }

  // Téléphone
  if (!regex.tele.test(info[0].tele)) {
    showError(
      "teleError",
      "Téléphone invalide (format marocain: 06XXXXXXXX ou +2126XXXXXXXX)."
    );
    isValid = false;
  }

  // Image (optional: only if required)
  if (!info[0].imgUrl || info[0].imgUrl.trim() === "") {
    showError("imgError", "Veuillez sélectionner une image.");
    isValid = false;
  }

  return isValid;
}
//
function showError(id, message) {
  const elem = document.getElementById(id);
  elem.innerText = message;
  elem.classList.remove("hidden");
}

function hideAllErrors() {
  document.querySelectorAll(".error-message").forEach((elem) => {
    elem.innerText = "";
    elem.classList.add("hidden");
  });
}
//
function validateExperiences() {
  let isValid = true;

  const expBlocks = document.querySelectorAll(".experienc");

  expBlocks.forEach((block) => {
    const company = block.querySelector(".nameCompany").value.trim();
    const role = block.querySelector(".role").value.trim();

    // DATE TYPE gives value like "2023-05-10" → we extract the year only
    const start = block.querySelector(".start").value.trim().slice(0, 4);
    const end = block.querySelector(".end").value.trim().slice(0, 4);

    const err = block.querySelector(".expError");

    // Reset error
    err.textContent = "";
    err.classList.add("hidden");

    // Rules
    const textRegex = /^[A-Za-z0-9\s]{2,}$/;
    const yearRegex = /^[0-9]{4}$/;

    // Validation
    if (!textRegex.test(company)) {
      err.textContent = "Nom d'entreprise invalide.";
      err.classList.remove("hidden");
      isValid = false;
      return;
    }

    if (!textRegex.test(role)) {
      err.textContent = "Poste invalide.";
      err.classList.remove("hidden");
      isValid = false;
      return;
    }

    if (!yearRegex.test(start)) {
      err.textContent = "Date début invalide (choisissez une date).";
      err.classList.remove("hidden");
      isValid = false;
      return;
    }

    if (!yearRegex.test(end)) {
      err.textContent = "Date fin invalide (choisissez une date).";
      err.classList.remove("hidden");
      isValid = false;
      return;
    }

    if (parseInt(start) > parseInt(end)) {
      err.textContent = "La date de début doit être avant la date de fin.";
      err.classList.remove("hidden");
      isValid = false;
      return;
    }
  });

  return isValid;
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
                    <p class="expError text-red-500 text-sm mt-1 hidden"></p>
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
  const valueINputHidden = document.querySelector(".inputHidden").value || "";
  let employes = getData();
  if (!validateInputs(info)) {
    return;
  }
  if (!validateExperiences()) return;
  if (valueINputHidden) {
    employes.forEach((emp) => {
      if (emp.id == valueINputHidden) {
        emp.name = info[0].name;
        emp.roleInCompany = info[0].roleInCompany;
        emp.email = info[0].email;
        emp.tele = info[0].tele;
        emp.img = info[0].imgUrl;
        emp.experiences = Experiences;
        inRome = false;
      }
    });
    saveData(employes);
    afficheEmployes();
  } else {
    let newEmploye = {
      id: Math.random().toString(16).slice(2),
      name: info[0].name,
      roleInCompany: info[0].roleInCompany,
      email: info[0].email,
      tele: info[0].tele,
      img: info[0].imgUrl,
      inRome: false,
      experiences: Experiences,
    };
    employes.push(newEmploye);

    saveData(employes);
    afficheEmployes();
  }
}

//get Data from local Storage
function getData() {
  let data = JSON.parse(localStorage.getItem("employes")) || [];
  return data;
}
function getDataSalles() {
  let salles = JSON.parse(localStorage.getItem("salles")) || {};
  return salles;
}
//save Data

function saveData(listEmployes) {
  localStorage.setItem("employes", JSON.stringify(listEmployes));
}

//affiches les employes a sideBar
function afficheEmployes() {
  let employes = getData();
  const employeNotAssigne = employes.filter((emp) => emp.inRome === false);
  let workerList = document.querySelector(".workerList");
  workerList.innerHTML = "";
  employeNotAssigne.forEach((employe) => {
    let divEmploye = document.createElement("div");
    divEmploye.setAttribute(
      "class",
      "w-[90%] h-13 border-1 rounded-2xl ml-2 bg-white-300 flex justify-around items-center mt-2"
    );
    divEmploye.id = `${employe.id}`;
    workerList.appendChild(divEmploye);
    divEmploye.innerHTML = ` <div class="w-[50%] flex ">
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
  let inputHidden = from.querySelector(".inputHidden");

  let data = getData();

  let updateEmp = data.filter((emp) => emp.id == editBtn);

  inputName.value = updateEmp[0].name;
  inputRole.selected = updateEmp[0].role;
  inputEmail.value = updateEmp[0].email;
  inputTele.value = updateEmp[0].tele;
  inputUrl.value = updateEmp[0].img;
  imgUrl.src = updateEmp[0].img;
  inputHidden.value = updateEmp[0].id;
  updateEmp[0].experiences.forEach((exp) => {
    ajouterExperienc(exp);
  });
}

// ====================================
// 1. فتح Modal لإضافة عامل للقاعة
// ====================================
function openSalleModal(salleName) {
  const data = getData();
  const title = document.getElementById("salleTitle");
  const list = document.getElementById("salleWorkersList");

  title.textContent = "Ajouter un employé à : " + salleName;
  list.innerHTML = "";

  // عرض العمال غير المعينين فقط
  const availableWorkers = data.filter((worker) => !worker.inRome);

  if (availableWorkers.length === 0) {
    list.innerHTML =
      '<p class="text-center text-gray-500">Aucun employé disponible</p>';
  } else {
    availableWorkers.forEach((worker) => {
      const div = document.createElement("div");
      div.className =
        "p-3 border rounded-xl shadow flex justify-between items-center bg-gray-50";

      div.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${worker.img}" class="h-12 w-12 rounded-full" />
          <div>
            <p class="font-semibold">${worker.name}</p>
            <p class="text-gray-600 text-sm">${worker.roleInCompany}</p>
          </div>
        </div>
        <button class="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Ajouter
        </button>
      `;

      // إضافة event listener بطريقة آمنة
      const button = div.querySelector("button");
      button.addEventListener("click", () => {
        addWorkerToSalle(worker, salleName);
      });

      list.appendChild(div);
    });
  }

  document.getElementById("salleWorkersModal").classList.remove("hidden");
}

// ====================================
// 2. إضافة عامل للقاعة
// ====================================
function addWorkerToSalle(worker, salleName) {
  const salleNameLower = salleName.toLowerCase().trim();
  const workerRole = worker.roleInCompany.toLowerCase().trim();

  if (!canAccessSalle(workerRole, salleNameLower)) {
    alert("Ce membre ne peut pas accéder à cette salle !");
    return;
  }

  const employes = getData();
  const emp = employes.find((e) => e.id === worker.id);

  if (!emp) {
    alert("Erreur: Employé introuvable");
    return;
  }

  emp.inRome = true;
  emp.currentSalle = salleName; // حفظ اسم القاعة للمستقبل
  saveData(employes);

  // إضافة للقاعة في الواجهة
  addWorkerToSalleUI(worker, salleNameLower);

  // حذف من الـ sidebar
  removeWorkerFromSidebar(worker.id);

  // إغلاق الـ modal
  document.getElementById("salleWorkersModal").classList.add("hidden");
}

// ====================================
// 3. التحقق من صلاحيات الدخول
// ====================================
function canAccessSalle(workerRole, salleName) {
  workerRole = workerRole.toLowerCase().trim();
  salleName = salleName.toLowerCase().trim();
  if (workerRole === "manager") {
    return true;
  }

  switch (true) {
    case salleName === "salle-reception" || salleName === "reception":
      return workerRole === "réceptionniste";
    case salleName === "salle-des-serveurs" || salleName === "serveur":
      return workerRole === "technicien it";
    case salleName === "salle-de-securite" ||
      salleName === "sécurité" ||
      salleName === "securite":
      return (
        workerRole === "agent de sécurité" || workerRole === "agent de securite"
      );
    case salleName === "salle-d-archives" ||
      salleName === "archive" ||
      salleName === "archives":
      return workerRole !== "nettoyage";

    default:
      return true;
  }
}
// ====================================
// 4. إضافة عامل للقاعة في الواجهة
// ====================================
function addWorkerToSalleUI(worker, salleClassName) {
  // البحث عن القاعة
  const divSalle = document.querySelector(`.${salleClassName}`);

  const workerDiv = document.createElement("div");
  workerDiv.className =
    "worker flex justify-between items-center bg-green-300 rounded-lg p-2 mb-2 shadow";
  workerDiv.dataset.workerId = worker.id;

  workerDiv.innerHTML = `
    <span class="font-semibold text-green-900">${worker.name}</span>
    <button class="remove-btn bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded">
      ✕
    </button>
  `;

  // إضافة event listener للزر
  const removeBtn = workerDiv.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    removeFromSalle(worker.id);
  });

  divSalle.appendChild(workerDiv);
}

// ====================================
// 5. حذف عامل من القاعة
// ====================================
function removeFromSalle(workerId) {
  // تحديث البيانات
  const employes = getData();
  const employe = employes.find((emp) => emp.id === workerId);

  employe.inRome = false;
  employe.currentSalle = null;
  saveData(employes);

  // حذف من الواجهة (القاعة)
  const workerElement = document.querySelector(
    `[data-worker-id="${workerId}"]`
  );
  if (workerElement) {
    workerElement.remove();
  }

  // إعادة إضافة للـ sidebar
  addWorkerToSidebar(employe);
}

// ====================================
// 6. إضافة عامل للـ sidebar
// ====================================
function addWorkerToSidebar(employe) {
  const workerList = document.querySelector(".workerList");

  // التحقق من عدم وجوده مسبقاً
  if (document.getElementById(employe.id)) {
    return;
  }

  const divEmploye = document.createElement("div");
  divEmploye.className =
    "w-[90%] h-13 border-1 rounded-2xl ml-2 bg-white-300 flex justify-around items-center mt-2";
  divEmploye.id = employe.id;

  divEmploye.innerHTML = `
    <div class="w-[50%] flex">
      <div class="pr-2 pt-1.5">
        <img src="${employe.img}" alt="" class="w-10 h-10 rounded-full" onclick="afficheEmploye('${employe.id}')"/>
      </div>
      <div>
        <p class="font-mono">${employe.name}</p>
        <p class="pb-2 font-light text-gray-500">${employe.roleInCompany}</p>
      </div>
    </div>
    <div>
      <p class="edit-btn text-amber-600 font-bold" employe-id="${employe.id}">Edit</p>
    </div>
  `;

  workerList.appendChild(divEmploye);
}

// ====================================
// 7. حذف عامل من الـ sidebar
// ====================================
function removeWorkerFromSidebar(workerId) {
  const sidebarWorker = document.getElementById(workerId);
  if (sidebarWorker) {
    sidebarWorker.remove();
  }
}

// ====================================
// 8. إغلاق الـ Modal
// ====================================
document.getElementById("closeSalleWorkers").addEventListener("click", () => {
  document.getElementById("salleWorkersModal").classList.add("hidden");
});

// ====================================
// تحميل العمال المعينين عند بدء التطبيق
// ====================================
function loadWorkersInSalles() {
  const employes = getData();
  const assignedWorkers = employes.filter((emp) => emp.inRome === true);

  assignedWorkers.forEach((worker) => {
    // إذا كان لديك currentSalle محفوظ
    if (worker.currentSalle) {
      const salleClassName = worker.currentSalle.toLowerCase().trim();
      addWorkerToSalleUI(worker, salleClassName);
    } else {
      // إذا لم يكن محفوظ، حاول إيجاد القاعة
      console.warn(
        `Worker ${worker.name} marked as inRome but no currentSalle saved`
      );
      // يمكنك تعيينه كـ inRome = false
      worker.inRome = false;
    }
  });

  // حفظ التحديثات
  saveData(employes);
}

function initializeApp() {
  updateEmploye();
  afficheEmployes();
  loadWorkersInSalles(); // ✅ تحميل العمال في القاعات
}

initializeApp();
