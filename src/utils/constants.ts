const constants = {
    mongooseModels: {
      USER: 'User',
    },
    environments: {
      PRODUCTION: 'production',
      DEVELOPMENT: 'development',
      TEST: 'test',
    },
    test: {
      TEST_USER: {
        firstName: 'test',
        lastName: 'user',
        email: 'user@image.com',
        password: 'password',
        passwordConfirm: 'password',
      },
    },
  };
  
  export default constants;