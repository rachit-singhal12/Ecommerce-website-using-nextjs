import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { BiHome, BiLeftArrowCircle, BiRightArrow } from "react-icons/bi"

function  Breadcrumb({title}){
    const router=useRouter();
    return(
        <div className="my-2 bg-light d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-1">
                <div className="mx-2 d-flex align-items-center">
                    <Link href="/" className="text-decoration-none text-black">
                        <BiHome size={ 28 }/>
                    </Link>
                    <BiRightArrow size={ 15 }/>
                </div>
                <h4 className="text-center py-2 text-uppercase">{title}</h4>
            </div>
            <div className="py-2">
                <Link href="#" className="text-decoration-none text-black" onClick={ ()=>router.back() }>
                    <BiLeftArrowCircle size={ 28 }/>
                </Link>
            </div>
        </div>
    )
}

export default Breadcrumb