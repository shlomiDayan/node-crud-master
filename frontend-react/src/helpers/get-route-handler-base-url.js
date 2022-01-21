// calculate the base url for a router handler from the props the router provides to it
export default function (props) {
  if (!props.route || !props.routes || !props.location) {
    throw new Error("Missing props from React router.");
  }
  var route = props.route;
  var routeDepth = props.routes.indexOf(route);
  return props.location.pathname
    .split("/")
    .slice(0, routeDepth + 1)
    .join("/");
}
