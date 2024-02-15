import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchNworxUserServiceClient } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";
//@ts-ignore
import { FetchNworxUserRequest } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "./token";

export const fetchNworxUser = createAsyncThunk(
  "AUTH/FETCH_NWORX_USER",
  async ( email: string, thunkAPI: any ) => {
    const metadata = await fetchToken();
    return new Promise( ( resolve, reject ) => {
      const request = new FetchNworxUserRequest();
      // request.setAppname("nworx_user_app");
      request.setEmailmobile( email );

      let user: {} | null = null;

      const instance = new FetchNworxUserServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchNworxUser( request, metadata, async ( err, response ) => {
        try {
          console.log( "fetchNworxUser Response", response, err );
          const parsedResponse = JSON.parse( response );
          user = parsedResponse?.user;
          //@ts-ignore
          resolve( { nWorxUser: user } );
        } catch ( error ) {
          console.log( error, "fetchNworxUser error" );
          reject( error );
        }
      } );
      return { nWorxUser: user };
    } );
  }
);

export const getNworxUser = async ( email: any ) => {
  const metadata = await fetchToken();
  return new Promise( ( resolve, reject ) => {
    const request = new FetchNworxUserRequest();
    // request.setAppname("nworx_user_app");
    request.setEmailmobile( email );

    let user: {} | null = null;

    const instance = new FetchNworxUserServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchNworxUser( request, metadata, async ( err, response ) => {
      try {
        console.log( "fetchNworxUser Response", response, err );
        const parsedResponse = JSON.parse( response );
        user = parsedResponse?.user;
        //@ts-ignore
        resolve( { nWorxUser: user } );
      } catch ( error ) {
        console.log( error, "fetchNworxUser error" );
        reject( error );
      }
    } );
    return { nWorxUser: user };
  } );
};
