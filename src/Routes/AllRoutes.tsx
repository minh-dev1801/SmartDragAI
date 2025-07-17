import { useRoutes } from "react-router";
import { routes } from "./routes";
const AllRoutes = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};
export default AllRoutes;
