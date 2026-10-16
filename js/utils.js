
const KURS = 16000;

// Mengubah harga USD menjadi rupiah
export function formatHarga(hargaUSD) {
  return (hargaUSD * KURS).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

// Membuat satu kartu produk
export function buatKartu(produk) {
  const item = document.createElement("li");
  const kartu = document.createElement("article");

  const gambar = document.createElement("img");
  gambar.src = produk.thumbnail;
  gambar.alt = `Gambar ${produk.title}`;
  gambar.loading = "lazy";

  const judul = document.createElement("h3");
  judul.textContent = produk.title;

  const kategori = document.createElement("p");
  kategori.className = "kategori";
  kategori.textContent = `${produk.category} · Rating ${produk.rating}`;

  const harga = document.createElement("p");
  harga.className = "harga";
  harga.textContent = formatHarga(produk.price);

  kartu.append(gambar, judul, kategori, harga);
  item.appendChild(kartu);

  return item;
}

// Menunda pencarian agar tidak berjalan setiap ketikan
export function debounce(fungsi, jeda) {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(fungsi, jeda);
  };
}
