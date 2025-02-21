import {Model, DataTypes, Sequelize, DatabaseError} from "sequelize";

class User extends Model {

    /**
     * 
     * @param {Sequelize} sequelize 
     */
    static init(sequelize) {
        super.init({
            uuid: {
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false, 
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            twoFactorEnabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            twoFactorSecret: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        }, {
            sequelize,
            modelName: "User",
            tableName: "users"
        })
    }
}
