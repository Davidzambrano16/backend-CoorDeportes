const handleError = (error, req, res, next) => {
  // Si error.status no existe, usamos 500 por defecto
  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';
  const errorDetails = error.errorContent?.message || 'Sin detalles adicionales';

  res.status(status).json({
    message,
    error: errorDetails,
  });
};

export default handleError