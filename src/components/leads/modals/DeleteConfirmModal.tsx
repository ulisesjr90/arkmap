import React from 'react';
import { AlertCircle } from 'lucide-react';

type DeleteConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onConfirm, onCancel }) => (
  <div className="modal">
    <div className="modal-content">
      <AlertCircle />
      <h2>Are you sure?</h2>
      <p>This action cannot be undone.</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  </div>
);
