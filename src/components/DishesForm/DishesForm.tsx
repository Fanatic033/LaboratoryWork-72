import {Box, Button, CircularProgress, Container, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import noImage from '../../assets/no-image.svg';
import {ApiDish} from '../../types.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {selectDishIsCreating} from '../../redux/DishSlice.ts';
import {addDish} from '../../redux/DishThunks.ts';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';


const ContactForm = () => {

  const dispatch = useAppDispatch();
 const navigate = useNavigate();
  const isLoading = useAppSelector(selectDishIsCreating);
  const [formState, setFormState] = useState<ApiDish>({
    title: '',
    price: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));

  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addDish({...formState})).unwrap();
      navigate('/admin')
      toast.success('Dish Added');
    } catch (e) {
      toast.error('could not add dish',);
    }
  };

  const previewImage = formState.image || noImage;

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
        <Typography variant="h5" gutterBottom>
          Add Dish
        </Typography>
        <TextField
          fullWidth
          label="Title"
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
        <Button type="submit" variant="contained" color="primary" sx={{mt: 3}} className={'mb-5'} disabled={isLoading}>
          Save{isLoading && <CircularProgress color='primary' size={20} className={'ms-3'}/>}
        </Button>

        <Box sx={{mt: 2, textAlign: 'center'}}>
          <Typography variant="subtitle1">Image Preview:</Typography>
          <img
            src={previewImage}
            alt="Фото отсутствует"
            style={{maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '8px'}}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ContactForm;