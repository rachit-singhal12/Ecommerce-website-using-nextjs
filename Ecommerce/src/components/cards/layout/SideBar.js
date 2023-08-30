import Link from "next/link";
import React from "react";
import { MdCategory } from "react-icons/md";
import { BsDash } from "react-icons/bs";
import useSwr from 'swr';
import { fetcher } from "@/utils/swrFetcher";

function SideBar() {
    const { data, error, isValidating } = useSwr('https://dummyjson.com/products/categories', fetcher);

    if (error) {
        return <div>Failed to load</div>;
    }

    if (isValidating) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-100">
            <ul className="list-group">
                <li className="list-group-item d-flex align-items-center navbar-top-bg">
                    <h5 className="text-white mt-2 text-uppercase">
                        <MdCategory/> Categories
                    </h5>
                </li>
                {data.map((category, i) => (
                    <Link href={`/category/${category}`} key={i} passHref>
                        <li className="list-group-item list-group-item-action d-flex align-items-center text-uppercase">
                            <BsDash size={24} className="m-2"/> {category}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
