import React, {useEffect, useState} from 'react'
import {API_URL} from '../constants'
import AddCar from './AddCar'
import { AgGridReact } from 'ag-grid-react';
import EditCar from './EditCar'
import 'ag-grid-community/styles/ag-grid.css';

import 'ag-grid-community/styles/ag-theme-alpine.css';


function Carlist() {
    const [cars, setCars] = useState([]);
    const [columnDefs] = useState([
        {field: 'brand', sortable: true, filter: true, width : 120},
        {field: 'model', sortable: true, filter: true, width : 120},
        {field: 'color', sortable: true, filter: true, width : 120},
        {field: 'fuel', sortable: true, filter: true, width : 120},
        {field: 'year', sortable: true, filter: true, width : 120},
        {field: 'price', sortable: true, filter: true, width : 125},
        {
        width:120,
        cellRenderer : params => <EditCar data={params.data}  updateCar={updateCar} />
        }, 
        {cellRenderer : params => <button onClick = {() => deleteCar(params.data)} >Delete</button>, width : 120}
    ])

    const deleteCar = (data) => {
        if (window.confirm("Are u sure?")) {
        fetch(data._links.car.href, {method: 'DELETE'})
        .then(response => {
            if (response.ok) 
             getCars() 
             else 
             alert("Something is wrong with deletion")
        })
        .catch(err => console.error(err))
    }
}
    const addCar = (car) => {
        fetch(API_URL+"/cars", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok)
            getCars();
            else
            alert("Something went wrong in addition")
        })
        .catch(err => console.error(err))
    }

    useEffect( () => {
        fetch(API_URL + '/cars')
        .then(response => {
            if (response.ok) 
               return response.json() 
            else 
            alert("Something goes wrong") 
        }
            )
        .then( data => setCars(data._embedded.cars))
        .catch(err => console.log(err))
    }, [] )

    const getCars = () => {
        fetch(API_URL + '/cars')
        .then(response => {
            if (response.ok) 
               return response.json() 
            else 
            alert("Something goes wrong") 
        }
            )
        .then( data => setCars(data._embedded.cars))
        .catch(err => console.log(err))
    }

    const updateCar = (car, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)

        })
        .then(response => {
            if (response.ok)
            getCars()
            else 
            alert("Something went wrong in edit")
        })
        .catch(err =>console.log(err))
    }

    return (
    
        <div className="ag-theme-alpine" style={{height: 500, width: '90%', margin: 'auto'}}>
             <AddCar addCar={addCar}/>
            <AgGridReact 
            rowData = {cars}
            columnDefs = {columnDefs}
            pagination= {true}
            paginationPageSize={10}
            />
        </div>
    )

}
export default Carlist
