import Detail from "../views/pages/detail"
import Home from "../views/pages/Home"

const routes = {
  "/": Home,
  "/list": Home,
  "/detail/:id": Detail
}

export default routes