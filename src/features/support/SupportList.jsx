// src/features/support/SupportList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from './supportSlice';
import {
  Box,
  Button,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Link as MuiLink
} from '@mui/material';
import SupportFormModal from './SupportFormModal';

const DEFAULT = {
  id:      null,
  project: '',
  desc:    '',
  docs:    '',
  status:  'open',
};

export default function SupportList() {
  const dispatch = useDispatch();
  const { tickets, status, error } = useSelector(state => state.support);
  const [modalOpen, setModalOpen]       = useState(false);
  const [initial,   setInitial]         = useState(DEFAULT);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTickets());
  }, [status, dispatch]);

  const openCreate = () => {
    setInitial(DEFAULT);
    setModalOpen(true);
  };
  const openEdit = (t) => {
    setInitial({
      id:      t.id,
      project: t.project,
      desc:    t.desc,
      docs:    t.docs,
      status:  t.status,
    });
    setModalOpen(true);
  };
  const handleSubmit = (formData) => {
    if (initial.id) {
      dispatch(updateTicket({ id: initial.id, formData }));
    } else {
      dispatch(createTicket(formData));
    }
  };
  const handleDelete = (t) => {
    if (window.confirm(`Delete ticket #${t.id}?`)) {
      dispatch(deleteTicket(t.id));
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" my={4}>
        <Typography variant="h4">Support Tickets</Typography>
        <Button variant="contained" onClick={openCreate}>
          New Ticket
        </Button>
      </Box>

      {status === 'loading' && <Typography>Loading…</Typography>}
      {status === 'failed'  && <Typography color="error">{error}</Typography>}

      {status === 'succeeded' && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Docs</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(t => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.project}</TableCell>
                <TableCell>{t.desc}</TableCell>
                <TableCell>
                  {t.docs
                    ? (
                      <MuiLink
                        href={t.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </MuiLink>
                    )
                    : '—'
                  }
                </TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => openEdit(t)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(t)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <SupportFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={initial}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
