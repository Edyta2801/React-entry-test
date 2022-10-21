import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, gql } from "graphql-request";

const url = "http://localhost:4000/";

const initialState = {
  categories: [],
  productsList: [],
  currentCategory: "all",
  selectedCurrency:'$',
  currencies: null,
  isLoading: true,
};

const query = gql`
  {
    categories {
      name
      products {
        id
        gallery
        name
        description
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
    currencies {
      label
      symbol
    }
  }
`;

export const getData = createAsyncThunk("products/getData", async () => {
  try {
    const res = await request(url, query);
    return res;
  } catch (error) {
    console.log(error);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // displayItems: (state, action) => {},
    getCategory: (state, action) => {
      state.currentCategory = action.payload;
      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );
      state.productsList = newproductsList.products;
    },
    selectCurrency:(state, action)=>{
      state.selectedCurrency=action.payload;
    }
  },

  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
      console.log("pending");
    },

    [getData.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.categories = action.payload.categories;
      state.currencies = action.payload.currencies;
      console.log("PAYLOAD:", action.payload);

      const newproductsList = state.categories.find(
        (category) => category.name === state.currentCategory
      );

      state.productsList = newproductsList.products;
      console.log("STATE:", state.productsList);
    },

    [getData.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;

      console.log("rejected");
    },
  },
});

export const { 
  // displayItems,
   getCategory, selectCurrency } = productsSlice.actions;

export default productsSlice.reducer;
