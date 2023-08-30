import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
import { clearSelectedProduct, createProductAsync, fetchAllProductsByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product/productSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateProduct } from '../../product/productAPI';
// import { clearSelectedProduct } from '../../product/productSlice';


export default function ProductForm() {
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const selectedProduct = useSelector(selectProductById)
    const { register, 
        handleSubmit,
        setValue,
        reset,
         formState: { errors } } = useForm();
         const dispatch = useDispatch()
         const params = useParams();
         
         useEffect(()=>{
            if(params.id){
                dispatch(
                    fetchAllProductsByIdAsync(params.id)         
             )}
             else{
              dispatch(clearSelectedProduct())
             }
         },[params.id,dispatch])

         useEffect(()=>{
            if(selectedProduct && params.id){
                setValue('title',selectedProduct.title);
                setValue('description',selectedProduct.description);
                setValue('rating',selectedProduct.rating);
                setValue('thumbnail',selectedProduct.thumbnail);
                setValue('price',selectedProduct.price);
                setValue('Stocks',selectedProduct.stock);
                setValue('image1',selectedProduct.images[0]);
                setValue('image2',selectedProduct.images[1]);
                setValue('image3',selectedProduct.images[2]);
                setValue('brand',selectedProduct.brand);
                setValue('category',selectedProduct.category);
                setValue('discount',selectedProduct.discountPercentage);
            }
         },[selectedProduct,params.id,setValue])

        const handleDelete = ()=>{
           const product = {...selectedProduct};
           product.deleted = true;
           dispatch(updateProductAsync(product))
         }

  return (
    <div>
       <form onSubmit={handleSubmit((data)=>{
            // console.log(data)
            const product = {...data}
            product.images = [
              product.image1
              ,product.image2,
              product.image3
              ,product.thumbnail]
            product.rating=2
            delete product['image1']
            delete product['image2']
            delete product['image3']
            product.price=+product.price;
            product.discount=+product.discount;
            product.Stocks=+product.Stocks;
            console.log(product)
            if(params.id){
              product.id = params.id;
              product.rating = selectedProduct.rating || 0;
               dispatch(updateProductAsync(product))
               reset();
            } 
            else{
              dispatch(createProductAsync(product))
            }
      })}>
      <div className="space-y-12 bg-white p-10">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
         

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2 col-span-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                 
                  <input
                    type="text"
                    {...register('title',{
                        required:'title is required'
                    })}
                    id="username"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>
            

            <div className="col-span-full">
              <label htmlFor="descrition" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description',{
                    required:'description is required'
                })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <select {...register('brand',{
                    required:'brand is required'
                })}>
                <option value="">choose one</option>
                {brands.map(brand=><option value={brand.label}>{brand.value}</option>)}
              </select>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Categories
              </label>
              <select {...register('category',{
                    required:'category is required'
                })}>
              <option value="">choose one</option>
                {categories.map(category=><option value={category.label}>{category.value}</option>)}
              </select>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                 
                  <input
                    type="number"

                    {...register('price',{
                        required:'price is required',
                        min:1,
                        max:10000
                    })}
                    id="price"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                Discount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                 
                  <input
                    type="float"
                    {...register('discount',{
                        required:'discount is required',
                        min:0,
                        max:100
                    })}
                    id="discount"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="Stocks" className="block text-sm font-medium leading-6 text-gray-900">
                Stocks
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                 
                  <input
                    type="number"
                    {...register('Stocks',{
                        required:'Stocks are required',
                        min:0,
                        max:100
                    })}
                    id="Stocks"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2 col-span-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                 
                  <input
                    type="text"
                   {...register('thumbnail', {
                    required:'thumbnail is required',
          
                    })}
                    id="thumbnail"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
              Image1
              </label>
              <div className="mt-2 col-span-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                 
                  <input
                    type="text"

                    {...register('image1', {
                        required:'Image1 is required',
          
                        })}
                    id="image1"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
              Image2
              </label>
              <div className="mt-2 col-span-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                 
                  <input
                    type="text"
                    {...register('image2', {
                        required:'Image2 is required',
              
                        })}
                    id="image2"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
              Image3
              </label>
              <div className="mt-2 col-span-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                 
                  <input
                    type="text"
                    {...register('image3', {
                        required:'Image3 is required',
              
                        })}
                    id="image3"
             
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
       

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
         
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      {selectedProduct && <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete
        </button> }
      </div>
    </form>
    </div>
  )
}
