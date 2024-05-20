import pool from "./connection.js";

const Student = function(siswa) {
    this.nama = siswa.nama;
    this.jurusan = siswa.jurusan;
    this.umur = siswa.umur;
};

Student.create = async (newStudent, result) => {
    try {
        const [res] = await pool.query("INSERT INTO students SET ?", newStudent);
        result(null, { id: res.insertId, ...newStudent });
    } catch (err) {
        result(err, null);
    }
};

Student.getAll = async (result) => {
    try {
        const [res] = await pool.query("SELECT * FROM students");
        result(null, res);
    } catch (err) {
        result(err, null);
    }
};

Student.findById = async (id, result) => {
    try {
        const [res] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ type: 'not_found' }, null);
        }
    } catch (err) {
        result(err, null);
    }
};

Student.findByUsername = async (username, result) => {
    try {
        const [res] = await pool.query("SELECT * FROM students WHERE username = ?", [username]);
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ type: 'not_found' }, null);
        }
    } catch (err) {
        result(err, null);
    }
};

Student.update = async (id, data, result) => {
    try {
        const [res] = await pool.query("UPDATE students SET nama = ?, jurusan = ?, umur = ? WHERE id = ?", 
            [data.nama, data.jurusan, data.umur, id]);
        if (res.affectedRows === 0) {
            result({ type: 'not_found' }, null);
        } else {
            result(null, { id: id, ...data });
        }
    } catch (err) {
        result(err, null);
    }
};

Student.delete = async (id, result) => {
    try {
        const [res] = await pool.query("DELETE FROM students WHERE id = ?", [id]);
        if (res.affectedRows === 0) {
            result({ type: 'not_found' }, null);
        } else {
            result(null, res);
        }
    } catch (err) {
        result(err, null);
    }
};

export default Student;
