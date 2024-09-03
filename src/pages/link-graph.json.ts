import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

const GRAPH_OPT =
{
    type: 'graph',
    layout: 'force',
    force: {
        repulsion: 750
    },
    symbolSize: 15,
    roam: true,
    label: {
        show: true,
        position: 'bottom',
        color: '#666769',
    },
    edgeSymbol: ['circle', 'arrow'],
    edgeSymbolSize: [4, 8],
    lineStyle: {
        opacity: 0.75,
        width: 1,
        curveness: 0
    },
    itemStyle: {
        color: '#C3C4C6'
    },
    emphasis: {
        focus: 'adjacency',
        itemStyle: {
            color: 'hsl(285, 25%, 75%)'
        },
        lineStyle: {
            color: 'hsl(285, 100%, 95%)'
        }
    },
}
const absPath = (cwd: string, rel: string) => {
    if (rel.startsWith('/')) {
        return rel
    }
    const cwd_ = cwd.split('/')
    cwd_.pop()
    const rel_ = rel.split('/')
    for (const p of rel_) {
        if (p === '..') {
            cwd_.pop()
        } else if (p !== '.') {
            cwd_.push(p)
        }
    }
    return cwd_.join('/')
}

export const GET: APIRoute = async () => {
    const posts = await getCollection('posts', ({ data }) => {
        return import.meta.env.PROD ? data.draft !== true : true
    })
    const data = await Promise.all(posts.map(async post => {
        const slug = post.slug
        const title = post.data.title
        const { remarkPluginFrontmatter } = await post.render()
        const linkTo = (remarkPluginFrontmatter.linkTo as string[]).map(rel => absPath(slug, rel))
        const symbolSize = Math.ceil(-50 / (5 + linkTo.length) + 20)
        return {
            slug,
            title,
            linkTo,
            symbolSize
        }
    }))
    const nodes = data.map(({ slug: name, title, symbolSize }) => ({
        name,
        title,
        symbolSize
    }))
    const edges = data.flatMap(({ slug: source, linkTo }) => linkTo.map(target => ({
        source,
        target
    })))
    const graph = {
        ...GRAPH_OPT,
        nodes,
        edges
    }
    const opts = {
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        emphasis: {},
        series: [
            graph
        ]
    }
    return Response.json(opts)
}