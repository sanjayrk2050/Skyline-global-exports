/**
 * Cursor & Background Canvas Effects (Deactivated)
 */
export const initInteractiveBackground = () => {
  const existing = document.getElementById('bg-interactive-canvas');
  if (existing) {
    existing.remove();
  }
};
