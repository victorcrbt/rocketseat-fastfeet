interface ValidationErrorInterface extends Error {
  inner?: InnerError[];
}

interface InnerError {
  name: string;
  type: string;
  errors: string[];
  inner: any[];
  message: string;
}

export default (msg: string): never => {
  const error: ValidationErrorInterface = new Error();

  error.inner = [
    {
      name: 'ValidationError',
      type: 'isAssigned',
      errors: [msg],
      inner: [],
      message: msg,
    },
  ];

  throw error;
};
