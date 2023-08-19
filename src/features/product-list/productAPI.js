export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
     const response = await fetch('http://localhost:8080/products')
     const data = await response.json()
     resolve({data})
     }
  );
}


export function fetchProductsByFilters(filter,sort,pagination) {
   //filter object 
   let queryString="";
  for(let key in filter){
    const categoryValues = filter[key]
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString+=`${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
     queryString+=`${key}=${sort[key]}`
  }
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}`
 }
  return new Promise(async(resolve) =>{
     const response = await fetch('http://localhost:8080/products?'+queryString)
     const data = await response.json()
     const totalItems = await response.headers.get('X-Total-Count')
     resolve({data:{products:data,totalItems:totalItems}})
     }
  );
}

