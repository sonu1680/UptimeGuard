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
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_APP_PSK,
    },
});
const sendMail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await transporter.sendMail({
        //   from: '"sonu" <thecrazymanofficial0@gmail.com>',
        //   to: "sonupandit1680@gmail.com",
        //   subject: "Hello ✔",
        //   text: "Hello world?",
        //   html: "<b>Hello world?</b>",
        // });
        return 200;
    }
    catch (error) {
        return 500;
    }
});
exports.sendMail = sendMail;
