import ViteExpress from 'vite-express'
import express from 'express'
import morgan from 'morgan'

// set up app instance
const app = express()

// define port
const port = 8000
let myId = 4

// set up middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

ViteExpress.config({ printViteDevServerHost: true })

const TEST_DATA = [
    { id: 0, description: 'ISS Poop Scrubber', rate: 50, hours: 4 },
    { id: 1, description: 'Poop scientist', rate: 50, hours: 2 },
    { id: 2, description: 'Poopsite design', rate: 50, hours: 5 },
    { id: 3, description: 'Website poopvelopment', rate: 100, hours: 5 },
  ];

// Routes
app.get('/api/invoices', (req, res) => {
    res.json(TEST_DATA)
})

app.post('/api/invoice', (req, res) => {
    const {description} = req.body 

    const newInvoiceRow = {
        id: myId,
        description: description,
        rate: 0,
        hours: 0,
        isEditing: true
    }
    TEST_DATA.push(newInvoiceRow)
    myId += 1

    res.json(newInvoiceRow)
})

// open up our server
ViteExpress.listen(app, port, () => console.log(`Catching a gnarly tube on http://localhost:${port}`))