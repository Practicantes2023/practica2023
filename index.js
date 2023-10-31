const mysql = require('mysql2');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const {
    selectinconvenientes_certificados, selectmotivos_inconvenientes, insertinconvenientes_certificados,
    updateinconvenientes_certificados, selectidinconvenientes_certificados, selectEstadoInconvenientes, selectEstadoMotivos, selectIdMotivos, updateinconvenientes_certificados2
} = require("./operaciones.js");


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'problemas_certificados',
    password: 'root'
});

con.connect((error) => {

    if (error) throw error;
    console.log('conexion exitosa a la base de datos');
});

// RUTA SELECT inconvenientes_certificados


// app.get("/inconvenientes_certificados", (req, res) => {
//     selectinconvenientes_certificados(con, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: "Error" });
//         }
//         else {
//             res
//                 .status(201)
//                 .json({
//                     message: result,
//                     //insertId: result.insertId,
//                 });
//         }
//     });
// });



app.get("/inconvenientes_certificados", (req, res) => {
    selectinconvenientes_certificados(con, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error" });
        } else {
            res.status(201).json(result); // Enviar result directamente
        }
    });
});



// RUTA SELECT por id de inconvenientes_certificados

app.get("/inconvenientes_certificadosid/:id", (req, res) => {

    const id = req.params.id;

    selectidinconvenientes_certificados(con, id, (err, result) => {



        if (err) {
            res.status(500).json({ error: "Error" });
        }
        else {
            res
                .status(201)
                .json({
                    message: result,
                    //insertId: result.insertId,
                });
        }
    });
});


// RUTA SELECT por estado de inconvenientes_certificados

app.get("/inconvenientes_certificados/:estado", (req, res) => {

    const estado = req.params.estado;

    selectEstadoInconvenientes(con, estado, (err, result) => {



        if (err) {
            res.status(500).json({ error: "Error" });
        }
        else {
            res
                .status(201)
                .json({
                    message: result,
                    //insertId: result.insertId,
                });
        }
    });
});


// RUTA SELECT por id de MOTIVO  inconvenientes

app.get("/motivos_inconvenientes/:id", (req, res) => {

    const id = req.params.id;

    selectIdMotivos(con, id, (err, result) => {

        if (err) {
            res.status(500).json({ error: "Error" });
        }
        else {
            res
                .status(201)
                .json({
                    message: result,
                    //insertId: result.insertId,
                });
        }
    });
});


// RUTA SELECT por estado de MOTIVOS inconvenientes

app.get("/motivos_inconvs/:estado", (req, res) => {

    const estado = req.params.estado;

    selectEstadoMotivos(con, estado, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error" });
        }
        else {
            res
                .status(201)
                .json({
                    message: result,
                    //insertId: result.insertId,
                });
        }
    });
});


// RUTA SELECT motivos_inconvenientes


// app.get("/motivos_inconvenientes", (req, res) => {
//     selectmotivos_inconvenientes(con, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: "Error" });
//         }
//         else {
//             res
//                 .status(201)
//                 .json({
//                     message: result,
//                     insertId: result.insertId,
//                 });
//         }
//     });
// });

app.get("/motivos_inconvenientes", (req, res) => {
    selectmotivos_inconvenientes(con, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error" });
        } else {
            res.status(201).json(result); // Enviar result directamente
        }
    });
});

// RUTA INSERT inconvenientes_certificados

app.post("/inconvenientes_certificados", (req, res) => {
    const insertinconvenientes = {
        id_motivo_inconveniente: req.body.id_motivo_inconveniente,
        identidad: req.body.identidad,
        nombre_asegurado: req.body.nombre_asegurado,
        numero_certificado: req.body.numero_certificado,
        observaciones: req.body.observaciones,
        usuario: req.body.usuario,
    };


    insertinconvenientes_certificados(con, insertinconvenientes, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error al insertar datos" });
        } else {
            res
                .status(201)
                .json({
                    message: "Datos insertados con éxito",
                    insertId: result.insertId,
                });
        }
    });
});

// RUTA UPDATE inconvenientes_certificados

app.put('/inconvenientes_certificados/:id', (req, res) => {
    const estado = req.body.estado;
    const fecha_modificacion = req.body.fecha_modificacion;
    const id = req.params.id;

    updateinconvenientes_certificados(con, estado, fecha_modificacion, id, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error al actualizar datos" });
        } else {
            res.status(200).json({ message: "Datos actualizados con éxito" });
        }
    });
});

app.put('/inconvenientes_certificados2/:id', (req, res) => {

    const nombre_asegurado = req.body.nombre_asegurado;
    const numero_certificado = req.body.numero_certificado;
    const observaciones = req.body.observaciones;
    const id_motivo_inconveniente = req.body.id_motivo_inconveniente;
    const identidad = req.body.identidad;
    const id = req.params.id;
    const fecha_modificacion = req.params.fecha_modificacion;

    updateinconvenientes_certificados2(con, nombre_asegurado, numero_certificado, observaciones, id_motivo_inconveniente, 
    fecha_modificacion, id, identidad, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error al actualizar datos" });
        } else {
            res.status(200).json({ message: "Datos actualizados con éxito" });
        }
    });
});


