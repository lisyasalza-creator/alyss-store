
import { formatHarga, buatKartu, debounce } from "./utils.js";

let semuaProduk = [];

const inputCari = document.getElementById("input-cari");
const filterKategori = document.getElementById("filter-kategori");
const statusEl = document.getElementById("status");
const daftarEl = document.getElementById("daftar-produk");

// Mengisi pilihan kategori
function isiKategori() {
  filterKategori.replaceChildren();

  const opsiSemua = document.createElement("option");
  opsiSemua.value = "all";
  opsiSemua.textContent = "Semua kategori";
  filterKategori.appendChild(opsiSemua);

  const kategori = [
    ...new Set(semuaProduk.map((produk) => produk.category)),
  ].sort();

  kategori.forEach((nama) => {
    const opsi = document.createElement("option");
    opsi.value = nama;
    opsi.textContent = nama;
    filterKategori.appendChild(opsi);
  });
}

// Mencari produk berdasarkan nama dan kategori
function saringProduk() {
  const kataKunci = inputCari.value.trim().toLowerCase();
  const kategoriDipilih = filterKategori.value;

  return semuaProduk.filter((produk) => {
    const cocokNama = produk.title.toLowerCase().includes(kataKunci);

    const cocokKategori =
      kategoriDipilih === "all" ||
      produk.category === kategoriDipilih;

    return cocokNama && cocokKategori;
  });
}

// Menghitung statistik produk
function hitungStatistik(daftar) {
  const jumlah = document.getElementById("stat-jumlah");
  const rata = document.getElementById("stat-rata");
  const mahal = document.getElementById("stat-mahal");
  const jumlahKategori = document.getElementById("stat-kategori");

  if (daftar.length === 0) {
    [jumlah, rata, mahal, jumlahKategori].forEach((elemen) => {
      elemen.textContent = "-";
    });
    return;
  }

  const totalHarga = daftar.reduce(
    (total, produk) => total + produk.price,
    0
  );

  const produkTermahal = daftar.reduce((termahal, produk) =>
    produk.price > termahal.price ? produk : termahal
  );

  jumlah.textContent = daftar.length;
  rata.textContent = formatHarga(totalHarga / daftar.length);

  mahal.textContent =
    `${produkTermahal.title} (${formatHarga(produkTermahal.price)})`;

  jumlahKategori.textContent = new Set(
    daftar.map((produk) => produk.category)
  ).size;
}

// Menampilkan produk
function tampilkanProduk() {
  const hasil = saringProduk();

  hitungStatistik(hasil);
  daftarEl.replaceChildren(...hasil.map(buatKartu));

  statusEl.className = "";
  statusEl.textContent =
    hasil.length === 0
      ? "Produk tidak ditemukan. Coba kata kunci atau kategori lain."
      : `Menampilkan ${hasil.length} dari ${semuaProduk.length} produk.`;
}

// Menjalankan fitur produk setelah data tersedia
export function mulaiProduk(dataProduk) {
  semuaProduk = dataProduk;

  isiKategori();
  tampilkanProduk();

  inputCari.addEventListener(
    "input",
    debounce(tampilkanProduk, 400)
  );

  filterKategori.addEventListener("change", tampilkanProduk);
}
