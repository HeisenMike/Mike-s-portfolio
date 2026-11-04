import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Icons = {
  crm: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 11h18" />
      <circle cx="9" cy="15" r="1" />
      <circle cx="15" cy="15" r="1" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  ecom: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  cost: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  uptime: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="wf-gear">
      {/* Lucide gear - arc-based teeth */}
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
      {/* Center hole */}
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

// === PIKPIK PATTERN: Fixed design dimensions (matching hero column) ===
const WF_WIDTH = 580;   // graph width (pikpik uses 1100, we scale to hero column)
const WF_HEIGHT = 300;  // graph height (pikpik uses 412)
const NODE_W = 150;
const NODE_H = 60;
const ENGINE_W = 110;
const ENGINE_H = 110;

// Positions in DESIGN PIXELS (single source of truth)
const INPUT_NODES = [
  { id: 'crm', type: 'Source', title: 'CRM & Sales', icon: Icons.crm, color: '#38BDF8', x: 16, y: 40 },
  { id: 'docs', type: 'Source', title: 'Docs & Data', icon: Icons.docs, color: '#A855F7', x: 16, y: 120 },
  { id: 'ecom', type: 'Source', title: 'E-commerce', icon: Icons.ecom, color: '#34D399', x: 16, y: 200 },
];

const OUTPUT_NODES = [
  { id: 'time', type: 'You Get', title: '80% Time Saved', icon: Icons.time, color: '#FBBF24', x: WF_WIDTH - NODE_W - 16, y: 40 },
  { id: 'cost', type: 'You Get', title: '50% Cost Cut', icon: Icons.cost, color: '#FF6B57', x: WF_WIDTH - NODE_W - 16, y: 120 },
  { id: 'uptime', type: 'You Get', title: '24/7 Output', icon: Icons.uptime, color: '#D946EF', x: WF_WIDTH - NODE_W - 16, y: 200 },
];

// Engine centered
const ENGINE_X = (WF_WIDTH - ENGINE_W) / 2;
const ENGINE_Y = (WF_HEIGHT - ENGINE_H) / 2;

const ACCENT_SKY = '#38BDF8';
const ACCENT_EMERALD = '#34D399';

const ENGINE_TAGS = ['AI Agents', 'Workflows', 'Integrations'];
const TAG_CYCLE_MS = 2200; // time per tag

// Port offset (pikpik: port 11px at -6px → center at -0.5px from node edge)
const PORT_R = 5.5;      // port radius (11px diameter)
const PORT_OFFSET = 6;   // port edge distance from node (pikpik uses -6px)

function WorkflowVisualization({ className = '' }) {
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  const engineRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [tagIndex, setTagIndex] = useState(0);

  // Cycle engine tags
  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % ENGINE_TAGS.length);
    }, TAG_CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  // === RESPONSIVE ZOOM (pikpik: --wf-zoom CSS var) ===
  useEffect(() => {
    const container = containerRef.current;
    const graph = graphRef.current;
    if (!container || !graph) return;

    const updateZoom = () => {
      const containerW = container.clientWidth;
      // pikpik: zoom = container_width / design_width
      const z = Math.min(containerW / WF_WIDTH, 1); // cap at 1x (don't upscale)
      setZoom(z);
    };

    updateZoom();
    const ro = new ResizeObserver(updateZoom);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // === PATH STRINGS (design pixel coordinates) ===
  const engineLeft = ENGINE_X;
  const engineRight = ENGINE_X + ENGINE_W;
  const engineCenterY = ENGINE_Y + ENGINE_H / 2;

  // Port centers in design coords
  const inputPortX = (node) => node.x + NODE_W + PORT_OFFSET;     // right port center
  const inputPortY = (node) => node.y + NODE_H / 2;
  const outputPortX = (node) => node.x - PORT_OFFSET;             // left port center
  const outputPortY = (node) => node.y + NODE_H / 2;

  // Cubic bezier: input port → engine left
  const inputPaths = INPUT_NODES.map(node => {
    const sx = inputPortX(node);
    const sy = inputPortY(node);
    const cpX = (sx + engineLeft) / 2;
    return `M ${sx} ${sy} C ${cpX} ${sy}, ${cpX} ${engineCenterY}, ${engineLeft} ${engineCenterY}`;
  });

  // Engine right → output port
  const outputPaths = OUTPUT_NODES.map(node => {
    const ex = outputPortX(node);
    const ey = outputPortY(node);
    const cpX = (engineRight + ex) / 2;
    return `M ${engineRight} ${engineCenterY} C ${cpX} ${engineCenterY}, ${cpX} ${ey}, ${ex} ${ey}`;
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ width: '100%', maxWidth: `${WF_WIDTH}px`, margin: '0 auto' }}
    >
      {/* Graph wrapper — fixed design size, CSS zoom for responsiveness (pikpik pattern) */}
      <div
        ref={graphRef}
        className="relative"
        style={{
          width: `${WF_WIDTH}px`,
          height: `${WF_HEIGHT}px`,
          zoom: zoom,  // pikpik: --wf-zoom
          transformOrigin: 'top center',
        }}
      >
        {/* SVG LINKS LAYER — fills graph, overflow:visible (pikpik .wf svg.links) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 pointer-events-none overflow-visible"
          width={WF_WIDTH}
          height={WF_HEIGHT}
          style={{ width: `${WF_WIDTH}px`, height: `${WF_HEIGHT}px` }}
        >
          {/* Base paths — pikpik .wf__base */}
          {inputPaths.map((d, i) => (
            <path
              key={`base-in-${i}`}
              d={d}
              stroke="#29292933"  // pikpik: #29292924
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {outputPaths.map((d, i) => (
            <path
              key={`base-out-${i}`}
              d={d}
              stroke="#29292933"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Flow paths — pikpik .flowpath */}
          {INPUT_NODES.map((node, i) => (
            <path
              key={`flow-in-${node.id}`}
              d={inputPaths[i]}
              stroke={node.color}
              strokeWidth="2.75"  // pikpik: 2.75px
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 11"  // pikpik: 6 11
              style={{
                animation: 'dashmove 1.15s linear infinite',  // pikpik timing
                animationDelay: `${i * 0.12}s`,
                opacity: 1,
              }}
            />
          ))}
          {OUTPUT_NODES.map((node, i) => (
            <path
              key={`flow-out-${node.id}`}
              d={outputPaths[i]}
              stroke={node.color}
              strokeWidth="2.75"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 11"
              style={{
                animation: 'dashmove 1.15s linear infinite',
                animationDelay: `${(3 + i) * 0.12}s`,
                opacity: 1,
              }}
            />
          ))}
        </svg>

        {/* INPUT NODES — HTML absolute positioned (pikpik .wfnode) */}
        {INPUT_NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
            className="absolute"
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              width: `${NODE_W}px`,
              height: `${NODE_H}px`,
              zIndex: 2,
            }}
          >
            {/* Port — pikpik .port--r: right: -6px, width: 11px */}
            <div
              className="absolute"
              style={{
                right: `-${PORT_OFFSET}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                width: `${PORT_R * 2}px`,
                height: `${PORT_R * 2}px`,
                borderRadius: '50%',
                border: `2px solid ${node.color}`,
                background: 'var(--bg-card)',
                zIndex: 3,
              }}
            />
            {/* Node card — pikpik .wfnode */}
            <div
              className="flex items-center gap-3 px-4 h-full"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3), 0 4px 16px -4px rgba(0,0,0,0.2)',
                width: '100%',
                height: '100%',
                minWidth: 0,
              }}
            >
              <span
                style={{
                  color: node.color,
                  display: 'grid',
                  placeItems: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `${node.color}1A`,
                  flexShrink: 0,
                }}
              >
                {node.icon}
              </span>
              <div className="flex flex-col justify-center min-w-0">
                <small
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '1px',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {node.type}
                </small>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                    whiteSpace: 'normal',
                    wordBreak: 'keep-all',
                  }}
                >
                  {node.title}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* ENGINE — pikpik .wfcore */}
        <motion.div
          ref={engineRef}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.3, 0.8, 0.3, 1.15] }}
          className="absolute"
          style={{
            left: `${ENGINE_X}px`,
            top: `${ENGINE_Y}px`,
            width: `${ENGINE_W}px`,
            height: `${ENGINE_H}px`,
            zIndex: 4,
          }}
        >
          {/* Pulse rings — pikpik .wfcore__ring */}
          <div className="absolute inset-[-10px] rounded-[32px]" style={{
            border: '1px solid var(--accent-fuchsia)',
            opacity: 0.15,
            animation: 'corepulse 3.5s ease-out infinite',
          }} />
          <div className="absolute inset-[-10px] rounded-[32px]" style={{
            border: '1px solid var(--accent-fuchsia)',
            opacity: 0.15,
            animation: 'corepulse 3.5s ease-out infinite',
            animationDelay: '1.75s',
          }} />

          {/* Core box — pikpik .wfcore__box */}
          <div className="absolute inset-0 rounded-[22px] flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-fuchsia), var(--accent-orange))',
            boxShadow: '0 20px 40px var(--accent-fuchsia)/33, 0 0 60px var(--accent-violet)/1F',
            transition: 'transform .4s cubic-bezier(.3,.8,.3,1.2)',
          }}>
            <span className="wf-gear-wrapper" style={{ animation: 'gearRotate 4s linear infinite' }}>{Icons.gear}</span>
          </div>

          {/* Label — pikpik .wfcore__label */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap" style={{ top: `${ENGINE_H + 14}px` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Automation Engine</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tagIndex}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.3, 0.8, 0.3, 1.15] }}
                className="inline-flex items-center gap-1.5 mt-1"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-fuchsia), var(--accent-orange))',
                  border: '1px solid var(--border-primary)', color: 'white', borderRadius: '999px',
                  padding: '5px 11px', fontSize: '12px', fontWeight: 600,
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{ENGINE_TAGS[tagIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* OUTPUT NODES */}
        {OUTPUT_NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + (3 + i) * 0.06, duration: 0.4 }}
            className="absolute"
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              width: `${NODE_W}px`,
              height: `${NODE_H}px`,
              zIndex: 2,
            }}
          >
            {/* Port — pikpik .port--l: left: -6px */}
            <div
              className="absolute"
              style={{
                left: `-${PORT_OFFSET}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                width: `${PORT_R * 2}px`,
                height: `${PORT_R * 2}px`,
                borderRadius: '50%',
                border: `2px solid ${node.color}`,
                background: 'var(--bg-card)',
                zIndex: 3,
              }}
            />
            <div
              className="flex items-center gap-3 px-4 h-full"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3), 0 4px 16px -4px rgba(0,0,0,0.2)',
                width: '100%',
                height: '100%',
                minWidth: 0,
              }}
            >
              <span
                style={{
                  color: node.color,
                  display: 'grid',
                  placeItems: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `${node.color}1A`,
                  flexShrink: 0,
                }}
              >
                {node.icon}
              </span>
              <div className="flex flex-col justify-center min-w-0">
                <small
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '1px',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {node.type}
                </small>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                    whiteSpace: 'normal',
                    wordBreak: 'keep-all',
                  }}
                >
                  {node.title}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

      </div> {/* end graph wrapper */}
    </div>
  );
}

export default WorkflowVisualization;