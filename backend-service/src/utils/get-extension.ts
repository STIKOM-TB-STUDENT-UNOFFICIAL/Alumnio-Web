export function getExtension(fileName: string){
    const splitting = fileName.split(".")
    const extension = splitting[splitting.length - 1]

    return extension
}