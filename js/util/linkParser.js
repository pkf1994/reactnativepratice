export const linkParser = (linkStr) => {
    if(!linkStr) {
        throw new Error("link string can not be null")
    }
    const links = linkStr.split(',')
    const linkObj = {}

    links.forEach((item) => {
        const segments = item.split(';')
        if(segments.length < 2) throw new Error("link format error: it can not be split to 2 or more piece by ';' and it should be")
        let linkPart = segments[0].trim();
        if (!linkPart.startsWith("<") || !linkPart.endsWith(">")) throw new Error("link format error: the first part should start with '<' and end with '>' but it is not")
        try{
            linkPart = linkPart.substring(1, linkPart.length - 1)
        }catch (e) {
            console.log(e)
        }
        const relKV = segments[1].trim().split('=')
        if(relKV.length !== 2) throw new Error("link format error: ref key-value string can not be split to 2 piece by '=' and it should be")
        const relValue = relKV[1].substring(1, relKV[1].length - 1)
        linkObj[relValue] = linkPart
    })

    return linkObj
}