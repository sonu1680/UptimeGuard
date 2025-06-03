import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.MAIL_APP_PSK,
  },
});

export const sendMail = async (id: string,msg:string):Promise<number>=> {
try {
    
    await transporter.sendMail({
      from: '"WATCH TOWER" <thecrazymanofficial0@gmail.com>',
      to: id,
      subject: "Hello ✔",
      text: `${msg}`,
      html: "<b>Hello user?</b>",
    });
    return 200;
} catch (error) {
    return 500
}

};
