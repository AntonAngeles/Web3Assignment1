function handleError(res, error, defaultMessage = 'Something went wrong') {
    console.error(error);

    const statusCode = error.status || 500; // Use error's status if available
    const message = error.message || defaultMessage;
    res.status(statusCode).json({ message });
}

module.exports = handleError;