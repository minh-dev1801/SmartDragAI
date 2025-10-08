import { useRoutes } from "react-router";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

const AllRoutes = () => {
  const element = useRoutes(routes);
  return <Provider store={store}>{element}</Provider>;
};
export default AllRoutes;
