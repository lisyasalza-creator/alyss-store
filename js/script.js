
import { loadData } from "./api.js";
import { mulaiProduk } from "./produk.js";
import { mulaiValidasi } from "./validasi.js";

// Mengambil elemen pesan status produk
const statusEl = document.getElementById("status");

// Menampilkan tulisan loading
function tampilkanLoading() {
  statusEl.className = "";
  statusEl.innerHTML =
    '<span class="spinner" aria-hidden="true"></span>Memuat produk...';
}

// Menampilkan pesan jika data gagal diambil
function tampilkanError(pesan) {
  statusEl.className = "error";
  statusEl.textContent =
    `Produk gagal dimuat (${pesan}). Periksa koneksi internet, lalu muat ulang halaman.`;
}

// Menjalankan aplikasi
async function mulaiAplikasi() {
  try {
    tampilkanLoading();

    const dataProduk = await loadData();

    mulaiProduk(dataProduk);
    mulaiValidasi();
  } catch (error) {
    tampilkanError(error.message);
  }
}

// Memulai aplikasi saat halaman dibuka
mulaiAplikasi();
