import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validationResult = insertContactSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          message: validationError.toString() 
        });
      }

      const contact = await storage.createContactSubmission(validationResult.data);

      // Send email notification
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "ssl0.ovh.net",
        port: parseInt(process.env.SMTP_PORT || "465", 10),
        secure: true, // true for port 465, false for port 587
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to your hemma mail account
        subject: `New Contact Form Submission from ${contact.name}`,
        text: `You have received a new contact form submission:\n\nName: ${contact.name}\nEmail: ${contact.email}\nCompany: ${contact.company || "N/A"}\nMessage: \n${contact.message}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully");
      } catch (emailError) {
        console.error("Error sending notification email:", emailError);
        // We don't fail the request if just the email fails
      }

      return res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
