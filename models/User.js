import pool from "./connection.js";

const User = function(user) {
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
};

const tableName = 'users';

User.create = async (newUser, result) => {
    try {
        const [res] = await pool.query(`INSERT INTO ${tableName} SET ?`, newUser);
        result(null, { id: res.insertId, ...newUser });
    } catch (err) {
        result(err, null);
    }
};

User.getAll = async (result) => {
    try {
        const [res] = await pool.query(`SELECT * FROM ${tableName}`);
        result(null, res);
    } catch (err) {
        result(err, null);
    }
};

User.findById = async (id, result) => {
    try {
        const [res] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ type: 'not_found' }, null);
        }
    } catch (err) {
        result(err, null);
    }
};

User.findByUsername = async (username, result) => {
    try {
        console.log('finddd...' + username)
        const [res] = await pool.query(`SELECT * FROM ${tableName} WHERE username = ?`, [username]);
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ type: 'not_found' }, null);
        }
    } catch (err) {
        result(err, null);
    }
};

User.update = async (id, data, result) => {
    try {
        const [res] = await pool.query(`UPDATE ${tableName} SET name = ?, username = ?, password = ? WHERE id = ?`,
            [data.name, data.username, data.password, id]);
        if (res.affectedRows === 0) {
            result({ type: 'not_found' }, null);
        } else {
            result(null, { id: id, ...data });
        }
    } catch (err) {
        result(err, null);
    }
};

User.delete = async (id, result) => {
    try {
        const [res] = await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
        if (res.affectedRows === 0) {
            result({ type: 'not_found' }, null);
        } else {
            result(null, res);
        }
    } catch (err) {
        result(err, null);
    }
};

export default User;
