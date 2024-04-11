const ErrorBoundary = (_: any, res: any, next: any) => {
  res.redirect('/')
}

export default ErrorBoundary
