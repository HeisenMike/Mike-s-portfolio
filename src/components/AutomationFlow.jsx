import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * AutomationFlow — Animated n8n-style workflow visualization
 * Shows interconnected nodes with data particles flowing between them
 * Pure CSS/Canvas animation, no external dependencies
 */

const NODE_CONFIG = [
  { id: 'webhook', label: 'Webhook', x: 80, y: 80, type: 'trigger', colorVar: '--accent-violet' },
  { id: 'api', label: 'API Call', x: 280, y: 40, type: 'action', colorVar: '--accent-sky' },
  { id: 'ai', label: 'AI Agent', x: 280, y: 160, type: 'ai', colorVar: '--accent-fuchsia' },
  { id: 'db', label: 'Database', x: 480, y: 80, type: 'data', colorVar: '--accent-emerald' },
  { id: 'crm', label: 'CRM', x: 680, y: 40, type: 'action', colorVar: '--accent-amber' },
  { id: 'notify', label: 'Notify', x: 680, y: 160, type: 'action', colorVar: '--accent-orange' },
];

const CONNECTIONS = [
  { from: 'webhook', to: 'api' },
  { from: 'webhook', to: 'ai' },
  { from: 'api', to: 'db' },
  { from: 'ai', to: 'db' },
  { from: 'db', to: 'crm' },
  { from: 'db', to: 'notify' },
];

const PARTICLE_COUNT = 12;

function AutomationFlow({ className = '' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const colorsRef = useRef({});

  // Resolve CSS variables to actual color values
  const resolveColors = (container) => {
    const style = getComputedStyle(container);
    const resolved = {};
    NODE_CONFIG.forEach(node => {
      resolved[node.id] = style.getPropertyValue(node.colorVar).trim() || '#888';
    });
    // Also resolve border and bg colors
    resolved.border = style.getPropertyValue('--border-primary').trim() || '#333';
    resolved.bgCard = style.getPropertyValue('--bg-card').trim() || '#1a1a1a';
    resolved.textSecondary = style.getPropertyValue('--text-secondary').trim() || '#aaa';
    return resolved;
  };

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    // Resolve colors once
    colorsRef.current = resolveColors(container);

    // Create particles on each connection
    particlesRef.current = CONNECTIONS.flatMap((conn, connIdx) => {
      const fromNode = NODE_CONFIG.find(n => n.id === conn.from);
      const toNode = NODE_CONFIG.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return [];

      return Array.from({ length: Math.ceil(PARTICLE_COUNT / CONNECTIONS.length) }, (_, i) => ({
        connIdx,
        progress: (i / Math.ceil(PARTICLE_COUNT / CONNECTIONS.length)) * 100,
        speed: 0.15 + Math.random() * 0.1,
        size: 3 + Math.random() * 2,
        color: colorsRef.current[toNode.id],
        fromNode,
        toNode,
      }));
    });

    function animate() {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw connections (static lines)
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      CONNECTIONS.forEach(conn => {
        const from = NODE_CONFIG.find(n => n.id === conn.from);
        const to = NODE_CONFIG.find(n => n.id === conn.to);
        if (!from || !to) return;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        // Curved path
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 - 30;
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = colorsRef.current.border;
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Draw and animate particles
      particlesRef.current.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 100) p.progress = 0;

        const t = p.progress / 100;
        const midX = (p.fromNode.x + p.toNode.x) / 2;
        const midY = (p.fromNode.y + p.toNode.y) / 2 - 30;

        // Quadratic bezier interpolation
        const x = Math.pow(1 - t, 2) * p.fromNode.x +
                  2 * (1 - t) * t * midX +
                  Math.pow(t, 2) * p.toNode.x;
        const y = Math.pow(1 - t, 2) * p.fromNode.y +
                  2 * (1 - t) * t * midY +
                  Math.pow(t, 2) * p.toNode.y;

        // Glow effect
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw nodes
      NODE_CONFIG.forEach(node => {
        const color = colorsRef.current[node.id];
        const border = colorsRef.current.border;
        const bgCard = colorsRef.current.bgCard;

        // Node glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 28);
        glowGradient.addColorStop(0, color + '33');
        glowGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, 28, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Node ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node background
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = bgCard;
        ctx.fill();

        // Inner accent
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Resize handler - re-resolve colors on theme change
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      // Re-resolve colors in case theme changed
      colorsRef.current = resolveColors(container);
      // Update particle colors
      particlesRef.current.forEach(p => {
        p.color = colorsRef.current[p.toNode.id];
      });
    };
    window.addEventListener('resize', handleResize);
    // Also listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full aspect-[4/3] max-w-[700px] mx-auto ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />

      {/* Node Labels — DOM overlay for crisp text */}
      <div className="absolute inset-0 pointer-events-none">
        {NODE_CONFIG.map(node => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + NODE_CONFIG.indexOf(node) * 0.1, duration: 0.5 }}
            className="absolute pointer-events-none"
            style={{
              left: `${node.x}px`,
              top: `${node.y + 32}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap px-2 py-1 rounded bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border-primary)]">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AutomationFlow;