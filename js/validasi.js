
const form = document.getElementById("form-kontak");
const fieldNama = document.getElementById("nama");
const fieldEmail = document.getElementById("email");
const fieldEmail2 = document.getElementById("email2");
const fieldPesan = document.getElementById("pesan");
const pesanSukses = document.getElementById("sukses");

// Menampilkan pesan kesalahan
function setError(field, pesan) {
  const elemenError = document.getElementById(`err-${field.id}`);

  elemenError.textContent = pesan ? `Perhatian: ${pesan}` : "";
  field.setAttribute("aria-invalid", pesan ? "true" : "false");

  return pesan === "";
}

// Memeriksa nama
function validasiNama() {
  const nama = fieldNama.value.trim();

  return setError(
    fieldNama,
    nama === "" ? "Nama wajib diisi." : ""
  );
}

// Memeriksa email
function validasiEmail() {
  const email = fieldEmail.value.trim();

  if (email === "") {
    return setError(fieldEmail, "Email wajib diisi.");
  }

  if (!email.includes("@") || !email.includes(".")) {
    return setError(
      fieldEmail,
      "Email harus memiliki tanda @ dan titik."
    );
  }

  return setError(fieldEmail, "");
}

// Memeriksa konfirmasi email
function validasiKonfirmasi() {
  const email = fieldEmail2.value.trim();

  if (email === "") {
    return setError(
      fieldEmail2,
      "Konfirmasi email wajib diisi."
    );
  }

  if (email !== fieldEmail.value.trim()) {
    return setError(
      fieldEmail2,
      "Email konfirmasi harus sama dengan email di atas."
    );
  }

  return setError(fieldEmail2, "");
}

// Memeriksa pesan
function validasiPesan() {
  const pesan = fieldPesan.value.trim();

  return setError(
    fieldPesan,
    pesan === "" ? "Pesan wajib diisi." : ""
  );
}

// Menjalankan validasi dan event form
export function mulaiValidasi() {
  const semuaField = [
    fieldNama,
    fieldEmail,
    fieldEmail2,
    fieldPesan,
  ];

  semuaField.forEach((field) => {
    field.setAttribute("aria-invalid", "false");
  });

  fieldNama.addEventListener("blur", validasiNama);
  fieldEmail.addEventListener("blur", validasiEmail);
  fieldEmail2.addEventListener("blur", validasiKonfirmasi);
  fieldPesan.addEventListener("blur", validasiPesan);
  fieldPesan.addEventListener("input", validasiPesan);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    pesanSukses.textContent = "";

    const semuaValid = [
      validasiNama(),
      validasiEmail(),
      validasiKonfirmasi(),
      validasiPesan(),
    ].every(Boolean);

    if (semuaValid) {
      pesanSukses.textContent =
        "Validasi berhasil. Formulir sudah siap diproses.";

      form.reset();

      semuaField.forEach((field) => {
        field.setAttribute("aria-invalid", "false");
      });
    }
  });
}
