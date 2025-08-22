import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 4000
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dog_adoption_api'

connectDB(URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })
