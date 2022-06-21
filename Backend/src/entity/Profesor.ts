import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Grado } from "./Grado"

@Entity()
export class Profesor {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    apellidos: string

    @Column()
    genero: string

    @OneToMany(() => Grado, (grado) => grado.profesor)
    grado: Grado[]
}
