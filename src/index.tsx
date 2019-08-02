import './index.css'

const req = require.context('./components', true, /index.tsx$/)

req.keys().forEach(req)
