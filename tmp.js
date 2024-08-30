option = {
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
        color: '#666769'
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
      data: [
        {
          name: 'Node 1',
          x: 300,
          y: 300
        },
        {
          name: 'Node 2',
          x: 800,
          y: 300
        },
        {
          name: 'Node 3',
          x: 550,
          y: 100
        },
        {
          name: 'Node 4',
          x: 550,
          y: 500
        }
      ],
      // links: [],
      links: [
        {
          source: 0,
          target: 1
        },
        {
          source: 'Node 2',
          target: 'Node 1'
        },
        {
          source: 'Node 1',
          target: 'Node 3'
        },
        {
          source: 'Node 2',
          target: 'Node 3'
        },
        {
          source: 'Node 2',
          target: 'Node 4'
        },
        {
          source: 'Node 1',
          target: 'Node 4'
        }
      ]
    }
  ]
};