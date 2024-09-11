import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper functions for local storage
const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return user && token ? { user: JSON.parse(user), token } : null;
};

const initialState = {
  user: getUserFromLocalStorage()?.user || null,
  token: getUserFromLocalStorage()?.token || null,
  loading: false,
  error: null,
  users: [], // Simulated user storage for signup
};

// Simulated async login action
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  const { email, password } = credentials;
  const state = thunkAPI.getState().auth;

  const user = state.users.find((u) => u.email === email && u.password === password);
  
  if (user) {
    saveUserToLocalStorage(user, 'fake-token'); // Save to local storage
    return { user, token: 'fake-token' }; // Simulated login success
  } else {
    return thunkAPI.rejectWithValue('Invalid email or password');
  }
});

// Simulated async signup action
export const signupUser = createAsyncThunk('auth/signupUser', async (credentials, thunkAPI) => {
  const { email, password, username } = credentials;
  const state = thunkAPI.getState().auth;

  const userExists = state.users.some((u) => u.email === email);

  if (userExists) {
    return thunkAPI.rejectWithValue('User already exists');
  } else {
    const newUser = { email, password, username };
    saveUserToLocalStorage(newUser, 'fake-token'); // Save to local storage
    return { user: newUser, token: 'fake-token' }; // Simulated signup success
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      logout(state) {
        state.user = null;
        state.token = null;
        removeUserFromLocalStorage();
      },
  },
  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup reducers
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.users.push(action.payload.user); // Save new user locally
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout} = authSlice.actions;
export default authSlice.reducer;
