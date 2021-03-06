export default async function (path) {
  const response = await fetch(path)
  if (!response.ok) {
    // get error message from body or default to response status
    const error = (response && response.message) || response.status
    throw new Error(error)
  }
  const responseJSON = await response.json()
  return responseJSON || {}
}
