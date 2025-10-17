const STATUS = {
  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 3xx Redirection
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export default STATUS;

/**
 * HTTP Status Codes Reference
 *
 * 2xx Success
 * 200 OK - Request succeeded, and the server returned the requested data.
 * 201 Created - A new resource was successfully created (e.g., after a POST request).
 * 202 Accepted - Request accepted for processing, but not completed yet.
 * 204 No Content - Request succeeded, but there’s no content to return (e.g., after DELETE).
 *
 * 3xx Redirection
 * 301 Moved Permanently - Resource has been permanently moved to a new URL.
 * 302 Found - Resource temporarily moved to a different URL.
 * 304 Not Modified - Cached version of the resource is still valid; no need to resend it.
 *
 * 4xx Client Errors
 * 400 Bad Request - The request is malformed or missing required parameters.
 * 401 Unauthorized - Authentication is required or has failed.
 * 403 Forbidden - Authenticated, but not allowed to access the resource.
 * 404 Not Found - The requested resource doesn’t exist.
 * 405 Method Not Allowed - HTTP method not supported for the resource.
 * 409 Conflict - Request conflicts with current state of the resource.
 * 422 Unprocessable Entity - Request is well-formed but contains semantic errors.
 *
 * 5xx Server Errors
 * 500 Internal Server Error - Generic server error; something went wrong on the server.
 * 501 Not Implemented - Server doesn’t support the functionality required to fulfill the request.
 * 502 Bad Gateway - Server received an invalid response from an upstream server.
 * 503 Service Unavailable - Server is temporarily unavailable (e.g., maintenance or overload).
 * 504 Gateway Timeout - Server didn’t receive a timely response from an upstream server.
 */
