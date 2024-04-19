//To copy the text
function copyText() {
  var textarea = document.getElementsByClassName("text-box")[0];
  textarea.select();
  document.execCommand("copy");
  alert("Text copied to clipboard!");
}

document.addEventListener("DOMContentLoaded", (e) => {
  const textInputEl = document.querySelector("#text-input");
  const submitButtonEl = document.querySelector("#share-btn");

  textInputEl?.addEventListener("input", (e) => {
    if (e.target.value) {
      submitButtonEl.disabled = false;
    } else {
      submitButtonEl.disabled = true;
    }
  });
});
