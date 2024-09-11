import { resolveGraph, type Graph } from "@/link-graph"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

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
    const graph: Graph = new Map()
    const posts = await getCollection('posts', ({ data }) => {
        return import.meta.env.PROD ? data.draft !== true : true
    })
    const data = await Promise.all(posts.map(async post => {
        const slug = post.slug
        const title = post.data.title
        const { remarkPluginFrontmatter } = await post.render()
        const linkTo = (remarkPluginFrontmatter.linkTo as string[]).map(rel => absPath(slug, rel))
        return {
            slug,
            title,
            linkTo,
        }
    }))
    const nodes = data.map(({ slug: name, title }) => ({
        name,
        title,
    }))
    const edges = data.flatMap(({ slug: source, linkTo }) => linkTo.map(target => ({
        source,
        target
    })))
    for(const {source, target} of edges) {
        if (!graph.has(source)) {
            graph.set(source, { linkTo: [], referedBy: [] })
        }
        if (!graph.has(target)) {
            graph.set(target, { linkTo: [], referedBy: [] })
        }
        const sourceNode = graph.get(source)!
        const targetNode = graph.get(target)!
        sourceNode.linkTo.push(target)
        targetNode.referedBy.push(source)
    }
    resolveGraph(graph)
    return Response.json({
        nodes,
        edges
    })
}