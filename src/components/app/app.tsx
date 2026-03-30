import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import { useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '../../pages';
import { AppHeader } from '../../components/app-header/app-header';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Modal } from '../../components/modal/modal';
import { OrderInfo } from '../../components/order-info/order-info';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  getIngredientsLoading
} from '../../services/slices/ingredientsSlice';
import { checkUserAuth } from '../../services/slices/userSlice';
import '../../index.css';
import styles from './app.module.css';
import { Preloader } from '../../components/ui/preloader/preloader';

const App = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const location = useLocation();
  const background = location.state?.background;
  const match = useMatch('/feed/:number');
  const orderNumber = match?.params.number;

  const dispatch = useDispatch();
  const loading = useSelector(getIngredientsLoading);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route path='/profile'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='orders'
                element={
                  <ProtectedRoute>
                    <ProfileOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path='orders/:number'
                element={
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path='/ingredients/:id'
              element={
                <div className={styles.detailPageWrap}>
                  <p
                    className={`text text_type_main-large ${styles.detailHeader}`}
                  >
                    Детали ингредиента
                  </p>
                  <IngredientDetails />
                </div>
              }
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title={`Заказ №${orderNumber}`} onClose={handleGoBack}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={handleGoBack}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal
                      title={`Заказ №${orderNumber}`}
                      onClose={handleGoBack}
                    >
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
