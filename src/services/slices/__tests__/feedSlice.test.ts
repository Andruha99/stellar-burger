import { TOrdersData } from '@utils-types';
import { feedReducer, getFeed, initialState } from '../feedSlice';

const mockFeed: TOrdersData = {
  orders: [
    {
      createdAt: '2024-07-16T09:36:52.138Z',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
      name: 'Space флюоресцентный антарианский бургер',
      number: 45941,
      status: 'done',
      updatedAt: '2024-07-16T09:36:52.520Z',
      _id: '66963f34119d45001b4f928b'
    },

    {
      createdAt: '2024-07-16T09:26:13.956Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0947'
      ],
      name: 'Краторный space фалленианский бургер',
      number: 45940,
      status: 'done',
      updatedAt: '2024-07-16T09:26:14.406Z',
      _id: '66963cb5119d45001b4f9288'
    }
  ],
  total: 12,
  totalToday: 1
};

describe('tests for feed slice', () => {
  it('set true when getFeed is pending', () => {
    const newState = feedReducer(initialState, {
      type: getFeed.pending.type
    });

    expect(newState).toEqual({
      allOrders: [],
      feedLoading: true,
      burgersReady: 0,
      todayBurgersReady: 0,
      error: null
    });
  });

  it('set feed when getFeed is fulfilled', () => {
    const newState = feedReducer(initialState, {
      type: getFeed.fulfilled.type,
      payload: mockFeed
    });

    expect(newState).toEqual({
      allOrders: mockFeed.orders,
      feedLoading: false,
      burgersReady: mockFeed.total,
      todayBurgersReady: mockFeed.totalToday,
      error: null
    });
  });

  it('set error when getFeed is rejected', () => {
    const newState = feedReducer(initialState, {
      type: getFeed.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({
      allOrders: [],
      feedLoading: false,
      burgersReady: 0,
      todayBurgersReady: 0,
      error: 'Some error'
    });
  });
});
