import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'yoo.sh@datamond.ai',
        pass: 'gqejodlfxspryhmf',
      },
    });
  }

  async sendMemberJoinVerification(email: string, signupVerifyToken: string) {
    const baseUrl = 'http://localhost:8000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: email,
      subject: '테스트 가입 인증 메일',
      html: `<form action="${url}" method="POST">
    <button>가입확인</button>
        </form>
    `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
