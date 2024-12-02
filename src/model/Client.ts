import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface ClientInterface extends Model {
    name: string;
    tel: string;  
    email: string;
    quantity: number;
    observations: string;
    date: string;
    time: string;
    status: "aguardando" | "chamado" | "desistiu"; 
}

export const Clients = sequelize.define<ClientInterface>("Clients", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    tel: {
        type: DataTypes.STRING 
    },
    email: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    observations: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM("aguardando", "chamado", "desistiu"), 
        allowNull: false 
    }
}, {
    tableName: "clients",
    timestamps: false
});
