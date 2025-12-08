const connection = require("../koneksi.js");

const User = {
    getPegawai: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT nama FROM users"; // Replace 'users' with your table name
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve({
                    pegawai: results.map(row => row.nama)
                });
            });
        });
    }
};
module.exports = User;