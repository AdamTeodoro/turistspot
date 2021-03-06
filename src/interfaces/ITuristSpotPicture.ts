import { Model } from "sequelize";

export interface iTuristSpotPicture extends Model {
    id: number;
    idTuristSpot: number;
    idAdmin: number;
    imgUrl: string;
    filename?: string;
    originalname?: string;
    createdAt: Date;
    updateAt: Date;
}
