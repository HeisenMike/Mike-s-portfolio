import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * AutomationFlow — Animated n8n-style workflow visualization
 * Shows interconnected nodes with data particles flowing between them
 * Pure CSS/Canvas animation, no external dependencies
 */

const NODES = [
  { id: 'webhook', label: 'Webhook', x: 80, y: 80, type: 'trigger', color: 'var(--accent-violet)' },
  { id: 'api', label: 'API Call', x: 280, y: 40, type: 'action', color: 'var(--accent-sky)' },
  { id: 'ai', label: 'AI Agent', x: 280, y: 160, type: 'ai', color: 'var(--accent-fuchsia)' },
  { id: 'db', label: 'Database', x: 480, y: 80, type: 'data', color: 'var(--accent-emerald)' },
  { id: 'crm', label: 'CRM', x: 680, y: 40, type: 'action', color: 'var(--accent-amber)' },
  { id: 'notify', label: 'Notify', x: 680, y: 160, type: 'action', color: 'var(--accent-orange)' },
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
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    // Create particles on each connection
    particlesRef.current = CONNECTIONS.flatMap((conn, connIdx) => {
      const fromNode = NODES.find(n => n.id === conn.from);
      const toNode = NODES.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return [];

      return Array.from({ length: PARTICLE_COUNT / CONNECTIONS.length }, (_, i) => ({
        connIdx,
        progress: (i / (PARTICLE_COUNT / CONNECTIONS.length)) * 100,
        speed: 0.15 + Math.random() * 0.1,
        size: 3 + Math.random() * 2,
        color: toNode.color,
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
        const from = NODES.find(n => n.id === conn.from);
        const to = NODES.find(n => n.id === conn.to);
        if (!from || !to) return;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        // Curved path
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 - 30;
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = 'var(--border-primary)';
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
      NODES.forEach(node => {
        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 28);
        gradient.addColorStop(0, `${node.color}33`);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, 28, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node background
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = 'var(--bg-card)';
        ctx.fill();

        // Inner accent
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node label (draw via DOM overlay instead for crisp text)
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative w-full aspect-[4/3] max-w-[700px] mx-auto ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />

      {/* Node Labels — DOM overlay for crisp text */}
      <div className="absolute inset-0 pointer-events-none">
        {NODES.map(node => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + NODES.indexOf(node) * 0.1, duration: 0.5 }}
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