export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const formatTime = (timeString) =>
  new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const getCategoryVariant = (category) => {
  const variants = {
    stage: 'primary',
    street: 'success',
    mime: 'secondary',
    monologue: 'warning',
    improv: 'danger',
  };
  return variants[category] || 'secondary';
};
