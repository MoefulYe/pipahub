import type { ComposeOption } from 'echarts/core'
import type { GraphSeriesOption } from 'echarts/charts'
type ChartOption = ComposeOption<GraphSeriesOption>
export const chartOpts = (nodes: any, edges: any, primColor: string) : ChartOption => ({
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    emphasis: {},
    series: [
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
                formatter: ({ data }: any) => data.name
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
                    color: primColor
                },
                lineStyle: {
                    color: primColor
                },
            },
            nodes,
            edges
        }
    ]
})
