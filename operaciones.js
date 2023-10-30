// operacion select inconvenientes_certificados

function selectinconvenientes_certificados(con, callback) {
    const Query =
        "select * from inconvenientes_certificados where estado = 1 order by fecha_ingreso desc ";

    con.query(Query, (err, result) => {
        if (err) {
            console.error("Error al cargar datos", err);
            callback(err, null);
        } else {
            console.log("Datos cargados con exito");
            callback(null, result);
        }
    });
}

// operacion select por id de inconvenientes_certificados

function selectidinconvenientes_certificados(con, id, callback) {
    const Query =
        "select * from inconvenientes_certificados where id = ? order by fecha_ingreso desc";

    con.query(Query, id, (err, result) => {
        if (err) {
            console.error("Error al cargar datos", err);
            callback(err, null);
        } else {
            console.log("Datos cargados con exito");
            callback(null, result);
        }
    });
}

// operacion select por estado de inconvenientes_certificados

function selectEstadoInconvenientes(con, estado, callback) {
    const Query =
        "select * from inconvenientes_certificados where estado = ? order by fecha_ingreso desc";

    con.query(Query, estado, (err, result) => {
        if (err) {
            console.error("Error al cargar datos", err);
            callback(err, null);
        } else {
            console.log("Datos cargados con exito");
            callback(null, result);
        }
    });
}

// operacion select por id de MOTIVOS inconvenientes_certificados

function selectIdMotivos(con, id, callback) {
    const Query =
        "select * from motivos_inconvenientes where id_motivo_inconveniente = ?";

    con.query(Query, id, (err, result) => {
        if (err) {
            console.error("Error al cargar datos", err);
            callback(err, null);
        } else {
            console.log("Datos cargados con exito");
            callback(null, result);
        }
    });
}

// operacion select por estado de MOTIVOS inconvenientes_certificados

function selectEstadoMotivos(con, estado, callback) {
    const Query =
    "select * from motivos_inconvenientes where estado = ? ;"
    con.query(Query, estado, (err, result) => {
        if (err) {
            console.error("Error al cargar datos", err);
            callback(err, null);
        } else {
            console.log("Datos cargados con exito");
            callback(null, result);
        }
    });
}



// operacion select motivos_inconvenientes

function selectmotivos_inconvenientes(con, callback) {
    const Query =
        "select * from motivos_inconvenientes";

    con.query(Query, (err, result) => {
        if (err) {
            console.error("Error al cargar datos", err);
            callback(err, null);
        } else {
            console.log("Datos cargados con exito");
            callback(null, result);
        }
    });
}

// operacion insert inconvenientes_certificados

function insertinconvenientes_certificados(con, insertinconvenientes, callback) {
    const insertQuery =
        "INSERT INTO inconvenientes_certificados (id_motivo_inconveniente, identidad, nombre_asegurado, numero_certificado, observaciones, usuario) VALUES (?, ?, ?, ?, ?, ?)";
    const { id_motivo_inconveniente, identidad, nombre_asegurado, numero_certificado, observaciones, usuario } = insertinconvenientes;

    con.query(insertQuery, [id_motivo_inconveniente, identidad, nombre_asegurado, numero_certificado, observaciones, usuario], (err, result) => {
        if (err) {
            console.error("Error al insertar usuario:", err);
            callback(err, null);
        } else {
            console.log("Usuario insertado con éxito.");
            callback(null, result);
        }
    });
}

// Operacion update inconvenientes_certificados

function updateinconvenientes_certificados(con, estado, fecha_modificacion, id, callback) {
    const updateQuery =
        "update inconvenientes_certificados set estado = ?, fecha_modificacion = ? where id = ?";

    con.query(
        updateQuery,
        [estado, fecha_modificacion, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar usuario:", err);
                callback(err, null);
            } else {
                console.log("Usuario actualizado con éxito.");
                callback(null, result);
            }
        }
    );
}



module.exports = {
    selectinconvenientes_certificados, selectmotivos_inconvenientes,
    insertinconvenientes_certificados, updateinconvenientes_certificados, 
    selectidinconvenientes_certificados,selectEstadoInconvenientes,
    selectIdMotivos,selectEstadoMotivos
}