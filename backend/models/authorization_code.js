import {Model, DataTypes, Sequelize} from "sequelize";

export default class AuthorizationCode extends Model {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    static init(sequelize) {
        super.init({
            code: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            clientId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userUUID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            redirectUri: {
                type: DataTypes.STRING,
                allowNull: false
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            scope: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
        })
    }
}