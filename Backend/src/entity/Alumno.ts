import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { AlumnoGrado } from "./AlumnoGrado"

@Entity()
export class Alumno {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    apellidos: string

    @Column()
    genero: string

    @Column({type: 'date'})
    fechaNacimiento: string

    @OneToMany(() => AlumnoGrado, (alumnoGrado) => alumnoGrado.alumno)
    alumnoGrado: AlumnoGrado[]
}
