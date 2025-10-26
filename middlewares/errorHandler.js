const errorHandler = (err, req, res, next) => {
  console.error("Erreur capturée :", err);

  // Default values
  let status = err.status || 500;
  let errorType = err.name || "InternalServerError";
  let message = err.message || "Une erreur interne est survenue.";
  let details = err.details || null;

  // Handle different error types
  if (err.name === "ValidationError") {
    status = 400;
    errorType = "Bad Request";
    const validationErrors = Object.keys(err.errors).map((field) => ({
      field,
      message: err.errors[field].message,
      code: "VALIDATION_ERROR",
    }));
    details = validationErrors;
    message = "Erreur de validation sur un ou plusieurs champs.";
  } else if (err.name === "CastError") {
    status = 400;
    errorType = "Bad Request";
    message = `L'identifiant '${err.value}' est invalide pour le champ '${err.path}'.`;
    details = {
      field: err.path,
      value: err.value,
      code: "INVALID_OBJECT_ID",
    };
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    errorType = "Unauthorized";
    message = "Token d'authentification invalide.";
    details = { code: "INVALID_TOKEN" };
  } else if (err.name === "TokenExpiredError") {
    status = 401;
    errorType = "Unauthorized";
    message = "Le token d'authentification a expiré.";
    details = { code: "TOKEN_EXPIRED" };
  } else if (err.name === "MongoNetworkError") {
    status = 503;
    errorType = "Service Unavailable";
    message = "Erreur de connexion à la base de données.";
    details = { code: "DATABASE_CONNECTION_ERROR" };
  } else if (err.name === "MongoServerError") {
    status = 500;
    errorType = "Internal Server Error";
    message = "Erreur du serveur de base de données.";
    details = { code: "DATABASE_SERVER_ERROR" };
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    status = 400;
    errorType = "Bad Request";
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} existe déjà.`;
    details = {
      field,
      value: err.keyValue[field],
      code: "DUPLICATE_KEY_ERROR",
    };
  }

  // Standardized error response
  res.status(status).json({
    success: false,
    status,
    error: errorType,
    message,
    details,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};

module.exports = errorHandler;
