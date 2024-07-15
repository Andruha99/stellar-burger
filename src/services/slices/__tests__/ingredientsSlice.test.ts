import { TIngredient } from '@utils-types';
import {
  getIngredients,
  ingredientsReducer,
  initialState
} from '../ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Арахис',
    type: 'string',
    proteins: 123,
    fat: 234,
    carbohydrates: 345,
    calories: 567,
    price: 678,
    image: 'string',
    image_mobile: 'string',
    image_large: 'string'
  },
  {
    _id: '2',
    name: 'Орех',
    type: 'string',
    proteins: 123,
    fat: 234,
    carbohydrates: 345,
    calories: 567,
    price: 678,
    image: 'string',
    image_mobile: 'string',
    image_large: 'string'
  }
];

describe('tests for ingredients slice', () => {
  it('set true when getIngredients is pending', () => {
    const newState = ingredientsReducer(initialState, {
      type: getIngredients.pending.type
    });

    expect(newState).toEqual({
      ingredients: [],
      ingredientsLoading: true,
      error: null
    });
  });

  it('set ingredients when getIngredients is fulfilled', () => {
    const newState = ingredientsReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    });

    expect(newState).toEqual({
      ingredients: mockIngredients,
      ingredientsLoading: false,
      error: null
    });
  });

  it('set error when getIngredients is rejected', () => {
    const newState = ingredientsReducer(initialState, {
      type: getIngredients.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({
      ingredients: [],
      ingredientsLoading: false,
      error: 'Some error'
    });
  });
});
