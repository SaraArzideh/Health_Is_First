const errorHandler = (err, req, res, next) => {
    let error = { ...err };
  
    error.message = err.message;
  
    // Log the error for the developer
    console.error(err.stack);
  
    // Send a generic error message
    res.status(500).json({
      success: false,
      error: error.message || "Server Error",
    });
  };
  
  module.exports = errorHandler;