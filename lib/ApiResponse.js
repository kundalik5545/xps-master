/**
 * Creates a standardized API response object
 * @param {boolean} success - Indicates if the operation was successful
 * @param {number} statusCode - HTTP status code
 * @param {string} msg - Response message
 * @param {*} data - Response payload
 * @returns {Object} API response object
 */

const ApiRes = (success, statusCode, msg, data) => {
  return {
    success: success || false,
    status: statusCode,
    message: msg || "Request processed successfully",
    data: data || null,
  };
};

export { ApiRes };
