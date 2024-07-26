import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchDishes} from '../../redux/DishThunks';
import {selectDishes} from '../../redux/DishSlice';
import DishesForm from '../../components/DishesForm/DishesForm';
import {RootState} from '../../redux/store';
import {CircularProgress} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';

const EditDishPage = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state: RootState) => selectDishes(state));

  const dish = dishes.find((d) => d.id === id);

  useEffect(() => {
    if (!dish) {
      dispatch(fetchDishes());
    }
  }, [dispatch, dish]);

  if (!dish) {
    return <CircularProgress/>;
  }

  return <DishesForm existingDish={dish}/>;
};

export default EditDishPage;
