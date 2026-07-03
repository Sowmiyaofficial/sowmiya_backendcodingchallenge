function ConfirmModal({ show, playerName, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content card-custom border-0">
          <div className="modal-header border-0">
            <h5 className="modal-title brand-font">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            Are you sure you want to remove <strong>{playerName}</strong> from the team? This action cannot be undone.
          </div>
          <div className="modal-footer border-0">
            <button className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              <i className="bi bi-trash3 me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;