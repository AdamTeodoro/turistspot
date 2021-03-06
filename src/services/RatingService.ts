import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import { IRating } from '../interfaces/IRating';

import { db } from '../database/database';

export type RatingModel = typeof Model & {
 new (values?: Partial<IRating>, options?: BuildOptions): IRating
}

export type RatingData = {
    idTuristSpot: number;
    idSimpleUser: number;
    commentary: string;
    rating: number;
    qtdImg: number;
}

function build(sequelize: Sequelize) {
    return sequelize.define("Rating", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        idSimpleUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'SimpleUser'
            }
        },
        idTuristSpot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'TuristSpot'
            }
        },
        commentary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        qtdImg: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, { tableName: "RATINGS", timestamps: true }) as RatingModel;
}

export const ratingService = build(db);
