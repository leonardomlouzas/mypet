import { ComponentType } from "react";
import { Route as DomRoute, RouteProps as DomRouteProps, Redirect } from "react-router-dom";

import { useAuth } from "../contexts/ContextAuth";

interface RouteProps extends DomRouteProps{
    isPrivate?: boolean;
    component: ComponentType;
}



export const Route = ({ isPrivate = false, component: Component, ...rest }: RouteProps) => {
    const { accessToken } = useAuth();

    return (
        <DomRoute { ...rest } render={ () => isPrivate === !!accessToken? (
            <Component />
        ): (
            <Redirect to={ isPrivate? "/": "/dashboard" } />
        )} />
    );
};
