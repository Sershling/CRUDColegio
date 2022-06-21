import * as express from "express";
import {Request, Response} from "express";
var cors = require('cors');
import { AppDataSource } from "./data-source";
import { Alumno } from "./entity/Alumno";
import { Profesor } from "./entity/Profesor";
import { Grado } from "./entity/Grado";
import { AlumnoGrado } from "./entity/AlumnoGrado";
import { DataSource } from "typeorm";
import { isAbsolute } from "path";

AppDataSource.initialize().then(async () => {

    // create and setup express app
    const app = express();
    app.use(express.json());
    app.use(cors());
    
    //Registrar routes

    //----------------------------------------------------------------Routes Alumno
    app.get("/alumnos", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Alumno).find();
        return res.send(results);
    });

    app.get("/alumno/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Alumno).findOneBy({
            id: parseInt(req.params.id)
        });
        return res.send(results);
    });

    app.post("/alumno", async function(req: Request, res: Response) {
        const alumno = await AppDataSource.getRepository(Alumno).create(req.body);
        const results = await AppDataSource.getRepository(Alumno).save(alumno);
        return res.send(results);
    });

    app.put("/alumno/:id", async function(req: Request, res: Response) {
        const alumno = await AppDataSource.getRepository(Alumno).findOneBy({
            id: parseInt(req.params.id),
        })
        AppDataSource.getRepository(Alumno).merge(alumno, req.body)
        const results = await AppDataSource.getRepository(Alumno).save(alumno)
        return res.send(results)
    });

    app.delete("/alumno/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Alumno).delete(req.params.id)
        return res.send(results)
    });

    //-------------------------------------------------------------Routes Profesor
    app.get("/profesores", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Profesor).find();
        return res.send(results);
    });

    app.get("/profesor/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Profesor).findOneBy({
            id: parseInt(req.params.id)
        });
        return res.send(results);
    });

    app.post("/profesor", async function(req: Request, res: Response) {
        const profesor = await AppDataSource.getRepository(Profesor).create(req.body);
        const results = await AppDataSource.getRepository(Profesor).save(profesor);
        return res.send(results);
    });

    app.put("/profesor/:id", async function(req: Request, res: Response) {
        const profesor = await AppDataSource.getRepository(Profesor).findOneBy({
            id: parseInt(req.params.id),
        })
        AppDataSource.getRepository(Profesor).merge(profesor, req.body)
        const results = await AppDataSource.getRepository(Profesor).save(profesor)
        return res.send(results)
    });

    app.delete("/profesor/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Profesor).delete(req.params.id)
        return res.send(results)
    });

    //-------------------------------------------------------------------Routes Grado
    app.get("/grados", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Grado)
        .createQueryBuilder("grado")
        .leftJoinAndSelect("grado.profesor", "profesor")
        .getMany();
        return res.send(results);
    });

    app.get("/grado/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Grado)
        .createQueryBuilder("grado")
        .leftJoinAndSelect("grado.profesor", "profesor")
        .where("grado.id = "+req.params.id)
        .getOne()
        return res.send(results);
    });

    app.post("/grado", async function(req: Request, res: Response) {
        const grado = await AppDataSource.getRepository(Grado).create(req.body);
        const results = await AppDataSource.getRepository(Grado).save(grado);

        return res.send(results);
    });

    app.put("/grado/:id", async function(req: Request, res: Response) {
        const grado = await AppDataSource.getRepository(Grado).findOneBy({
            id: parseInt(req.params.id),
        })
        AppDataSource.getRepository(Grado).merge(grado, req.body)
        await AppDataSource.getRepository(Grado).save(grado)
        const results = await AppDataSource.getRepository(Grado)
        .createQueryBuilder("grado")
        .leftJoinAndSelect("grado.profesor", "profesor")
        .where("grado.id = "+req.params.id)
        .getOne()
        return res.send(results);
    });

    app.delete("/grado/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Grado).delete(req.params.id)
        return res.send(results)
    });

    //-------------------------------------------------------------------Routes AlumnoGrado
    app.get("/alumnosGrados", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(AlumnoGrado)
        .createQueryBuilder("alumnoGrado")
        .leftJoinAndSelect("alumnoGrado.alumno", "alumno")
        .leftJoinAndSelect("alumnoGrado.grado", "grado")
        .getMany();
        return res.send(results);
    });

    app.get("/alumnoGrado/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(AlumnoGrado).findOneBy({
            id: parseInt(req.params.id)
        });
        return res.send(results);
    });

    app.post("/alumnoGrado", async function(req: Request, res: Response) {
        const alumnoGrado = await AppDataSource.getRepository(AlumnoGrado).create(req.body);
        await AppDataSource.getRepository(AlumnoGrado).save(alumnoGrado);
        const results = await AppDataSource.getRepository(AlumnoGrado)
        .createQueryBuilder("alumnoGrado")
        .leftJoinAndSelect("alumnoGrado.alumno", "alumno")
        .leftJoinAndSelect("alumnoGrado.grado", "grado")
        .where("alumno.id = "+req.body.alumnoId)
        .andWhere("grado.id = "+req.body.gradoId)
        .getOne()
        return res.send(results);
    });

    app.put("/alumnoGrado/:id", async function(req: Request, res: Response) {
        const alumnoGrado = await AppDataSource.getRepository(AlumnoGrado).findOneBy({
            id: parseInt(req.params.id),
        })
        AppDataSource.getRepository(AlumnoGrado).merge(alumnoGrado, req.body)
        await AppDataSource.getRepository(AlumnoGrado).save(alumnoGrado)
        const results = await AppDataSource.getRepository(AlumnoGrado)
        .createQueryBuilder("alumnoGrado")
        .leftJoinAndSelect("alumnoGrado.alumno", "alumno")
        .leftJoinAndSelect("alumnoGrado.grado", "grado")
        .where("alumnoGrado.id = "+req.params.id)
        .getOne()
        return res.send(results);
    });

    app.delete("/alumnoGrado/:id", async function(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(AlumnoGrado).delete(req.params.id)
        return res.send(results)
    });

    // start express server
    app.listen(3000);
    console.log("App running on port 3000")

}).catch(error => console.log(error))
