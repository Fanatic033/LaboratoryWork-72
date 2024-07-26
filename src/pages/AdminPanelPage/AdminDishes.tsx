import {useEffect} from 'react';
import {fetchDishes} from '../../redux/DishThunks.ts';
import {selectDishes, selectDishIsFetching} from '../../redux/DishSlice.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {CircularProgress} from '@mui/material';

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const isFetching = useAppSelector(selectDishIsFetching);


  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);
  return isFetching ? (
    <CircularProgress color="primary" size={50} className={'d-flex justify-content-center align-items-center'}/>
  ) : (
    <div className="d-flex flex-column gap-2 container">
      {dishes?.map((dish) => (
        <div className="card mb-4 mt-4" key={dish.id}>
          <div className="d-flex align-items-center">
            <img src={dish.image} className="card-img-left" alt="img" style={{width: '140px', marginRight: '20px'}}/>
            <div className="card-body">
              <strong className="card-title fs-4">{dish.title}</strong>
            </div>
            <strong className={'fs-5 me-5'}>{dish.price} KGS</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDishes;