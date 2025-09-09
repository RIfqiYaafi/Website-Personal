// Aktifkan drag & drop file upload saat halaman selesai load
window.addEventListener("DOMContentLoaded", function () {
  setupFileUpload("microFile", "micro-upload-box", "micro-file-info");
  setupFileUpload("stoFile", "sto-upload-box", "sto-file-info");
});

// Handle submit form
document.getElementById("sto-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(this);
  let submitBtn = document.getElementById("sto-submit");
  let resultBox = document.getElementById("sto-result");
  let downloadLink = document.getElementById("sto-download");
  let fileNameSpan = document.getElementById("sto-filename");

  submitBtn.disabled = true;
  submitBtn.textContent = "Memproses...";

  fetch("backendsto.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        resultBox.style.display = "block";
        downloadLink.href = data.file;
        fileNameSpan.textContent = data.filename;
      } else {
        alert("Gagal: " + data.message);
      }
    })
    .catch((err) => {
      alert("Terjadi error: " + err);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Proses Overlay";
    });
});
