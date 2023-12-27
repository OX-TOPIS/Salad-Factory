import React from 'react'
import useCart from '../../../hooks/useCart'
import { RiDeleteBin5Fill } from "react-icons/ri";

const CartPage = () => {
  const [cart, refetch] = useCart();

  // handleDelete
  const handleDelete=()=>{
    
  }
  return (
    <div className='section-container '>
      {/* texts banner */}
      <div className="flex flex-col justify-center items-center px-4 space-y-7 pt-48 pb-12">
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
        Items Added to The <span className="text-green">Food</span>
          </h2>
      </div>

      {/* table data for the cart*/}
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-green text-white rounded-2xl'>
      <tr className='text-md'>
        <th>#</th>
        <th>Food</th>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* data in table */}
      {
        cart.map((item, index)=>(
          <tr key={index}>
        <th>
          <td>{index+1}</td>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
          {item.name}
        </td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <th>
          <button className='btn btn-ghost btn-md' onClick={()=>handleDelete(item)}><RiDeleteBin5Fill className='text-red'/></button>
        </th>
      </tr>
        ))
      }
    </tbody>
    
    
  </table>
  {/*  */}
  <div className="my-24"></div>
</div>
    </div>
  )
}

export default CartPage
