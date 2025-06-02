import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.MAIL_APP_PSK,
  },
});

export const sendMail = async (id: string):Promise<number>=> {
try {
    
    // await transporter.sendMail({
    //   from: '"sonu" <thecrazymanofficial0@gmail.com>',
    //   to: "sonupandit1680@gmail.com",
    //   subject: "Hello ✔",
    //   text: "Hello world?",
    //   html: "<b>Hello world?</b>",
    // });
    return 200;
} catch (error) {
    return 500
}

};
