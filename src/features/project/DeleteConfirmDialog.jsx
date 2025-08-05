// src/features/project/DeleteConfirmDialog.jsx
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from '@mui/material';

export default function DeleteConfirmDialog({ open, onClose, onConfirm, projectName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Are you sure you want to delete <strong>{projectName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
