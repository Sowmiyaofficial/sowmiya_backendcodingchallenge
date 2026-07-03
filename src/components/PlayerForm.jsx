import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePlayerForm } from '../utils/validateForm';

const ROLES = ['Batsman', 'Bowler', 'Keeper', 'All Rounder'];

function PlayerForm({ initialData, onSubmit, isEdit = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    playerName: '',
    jerseyNumber: '',
    role: '',
    totalMatches: '',
    teamName: '',
    countryOrStateName: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        playerName: initialData.playerName || '',
        jerseyNumber: initialData.jerseyNumber || '',
        role: initialData.role || '',
        totalMatches: initialData.totalMatches ?? '',
        teamName: initialData.teamName || '',
        countryOrStateName: initialData.countryOrStateName || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePlayerForm(formData);
    setErrors(validationErrors);
    setServerError('');

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        jerseyNumber: Number(formData.jerseyNumber),
        totalMatches: formData.totalMatches === '' ? 0 : Number(formData.totalMatches),
      };
      await onSubmit(payload);
      navigate('/');
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Something went wrong while saving the player. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card-custom p-4 p-md-5" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>{serverError}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label form-label-custom">Player Name *</label>
          <input
            type="text"
            name="playerName"
            className={`form-control ${errors.playerName ? 'is-invalid' : ''}`}
            value={formData.playerName}
            onChange={handleChange}
            placeholder="e.g. Virat Kohli"
          />
          {errors.playerName && <div className="invalid-feedback-custom">{errors.playerName}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label form-label-custom">Jersey Number *</label>
          <input
            type="number"
            name="jerseyNumber"
            className={`form-control ${errors.jerseyNumber ? 'is-invalid' : ''}`}
            value={formData.jerseyNumber}
            onChange={handleChange}
            placeholder="e.g. 18"
          />
          {errors.jerseyNumber && <div className="invalid-feedback-custom">{errors.jerseyNumber}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label form-label-custom">Role *</label>
          <select
            name="role"
            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select role</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.role && <div className="invalid-feedback-custom">{errors.role}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label form-label-custom">Total Matches</label>
          <input
            type="number"
            name="totalMatches"
            className={`form-control ${errors.totalMatches ? 'is-invalid' : ''}`}
            value={formData.totalMatches}
            onChange={handleChange}
            placeholder="e.g. 274"
          />
          {errors.totalMatches && <div className="invalid-feedback-custom">{errors.totalMatches}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label form-label-custom">Team Name</label>
          <input
            type="text"
            name="teamName"
            className="form-control"
            value={formData.teamName}
            onChange={handleChange}
            placeholder="e.g. India"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label form-label-custom">Country / State</label>
          <input
            type="text"
            name="countryOrStateName"
            className="form-control"
            value={formData.countryOrStateName}
            onChange={handleChange}
            placeholder="e.g. India"
          />
        </div>

        <div className="col-12">
          <label className="form-label form-label-custom">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief summary about the player"
          ></textarea>
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary-custom px-4" disabled={submitting}>
          {submitting ? (
            <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
          ) : (
            <><i className="bi bi-check-circle-fill me-1"></i>{isEdit ? 'Update Player' : 'Add Player'}</>
          )}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary px-4"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PlayerForm;