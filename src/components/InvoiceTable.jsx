import './InvoiceTable.css';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableAddButton from './InvoiceTableAddButton';
import { useState } from 'react';
import axios from 'axios'

let myId = 4

const InvoiceTable = ({ initialInvoiceData }) => {

    const [invoiceList, setInvoiceList] = useState(initialInvoiceData)

    const addInvoiceRow = async () => {
        const {data} = await axios.post('/api/invoice', {
            description: "Description",
        })

        const newInvoice = {...data}
        setInvoiceList([...invoiceList, newInvoice])
        // set a base value of our current invoice list
        // create a new object that holds values for new row
        // push that object into base value of invoice list
        // set our state invoice list to match the base
        // const newInvoiceList = [...invoiceList]
        
        // const newInvoiceRow = {
        //     id: myId,
        //     description: 'Description',
        //     rate: '',
        //     hours: '',
        //     isEditing: true
        // }

        // newInvoiceList.push(newInvoiceRow)
        // setInvoiceList(newInvoiceList)
        myId += 1
    }

    const deleteInvoiceRow = (id) => {
        // this function needs to be called in the <EditableRowModeButtons /> component, but there is not a direct path to pass it down. So we are passing it down through <InvoiceTableRow /> with the id, which then sends it down to <EditableRowModeButtons /> 
        const newInvoiceList = [...invoiceList]
        const index = newInvoiceList.findIndex((invoice) => invoice.id === id)

        newInvoiceList.splice(index, 1)
        setInvoiceList(newInvoiceList)
    }

    const rows = invoiceList.map((invoiceItem) => {

        const { id, description, rate, hours, isEditing } = invoiceItem

        return (
            <InvoiceTableRow 
                key={id}
                initialInvoiceData={{
                    description,
                    rate,
                    hours
                }}
                initialIsEditing={isEditing}
                onDeleteClick={() => deleteInvoiceRow(id)}
            />
        )
    })

    return (
        <table>

            <thead>
                <InvoiceTableHeader />
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                <InvoiceTableAddButton 
                    onAddClick={addInvoiceRow}
                />
            </tfoot>

        </table>
    )
}

export default InvoiceTable