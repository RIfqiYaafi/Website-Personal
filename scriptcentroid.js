$(document).ready(function () {
  $("#centroid-form").on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var submitBtn = $("#centroid-submit");
    var loading = $("#centroid-loading");
    var resultBox = $("#centroid-result");

    // Validasi file
    if ($("#kmlFile1")[0].files.length === 0) {
      alert("Silakan pilih file KML/KMZ terlebih dahulu");
      return;
    }

    // Reset tampilan
    resultBox.hide();
    submitBtn.prop("disabled", true);
    loading.show();

    var formData = new FormData(this);

    $.ajax({
      url: form.attr("action"),
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (data) {
        if (data.success) {
          // Update link download
          $("#centroid-filename").text(data.filename);
          $("#centroid-download").attr({
            href: data.downloadUrl,
            download: data.filename,
          });
          resultBox.removeClass("hidden").fadeIn();
        } else {
          alert("Error: " + (data.message || "Gagal memproses file"));
        }
      },
      error: function (xhr, status, error) {
        alert("Error: " + error);
      },
      complete: function () {
        submitBtn.prop("disabled", false);
        loading.hide();
      },
    });
  });
});
