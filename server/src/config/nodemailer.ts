export default {
  host: process.env.MAIL_HOST as string,
  port: (process.env.MAIL_PORT as unknown) as number,
  secure: false,
  auth: {
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASS as string,
  },
  default: {
    from: 'Fastfeet Distribuidora <noreply@fastfeet.com>',
  },
};
