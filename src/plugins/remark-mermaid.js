import { visit } from 'unist-util-visit'

export const remarkMermaid = () => {
    return root => {
        visit(root, 'code', (node, idx, parent) => {
            if (node.lang === 'mermaid' && parent !== undefined && idx !== undefined) {
                const value = node.value
                parent.children.splice(idx, 1, {
                    type: 'html',
                    value:`<div class="mermaid">${value}</div>`
                });
            }
        })
    }
}