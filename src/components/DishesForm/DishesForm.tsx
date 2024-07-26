import {Box, Button, Container, TextField, Typography} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {addDish, editDish} from '../../redux/DishThunks';
import {Dish} from '../../types';
import noImage from '../../assets/no-image.svg';
import {useAppDispatch} from '../../hooks/redux-hooks.ts';
import {useNavigate} from 'react-router-dom';

interface Props {
  existingDish?: Dish;
}

const DishesForm: FC<Props> = ({existingDish}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    id: existingDish?.id || '',
    title: existingDish?.title || '',
    price: existingDish?.price || '',
    image: existingDish?.image || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dish = {
      id: formState.id,
      title: formState.title,
      price: formState.price,
      image: formState.image,
    };
    if (existingDish) {
      dispatch(editDish(dish));
    } else {
      dispatch(addDish(dish));
    }
    navigate('/admin')
  };

  const previewImage = formState.image || noImage;

  useEffect(() => {
    if (existingDish) {
      setFormState(existingDish);
    }
  }, [existingDish]);

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
        <Typography variant="h5" gutterBottom>
          {existingDish ? 'Edit Dish' : 'Add Dish'}
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="title"
          value={formState.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={formState.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Image"
          name="image"
          value={formState.image}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{mt: 3}}>
          Save
        </Button>
        <Box sx={{mt: 2, textAlign: 'center'}}>
          <Typography variant="subtitle1">Image Preview:</Typography>
          <img
            src={previewImage}
            alt="No Image"
            style={{maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '8px'}}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default DishesForm;
