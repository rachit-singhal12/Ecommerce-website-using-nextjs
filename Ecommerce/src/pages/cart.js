import React, { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import Breadcrumb from "@/components/cards/layout/Breadcrumb";
import { getCartItems, removeFromCart, updateCartItems } from "@/utils/cartItems";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Cart() {
  const [cart, setCart] = useState(getCartItems());
  const [yourCart, setYourCart] = useState({
    subTotal: 0,
    gstAmount: 0,
    grandTotal: 0
  });

  const router = useRouter();

  const checkoutHandler = () => {
    Cookies.set("yourCart", JSON.stringify(yourCart));
    router.push("/checkout");
  };

  const handleQtyChange = (product, newQty) => {
    if (newQty > 0 && newQty <= 100) {
      const productId = product.id;
      updateCartItems(productId, newQty);
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === productId ? { ...item, qty: newQty } : item))
      );
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    const { subTotal, gstAmount } = cart.reduce(
      (accum, item) => {
        accum.subTotal += item.price * item.qty;
        return accum;
      },
      { subTotal: 0, gstAmount: 0 }
    );
    const calculatedGstAmount = subTotal * 0.18;
    setYourCart({
      ...yourCart,
      subTotal,
      gstAmount: calculatedGstAmount,
      grandTotal: subTotal + calculatedGstAmount
    });
  }, [cart, yourCart]);
  return (
    <>
      <Head>
        <title>Your cart</title>
      </Head>
      <Breadcrumb title="Your cart" />
      <div className="table-responsive mt-4">
        <table className="table table-borderless">
          <thead>
            <tr className="border-bottom">
              <th scope="col">Items</th>
              <th scope="col">Prices</th>
              <th className="float-end" scope="col">
                Quantity
              </th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr className="border-bottom" key={item.id}>
                  <td>
                    <div className="d-flex gap-3">
                      <img
                        src={item.image}
                        className="rounded-circle"
                        width={40}
                        height={40}
                        alt={item.title}
                      />
                      {item.title}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="d-flex align-items-center">
                      <BiRupee size={21} />
                      {item.price}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="input-group input-group-sm w-25 mb-3 border">
                      <button
                        className="input-group-text btn btn-sm btn-outline-dark"
                        onClick={() => handleQtyChange(item, item.qty - 1)}
                      >
                        -
                      </button>
                      <input
                        type="tel"
                        className="form-control"
                        value={item.qty}
                        onChange={(e) => handleQtyChange(item, parseInt(e.target.value))}
                      />
                      <button
                        className="input-group-text btn btn-sm btn-outline-dark"
                        onClick={() => handleQtyChange(item, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center d-flex justify-content-between">
                    <div className="d-flex align-items-center text-center">
                      <BiRupee size={21} />
                      {item.price * item.qty}
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center text-danger" colSpan={4}>
                  Empty cart
                </td>
              </tr>
            )}
            { cart.length > 0 &&<>
              <tr>
              <td></td>
              <th className="border-bottom" colspan={2}>Subtotal</th>
              <th className="border-bottom">
                <div className="d-flex align-items-center text-center">
                  <BiRupee size={18}/>{yourCart?.subTotal}
                </div>
              </th>
            </tr>
            <tr>
              <td></td>
              <th className="border-bottom" colspan={2}>18% GST</th>
              <th className="border-bottom">
                <div className="d-flex align-items-center text-center">
                  <BiRupee size={18}/>{yourCart?.gstAmount}
                </div>
              </th>
            </tr>
            <tr>
              <td></td>
              <th className="border-bottom" colspan={2}>Shipping Charge</th>
              <th className="border-bottom">Free
              </th>
            </tr>
            <tr>
              <td></td>
              <th className="border-bottom" colspan={2}>Grand Total</th>
              <th className="border-bottom">
                <div className="d-flex align-items-center text-center">
                  <BiRupee size={18}/>{yourCart?.grandTotal.toFixed(2)}
                </div>
              </th>
            </tr>
            <tr>
              <td></td>
              <th className="border-bottom" colspan={3} T> <button className="btn btn-sm btn-primary float-end" onClick={()=>checkoutHandler()}>CHECKOUT</button></th>
            </tr>
            </>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cart;
