export const ResponseWithError = (msg) => {
   return { success: false, message: msg };
};

export const ResponseWithSuccess = (data) => {
   return { success: true, data: data };
};
