export const setUserAction = (data) => {
      return {
        type: "SET_USER",
        payload: data,
      };
    };
    export const setTokenAction = (data) => {
      return {
        type: "SET_TOKEN",
        payload: data,
      };
    };
    export const removeUser = (data)=>{
        return {
            type : "REMOVE_USER",
            payload:data
        }
    }

    export const removeToken = (data)=>{
        return {
            type:"REMOVE_TOKEN",
            payload:data
        }
    
    }
    

    