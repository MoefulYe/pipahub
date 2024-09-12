type Slug = string
type Neighbour = {
    linkTo: Slug[],
    referedBy: Slug[]
}
export type Graph = Map<Slug, Neighbour>
const NO_NEIGHBOURS: Neighbour = { linkTo: [], referedBy: [] }

export let resolveGraph: (g: Graph) => void
const graph = new Promise<Graph>((resolve) => resolveGraph = resolve)
export const getNeighbours = async (slug: Slug) => {
    if (!import.meta.env.PROD) {
        return {
            nodes: [],
            egdes: []
        }
    }
    const g = await graph
    const node = g.get(slug) ?? NO_NEIGHBOURS
    const { linkTo, referedBy } = node
    const nodesSet = [slug, ...linkTo, ...referedBy].reduce((acc, cur) => acc.add(cur), new Set<string>)
    const nodes = [...nodesSet].map((name) => ({ name }))
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
