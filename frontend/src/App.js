import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import VerifiedSellers from './screens/VerifiedSellers' 
import UnverifiedSellers from './screens/UnverifiedSellers' 
import DeliverProducts from './screens/DeliverProducts' 
import ReturnProducts from './screens/ReturnProducts' 
import AddNewStocks from './screens/AddNewStocks' 
import AddOldStocks from './screens/AddOldStocks' 
import Admins from './screens/Admins'
import UserOrderRequests from './screens/UserOrderRequests'
import AddOffers from './screens/AddOffers'
import RemoveOffers from './screens/RemoveOffers'
import {useSelector,useDispatch} from 'react-redux'
import {useState,useEffect} from 'react'
import { login } from './actions/userActions'
function App({history}) {
  const userLogin = useSelector(state =>state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  useEffect(()=>{
   if(!userInfo||userInfo.role)
   {
     dispatch(login('','',''))
   }
   console.log(userInfo)
   
  },[dispatch])

  return (
    <Router>
      <Header history={history} />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/verifiedsellers' component={VerifiedSellers} />
          <Route path='/unverifiedsellers' component={UnverifiedSellers} />
          <Route path='/admins' component={Admins} /> 
          <Route path='/returnproducts' component={ReturnProducts} />
          <Route path='/deliverproducts' component={DeliverProducts} />
          <Route path='/addoldstocks' component={AddOldStocks} />
          <Route path='/addnewstocks' component={AddNewStocks} />
          <Route path='/userorderrequests' component={UserOrderRequests} />
          <Route path='/addoffers' component={AddOffers} />
          <Route path='/removeoffers' component={RemoveOffers} />
          <Route path='/admins' component={Admins} />      


          <Route path='/admin/orderlist' component={OrderListScreen} /> 
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
