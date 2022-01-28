import { ComponentType } from "react";
import { Route as DomRoute, RouteProps as DomRouteProps, Redirect } from "react-router-dom";

interface RouteProps extends DomRouteProps{
    isPrivate?: boolean;
    component: ComponentType;
}



export const Route = ({ isPrivate, component, ...rest }: RouteProps) => {
    return (
        <DomRoute { ...rest } component={ component } />
    );
};
