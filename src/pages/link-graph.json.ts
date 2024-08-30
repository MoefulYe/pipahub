import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

export const GET: APIRoute = async () => {
    const posts = await getCollection('posts', ({ data }) => {
        return import.meta.env.PROD ? data.draft !== true : true
    })
    const nodes = posts.map((post) => ({
        name: post.data.title,
    }))
    const edges = await Promise.all(posts.map(async post => {
        const slug = post.slug
        const title = post.data.title
        const { remarkPluginFrontmatter } = await post.render()
        const linkTo = remarkPluginFrontmatter.linkTo as string[]
        return {
            linkTo
        }
    }))
    const chartOpts = {
        series: [
            {
                type: 'graph',
                nodes,
                edges
            }
        ]
    }
    return Response.json(chartOpts)
}