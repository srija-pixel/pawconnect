import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // In-memory storage for demo purposes (as requested)
  const adoptions: any[] = [];
  const consultations: any[] = [];

  // Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify transporter on startup
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter.verify((error) => {
      if (error) {
        console.warn("⚠️ Nodemailer verification failed. Emails will not be sent.");
        console.warn("Error details:", error.message);
        console.warn("Tip: Ensure you are using a Google 'App Password', not your regular password.");
      } else {
        console.log("✅ Nodemailer is ready to send emails");
      }
    });
  } else {
    console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set. Email features are disabled.");
  }

  // API Routes
  app.post("/api/adopt", async (req, res) => {
    const adoptionData = req.body;
    adoptions.push(adoptionData);

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adoptionData.email,
      subject: 'PawConnect - Adoption Application Received',
      text: `Hi ${adoptionData.userName},\n\nYour adoption application for ${adoptionData.petName} is under review. Fee: ${adoptionData.fee}.\n\nBest regards,\nPawConnect Team`,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      }
      res.status(200).json({ message: "Adoption request received", data: adoptionData });
    } catch (error) {
      console.error("Email error:", error);
      res.status(200).json({ message: "Adoption request received (Email failed)", data: adoptionData });
    }
  });

  app.post("/api/consult", async (req, res) => {
    const consultData = req.body;
    consultations.push(consultData);

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: consultData.email,
      subject: 'PawConnect - Vet Consultation Booked',
      text: `Hi ${consultData.name},\n\nYour consultation with ${consultData.doctor} is booked for your ${consultData.petType}.\n\nIssue: ${consultData.issue}\n\nBest regards,\nPawConnect Team`,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      }
      res.status(200).json({ message: "Consultation booked", data: consultData });
    } catch (error) {
      console.error("Email error:", error);
      res.status(200).json({ message: "Consultation booked (Email failed)", data: consultData });
    }
  });

  app.get("/api/adoptions", (req, res) => {
    res.json(adoptions);
  });

  app.get("/api/consultations", (req, res) => {
    res.json(consultations);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
