import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  
} from './orderSlice';

export  default function Order() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
 
  return (
   <div>
    <div>

    </div>
   </div>
  );
}
