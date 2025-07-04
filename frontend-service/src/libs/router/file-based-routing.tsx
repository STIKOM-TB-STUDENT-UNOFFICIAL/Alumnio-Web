import { Middleware } from "@/middleware";
import { lazy, type LazyExoticComponent, type ReactNode } from "react";
import { type RouteObject } from "react-router-dom";

export interface PageModule {
  default: () => React.ReactNode;
}

function normalizePath(filePath: string): string {
    return filePath
        .replace("./app", "")
        .replace("../pages", "")
        .replace(/\[\.\.\..*\]/g, "*")
        .replace(/\[(.*?)\]/g, ":$1")
        .replace(/\/(page|layout)\.(tsx|jsx)$/, "")
        .replace(/\/$/, "/") || "/";
}

export function getPagesRoute(
  files: Record<string, () => Promise<unknown>>,
  ErrorFiles: LazyExoticComponent<() => React.ReactNode>
): RouteObject[] {
  const routes: RouteObject[] = [];
  const pages: { path: string; component: LazyExoticComponent<() => ReactNode> }[] = [];
  const layouts: { path: string; component: LazyExoticComponent<() => ReactNode> }[] = [];

  for (const filePath in files) {
    const component = lazy(files[filePath] as () => Promise<PageModule>);
    const path = normalizePath(filePath);

    if (filePath.endsWith("layout.tsx")) {
      layouts.push({ path, component });
    } else if (filePath.endsWith("page.tsx")) {
      pages.push({ path, component });
    }
  }

  layouts.sort((a, b) => b.path.length - a.path.length);

  const processedPages = new Set<string>();

  for (const layout of layouts) {
    const layoutChildren: RouteObject[] = [];

    for (const page of pages) {
      if (processedPages.has(page.path)) continue;

      if (page.path.startsWith(layout.path)) {
        const relativePath = page.path.substring(layout.path.length).replace(/^\//, "");

        layoutChildren.push({
          index: relativePath === "",
          path: relativePath === "" ? undefined : relativePath,
          element: <page.component />,
        });
        processedPages.add(page.path);
      }
    }
    
    if (layoutChildren.length > 0) {
      routes.push({
        path: layout.path,
        element: <layout.component />,
        children: layoutChildren,
        loader: Middleware
      });
    }
  }
  
  for (const page of pages) {
      if(processedPages.has(page.path)) continue;
      routes.push({
          path: page.path,
          element: <page.component />,
          loader: Middleware
      })
  }

  routes.push({
      path: "*",
      element: <ErrorFiles />,
      loader: Middleware
  })

  return routes;
}