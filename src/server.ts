import express, { Application } from "express";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes";
import { pool } from "./config/database";
import { sendMail } from "./routes/mailer";
import cors from "cors";
dotenv.config();

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.app.use(cors({ origin: "*" }));
    this.port = Number(process.env.PORT);
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/candidates", employeeRoutes);
    this.app.post("/send-email", async (req, res) => {
      const { to, subject, text } = req.body;
      console.log(to);
      if (!to || !subject || !text) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields (to, subject, text)",
        });
      }

      try {
        const result = await sendMail(to, subject, text, `<p>${text}</p>`);
        res.json({ success: true, messageId: result.messageId });
      } catch (error) {
        console.error("❌ Error in /send-email:", error);
        res.status(500).json({ success: false, error: "Failed to send email" });
      }
    });
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
