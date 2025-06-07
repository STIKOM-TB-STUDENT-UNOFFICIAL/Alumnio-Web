import { lazy } from "react"
import type { RouteObject } from "react-router-dom"

export interface PageModule {
    default: () => React.ReactNode
}

interface CustomRouteObject extends Omit<RouteObject, "handle" | "children"> {
    handle?: {
        type: "layout"|"page"|undefined
    }
    children?: CustomRouteObject[]
}

const separator: string = "\\"

    export function getPagesRoute(
        files: Record<string, () => Promise<unknown>>,
        ErrorFiles: React.LazyExoticComponent<() => React.ReactNode>
    ){
    const routes: CustomRouteObject = {
        path: "/",
        children: []
    }
    Object.entries(files).forEach(([filePath, importer]) => {
        const segmentPath = filePathToUrlPathSegment(filePath)
        const page = lazy(importer as () => Promise<PageModule>)

        insertRoute(segmentPath, page, routes)
    })

    routes.children?.push({
        path: "*",
        element: <ErrorFiles />,
        handle: {
            type: "page"
        },
        children: []
    })


    return routes
}

function insertRoute(
    segments: string[],
    Page: React.LazyExoticComponent<() => React.ReactNode>,
    current: CustomRouteObject,
    index = 0
) {
    if(index > segments.length - 1){
        return
    }
    
    const thisSegment = segments[index].includes(separator) ? 
                        segments[index].split(separator)[0] : 
                        segments[index]
    const thisType = segments[index].includes(separator) ? 
                        segments[index].split(separator)[1] : 
                        null

    if(thisType && thisType == "layout" && thisSegment == current.path){
        current.path = thisSegment
        current.children = current.children ? current.children : []
        current.element = <Page />
        current.handle = {
            type: "layout"
        }
    }
    else if(thisType && thisType == "page" && current.handle?.type == "layout" && thisSegment == current.path){
        current.children?.push({
            index: true,
            element: <Page />,
            handle: {
                type: "page"
            }
        })
    }
    else if(thisType && thisType == "page" && thisSegment == current.path){
        current.path = thisSegment
        current.children = current.children ? current.children : []
        current.element = <Page />
        current.handle = {
            type: "page"
        }
    }
    else if(thisSegment.startsWith("_")){
        return
    }
    else {
        if(!current.children) return
        const indexOfChildren = current.children.findIndex(
            (v) => 
                v.path == (segments[index + 1].includes(separator) ? 
                    segments[index + 1].split(separator)[0] : 
                    segments[index + 1]
                )
            )
        if(indexOfChildren != -1){
            insertRoute(segments, Page, current.children[indexOfChildren], index + 1)
        }
        else{
            current.children?.push({
                path: segments[index + 1].includes(separator) ? 
                      segments[index + 1].split(separator)[0] : 
                      segments[index + 1],
                children: []
            })
            insertRoute(segments, Page, current.children[current.children.length - 1], index + 1)
        }
    }
}

function filePathToUrlPathSegment(
    path: string
): string[] {
    const segments = path
            .replace("/app", "")
            .split("/")
            .map((segment) => {
                if(segment.startsWith(".")) return "/"
                if(segment.startsWith("[")) {
                    if(segment.includes("...")) return "*"
                    return segment.replace("[", ":").replace("]", "")
                }
                return segment
            })

    return segmentParser(segments[0], segments)
}

function transform(
    previousSegment: string, 
    segment: string
) : string {
    return `${previousSegment}${separator}${segment.split(".")[0]}`
}

function segmentParser(
    segment: string,
    segments: string[],
    segmentEntries: string[] = [],
    index: number = 0
) : string[] {
    if(index > segments.length){
        throw new Error("Error: Segments")
    }
    if(index === segments.length - 1){
        segmentEntries.push(transform(segmentEntries.pop() as string, segment))
        return segmentEntries
    }

    if(!segment.startsWith(":")){
        segmentEntries.push(segment)
    }
    else{
        segmentEntries.push(`${segmentEntries.pop()}/${segment}`)
    }

    return segmentParser(
        segments[index+1],
        segments,
        segmentEntries,
        index+1
    )
}
