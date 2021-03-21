import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { StoreInterface } from '../store';

export default useSelector as TypedUseSelectorHook<StoreInterface>