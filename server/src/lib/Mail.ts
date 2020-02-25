import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/nodemailer';

type MailOptions = SendMailOptions & {
  template: string;
  context: {
    [key: string]: string | number | boolean;
  };
};

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

    this.configureTemplates();
  }

  public configureTemplates(): void {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  public sendMail(msg: MailOptions): Promise<any> {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...msg,
    });
  }
}

export default new Mail();
