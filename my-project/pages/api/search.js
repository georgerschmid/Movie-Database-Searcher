

export default async (req, res) => {
  const response = await fetch('http://localhost:8000/search/')
  const data = await response.json()  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ data }))
}