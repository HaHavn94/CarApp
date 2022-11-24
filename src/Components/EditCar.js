import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
    const [car, setCar] = React.useState( {
        brand: '',
        model:'',
        color:'',
        fuel:'',
        year:'',
        price:''
    })
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data)
    setCar( {
        brand: props.data.brand,
        model: props.data.model,
        color: props.data.color,
        fuel: props.data.fuel, 
        year: props.data.year,
        price: props.data.price
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCar(car, props.data._links.car.href) ;
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Edit the Information
          </DialogContentText>
          <TextField    
            margin="dense" 
            value = {car.brand}         
            label="brand"
            fullWidth
            variant="standard"
            onChange={e => setCar({...car,brand: e.target.value})}
          />

<TextField    
            margin="dense" 
            value = {car.model}         
            label="model"
            fullWidth
            variant="standard"
            onChange={e => setCar({...car,model: e.target.value})}
          />

<TextField    
            margin="dense" 
            value = {car.color}         
            label="color"
            fullWidth
            variant="standard"
            onChange={e => setCar({...car,color: e.target.value})}
          />

<TextField    
            margin="dense" 
            value = {car.fuel}         
            label="fuel"
            fullWidth
            variant="standard"
            onChange={e => setCar({...car,fuel: e.target.value})}
          />

<TextField    
            margin="dense" 
            value = {car.year}         
            label="year"
            fullWidth
            variant="standard"
            onChange={e => setCar({...car,year: e.target.value})}
          />
           <TextField    
            margin="dense" 
            value = {car.price}         
            label="price"
            fullWidth
            variant="standard"
            onChange={e => setCar({...car,price: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
