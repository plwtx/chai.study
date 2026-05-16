import { useAppStore } from "@/store";

const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 440;
const BOX_W = 180;
const BOX_H = 64;
const BOX_X = [50, 310, 570];
const ROW_TITLE_Y = [30, 180, 330];
const ROW_BOX_Y = [55, 205, 355];

interface FlowNode {
  label: string;
  sub?: string;
}

interface FlowRow {
  number: number;
  title: string;
  nodes: [FlowNode, FlowNode, FlowNode];
  arrows: [string, string];
}

const ROWS: FlowRow[] = [
  {
    number: 1,
    title: "Save",
    nodes: [
      { label: "User action" },
      { label: "Zustand store" },
      { label: "IndexedDB", sub: "localStorage as fallback" },
    ],
    arrows: ["write", "persist"],
  },
  {
    number: 2,
    title: "Load",
    nodes: [
      { label: "IndexedDB" },
      { label: "Zustand store" },
      { label: "App UI" },
    ],
    arrows: ["hydrate", "render"],
  },
  {
    number: 3,
    title: "Manual sync between devices",
    nodes: [
      { label: "Device A", sub: "IndexedDB" },
      { label: "JSON backup", sub: "downloaded file" },
      { label: "Device B", sub: "IndexedDB" },
    ],
    arrows: ["export", "import"],
  },
];

export default function DataFlowDiagram() {
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion);
  const animated = !reducedMotion;

  return (
    <figure className="my-3 w-full">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full"
        role="img"
        aria-labelledby="data-flow-title data-flow-desc"
      >
        <title id="data-flow-title">Chaidoro data flow diagram</title>
        <desc id="data-flow-desc">
          How data moves between user actions, the in-memory Zustand store,
          IndexedDB (via Dexie, with localStorage fallback), and JSON backup
          files for manual sync between devices.
        </desc>

        <defs>
          <marker
            id="data-flow-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              className="fill-brown-400 dark:fill-dark-100/40"
            />
          </marker>
        </defs>

        {ROWS.map((row, rowIdx) => (
          <DataFlowRow
            key={row.title}
            row={row}
            rowIdx={rowIdx}
            animated={animated}
          />
        ))}
      </svg>
    </figure>
  );
}

function DataFlowRow({
  row,
  rowIdx,
  animated,
}: {
  row: FlowRow;
  rowIdx: number;
  animated: boolean;
}) {
  const titleY = ROW_TITLE_Y[rowIdx];
  const boxY = ROW_BOX_Y[rowIdx];
  const arrowY = boxY + BOX_H / 2;

  return (
    <g>
      <RowTitle y={titleY} number={row.number} text={row.title} />
      {row.nodes.map((node, idx) => (
        <FlowBox
          key={node.label}
          x={BOX_X[idx]}
          y={boxY}
          label={node.label}
          sub={node.sub}
        />
      ))}
      {row.arrows.map((label, idx) => (
        <FlowArrow
          key={`${row.title}-arrow-${idx}`}
          x1={BOX_X[idx] + BOX_W}
          y1={arrowY}
          x2={BOX_X[idx + 1]}
          y2={arrowY}
          label={label}
          animated={animated}
          beginOffset={`${(rowIdx * 2 + idx) * 0.35}s`}
        />
      ))}
    </g>
  );
}

function RowTitle({
  y,
  number,
  text,
}: {
  y: number;
  number: number;
  text: string;
}) {
  return (
    <text
      x={50}
      y={y}
      className="fill-brown-500 dark:fill-dark-100/50 font-poppins"
      fontSize={11}
      fontWeight={600}
      letterSpacing={1.2}
    >
      {`${String(number).padStart(2, "0")}  ${text.toUpperCase()}`}
    </text>
  );
}

function FlowBox({
  x,
  y,
  label,
  sub,
}: {
  x: number;
  y: number;
  label: string;
  sub?: string;
}) {
  const centerX = x + BOX_W / 2;
  const centerY = y + BOX_H / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={BOX_W}
        height={BOX_H}
        rx={8}
        className="fill-brown-100 stroke-brown-300 dark:fill-dark-900 dark:stroke-dark-100/15"
        strokeWidth={1}
      />
      <text
        x={centerX}
        y={sub ? centerY - 6 : centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-brown-900 dark:fill-dark-100 font-poppins"
        fontSize={14}
        fontWeight={500}
      >
        {label}
      </text>
      {sub && (
        <text
          x={centerX}
          y={centerY + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-brown-500 dark:fill-dark-100/55 font-fragment-mono"
          fontSize={10}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function FlowArrow({
  x1,
  y1,
  x2,
  y2,
  label,
  animated,
  beginOffset,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  animated: boolean;
  beginOffset: string;
}) {
  const midX = (x1 + x2) / 2;
  const lineX2 = x2 - 4;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={lineX2}
        y2={y2}
        className="stroke-brown-400 dark:stroke-dark-100/30"
        strokeWidth={1}
        markerEnd="url(#data-flow-arrow)"
      />
      {label && (
        <text
          x={midX}
          y={y1 - 8}
          textAnchor="middle"
          className="fill-brown-500 dark:fill-dark-100/55 font-fragment-mono"
          fontSize={10}
        >
          {label}
        </text>
      )}
      {animated && (
        <circle r={2.5} className="fill-brown-700 dark:fill-dark-100/70">
          <animate
            attributeName="cx"
            from={x1}
            to={lineX2}
            dur="2.4s"
            begin={beginOffset}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from={y1}
            to={y2}
            dur="2.4s"
            begin={beginOffset}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur="2.4s"
            begin={beginOffset}
            repeatCount="indefinite"
          />
        </circle>
      )}
    </g>
  );
}
