"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_APP_PSK,
    },
});
const sendMail = (id, msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
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
                    path: path_1.default.join(process.cwd(), "public", "logo.png"),
                    cid: "logo",
                },
            ],
        });
        return 200;
    }
    catch (error) {
        console.error("Email send error:", error);
        return 500;
    }
});
exports.sendMail = sendMail;
