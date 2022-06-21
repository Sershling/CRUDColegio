import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Grado } from "./Grado"
import { Alumno } from "./Alumno"

@Entity()
export class AlumnoGrado {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    alumnoId: number

    @Column()
    gradoId: number

    @Column()
    seccion: string

    @ManyToOne(type => Grado)
    @JoinColumn({ name: "gradoId" })
    grado: Grado

    @ManyToOne(type => Alumno)
    @JoinColumn({ name: "alumnoId" })
    alumno: Alumno

}
