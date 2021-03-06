import axios from 'axios';

import {
  wishlistGetIdsApiCall,
  wishlistAddProductApiCall,
  wishlistRemoveProductApiCall,
  wishlistGetProductsApiCall
} from './WishListApiCall.js';

jest.mock('axios');

const url='http://127.0.0.1:7070/users/5b646febeebb915ff8b221be',
  payload = {
    data: {
      wishlist: ['first product id']
    }
  };

test('wishlistGetIdsApiCall returns wishlist', done => {
  axios.get.mockResolvedValue(payload);
  wishlistGetIdsApiCall(url).then(response => {
    expect(response).toEqual(payload.data.wishlist);
    done();
  });
});

test('wishlistAddProductApiCall adds product in wishlist', done => {
  const expected = {
    data: {
      wishlist: ['first product id', 'another id']
    }
  }
  axios.get.mockResolvedValue(payload);
  axios.put.mockResolvedValue(expected);
  wishlistAddProductApiCall('another id', url).then(response => {
    expect(response).toEqual(expected.data.wishlist);
    done();
  })
});

test('wishlistRemoveProductApiCall removes product id', done => {
  const payload = {
    data: {
      wishlist: ['first product id', 'another id']
    }
  },
  expected = {
    data: {
      wishlist: ['first product id']
    }
  }
  axios.get.mockResolvedValue(payload);
  axios.put.mockResolvedValue(expected);
  wishlistRemoveProductApiCall('another id', url).then(response => {
    expect(response).toEqual(expected.data.wishlist);
    done();
  });
});

test('wishlistGetProductsApiCall handles empty wishlist', done => {
  const expected = {data: []};
  axios.get.mockResolvedValue(expected);
  wishlistGetProductsApiCall([], url).then(response => {
    expect(response).toEqual(expected.data);
    done();
  });
})

test('wishlistGetProductsApiCall', done => {
  const expected = {
    data: [{ "name": "product 1"}, {"name": "product 2"}]
  };
  axios.get.mockResolvedValue(expected);
  wishlistGetProductsApiCall(['another id'], url).then(response => {
    expect(response).toEqual(expected.data);
    done();
  });
});
