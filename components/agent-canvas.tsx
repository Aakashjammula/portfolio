"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

export function AgentCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollYRef = useRef(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      scrollYRef.current = latest;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let W: number = window.innerWidth;
    let H: number = window.innerHeight;
    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ── AGENT TYPES ──────────────────────────────────────────────────────────────
    const SPRITE_W = 12, SPRITE_H = 10;
    const TYPES = [
      {
        role: 'Explorer', badge: 'EXPL',
        color: '#34d399', dark: '#065f46', eye: '#022c22', accent: '#6ee7b7',
        messages: ['scanning…', 'path found!', 'new zone!', 'signal: strong', 'mapping…', 'exploring depths', 'node discovered', 'tracing route', 'pinging host...', 'radar active', 'navigating', 'waypoint set', 'fetching coordinates', 'sector clear', 'recon complete'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number) {
          const tx = flip ? x - px * 3.5 : x + SPRITE_W * px + px * 0.5;
          const ty = y + px * 2.2;
          ctx.save();
          ctx.fillStyle = '#1a1a2e'; ctx.strokeStyle = '#34d399'; ctx.lineWidth = 0.9;
          ctx.beginPath(); ctx.arc(tx, ty, px * 1.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.arc(tx + px * 2.4, ty, px * 1.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#34d399';
          ctx.fillRect(tx + px * 0.9, ty - px * 0.35, px * 0.6, px * 0.7);
          ctx.fillStyle = 'rgba(110,231,183,0.55)';
          ctx.beginPath(); ctx.arc(tx - px * 0.35, ty - px * 0.35, px * 0.28, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(tx + px * 2.05, ty - px * 0.35, px * 0.28, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
      },
      {
        role: 'Planner', badge: 'PLAN',
        color: '#a78bfa', dark: '#5b21b6', eye: '#1e1040', accent: '#c4b5fd',
        messages: ['planning…', 'step 1 set', 'delegate now', 'priority: HIGH', 'roadmap ✓', 'allocating tasks', 'sprint started', 'backlog groomed', 'agile approach', 'optimizing workflow', 'scheduling jobs', 'ETA: 2s', 'scrum master', 'architecting', 'dependencies mapped'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number) {
          const tx = flip ? x - px * 4 : x + SPRITE_W * px + px * 0.5;
          const ty = y + px * 1;
          const w = px * 3, h = px * 4;
          ctx.save();
          ctx.fillStyle = '#1a0a30'; ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.roundRect(tx, ty, w, h, px * 0.3); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#a78bfa';
          ctx.beginPath(); ctx.roundRect(tx + w * 0.3, ty - px * 0.5, w * 0.4, px * 0.8, px * 0.2); ctx.fill();
          ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 0.6;
          [0.28, 0.52, 0.76].forEach(f => {
            const ly = ty + h * f;
            ctx.beginPath(); ctx.moveTo(tx + px * 0.3, ly); ctx.lineTo(tx + px * 0.6, ly + px * 0.3); ctx.lineTo(tx + px * 1, ly - px * 0.2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(tx + px * 1.2, ly); ctx.lineTo(tx + w - px * 0.3, ly); ctx.stroke();
          });
          ctx.restore();
        }
      },
      {
        role: 'Researcher', badge: 'RAG',
        color: '#38bdf8', dark: '#0c4a6e', eye: '#041020', accent: '#7dd3fc',
        messages: ['searching…', 'RAG query ✓', '12 chunks found', 'embedding hit!', 'context ready', 'vectorizing...', 'querying DB', 'semantic search', 'cosine similarity', 'knowledge retrieved', 'parsing docs', 'chunking text', 'analyzing context', 'data ingested', 'matching tokens'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number) {
          const tx = flip ? x - px * 3.5 : x + SPRITE_W * px + px * 0.3;
          const ty = y + px * 1.5;
          ctx.save();
          ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.2;
          ctx.fillStyle = 'rgba(56,189,248,0.1)';
          ctx.beginPath(); ctx.arc(tx + px, ty + px, px * 1.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = 'rgba(125,211,252,0.5)';
          ctx.beginPath(); ctx.arc(tx + px * 0.55, ty + px * 0.55, px * 0.38, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(tx + px * 2, ty + px * 2); ctx.lineTo(tx + px * 3.3, ty + px * 3.3); ctx.stroke();
          ctx.restore();
        }
      },
      {
        role: 'Coder', badge: 'CODE',
        color: '#4ade80', dark: '#14532d', eye: '#071a0e', accent: '#86efac',
        messages: ['def agent():', 'syntax ✓', 'test passed', 'git commit ✓', 'linting…', 'writing logic', 'import langchain', 'npm install', 'compiling...', 'refactoring', 'O(1) achieved', 'resolving conflicts', 'push to origin', 'typing code', 'while(true)'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number, isIdle: boolean) {
          const tx = flip ? x - px * 5.5 : x + SPRITE_W * px + px * 0.2;
          const ty = y + px * 1.8;
          ctx.save();
          ctx.fillStyle = '#0d1117'; ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.roundRect(tx, ty, px * 4.5, px * 3.2, px * 0.2); ctx.fill(); ctx.stroke();
          const blink = Math.floor(tick / 18) % 2;
          const lineColors = ['#4ade80', '#86efac', '#4ade80', '#a3e635'];
          lineColors.forEach((c, i) => {
            ctx.fillStyle = c;
            // Matrix scrolling effect when idle
            let scrollOffset = isIdle ? (i - tick * 0.1) % 4 : i;
            if (scrollOffset < 0) scrollOffset += 4;
            ctx.fillRect(tx + px * 0.3, ty + px * (0.35 + scrollOffset * 0.65), px * (1.2 + i * 0.35), px * 0.28);
          });
          if (blink) { ctx.fillStyle = '#86efac'; ctx.fillRect(tx + px * 2, ty + px * 2.55, px * 0.15, px * 0.35); }
          ctx.fillStyle = '#1a2a1a'; ctx.strokeStyle = '#4ade80';
          ctx.beginPath(); ctx.roundRect(tx - px * 0.3, ty + px * 3.2, px * 5.1, px * 0.6, px * 0.1); ctx.fill(); ctx.stroke();
          ctx.restore();
        }
      },
      {
        role: 'Reviewer', badge: 'REVW',
        color: '#fbbf24', dark: '#78350f', eye: '#1c0800', accent: '#fde68a',
        messages: ['reviewing PR…', 'score: 9/10', 'nit: var name', 'LGTM ✓', 'needs fix', 'checking types', 'code smells?', 'approved', 'requesting changes', 'security check', 'optimizing loop', 'missing docs', 'coverage 100%', 'squash commits', 'looks good'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number, isIdle: boolean) {
          const cx = x + SPRITE_W * px * 0.5;
          const ty = y - px * 1.5 + (isIdle ? Math.sin(tick * 0.3) * px * 0.6 : 0); // Glasses shift up and down when idle
          ctx.save();
          ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1;
          ctx.fillStyle = 'rgba(251,191,36,0.1)';
          ctx.beginPath(); ctx.arc(cx - px * 1.5, ty, px * 0.95, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.arc(cx + px * 1.5, ty, px * 0.95, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cx - px * 0.55, ty); ctx.lineTo(cx + px * 0.55, ty); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cx - px * 2.45, ty); ctx.lineTo(cx - px * 3.2, ty - px * 0.4); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cx + px * 2.45, ty); ctx.lineTo(cx + px * 3.2, ty - px * 0.4); ctx.stroke();
          ctx.fillStyle = 'rgba(253,230,138,0.55)';
          ctx.beginPath(); ctx.arc(cx - px * 1.9, ty - px * 0.3, px * 0.22, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(cx + px * 1.1, ty - px * 0.3, px * 0.22, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
      },
      {
        role: 'Cleaner', badge: 'SWEEP',
        color: '#e879f9', dark: '#701a75', eye: '#200818', accent: '#f0abfc',
        messages: ['sweeping…', 'cache cleared!', 'rm -rf /tmp', 'memory freed', 'cleanup ✓', 'garbage collection', 'optimizing RAM', 'closing connections', 'killing zombies', 'freeing ports', 'deleting logs', 'purging DB', 'vacuuming', 'shredding data', 'system pruned'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number) {
          const tx = flip ? x - px * 1.5 : x + SPRITE_W * px - px * 0.5;
          const ty = y + px * 0.8;
          const angle = Math.sin(tick * 0.1) * 0.45;
          ctx.save(); ctx.translate(tx, ty); ctx.rotate(angle);
          ctx.strokeStyle = '#c4a35a'; ctx.lineWidth = 1.3; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(px * 1.2, px * 4.5); ctx.stroke();
          ctx.fillStyle = '#701a75';
          ctx.fillRect(px * 0.35, px * 4.1, px * 1.7, px * 0.55);
          ctx.strokeStyle = '#e879f9'; ctx.lineWidth = 0.9;
          for (let i = -2; i <= 2; i++) {
            ctx.beginPath(); ctx.moveTo(px * 1.2, px * 4.6); ctx.lineTo(px * 1.2 + i * px * 0.42, px * 6.1); ctx.stroke();
          }
          ctx.restore();
        }
      },
      {
        role: 'Deployer', badge: 'SHIP',
        color: '#f97316', dark: '#7c2d12', eye: '#1c0800', accent: '#fdba74',
        messages: ['deploying…', 'docker ✓', 'k8s live!', 'CI passed ✓', '🚀 launched!', 'building image', 'scaling pods', 'health check OK', 'load balancing', 'CDN updated', 'zero downtime', 'rolling update', 'provisioning EC2', 'pushing to prod', 'serverless active'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number) {
          const tx = x + SPRITE_W * px * 0.5 - px * 1.2;
          const ty = y - px * 4;
          const bob = Math.sin(tick * 0.07) * px * 0.35;
          ctx.save(); ctx.translate(tx, ty + bob);
          ctx.fillStyle = '#f97316';
          ctx.beginPath(); ctx.moveTo(px * 1.2, 0); ctx.lineTo(px * 2.2, px * 1.5); ctx.lineTo(px * 2.2, px * 4); ctx.lineTo(px * 0.2, px * 4); ctx.lineTo(px * 0.2, px * 1.5); ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#fdba74';
          ctx.beginPath(); ctx.moveTo(px * 1.2, 0); ctx.lineTo(px * 0.2, px * 1.5); ctx.lineTo(px * 2.2, px * 1.5); ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#0a0a1a'; ctx.strokeStyle = '#fdba74'; ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.arc(px * 1.2, px * 2.3, px * 0.52, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#c2410c';
          ctx.beginPath(); ctx.moveTo(px * 0.2, px * 3); ctx.lineTo(-px * 0.55, px * 4.5); ctx.lineTo(px * 0.2, px * 4); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(px * 2.2, px * 3); ctx.lineTo(px * 2.95, px * 4.5); ctx.lineTo(px * 2.2, px * 4); ctx.closePath(); ctx.fill();
          const flicker = 0.7 + Math.random() * 0.55;
          const fg = ctx.createLinearGradient(px * 1.2, px * 4, px * 1.2, px * 4 + px * 2.8 * flicker);
          fg.addColorStop(0, '#fff7ed'); fg.addColorStop(0.35, '#fb923c'); fg.addColorStop(1, 'transparent');
          ctx.globalAlpha = 0.9; ctx.fillStyle = fg;
          ctx.beginPath(); ctx.ellipse(px * 1.2, px * 4 + px * flicker, px * 0.65, px * 1.6 * flicker, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
      },
      {
        role: 'BugFixer', badge: 'FIX',
        color: '#f43f5e', dark: '#881337', eye: '#1c0208', accent: '#fda4af',
        messages: ['bug found 🐛', 'stack traced', 'patching…', 'hotfix merged', 'tests pass ✓', 'squashing bug', 'null pointer?', 'memory leak fixed', 'reverting commit', 'debugging...', 'console.log()', 'issue closed', 'try/catch added', 'edge case handled', 'it works now'],
        drawTool(x: number, y: number, px: number, flip: boolean, tick: number, isIdle: boolean) {
          const tx = flip ? x - px * 4.5 : x + SPRITE_W * px + px * 0.2;
          const ty = y + px * 1;
          ctx.save(); ctx.translate(tx, ty);
          const ang = Math.sin(tick * 0.06) * 0.3 - 0.5;
          ctx.rotate(ang);
          ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = px * 0.7; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(px * 3, px * 3); ctx.stroke();
          ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = px * 0.5; ctx.lineCap = 'butt';
          ctx.beginPath(); ctx.arc(px * 3.5, px * 3.5, px * 0.9, Math.PI * 0.8, Math.PI * 2.2); ctx.stroke();
          ctx.restore();

          const bx = tx + (flip ? -px * 2 : px * 2.5);
          const by = ty + px * 3.2 + (isIdle ? 0 : Math.sin(tick * 0.08) * px * 0.9);
          ctx.save();
          if (isIdle) {
            // Bug crawls in a circle when idle
            ctx.translate(bx, by);
            ctx.rotate(tick * 0.15);
            ctx.translate(px * 1.5, 0);
          } else {
            ctx.translate(bx, by);
          }
          ctx.fillStyle = '#22c55e';
          ctx.beginPath(); ctx.ellipse(0, 0, px * 0.72, px * 0.52, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#15803d';
          ctx.beginPath(); ctx.ellipse(0, -px * 0.42, px * 0.42, px * 0.36, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#15803d'; ctx.lineWidth = 0.5;
          [-0.9, 0, 0.9].forEach(i => {
            ctx.beginPath(); ctx.moveTo(-px * 0.62, i * px * 0.22); ctx.lineTo(-px * 1.35, i * px * 0.22 - px * 0.32); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(px * 0.62, i * px * 0.22); ctx.lineTo(px * 1.35, i * px * 0.22 - px * 0.32); ctx.stroke();
          });
          ctx.restore();
        }
      },
    ];

    const BODY = [
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 0],
      [0, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 0],
      [0, 1, 1, 3, 4, 1, 1, 4, 3, 1, 1, 0],
      [0, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 0],
      [0, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    ];
    const LEGS_A = [[0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0]];
    const LEGS_B = [[0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0]];

    const ZONES = [
      { cx: 0.08, cy: 0.35, rx: 0.09, ry: 0.22 }, // Explorer
      { cx: 0.22, cy: 0.55, rx: 0.08, ry: 0.18 }, // Planner
      { cx: 0.22, cy: 0.30, rx: 0.08, ry: 0.18 }, // Researcher
      { cx: 0.50, cy: 0.45, rx: 0.10, ry: 0.20 }, // Coder
      { cx: 0.72, cy: 0.30, rx: 0.08, ry: 0.18 }, // Reviewer
      { cx: 0.72, cy: 0.60, rx: 0.08, ry: 0.18 }, // Cleaner
      { cx: 0.88, cy: 0.38, rx: 0.08, ry: 0.22 }, // Deployer
      { cx: 0.50, cy: 0.75, rx: 0.12, ry: 0.12 }, // BugFixer
    ];

    function drawSprite(ox: number, oy: number, px: number, type: any, frame: number, flip: boolean, opacity: number) {
      const legs = frame === 1 ? LEGS_A : LEGS_B;
      const rows = [...BODY, ...legs];
      const pal: Record<number, string> = { 1: type.color, 2: type.dark, 3: type.eye, 4: type.accent };
      ctx.save(); ctx.globalAlpha = opacity;
      if (flip) { ctx.translate(ox + SPRITE_W * px, oy); ctx.scale(-1, 1); }
      else ctx.translate(ox, oy);
      for (let r = 0; r < rows.length; r++)
        for (let c = 0; c < SPRITE_W; c++) {
          const v = rows[r][c]; if (!v) continue;
          ctx.fillStyle = pal[v];
          ctx.fillRect(c * px, r * px, px - 0.4, px - 0.4);
        }
      ctx.restore();
    }

    function drawBadge(ox: number, oy: number, px: number, type: any) {
      const cx = ox + SPRITE_W * px / 2, by = oy - 9;
      ctx.save(); ctx.font = 'bold 7px monospace';
      const tw = ctx.measureText(type.badge).width;
      const bw = tw + 8, bh = 11;
      ctx.fillStyle = type.color + 'dd';
      ctx.beginPath(); ctx.roundRect(cx - bw / 2, by - bh, bw, bh, 2); ctx.fill();
      ctx.fillStyle = '#04060d'; ctx.globalAlpha = 1;
      ctx.fillText(type.badge, cx - tw / 2, by - 3);
      ctx.restore();
    }

    function drawBubble(ox: number, oy: number, px: number, type: any, text: string | null, alpha: number) {
      if (!text || alpha <= 0) return;
      const cx = ox + SPRITE_W * px / 2, by = oy - 22;
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.font = '9px monospace';
      const tw = ctx.measureText(text).width;
      const bw = tw + 14, bh = 18, bx = cx - bw / 2, ry = by - bh;
      ctx.fillStyle = 'rgba(5,3,15,0.93)';
      ctx.strokeStyle = type.color + 'bb'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.roundRect(bx, ry, bw, bh, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(5,3,15,0.93)';
      ctx.beginPath(); ctx.moveTo(cx - 5, ry + bh); ctx.lineTo(cx, ry + bh + 7); ctx.lineTo(cx + 5, ry + bh); ctx.fill();
      ctx.strokeStyle = type.color + 'bb';
      ctx.beginPath(); ctx.moveTo(cx - 5, ry + bh + 1); ctx.lineTo(cx, ry + bh + 7); ctx.lineTo(cx + 5, ry + bh + 1); ctx.stroke();
      ctx.fillStyle = type.accent; ctx.globalAlpha = alpha;
      ctx.fillText(text, bx + 7, ry + 12);
      ctx.restore();
    }

    function drawPipelineBeam(a: any, b: any, t: number) {
      if (!a || !b) return;
      const ax = a.cx, ay = a.cy, bx = b.cx, by = b.cy;
      const dist = Math.hypot(ax - bx, ay - by);
      if (dist > 200) return;
      const alpha = (1 - dist / 200) * 0.28;
      ctx.save();
      ctx.globalAlpha = alpha;
      const grd = ctx.createLinearGradient(ax, ay, bx, by);
      grd.addColorStop(0, a.type.color); grd.addColorStop(1, b.type.color);
      ctx.strokeStyle = grd; ctx.lineWidth = 0.9;
      ctx.setLineDash([4, 7]); ctx.lineDashOffset = -(t / 55);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    const CHARS = '01アイウエカキクabcdef░▒▓λ∑∆'.split('');
    const streams = Array.from({ length: 22 }, () => ({
      x: Math.random() * 9999, y: Math.random() * 9999,
      speed: 0.5 + Math.random() * 0.9,
      chars: Array.from({ length: 9 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
      alpha: 0.03 + Math.random() * 0.045,
      color: ['#7c5cbf', '#1d4ed8', '#6d28d9', '#0e7490'][Math.floor(Math.random() * 4)],
    }));

    function drawBg() {
      // Clear with transparent bg if we want content behind it to show, 
      // but in original it was '#06080f'. Let's keep it mostly dark but slightly transparent
      ctx.clearRect(0, 0, W, H);
      // Soft ambient glows
      [[0.1, 0.25, 'rgba(65,15,140,0.12)'], [0.88, 0.48, 'rgba(15,40,145,0.09)'], [0.5, 0.82, 'rgba(105,12,165,0.08)']].forEach(([ox, oy, c]) => {
        const grd = ctx.createRadialGradient((ox as number) * W, (oy as number) * H, 0, (ox as number) * W, (oy as number) * H, W * 0.38);
        grd.addColorStop(0, c as string); grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc((ox as number) * W, (oy as number) * H, W * 0.38, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
      });
      streams.forEach(s => {
        s.y += s.speed;
        if (s.y > H + 90) { s.y = -90; s.x = Math.random() * W; }
        if (Math.random() < .02) s.chars[Math.floor(Math.random() * s.chars.length)] = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.save(); ctx.font = '11px monospace';
        s.chars.forEach((c, i) => { ctx.globalAlpha = s.alpha * (1 - i / s.chars.length); ctx.fillStyle = s.color; ctx.fillText(c, s.x, s.y - i * 13); });
        ctx.restore();
      });
    }

    class Agent {
      type: any; zone: any; px: number;
      x: number; y: number; vx: number; vy: number;
      targetX: number; targetY: number;
      flip: boolean; frame: number; frameTick: number; frameRate: number;
      opacity: number; tick: number; bubble: string | null; bubbleTick: number; bubbleCooldown: number;
      idleTick: number; idleDur: number; cx: number; cy: number; sprinting?: boolean; sprintCooldown?: number;
      isParallaxBot?: boolean;
      history: { x: number, y: number }[] = [];
      isIdle: boolean = false;
      rotation: number = 0;

      constructor(typeIdx: number) {
        this.type = TYPES[typeIdx];
        this.zone = ZONES[typeIdx];
        this.px = 3.6 + (typeIdx % 3) * 0.55;

        let startX = (this.zone.cx + (Math.random() - 0.5) * this.zone.rx * 0.5) * window.innerWidth;
        let startY = (this.zone.cy + (Math.random() - 0.5) * this.zone.ry * 0.5) * window.innerHeight;

        // Ensure they don't spawn exactly in the center text area, causing an explosive scatter
        const minX = window.innerWidth / 2 - 350;
        const maxX = window.innerWidth / 2 + 350;
        const minY = window.innerHeight / 2 - 150;
        const maxY = window.innerHeight / 2 + 250;

        if (startX > minX && startX < maxX && startY > minY && startY < maxY) {
          startY = Math.random() < 0.5 ? minY - 20 : maxY + 20;
        }

        this.x = startX;
        this.y = startY;
        this.vx = 0; this.vy = 0;
        this.targetX = this.x; this.targetY = this.y;
        this.flip = false;
        this.frame = 1; this.frameTick = 0; this.frameRate = 16 + Math.random() * 12;
        this.opacity = 0.65 + Math.random() * 0.3;
        this.tick = Math.random() * 500;
        this.bubble = null; this.bubbleTick = 0;
        this.bubbleCooldown = 60 + Math.floor(typeIdx * 40 + Math.random() * 120);
        this.idleTick = 0; this.idleDur = 80 + Math.random() * 160;
        this.cx = this.x; this.cy = this.y;
        this.pickNewTarget();
        if (typeIdx === 6) this.isParallaxBot = true; // Make Deployer the parallax bot
      }

      pickNewTarget() {
        if (this.isParallaxBot && scrollYRef.current > 0.05) return; // don't pick new target if scrolling
        const zx = this.zone.cx * W;
        const zy = this.zone.cy * H;
        const zrx = this.zone.rx * W;
        const zry = this.zone.ry * H;

        let valid = false;
        let attempts = 0;
        while (!valid && attempts < 10) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 0.85;
          this.targetX = zx + Math.cos(angle) * zrx * dist;
          this.targetY = zy + Math.sin(angle) * zry * dist;

          // Rectangular exclusion zone for target
          const minX = W / 2 - 350;
          const maxX = W / 2 + 350;
          const minY = H / 2 - 150;
          const maxY = H / 2 + 250;

          if (this.targetX < minX || this.targetX > maxX || this.targetY < minY || this.targetY > maxY) {
            valid = true;
          }
          attempts++;
        }

        this.targetX = Math.max(60, Math.min(W - 80, this.targetX));
        this.targetY = Math.max(90, Math.min(H - 80, this.targetY));
        this.idleDur = 70 + Math.random() * 180;
        this.idleTick = 0;
      }

      update(mx: number, my: number, allAgents: Agent[]) {
        this.tick++;
        this.idleTick++;

        const scrollP = scrollYRef.current;

        if (this.isParallaxBot && scrollP > 0.01) {
          // the Deployer bot follows the scroll
          // Let's place it so it smoothly moves down as we scroll
          // Since canvas covers whole screen but fixed, the bot's y relative to screen
          // changes, but if we want it to "stick" to content, its y = -scrollPosition
          // But wait, the canvas is position fixed, so the content scrolls PAST it.
          // If we want the bot to scroll WITH the content or move down faster, we adjust y.
          // Let's make it fly down the screen as you scroll.
          const targetParallaxY = H * 0.38 + (H * scrollP * 2);
          this.targetY = targetParallaxY;
          this.targetX = W * 0.85 + Math.sin(this.tick * 0.05) * 40; // slight weave
          this.sprinting = true;
          if (this.bubbleCooldown < 100) {
            this.bubble = "Deploying features...";
            this.bubbleTick = 60;
            this.bubbleCooldown = 300;
          }
        }

        const distToTarget = Math.hypot(this.x - this.targetX, this.y - this.targetY);

        if (distToTarget < 12) {
          if (this.idleTick > this.idleDur) this.pickNewTarget();
          this.vx *= 0.78; this.vy *= 0.78;
        } else {
          const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
          const jitter = (Math.random() - 0.5) * 0.6;
          const speed = this.sprinting
            ? 2.2 + Math.random() * 0.8
            : 0.8 + Math.min(distToTarget / 60, 1) * 0.9;
          const ax = Math.cos(angle + jitter) * speed;
          const ay = Math.sin(angle + jitter) * speed;
          this.vx = this.vx * 0.88 + ax * 0.12;
          this.vy = this.vy * 0.88 + ay * 0.12;
        }

        this.sprintCooldown = (this.sprintCooldown || 0) - 1;
        if ((this.sprintCooldown || 0) <= 0) {
          this.sprinting = Math.random() < 0.3;
          this.sprintCooldown = 40 + Math.floor(Math.random() * 80);
        }

        if (Math.random() < 0.015) {
          this.vx += (Math.random() - 0.5) * 1.8;
          this.vy += (Math.random() - 0.5) * 1.8;
        }

        const dm = Math.hypot(this.x - mx, this.y - my);
        if (dm < 110) {
          const fa = Math.atan2(this.y - my, this.x - mx);
          this.vx += Math.cos(fa) * 3.0;
          this.vy += Math.sin(fa) * 3.0;
          this.sprinting = true;
        }

        // --- EXCLUSION ZONE (Soft Rectangle) ---
        // Prevent bots from overlapping the main text and buttons in the center.
        const minX = W / 2 - 350;
        const maxX = W / 2 + 350;
        const minY = H / 2 - 150;
        const maxY = H / 2 + 250;

        if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY && !this.isParallaxBot) {
          // Find closest edge
          const dLeft = this.x - minX;
          const dRight = maxX - this.x;
          const dTop = this.y - minY;
          const dBottom = maxY - this.y;
          const minDist = Math.min(dLeft, dRight, dTop, dBottom);

          // Apply a gentle push rather than a violent scatter
          const push = 0.6;
          if (minDist === dLeft) this.vx -= push;
          else if (minDist === dRight) this.vx += push;
          else if (minDist === dTop) this.vy -= push;
          else if (minDist === dBottom) this.vy += push;

          if (Math.random() < 0.02) this.pickNewTarget();
        }
        // ----------------------------------------

        // --- INTER-BOT COLLISION (Bouncing off each other) ---
        allAgents.forEach(other => {
          if (other === this) return;
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const dist = Math.hypot(dx, dy);
          const minSpace = this.px * 16; // About 50-60px
          if (dist < minSpace && dist > 0.1) {
            const force = (minSpace - dist) * 0.05;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force;
            this.vy += Math.sin(angle) * force;
          }
        });
        // ----------------------------------------

        const spd = Math.hypot(this.vx, this.vy);
        const maxSpd = this.sprinting ? 3.8 : 1.8;
        if (spd > maxSpd) { this.vx = this.vx / spd * maxSpd; this.vy = this.vy / spd * maxSpd; }

        this.isIdle = spd < 0.4 && !this.sprinting;

        // Roll animation when moving quickly
        if (this.sprinting || spd > 1.5) {
          this.rotation = this.vx * 0.06;
        } else {
          this.rotation *= 0.85; // smooth return to upright
        }

        // Record history for pixel trails if moving fast
        if (spd > 2.0 || this.sprinting) {
          this.history.unshift({ x: this.x, y: this.y });
          if (this.history.length > 8) this.history.pop();
        } else if (this.history.length > 0) {
          this.history.pop();
        }

        this.x += this.vx; this.y += this.vy;

        const sw = SPRITE_W * this.px, sh = SPRITE_H * this.px;
        // Don't bounce off bottom if parallax bot
        if (this.x < 30) { this.x = 30; this.vx = Math.abs(this.vx) * 0.7; }
        if (this.x > W - sw - 30) { this.x = W - sw - 30; this.vx = -Math.abs(this.vx) * 0.7; }
        if (this.y < 72 && !this.isParallaxBot) { this.y = 72; this.vy = Math.abs(this.vy) * 0.7; }

        if (!this.isParallaxBot) {
          if (this.y > H - sh - 20) { this.y = H - sh - 20; this.vy = -Math.abs(this.vy) * 0.7; }
        }

        if (Math.abs(this.vx) > 0.04) this.flip = this.vx < 0;

        this.frameTick++;
        const fr = spd > 0.2 ? Math.max(5, this.frameRate - spd * 5) : 99;
        if (this.frameTick > fr) { this.frameTick = 0; this.frame = this.frame === 1 ? 2 : 1; }
        if (spd < 0.1) this.frame = 0;

        this.bubbleCooldown--;
        if (this.bubbleCooldown <= 0 && !this.bubble) {
          this.bubble = this.type.messages[Math.floor(Math.random() * this.type.messages.length)];
          this.bubbleTick = 90 + Math.floor(Math.random() * 50);
          this.bubbleCooldown = 180 + Math.floor(Math.random() * 250);
        }
        if (this.bubbleTick > 0) this.bubbleTick--; else this.bubble = null;

        this.cx = this.x + SPRITE_W * this.px / 2;
        this.cy = this.y + SPRITE_H * this.px / 2;
      }

      draw() {
        if (this.opacity < 0.01) return;

        // Draw High-Tech Pixel Trail
        if (this.history.length > 0) {
          ctx.save();
          this.history.forEach((pos, i) => {
            const trailAlpha = this.opacity * 0.35 * (1 - i / this.history.length);
            drawSprite(pos.x, pos.y, this.px, this.type, this.frame, this.flip, trailAlpha);
          });
          ctx.restore();
        }

        ctx.save();
        ctx.globalAlpha = this.opacity * 0.45;
        const gr = ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.px * 12);
        gr.addColorStop(0, this.type.color + '35');
        gr.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(this.cx, this.cy, this.px * 12, 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();
        ctx.restore();

        // Apply rolling rotation
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.rotation);
        ctx.translate(-this.cx, -this.cy);

        drawSprite(this.x, this.y, this.px, this.type, this.frame, this.flip, this.opacity);

        ctx.save(); ctx.globalAlpha = this.opacity;
        if (this.type.drawTool) this.type.drawTool(this.x, this.y, this.px, this.flip, this.tick, this.isIdle);
        ctx.restore();

        ctx.restore(); // Restore rolling rotation

        drawBadge(this.x, this.y, this.px, this.type);

        const fi = Math.min(1, (110 - this.bubbleTick + 12) / 12);
        const fo = Math.min(1, this.bubbleTick / 16);
        drawBubble(this.x, this.y, this.px, this.type, this.bubble, this.opacity * Math.min(fi, fo));
      }
    }

    const agents = TYPES.map((_, i) => new Agent(i));

    let mouseX = W / 2, mouseY = H / 2;
    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onClick = (e: MouseEvent) => {
      agents.forEach(a => {
        const fa = Math.atan2(a.y - e.clientY, a.x - e.clientX);
        const force = Math.max(0, 160 - Math.hypot(a.x - e.clientX, a.y - e.clientY)) / 50;
        a.vx += Math.cos(fa) * force; a.vy += Math.sin(fa) * force;
        setTimeout(() => a.pickNewTarget(), 800 + Math.random() * 400);
      });
    };
    const onTouchMove = (e: TouchEvent) => { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClick);
    document.addEventListener('touchmove', onTouchMove, { passive: true });

    let t = 0;
    let animationFrameId: number;

    function loop() {
      t++;
      drawBg();
      for (let i = 0; i < agents.length; i++)
        for (let j = i + 1; j < agents.length; j++)
          drawPipelineBeam(agents[i], agents[j], t);
      agents.sort((a, b) => a.y - b.y);
      agents.forEach(a => a.update(mouseX, mouseY, agents));
      agents.forEach(a => a.draw());
      animationFrameId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onClick);
      document.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="agent-canvas"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
