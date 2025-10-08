import { Request, Response } from "express";
import { LoginInterface } from "../interface/employee-interface";
import { pool } from "../config/database";

export default class LoginService implements LoginInterface {
    async login(req: Request, res: Response): Promise<any> {
        const pooling = await pool.query("fucn")

        throw new Error("Method not implemented.");
    }

}