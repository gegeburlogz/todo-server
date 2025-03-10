export default function (fromValidate:any) {
    const errorDetails = fromValidate.error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));
      return errorDetails
}