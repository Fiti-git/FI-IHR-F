// src/features/project/ProjectList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject
} from './projectSlice';
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

import ProjectFormModal from './ProjectFormModal';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const DEFAULT_INITIAL = {
  id: null,
  name: '',
  desc: '',
  docs: '',
  skillset: '',
  payment_type: '',
  price: '',
  status: '',
  freelancer: '',
};

export default function ProjectList() {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector(state => state.project);

  const [isFormOpen, setFormOpen] = useState(false);
  const [formInitial, setFormInitial] = useState(DEFAULT_INITIAL);

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProjects());
  }, [status, dispatch]);

  const openCreate = () => {
    setFormInitial(DEFAULT_INITIAL);
    setFormOpen(true);
  };

  const openEdit = (project) => {
    setFormInitial({
      id:            project.id,
      name:          project.name,
      desc:          project.desc,
      docs:          project.docs,        // URL string for existing file
      skillset:      project.skillset,
      payment_type:  project.payment_type,
      price:         project.price,
      status:        project.status,
      freelancer:    project.freelancer,
    });
    setFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (formInitial.id) {
      dispatch(updateProject({ id: formInitial.id, project: formData }));
    } else {
      dispatch(createProject(formData));
    }
  };

  const openDeleteDialog = (project) => {
    setProjectToDelete(project);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = () => {
    if (projectToDelete) {
      dispatch(deleteProject(projectToDelete.id));
      setProjectToDelete(null);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" onClick={openCreate}>
          New Project
        </Button>
      </Box>

      {status === 'loading' && <Typography>Loading projects…</Typography>}
      {status === 'failed'  && <Typography color="error">{error}</Typography>}

      {status === 'succeeded' && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Skillset</TableCell>
              <TableCell>Docs</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Freelancer</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(proj => (
              <TableRow key={proj.id}>
                <TableCell>{proj.name}</TableCell>
                <TableCell>{proj.skillset}</TableCell>
                <TableCell>
                  {proj.docs
                    ? (
                      <MuiLink
                        href={proj.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </MuiLink>
                    )
                    : '—'
                  }
                </TableCell>
                <TableCell>
                  {proj.payment_type === 1 ? 'Fixed Price' : 'Hourly'}
                </TableCell>
                <TableCell>{proj.price}</TableCell>
                <TableCell>{proj.status}</TableCell>
                <TableCell>{proj.freelancer || '—'}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => openEdit(proj)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => openDeleteDialog(proj)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ProjectFormModal
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        initialValues={formInitial}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.name}
      />
    </Container>
  );
}
