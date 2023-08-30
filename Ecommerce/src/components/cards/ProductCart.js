import React from "react";
import styles from '/src/components/cards/ProductCart.module.css';
import { BiCartAdd, BiRupee } from 'react-icons/bi';
import Link from "next/link";
import { addToCart } from "@/utils/cartItems";
import { toast } from "react-hot-toast";
function ProductCart({ product }) {
    return (
        <div className={`${styles.productCard} card`}>
            <Link href={`/product/${product?.id}`}>
                <div className="object-fit-cover">
                    <img src={product?.thumbnail} width={200} height={200} alt={product?.title} className="card-img-top" />
                </div>
            </Link>
            <div className="card-body">
                <Link href={`/product/${product?.id}`} className="text-decoration-none">
                    <h5 className="card-title">{product?.title}</h5>
                </Link>
                <div className="d-flex justify-content align-items-center">
                    <h6 className="card-title d-flex align-items-center">
                        <BiRupee size={21} />
                        {product?.price}
                    </h6>
                    <div className="d-flex">
                      <button className="btn btn-warning btn-sm mx-2" onClick={(e)=>{addToCart(product,1),toast.success('Added in cart!')}}><BiCartAdd size={22}/></button>
                      <button className="btn btn-success btn-sm">Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;
