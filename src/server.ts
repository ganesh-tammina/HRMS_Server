import express, { Application } from "express";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes";
import { pool } from "./config/database";

dotenv.config();

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/candidates", employeeRoutes);
  }

  public start(): void {
    this.app.listen(this.port, async () => {
      const conn = await pool.getConnection();
      console.log(`✅ Server running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
