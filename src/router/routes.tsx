import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { flatMap } from 'lodash';
import { routingHelpers } from '@/helper';
import { GlobalHandler, PageNotFound } from '@/components';
import { authRoutes } from './routeConfigurations';
import { IRoute } from './interfaces';

const { PublicRoute } = routingHelpers;

const generateRouteElements = (routes: IRoute[], parentPath = '') => {
  const routesElements = flatMap(routes, (route: IRoute) => {
    const path = `${parentPath}${route.path}`;

    if (route.children) {
      const childrenElements = flatMap(route.children, (childRoute: IRoute) => generateRouteElements([childRoute], path)).filter(Boolean) as JSX.Element[];

      return [<Route key={`${route.key}-child-route`} path={path} element={<Suspense fallback={<div>Loading...</div>}>{route.component && <route.component />}</Suspense>} />, ...childrenElements];
    }

    return <Route key={`${route.key}-route`} path={path} element={<Suspense fallback={<div>Loading...</div>}>{route.component && <route.component />}</Suspense>} />;
  });

  return routesElements;
};

export const AppRoutes = () => {
  return (
    <>
      <GlobalHandler />
      <Routes>
        <Route element={<PublicRoute />}>{generateRouteElements(authRoutes)}</Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
