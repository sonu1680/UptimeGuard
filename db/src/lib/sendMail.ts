import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.MAIL_APP_PSK,
  },
});

export const sendMail = async (id: string, msg: string): Promise<number> => {
  try {
    await transporter.sendMail({
      from: '"WATCH TOWER" <thecrazymanofficial0@gmail.com>',
      to: id,
      subject: "⚠️ Website Down Alert",
      text: msg,
      html: `
        <div style="background-color:#121212;padding:30px;color:#ffffff;font-family:Arial,sans-serif;border-radius:8px;">
          <div style="text-align:center;margin-bottom:20px;">
            <img src="cid:logo" alt="Watch Tower Logo" style="width:60px;height:60px;" />
            <h2 style="color:#ff4d4f;">Website Down Detected</h2>
          </div>
          <p style="font-size:16px;">
            Hello,<br/><br/>
            ${msg}
          </p>
          <p style="margin-top:20px;font-size:14px;color:#aaa;">— Team Watch Tower</p>
        </div>
      `,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(process.cwd(), "public", "logo.png"),
          cid: "logo", 
        },
      ],
    });
    return 200;
  } catch (error) {
    console.error("Email send error:", error);
    return 500;
  }
};
