// Extracting logging into its own module is a good idea
// in several ways. If we wanted to start writing logs to
// a file or send them to an external logging service like
// graylog (https://graylog.org/) or papertrail (https://www.papertrail.com/) 
// we would only have to make changes in one place.
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.log(...params)
}

module.exports = { info, error }