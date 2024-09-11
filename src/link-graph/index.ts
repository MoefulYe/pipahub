type Slug = string

type Neighbour = {
    linkTo: Slug[],
    referedBy: Slug[]
}

export type Graph = Map<Slug,Neighbour>
type Resolve = (g: Graph) => void
export let resolveGraph: Resolve
const graph = new Promise<Graph>((r) => resolveGraph = r)
const NO_NEIGHBOURS: Neighbour = { linkTo: [], referedBy: [] }
export const getNeighbours = async (slug: Slug) => {
    if (!import.meta.env.PROD) {
        return {
            nodes: [],
            egdes: []
        } 
    }
    const g = await graph
    const node = g.get(slug) ?? NO_NEIGHBOURS
    const { linkTo , referedBy } = node
    const nodes = [slug, ...linkTo, ...referedBy].map((slug) => ({
        name: slug
    }))
    const linksOut = linkTo.map((to) => ({
        source: slug,
        target: to
    }))
    const linksIn = referedBy.map((from) => ({
        source: from,
        target: slug
    }))
    const egdes = [...linksOut, ...linksIn]
    return { nodes, egdes }
}
