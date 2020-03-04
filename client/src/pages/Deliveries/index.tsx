/* eslint-disable @typescript-eslint/camelcase, consistent-return */
import React, { useState, useEffect, useCallback } from 'react';
import { Form } from '@unform/web';
import { MdSearch, MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Status } from './types';

import api from '~/services/api';

import Label from './Label';
import Table, { TableRow, TableCell } from '~/components/Table';
import Tooltip from '~/components/Tooltip';

import { Container, SearchInput, AddButton, ActionsButton } from './styles';

const Deliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<any>([]);
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDeliveriesFromApi() {
      const response = await api.get('/packages');

      setDeliveries([...response.data.data]);
    }

    fetchDeliveriesFromApi();
  }, []);

  const toggleTooltip = useCallback(
    (id: number) => {
      if (openTooltip !== null) return setOpenTooltip(null);

      setOpenTooltip(id);

      const closeOnClickOut = (e: Event) => {
        setOpenTooltip(null);

        document.removeEventListener('click', closeOnClickOut);
      };

      document.addEventListener('click', closeOnClickOut);
    },
    [openTooltip]
  );

  const getDeliveryStatus = useCallback(
    (started: Date, ended: Date, canceled: Date) => {
      let status = 'Pendente';

      if (canceled) {
        status = 'Cancelada';
      } else if (started && !ended && !canceled) {
        status = 'Retirada';
      } else if (started && !canceled) {
        status = 'Entregue';
      }

      return status;
    },
    [deliveries]
  );

  return (
    <Container>
      <h1 className="page-title">Gerenciando encomendas</h1>

      <div className="controls">
        <Form className="search-form" onSubmit={() => {}}>
          <SearchInput
            name="deliveries"
            placeholder="Buscar por encomendas..."
            inputHeight="36px"
            icon={<MdSearch size={16} />}
          />
        </Form>

        <AddButton type="button" icon={<MdAdd size={16} />}>
          Cadastrar
        </AddButton>
      </div>

      <div className="deliveries">
        <Table>
          <thead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Destinatário</TableCell>
              <TableCell>Entregador</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Status</TableCell>
              <TableCell center>Ações</TableCell>
            </TableRow>
          </thead>

          <tbody>
            {deliveries.length > 0 &&
              deliveries.map((delivery: any) => {
                const { canceled_at, start_date, end_date } = delivery;

                const status = getDeliveryStatus(
                  start_date,
                  end_date,
                  canceled_at
                );

                return (
                  <TableRow key={delivery.id}>
                    <TableCell>#{delivery.id}</TableCell>
                    <TableCell>{delivery.recipient.name}</TableCell>
                    <TableCell>{delivery.deliveryman?.name}</TableCell>
                    <TableCell>{delivery.recipient.city}</TableCell>
                    <TableCell>{delivery.recipient.state}</TableCell>
                    <TableCell>
                      <Label
                        status={status.toLowerCase() as Status}
                        content={status}
                      />
                    </TableCell>
                    <TableCell center>
                      <ActionsButton
                        className="actions"
                        onClick={() => toggleTooltip(delivery.id)}
                      />
                      {openTooltip === delivery.id && (
                        <Tooltip>
                          <Link to={`/encomenda/${delivery.id}`}>
                            Visualizar
                          </Link>
                          <Link to={`/encomenda/${delivery.id}/editar`}>
                            Editar
                          </Link>
                          <Link to={`/encomenda/${delivery.id}/deletar`}>
                            Excluir
                          </Link>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Deliveries;
