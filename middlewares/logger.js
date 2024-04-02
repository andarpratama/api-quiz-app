const logger = (req, res, next) => {
    console.info(`${new Date()} - ${req.method} | ${req.url}`)
    next()
}

export default logger