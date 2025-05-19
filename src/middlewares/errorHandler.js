// Función personalizada para manejar errores en controladores (usada con try/catch)
export function handleError(res, message = 'Ocurrió un error interno en el servidor', error = null) {
    console.error(error?.stack || error);
    res.status(500).json({
      message,
      error: error?.message || 'Error desconocido',
    });
  }
  