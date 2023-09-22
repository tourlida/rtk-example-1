import {SerializedError, createSlice} from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { deleteUser } from '../thunks/deleteUser';
export interface User{
    id:number;
    name:string;
}
export interface UsersState{
    data : User[];
    isLoading:boolean;
    error: null | SerializedError;
}

const initialUsersState:UsersState = {
    data:[],
    isLoading:false,
    error: null
}

const usersSlice = createSlice({
    name:'users',
    initialState: initialUsersState,
    reducers:{

    },
    extraReducers(builder) {
        //Fetch user
        builder.addCase(fetchUsers.pending,(state,action)=>{
            state.isLoading=true;
        });

        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.error;
        });

        //Add user
        builder.addCase(addUser.pending,(state,action)=>{
            state.isLoading=true;
        });

        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data.push(action.payload);
        });
        builder.addCase(addUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.error;
        });

         //Delete user
         builder.addCase(deleteUser.pending,(state,action)=>{
            state.isLoading=true;
        });

        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data= state.data.filter((user)=>{
                return user.id!==(action.payload as unknown as User).id;
            })
        });
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.error;
        });
    },
});

export const usersReducer =  usersSlice.reducer;