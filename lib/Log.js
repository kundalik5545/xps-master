export const log = {
  info: (msg, data) => console.info(`🚀 [INFO] ${msg}`, data || ""),
  warn: (msg, data) => console.warn(`⚠️ [WARN] ${msg}`, data || ""),
  error: (msg, data) => console.error(`❌ [ERROR] ${msg}`, data || ""),
  debug: (msg, data) => console.debug(`🐛 [DEBUG] ${msg}`, data || ""),
};

export const logger = {
  db: (data) => console.info(`🚀 Database Response is => `, data || ""),
  front: (data) => console.info(`🚀 Frontend Response is => `, data || ""),
  back: (data) => console.info(`🚀 Backend Response is =>`, data || ""),
  paylod: (data) => console.info(`🚀 Frontend Payload is =>`, data || ""),
  custom: (msg, data) => console.info(`🚀 [INFO] ${msg}`, data || ""),
};
