import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks.ts';
import { CircularProgress, Button, Modal, Box, Typography, IconButton } from '@mui/material';
import {
  addToCart,
  fetchDishesForClient,
  selectDishesForClient,
  selectIsFetchingForClient,
  selectCart, clearCart, submitOrder, updateCart
} from '../../redux/ClientSlice.ts';
import CloseIcon from '@mui/icons-material/Close';

const ClientPage = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishesForClient);
  const isFetching = useAppSelector(selectIsFetchingForClient);
  const cart = useAppSelector(selectCart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDishesForClient());
  }, [dispatch]);

  const handleCardClick = (dishID: string) => {
    dispatch(addToCart(dishID));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrder = () => {
    const order = {
      cart,
      totalPrice: calculateTotalPrice() + 150,
    };
    dispatch(submitOrder(order));
    dispatch(clearCart());
    handleModalClose();
  };

  const calculateTotalPrice = () => {
    return Object.keys(cart).reduce((total, id) => {
      const dish = dishes.find(d => d.id === id);
      if (!dish || dish.price === undefined) return total;
      const priceNumber = parseFloat(dish.price);
      return total + priceNumber * cart[id];
    }, 0);
  };

  const handleRemoveItem = (dishID: string) => {
    const updatedCart = { ...cart };
    delete updatedCart[dishID];
    dispatch(updateCart(updatedCart));
  };

  return (
    <div>
      {isFetching ? (
        <div className={'d-flex justify-content-center align-items-center'}>
          <CircularProgress color="primary" size={50} />
        </div>
      ) : (
        <>
          <div className="d-flex flex-column gap-2 container">
            {dishes.map((dish) => (
              <div className="card mb-4 mt-4 w-50" key={dish.id} onClick={() => handleCardClick(dish.id)}>
                <div className="d-flex align-items-center">
                  <img src={dish.image} className="card-img-left" alt="img" style={{ width: '140px', marginRight: '20px' }} />
                  <div className="card-body">
                    <strong className="card-title fs-4">{dish.title}</strong>
                  </div>
                  <strong className={'fs-5 me-5'}>{dish.price} KGS</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="container d-flex justify-content-between align-items-center mt-4">
            <Typography variant="h6">Total Price: {calculateTotalPrice()} KGS</Typography>
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
              Checkout
            </Button>
          </div>
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 5,
                borderRadius: 2,
              }}
            >
              <IconButton
                onClick={handleModalClose}
                sx={{ position: 'absolute', top: 16, right: 16 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography id="modal-title" variant="h6" component="h2">
                Order Preview
              </Typography>
              <div>
                {Object.keys(cart).map(id => {
                  const dish = dishes.find(d => d.id === id);
                  return dish ? (
                    <div key={id} className="d-flex justify-content-between align-items-center mb-2">
                      <Typography>{dish.title} x {cart[id]}</Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveItem(id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : null;
                })}
                <Typography variant="h6" component="h3">
                  Delivery: 150 KGS
                </Typography>
                <Typography variant="h5" component="h3">
                  Total: {calculateTotalPrice() + 150} KGS
                </Typography>
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="outlined" color="secondary" onClick={handleModalClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrder}
                    sx={{ ml: 2 }}
                  >
                    Order
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ClientPage;
