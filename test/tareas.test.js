const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');

const expect = chai.expect;
let token;
let taskID;

//Pruebas para firebases 
// Como primer paso nos autenticamos para poder realizar la consulta
    before(async () => {
        const res = await request(app).post('/auth/login').send({ username: 'admin', password: '12345' });
        token = res.body.token;
        expect(token).to.be.a('string');
    });

//Muestra todas las tareas del usuario
describe('GET ALL TASKS /tareas', () => {
    //Seguidamente con el token valido realizamos la consulta
    it('Deberia devolver todas las tareas del usuario logeado (si existen)', async () => {
        const res = await request(app).get('/tareas').set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });
});


// Crear nueva tarea
describe('CREATE NEW TASK /tareas', () => {
    it('Debería devolver una tarea con estatus 201 cuando la tarea es creada', async () => {
        const data = {
            titulo: "Tarea test",
            descripcion: "Descripcion 01"
        };
        
        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(data);

        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        taskID = res.body._id;
    });
});


// Crear nueva tarea
describe('UPDATE SPECIFIC TASK /tareas/:id', () => {
    it('Debería devolver una tarea con estatus 200 cuando la tarea existe en Firebase', async () => {
        const data = {
            titulo: "Tarea actualizada",
            descripcion: "Descripcion 02",
            estado: true
        };

        const res = await request(app)
            .put(`/tasks/${taskID}`)
            .set('Authorization', `Bearer ${token}`)
            .send(data);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.estado).to.equal(true);
    });
});


// Crear nueva tarea
describe('DELETE SPECIFIC TASK /tareas', () => {
    it('Debería devolver una tarea con estatus 200 cuando la tarea existe en Firebase', async () => {
        const res = await request(app)
            .post(`/tasks/${taskID}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
    });
});