const express = require("express"),
    path = require("path"),
    app = express(),
    puerto = 3000;

app.get('/', (peticion, respuesta) => {
    let agenteDeUsuario = peticion.header("user-agent");
    respuesta.send(" Ping from" + agenteDeUsuario);
});


const db = mysql.createPool({
    host: "137.184.244.229",
    user: "root",
    password: "!0D3v!2345gt",
    database: "colegio",
    connectionLimit: 20,
});

// BEGIN  ALUMNOS
app.get('/alumnos', (req, res) => {
    db.query('SELECT * FROM Alumnos', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los alumnos' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.post('/alumnos', (req, res) => {
    const newAlumno = req.body;
    db.query('INSERT INTO Alumnos (Nombre, Apellidos, Genero, FechaNacimiento) VALUES (?, ?, ?, ?)',
        [newAlumno.Nombre, newAlumno.Apellidos, newAlumno.Genero, newAlumno.FechaNacimiento],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al crear el alumno' });
            } else {
                res.status(201).json({ message: 'Alumno creado exitosamente' });
            }
        });
});

app.put('/alumnos/:id', (req, res) => {
    const alumnoId = req.params.id;
    const updatedAlumno = req.body;
    db.query('UPDATE Alumnos SET Nombre = ?, Apellidos = ?, Genero = ?, FechaNacimiento = ? WHERE Id = ?',
        [updatedAlumno.Nombre, updatedAlumno.Apellidos, updatedAlumno.Genero, updatedAlumno.FechaNacimiento, alumnoId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al actualizar el alumno' });
            } else {
                res.status(200).json({ message: 'Alumno actualizado exitosamente' });
            }
        });
});

app.delete('/alumnos/:id', (req, res) => {
    const alumnoId = req.params.id;
    db.query('DELETE FROM Alumnos WHERE Id = ?', [alumnoId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el alumno' });
        } else {
            res.status(200).json({ message: 'Alumno eliminado exitosamente' });
        }
    });
});
// END  ALUMNOS
// BEGIN  PROFESORES
app.get('/profesores', (req, res) => {
    db.query('SELECT * FROM Profesores', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los profesores' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.post('/profesores', (req, res) => {
    const newProfesor = req.body;
    db.query('INSERT INTO Profesores (Nombre, Apellidos, Genero) VALUES (?, ?, ?)',
        [newProfesor.Nombre, newProfesor.Apellidos, newProfesor.Genero],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al crear el profesor' });
            } else {
                res.status(201).json({ message: 'Profesor creado exitosamente' });
            }
        });
});
app.put('/profesores/:id', (req, res) => {
    const profesorId = req.params.id;
    const updatedProfesor = req.body;

    if (!updatedProfesor.Nombre || !updatedProfesor.Apellidos || !updatedProfesor.Genero) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    db.query('UPDATE Profesores SET Nombre = ?, Apellidos = ?, Genero = ? WHERE Id = ?',
        [updatedProfesor.Nombre, updatedProfesor.Apellidos, updatedProfesor.Genero, profesorId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al actualizar el profesor' });
            } else {
                res.status(200).json({ message: 'Profesor actualizado exitosamente' });
            }
        });
});

app.delete('/profesores/:id', (req, res) => {
    const profesorId = req.params.id;

    db.query('DELETE FROM Profesores WHERE Id = ?',
        [profesorId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar el profesor' });
            } else {
                res.status(200).json({ message: 'Profesor eliminado exitosamente' });
            }
        });
});
//END PROFESOR
//BEGIN GRADO
app.get('/grados', (req, res) => {
    db.query('SELECT * FROM Grados', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los grados' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.post('/grados', (req, res) => {
    const newGrado = req.body;
    db.query('INSERT INTO Grados (Nombre, ProfesorId) VALUES (?, ?)',
        [newGrado.Nombre, newGrado.ProfesorId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al crear el grado' });
            } else {
                res.status(201).json({ message: 'Grado creado exitosamente' });
            }
        });
});
app.put('/grados/:id', (req, res) => {
    const gradoId = req.params.id;
    const updatedGrado = req.body;

    if (!updatedGrado.Nombre || !updatedGrado.ProfesorId) {
        return res.status(400).json({ error: 'Nombre y ProfesorId son requeridos' });
    }

    db.query('UPDATE Grados SET Nombre = ?, ProfesorId = ? WHERE Id = ?',
        [updatedGrado.Nombre, updatedGrado.ProfesorId, gradoId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al actualizar el grado' });
            } else {
                res.status(200).json({ message: 'Grado actualizado exitosamente' });
            }
        });
});

app.delete('/grados/:id', (req, res) => {
    const gradoId = req.params.id;

    db.query('DELETE FROM Grados WHERE Id = ?',
        [gradoId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar el grado' });
            } else {
                res.status(200).json({ message: 'Grado eliminado exitosamente' });
            }
        });
});
//END GRADO
//BEGIN ALUMNOSGRADO
app.get('/alumnosgrados', (req, res) => {
    db.query('SELECT * FROM AlumnosGrados', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los registros de alumnos y grados' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.post('/alumnosgrados', (req, res) => {
    const newAlumnoGrado = req.body;
    db.query('INSERT INTO AlumnosGrados (AlumnoId, GradoId, Seccion) VALUES (?, ?, ?)',
        [newAlumnoGrado.AlumnoId, newAlumnoGrado.GradoId, newAlumnoGrado.Seccion],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al crear el registro de AlumnoGrado' });
            } else {
                res.status(201).json({ message: 'Registro de AlumnoGrado creado exitosamente' });
            }
        });
});

app.put('/alumnosgrados/:id', (req, res) => {
    const alumnoGradoId = req.params.id;
    const updatedAlumnoGrado = req.body;

    if (!updatedAlumnoGrado.AlumnoId || !updatedAlumnoGrado.GradoId || !updatedAlumnoGrado.Seccion) {
        return res.status(400).json({ error: 'AlumnoId, GradoId y Seccion son requeridos' });
    }

    db.query('UPDATE AlumnosGrados SET AlumnoId = ?, GradoId = ?, Seccion = ? WHERE Id = ?',
        [updatedAlumnoGrado.AlumnoId, updatedAlumnoGrado.GradoId, updatedAlumnoGrado.Seccion, alumnoGradoId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al actualizar el registro de AlumnoGrado' });
            } else {
                res.status(200).json({ message: 'Registro de AlumnoGrado actualizado exitosamente' });
            }
        });
});

app.delete('/alumnosgrados/:id', (req, res) => {
    const alumnoGradoId = req.params.id;

    db.query('DELETE FROM AlumnosGrados WHERE Id = ?',
        [alumnoGradoId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar el registro de AlumnoGrado' });
            } else {
                res.status(200).json({ message: 'Registro de AlumnoGrado eliminado exitosamente' });
            }
        });
});
//END ALUMNOSGRADO


app.listen(puerto, err => {
    if (err) {

        console.error("Error escuchando: ", err);
        return;
    }

    console.log(`Escuchando en el puerto :${puerto}`);
});
module.exports = app;