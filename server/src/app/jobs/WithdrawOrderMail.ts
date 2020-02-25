import Mail from '../../lib/Mail';

class WithdrawOrderMail {
  get key(): string {
    return 'WithdrawOrderMail';
  }

  async handle({ data }): Promise<void> {
    const { pack } = data;

    await Mail.sendMail({
      to: `${pack.deliveryman.name} <${pack.deliveryman.email}>`,
      subject: 'Encomenda disponível',
      template: 'withdrawOrder',
      context: {
        deliveryman: pack.deliveryman.name,
        package_id: pack.id,
        product: pack.product,
        recipient_name: pack.recipient.name,
        recipient_address: `${pack.recipient.address}, ${pack.recipient.address_number} - ${pack.recipient.city}, ${pack.recipient.state}`,
      },
      text: `
        Olá, ${pack.deliveryman.name}!

        Há uma nova encomenda disponível para retirada. Dirija-se à central para retirar o pacote e realizar a entrega.

        Dados da entrega

        ID: ${pack.id}
        Produto: ${pack.product}
        Destinatário: ${pack.recipient.name}
        Endereço: ${pack.recipient.address}, ${pack.recipient.address_number} - ${pack.recipient.city}, ${pack.recipient.state}
      `,
    });
  }
}

export default new WithdrawOrderMail();
