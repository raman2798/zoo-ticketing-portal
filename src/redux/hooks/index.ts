import { AnyAction } from '@reduxjs/toolkit';
import { appStore } from '../store';

export const useAppDispatch = (action: AnyAction) => appStore.dispatch(action);
