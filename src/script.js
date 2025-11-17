//global element
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");

openModal.addEventListener("click", () => {
  modal.classList.add("open");
});
closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
});

/// Source - https://stackoverflow.com/a
// Posted by Mike Morearty, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-17, License - CC BY-SA 3.0

function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("myimage");
  imgtag.title = selectedFile.name;

  reader.onload = function (event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}
