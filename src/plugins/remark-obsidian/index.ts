import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { findAndReplace } from 'mdast-util-find-and-replace'
import { visit } from "unist-util-visit";

// [[<filename><#fragment><|custom-text>]] 三个部分都是可选的
const LINK_RE = /\[\[([^\]]+?)(?:#([^\]]+?))?(?:\|([^\]]+?))?\]\]/g


export const remarkObsidian: RemarkPlugin = () => {
    return (tree, file) => {
        const linkTo: string[] = []
        findAndReplace(tree, [LINK_RE, (_, filename?: string, fragment?: string, customText?: string) => {
            if (filename !== undefined) {
                linkTo.push(filename)
            }
            const href = filename !== undefined ? `${filename}/#${fragment ?? ''}` : `#${fragment ?? ''}`
            const hrefWithLeadingDoubleDot = `../${href}`
            const text = customText === undefined ? href : customText
            const a = `<a href=${hrefWithLeadingDoubleDot}>${text}</a>`
            return {
                type: 'html',
                value: a
            }
        }]);
        (file.data as any).astro.frontmatter.linkTo = linkTo
    }
} 