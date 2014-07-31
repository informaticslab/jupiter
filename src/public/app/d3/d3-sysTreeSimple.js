


var treeData;

var url = $(location).attr('href');
  var split = url.split('/');
  var id = split[split.length - 1];
  d3.json("/apollo/api/node/managed/"+id, function(error, treeData) { 

function visit(parent, visitFn, childrenFn)
{
    if (!parent) return;

    visitFn(parent);

    var children = childrenFn(parent);
    if (children) {
        var count = children.length;
        for (var i = 0; i < count; i++) {
            visit(children[i], visitFn, childrenFn);
        }
    }
}

buildTree(".block_edge");

function buildTree(containerName, customOptions)
{
    // build the options object
    var options = $.extend({
        nodeRadius: 5, fontSize: 12
    }, customOptions);

    
    // Calculate total nodes, max label length
    var totalNodes = 0;
    var maxLabelLength = 0;
    visit(treeData, function(d)
    {
        totalNodes++;
        maxLabelLength = Math.max(d.name.length, maxLabelLength);
    }, function(d)
    {
        return d.children && d.children.length > 0 ? d.children: null;
    });

    // size of the diagram
    var size = { width:$(containerName).outerWidth() *1.36 - 100, height: totalNodes * 15};
    var tree = d3.layout.tree()
        .sort(null)
        .size([size.height, size.width - maxLabelLength*options.fontSize])
        .children(function(d)
        {
            return (!d.children || d.children.length === 0) ? null : d.children;
        });

    var nodes = tree.nodes(treeData);
    var links = tree.links(nodes);

    
    /*
        <svg>
            <g class="container" />
        </svg>
     */
    var layoutRoot = d3.select(containerName)
        .append("svg:svg").attr("width", size.width).attr("height", size.height)
        .append("svg:g")
        .attr("class", "container")
        .attr("transform", "translate(" + maxLabelLength + ",0)");


    // Edges between nodes as a <path class="link" />
    var link = d3.svg.diagonal()
        .projection(function(d)
        {
            return [d.y, d.x];
        });

    layoutRoot.selectAll("path.link")
        .data(links)
        .enter()
        .append("svg:path")
        .attr("class", "link treelink")
        .attr("d", link);


    /*
        Nodes as
        <g class="node">
            <circle class="node-dot" />
            <text />
        </g>
     */
    var nodeGroup = layoutRoot.selectAll("g.node")
        .data(nodes)
        .enter()
        .append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d)
        {
            return "translate(" + d.y + "," + d.x + ")";
        });

    nodeGroup.append("svg:circle")
        .attr("class", function (d) {
            if(d.valid != null && d.valid == 'Yes')
                {return "circle node valid"}
            else
                {return "circle node invalid"}
        })
        .attr("r", options.nodeRadius);

    nodeGroup.append("a").attr("xlink:href",function(d) { return "/apollo/#/node/" + d.id; })
        .append("svg:text")
        .attr("text-anchor", function(d)
        {
            if(d == nodes[0])
                {
                    return "start"
                    //return d.children ? "end" : "start";
                }
            else
            {
                return d.children ? "end" : "start";
            }
        })
        .attr("dx", function(d)
        {
            var gap = 2 * options.nodeRadius;
            if(d == nodes[0])
                {return -gap -20}
            return d.children ? -gap : gap;
        })
        .attr("dy", function(d)
        {
            var hit = 3
            if(d == nodes[0])
                {return hit -13;}
            return hit;
        })
        .text(function(d)
        {
            return d.name;
        });

}});