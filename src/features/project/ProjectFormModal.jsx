// src/features/project/ProjectFormModal.jsx
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, MenuItem, Select,
  InputLabel, FormControl, Typography, Link
} from '@mui/material';
import { Formik, Form } from 'formik';
import { projectSchema } from './projectValidation';

const PAYMENT_OPTIONS = [
  { value: 1, label: 'Fixed Price' },
  { value: 2, label: 'Hourly' },
];
const STATUS_OPTIONS = [
  { value: 'started', label: 'Posting Started' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'ended',   label: 'Ended' },
];

export default function ProjectFormModal({ open, onClose, initialValues, onSubmit }) {
  const isEdit = Boolean(initialValues.id);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Project' : 'Create Project'}</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={{
          name:         initialValues.name || '',
          desc:         initialValues.desc || '',
          docs:         null,
          skillset:     initialValues.skillset || '',
          payment_type: initialValues.payment_type || '',
          price:        initialValues.price || '',
          status:       initialValues.status || '',
          freelancer:   initialValues.freelancer || '',
          existingDocs: initialValues.docs || '',
        }}
        validationSchema={projectSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          // append name
          formData.append('name', values.name);
          // append other scalar fields
          ['desc','skillset','payment_type','price','status','freelancer']
            .forEach(key => {
              if (values[key] !== '' && values[key] != null) {
                formData.append(key, values[key]);
              }
            });
          // only append docs if new file selected
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

              {/* Project Name */}
              <Box mb={2}>
                <TextField
                  name="name"
                  label="Project Name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Box>

              {/* Description */}
              <Box mb={2}>
                <TextField
                  name="desc"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={values.desc}
                  onChange={handleChange}
                  error={touched.desc && Boolean(errors.desc)}
                  helperText={touched.desc && errors.desc}
                />
              </Box>

              {/* Existing docs link (edit only) */}
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

              {/* Skillset */}
              <Box mb={2}>
                <TextField
                  name="skillset"
                  label="Skillset (comma-separated)"
                  fullWidth
                  value={values.skillset}
                  onChange={handleChange}
                  error={touched.skillset && Boolean(errors.skillset)}
                  helperText={touched.skillset && errors.skillset}
                />
              </Box>

              {/* Payment Type & Price */}
              <Box mb={2} display="flex" gap={2}>
                <FormControl fullWidth error={touched.payment_type && Boolean(errors.payment_type)}>
                  <InputLabel>Payment Type</InputLabel>
                  <Select
                    name="payment_type"
                    label="Payment Type"
                    value={values.payment_type}
                    onChange={handleChange}
                  >
                    {PAYMENT_OPTIONS.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.payment_type && (
                    <Typography color="error" variant="body2">
                      {errors.payment_type}
                    </Typography>
                  )}
                </FormControl>
                <TextField
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Box>

              {/* Status & Freelancer */}
              <Box mb={2} display="flex" gap={2}>
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
                <TextField
                  name="freelancer"
                  label="Freelancer (User ID)"
                  type="number"
                  fullWidth
                  value={values.freelancer}
                  onChange={handleChange}
                  error={touched.freelancer && Boolean(errors.freelancer)}
                  helperText={touched.freelancer && errors.freelancer}
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isEdit ? 'Save Changes' : 'Create'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
