const connection = require("../config/database");

class ModelLokasi {
  static async getAll() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
          l.id,
          l.lat_long,
          l.alamat,
          l.desa,
          k.nama_kecamatan AS kecamatan,  -- Mengambil nama kecamatan dari tabel kecamatan
          l.kejadian,
          l.opd,
          l.tanggal_terima,
          l.tanggal_terima_1,
          l.tanggal_selesai,
          l.approve,
          l.ket,
          l.laporan,
          l.tim,
          l.jumlah_tim,
          l.nama_pelapor,
          l.noTelp_pelapor,
          l.bulan,
          l.tahun,
          l.mamin,
          l.klaim_mamin,
          l.qr,
          l.qr_absen
        FROM
          lokasi l
        JOIN
          kecamatan k
        ON
          l.kec = k.id
        ORDER BY
          l.id DESC
      `;
      
      connection.query(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
}



      

  static async getByKejadian(kejadian) {
    try {
      const [rows] = await db.query('SELECT * FROM lokasi WHERE kejadian = ?', [kejadian]);
      return rows;
    } catch (err) {
      console.error('Error fetching locations by kejadian:', err);
      throw err;
    }
  }

}

module.exports = ModelLokasi;
