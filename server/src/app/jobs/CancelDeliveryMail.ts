import Mail from '../../lib/Mail';

class CancelDeliveryMail {
  get key(): string {
    return 'CancelDeliveryMail';
  }

  async handle({ data }): Promise<void> {
    const { pack, problem } = data;

    await Mail.sendMail({
      to: `${pack.deliveryman.name} <${pack.deliveryman.email}>`,
      subject: 'Cancelamento de entrega',
      template: 'deliveryCanceled',
      context: {
        deliveryman: pack.deliveryman.name,
        package_id: pack.id,
        product: pack.product,
        recipient_name: pack.recipient.name,
        recipient_address: `${pack.recipient.address}, ${pack.recipient.address_number} - ${pack.recipient.city}, ${pack.recipient.state}`,
        problem: problem.description,
      },
      text: `
        Olá, ${pack.deliveryman.name}!

        Viemos por meio deste e-mail informar que uma de suas entregas foi cancelada por haver ocorrido algum problema.
        Confira abaixo os dados da entrega.

        Dados da entrega

        ID: ${pack.id}
        Produto: ${pack.product}
        Destinatário: ${pack.recipient.name}
        Endereço: ${pack.recipient.address}, ${pack.recipient.address_number} - ${pack.recipient.city}, ${pack.recipient.state}

        Motivo do cancelamento

        ${problem.description}
      `,
    });
  }
}

export default new CancelDeliveryMail();
