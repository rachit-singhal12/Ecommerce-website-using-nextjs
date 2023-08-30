import Breadcrumb from "@/components/cards/layout/Breadcrumb";
import { getCartItems } from "@/utils/cartItems";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiRupee } from "react-icons/bi";

function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [yourCart, setYourCart] = useState({});
  const router = useRouter();

  useEffect(() => {
    const temp = Cookies.get('yourCart');
    setYourCart(temp && JSON.parse(Cookies.get('yourCart')))
    setCart(cart?.length);
  }, [cart]);

  useEffect(() => {
    const parsedCart = JSON.parse(Cookies.get('yourCart'));
    if(!parsedCart){
        router.push('/')
    }
    setYourCart(parsedCart);
    setCartItems(cart?.length);
  }, [cart]);

  const checkoutHandler = (data) => {
    console.log(data);
    router.push({
        pathname: '/thank-you',
        query: {
        cart:JSON.stringify(cart),
        yourCart:JSON.stringify(yourCart),
        shipping:JSON.stringify(data)
        }
    })
    Cookies.remove('yourCart');
    Cookies.remove('cartItems');
  };
    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <Breadcrumb title={"checkout"}/>
            <form onSubmit={handleSubmit(checkoutHandler)}>
                <div className="row g-4">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge badge-secondary rounded-pill">{ cartItems }</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between">
                                <div className="my-0">Subtotal (<BiRupee size={21}/>)</div>
                                <strong className="text-muted">{ yourCart?.subTotal?.toFixed(2) }</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <div className="my-0">GST 18% (<BiRupee size={21}/>)</div>
                                <strong className="text-muted">{ yourCart?.gstAmount?.toFixed(2) }</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <div className="my-0">Total (<BiRupee size={21}/>)</div>
                                <strong className="text-muted">{ yourCart?.grandTotal?.toFixed(2) }</strong>
                            </li>
                        </ul>
                        <div className="card p-2">
                            <div className="input-group">
                                <button type="submit" className="w-100 btn btn-primary btn-lg">Order Place</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 col-md-8">
                    <h4 className="mb-3">Billing address</h4>
                    <div className="row g-3">
                        <div className="col-md-6 mb-3">
                            <label for="firstName">First name</label>
                            <input type="text" className="form-control" id="firstName" {...register('firstName',{required:true})} required/>
                            {errors.firstName && <div className="invalid-feedback">
                            Valid first name is required.
                            </div>}
                        </div>
                        <div className="col-sm-6">
                            <label for="lastName">Last name</label>
                            <input type="text" className="form-control" id="lastName" {...register('lastName',{required:true})} required/>
                            {errors.lastName && <div className="invalid-feedback">
                            Valid last name is required.
                            </div>}
                        </div>
                        <div className="col-12">
                        <label for="mobile">Mobile</label>
                        <div className="input-group">
                        <input type="text" className="form-control" id="mobile" {...register('mobile',{required:true})} required/>
                            {errors.mobile && <div className="text-danger">
                            Valid 10 digit mobile number required
                            </div>}
                        </div>
                        </div>
                        <div className="mb-3">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" {...register('email',{required:true})} placeholder="you@example.com"/>
                        {errors.email && <div className="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>}
                        </div>
                    </div>
                        <div className="col-12">
                        <label for="address">Address</label>
                        <input type="text" className="form-control" id="address" {...register('address',{required:true})}placeholder="1234 Main St" required/>
                        {errors.sddress && <div className="invalid-feedback">
                            Please enter your shipping address.
                        </div>}
                        </div>
                        <div className="col-12">
                        <label for="address2">Landmark</label>
                        <input type="text" className="form-control" id="address2" {...register('landmark',{required:true})} placeholder="Apartment or suite"/>
                        {errors.sddress && <div className="invalid-feedback">
                            Please enter your shipping address.
                        </div>}
                        <div className="row">
                        <div className="col-md-5 mb-3">
                            <label for="country">Country</label>
                            <select className="custom-select d-block w-100" id="country" required>
                            <option value="">Choose...</option>
                            <option>India</option>
                            </select>
                            <div className="invalid-feedback">
                            Please select a valid country.
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label for="state">State</label>
                            <select className="custom-select d-block w-100" id="state" required>
                            <option value="">Choose...</option>
                            <option>Uttarakhand</option>
                            <option>Uttar pradesh</option>
                            </select>
                            <div className="invalid-feedback">
                            Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="zip">Zip</label>
                            <input type="text" className="form-control" id="zip" placeholder="" required/>
                            <div className="invalid-feedback">
                            Zip code required.
                            </div>
                        </div>
                        </div>
                        </div>

                        
                        <hr className="mb-4"/>
                        <h4 className="mb-3">Payment</h4>
                        <div className="custom-control custom-radio">
                            <input id="cash" name="paymentMethod" type="radio" {...register('payment',{required:true})} className="custom-control-input" checked="true" required/>
                            <label className="custom-control-label" for="cash"> Cash on deleivery</label>
                        </div>
                    </div>
                </div> 
            </form> 
        </>
    )
};
export default Checkout;