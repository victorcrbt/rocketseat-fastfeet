import { createTransport, Transporter, SendMailOptions } from 'nodemailer';

import mailConfig from '../config/nodemailer';

class Mail {
  public transporter: Transporter;

  constructor() {
    // eslint-disable-next-line
    const { host, port, secure, auth } = mailConfig;

    this.transporter = createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  public sendMail(msg: SendMailOptions): Promise<any> {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...msg,
    });
  }
}

export default new Mail();
