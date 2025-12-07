import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { partnershipInquirySchema } from "@shared/schema";
import { getUncachableGmailClient } from "./gmail";

export async function registerRoutes(app: Express): Promise<Server> {
  // Partnership inquiry endpoint
  app.post("/api/partnership-inquiry", async (req, res) => {
    try {
      // Validate request body
      const validatedData = partnershipInquirySchema.parse(req.body);
      
      // Additional CAPTCHA validation
      if (!validatedData.captchaVerified) {
        return res.status(400).json({ 
          success: false, 
          error: "CAPTCHA verification required" 
        });
      }
      
      // Check if form was submitted too quickly (potential bot)
      const timeSinceLoad = Date.now() - validatedData.formLoadedAt;
      if (timeSinceLoad < 3000) { // Less than 3 seconds
        return res.status(400).json({ 
          success: false, 
          error: "Form submitted too quickly. Please try again." 
        });
      }

      // Get Gmail client
      const gmail = await getUncachableGmailClient();

      // Create email content
      const emailSubject = `Partnership Inquiry from ${validatedData.name}`;
      const emailBody = `
Partnership Inquiry

Name: ${validatedData.name}
Organization: ${validatedData.organization || "N/A"}
Email: ${validatedData.email}
Interest Area: ${validatedData.interest}

Message:
${validatedData.message}
      `;

      // Create the email in RFC 2822 format
      const message = [
        `To: singularityhousing@gmail.com`,
        `Subject: ${emailSubject}`,
        `Content-Type: text/plain; charset=utf-8`,
        '',
        emailBody
      ].join('\n');

      // Encode the message in base64url format
      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      // Send email using Gmail API
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });

      res.json({ success: true, message: "Partnership inquiry sent successfully" });
    } catch (error) {
      console.error("Error sending partnership inquiry:", error);
      res.status(500).json({ success: false, error: "Failed to send inquiry" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
