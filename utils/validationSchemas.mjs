export const createUserValidation = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must bt atleast 5 characters or 32 characters long",
    },
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
    isString: {
      errorMessage: "Username must be string",
    },
  },
};

export const queryValidation = {
  filter: {
    isString: {
      errorMessage: "Must be String",
    },
    notEmpty: {
      errorMessage: "Must not be empty",
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "Must be 3 charactores or 10 long",
    },
  },
};
