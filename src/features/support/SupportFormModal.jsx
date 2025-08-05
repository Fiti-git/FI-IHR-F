// src/features/support/SupportFormModal.jsx
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, MenuItem, Select,
  InputLabel, FormControl, Typography, Link
} from '@mui/material';
import { Formik, Form } from 'formik';
import { supportSchema } from './supportValidation';
import { useSelector } from 'react-redux';

const STATUS_OPTIONS = [
  { value: 'open',        label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed',      label: 'Closed' },
];

export default function SupportFormModal({ open, onClose, initialValues, onSubmit }) {
  const isEdit = Boolean(initialValues.id);
  const projects = useSelector(state => state.project.projects);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Ticket' : 'New Ticket'}</DialogTitle>
      <Formik
        enableReinitialize
        initialValues={{
          project:     initialValues.project || '',
          desc:        initialValues.desc || '',
          docs:        null,
          status:      initialValues.status || 'open',
          existingDocs: initialValues.docs || '',
        }}
        validationSchema={supportSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('project', values.project);
          formData.append('desc', values.desc);
          formData.append('status', values.status);
          if (values.docs instanceof File) {
            formData.append('docs', values.docs);
          }
          onSubmit(formData);
          setSubmitting(false);
          onClose();
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
          <Form>
            <DialogContent dividers>
              {/* Project Select */}
              <Box mb={2}>
                <FormControl fullWidth error={touched.project && Boolean(errors.project)}>
                  <InputLabel>Project</InputLabel>
                  <Select
                    name="project"
                    label="Project"
                    value={values.project}
                    onChange={handleChange}
                  >
                    {projects.map(p => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.project && (
                    <Typography color="error" variant="body2">
                      {errors.project}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              {/* Description */}
              <Box mb={2}>
                <TextField
                  name="desc"
                  label="Description"
                  fullWidth multiline rows={3}
                  value={values.desc}
                  onChange={handleChange}
                  error={touched.desc && Boolean(errors.desc)}
                  helperText={touched.desc && errors.desc}
                />
              </Box>

              {/* Existing docs */}
              {isEdit && values.existingDocs && (
                <Box mb={2}>
                  <Typography variant="body2">
                    Current docs:{' '}
                    <Link href={values.existingDocs} target="_blank" rel="noopener">
                      {values.existingDocs.split('/').pop()}
                    </Link>
                  </Typography>
                </Box>
              )}

              {/* File upload */}
              <Box mb={2}>
                <Button variant="outlined" component="label">
                  {values.docs ? 'Change Docs' : 'Upload Docs'}
                  <input
                    type="file"
                    hidden
                    onChange={e => setFieldValue('docs', e.currentTarget.files[0])}
                  />
                </Button>
                {values.docs && (
                  <Typography variant="body2" mt={1}>
                    Selected: {values.docs.name}
                  </Typography>
                )}
                {touched.docs && errors.docs && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.docs}
                  </Typography>
                )}
              </Box>

              {/* Status */}
              <Box mb={2}>
                <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    label="Status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.status && (
                    <Typography color="error" variant="body2">
                      {errors.status}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isEdit ? 'Save' : 'Create'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
