import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Profesor } from "./Profesor"
import { AlumnoGrado } from "./AlumnoGrado"

@Entity()
export class Grado {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    profesorId: number

    @ManyToOne(type => Profesor)
    @JoinColumn({ name: "profesorId" })
    profesor: Profesor

    @OneToMany(() => AlumnoGrado, (alumnoGrado) => alumnoGrado.grado)
    alumnoGrado: AlumnoGrado[]

}
