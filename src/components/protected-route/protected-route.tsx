import { ProtectedRouteProps } from './type';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  console.log(2);
  return children;
};
