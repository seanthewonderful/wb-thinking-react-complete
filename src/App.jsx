import './App.css';
import InvoiceTable from './components/InvoiceTable';


function App({ initialInvoiceList }) {
  return (
    <InvoiceTable initialInvoiceData={initialInvoiceList}/>
  )
}

export default App;
