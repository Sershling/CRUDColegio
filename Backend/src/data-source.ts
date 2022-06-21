import "reflect-metadata"
import { DataSource } from "typeorm"
import { Alumno } from "./entity/Alumno"
import { Profesor } from "./entity/Profesor"
import { Grado } from "./entity/Grado"
import { AlumnoGrado } from "./entity/AlumnoGrado"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "colegio",
    synchronize: true,
    logging: false,
    entities: [Alumno, Profesor, Grado, AlumnoGrado],
    migrations: [],
    subscribers: [],
})
