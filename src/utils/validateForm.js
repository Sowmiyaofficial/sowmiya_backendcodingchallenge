export const validatePlayerForm = (formData) => {
  const errors = {};

  if (!formData.playerName || formData.playerName.trim() === '') {
    errors.playerName = 'Player name is required';
  }

  if (!formData.jerseyNumber || formData.jerseyNumber <= 0) {
    errors.jerseyNumber = 'Jersey number must be a positive number';
  }

  const validRoles = ['Batsman', 'Bowler', 'Keeper', 'All Rounder'];
  if (!formData.role || !validRoles.includes(formData.role)) {
    errors.role = 'Please select a valid role';
  }

  if (formData.totalMatches !== '' && formData.totalMatches < 0) {
    errors.totalMatches = 'Total matches cannot be negative';
  }

  return errors;
};