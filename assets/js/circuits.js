(function () {
  var SVG_NS = "http://www.w3.org/2000/svg";

  var PALETTE = {
    ink:     "#1c2845",
    blue:    "#3d67c0",
    teal:    "#4c726f",
    terra:   "#ac4f36",
    mustard: "#e3b658",
    soft:    "#8490a1"
  };

  var FILL_KEYS = ["blue", "teal", "terra", "mustard", "soft"];

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function range(r, lo, hi) { return lo + r() * (hi - lo); }
  function choice(r, arr) { return arr[Math.floor(r() * arr.length)]; }

  function el(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function dist(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function drawCircuits(svg) {
    var w = window.innerWidth;
    var h = Math.max(window.innerHeight, document.body.scrollHeight);
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var r = mulberry32(42);
    var nodes = [];
    var nodeCount = Math.floor((w * h) / 10000);

    for (var i = 0; i < nodeCount; i++) {
      nodes.push({
        x: range(r, 0, w),
        y: range(r, 0, h),
        radius: range(r, 1.2, 3.2),
        color: r() < 0.55 ? PALETTE.ink : PALETTE[choice(r, FILL_KEYS)]
      });
    }

    var edgeThreshold = 130;
    var maxEdgesPerNode = 2;
    var edgeCounts = {};
    var edges = [];

    for (i = 0; i < nodes.length; i++) {
      if ((edgeCounts[i] || 0) >= maxEdgesPerNode) continue;
      var nearest = [];
      for (var j = i + 1; j < nodes.length; j++) {
        var d = dist(nodes[i], nodes[j]);
        if (d < edgeThreshold && d > 20) {
          nearest.push({ idx: j, d: d });
        }
      }
      nearest.sort(function (a, b) { return a.d - b.d; });
      var limit = Math.min(nearest.length, maxEdgesPerNode - (edgeCounts[i] || 0));
      for (var k = 0; k < limit; k++) {
        var jj = nearest[k].idx;
        if ((edgeCounts[jj] || 0) >= maxEdgesPerNode) continue;
        edges.push([i, jj]);
        edgeCounts[i] = (edgeCounts[i] || 0) + 1;
        edgeCounts[jj] = (edgeCounts[jj] || 0) + 1;
      }
    }

    for (i = 0; i < edges.length; i++) {
      var a = nodes[edges[i][0]], b = nodes[edges[i][1]];
      svg.appendChild(el("line", {
        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        stroke: PALETTE.ink,
        "stroke-width": 0.7,
        opacity: range(r, 0.12, 0.25).toFixed(3)
      }));
    }

    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      svg.appendChild(el("circle", {
        cx: n.x, cy: n.y, r: n.radius,
        fill: n.color,
        opacity: range(r, 0.15, 0.35).toFixed(3)
      }));
    }

    var clusterCount = Math.floor((w * h) / 300000) + 3;
    for (i = 0; i < clusterCount; i++) {
      var cx = range(r, w * 0.08, w * 0.92);
      var cy = range(r, h * 0.05, h * 0.95);
      var clusterColor = PALETTE[choice(r, FILL_KEYS)];
      var clusterSize = Math.floor(range(r, 5, 10));
      var clusterNodes = [];

      for (j = 0; j < clusterSize; j++) {
        var angle = range(r, 0, Math.PI * 2);
        var radius = range(r, 10, 40);
        clusterNodes.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius
        });
      }

      for (j = 0; j < clusterNodes.length; j++) {
        for (k = j + 1; k < clusterNodes.length; k++) {
          if (r() < 0.45) {
            svg.appendChild(el("line", {
              x1: clusterNodes[j].x, y1: clusterNodes[j].y,
              x2: clusterNodes[k].x, y2: clusterNodes[k].y,
              stroke: clusterColor,
              "stroke-width": 0.8,
              opacity: range(r, 0.15, 0.3).toFixed(3)
            }));
          }
        }
      }

      for (j = 0; j < clusterNodes.length; j++) {
        svg.appendChild(el("circle", {
          cx: clusterNodes[j].x, cy: clusterNodes[j].y,
          r: range(r, 2, 4),
          fill: clusterColor,
          opacity: range(r, 0.25, 0.5).toFixed(3)
        }));
      }

      svg.appendChild(el("circle", {
        cx: cx, cy: cy,
        r: range(r, 30, 55),
        fill: "none",
        stroke: clusterColor,
        "stroke-width": 0.6,
        "stroke-dasharray": "3 5",
        opacity: range(r, 0.1, 0.2).toFixed(3)
      }));
    }

    var arcCount = 4 + Math.floor(r() * 3);
    for (i = 0; i < arcCount; i++) {
      var ax = range(r, -w * 0.1, w * 1.1);
      var ay = range(r, -h * 0.05, h * 1.05);
      var rx = range(r, 150, 400);
      var ry = range(r, 60, 200);
      var startAngle = range(r, 0, Math.PI * 2);
      var sweep = range(r, Math.PI * 0.3, Math.PI * 1.2);
      var x1 = ax + rx * Math.cos(startAngle);
      var y1 = ay + ry * Math.sin(startAngle);
      var x2 = ax + rx * Math.cos(startAngle + sweep);
      var y2 = ay + ry * Math.sin(startAngle + sweep);
      var largeArc = sweep > Math.PI ? 1 : 0;

      svg.appendChild(el("path", {
        d: "M " + x1 + " " + y1 + " A " + rx + " " + ry + " 0 " + largeArc + " 1 " + x2 + " " + y2,
        fill: "none",
        stroke: PALETTE.ink,
        "stroke-width": 0.6,
        opacity: range(r, 0.06, 0.14).toFixed(3)
      }));
    }
  }

  function init() {
    var svg = document.getElementById("bg-circuits");
    if (!svg) return;
    drawCircuits(svg);

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { drawCircuits(svg); }, 250);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
