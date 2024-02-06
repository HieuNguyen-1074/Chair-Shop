import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, props }) => {
    return (
        <Route

            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}
export default PrivateRoute