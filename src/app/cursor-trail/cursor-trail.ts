import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  shape: 'dot' | 'diamond' | 'star';
}

@Component({
  selector: 'app-cursor-trail',
  standalone: true,
  templateUrl: './cursor-trail.html',
  styleUrl: './cursor-trail.scss'
})
export class CursorTrailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  isEnabled = false;

  private readonly colors = ['#c084fc', '#a855f7', '#ec4899', '#60a5fa', '#ffffff', '#8b5cf6'];
  private readonly maxParticles = 140;
  private readonly particlePool: TrailParticle[] = [];

  private ctx: CanvasRenderingContext2D | null = null;
  private rafId = 0;
  private dpr = 1;
  private width = 0;
  private height = 0;
  private lastFrameTime = 0;
  private lastX = 0;
  private lastY = 0;
  private mouseX = 0;
  private mouseY = 0;
  private mouseActive = false;
  private reducedMotionQuery: MediaQueryList | null = null;
  private coarsePointerQuery: MediaQueryList | null = null;
  private hoverNoneQuery: MediaQueryList | null = null;

  constructor(private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    if (!this.ctx) {
      return;
    }

    this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    this.hoverNoneQuery = window.matchMedia('(hover: none)');

    this.setup();
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerleave', this.handlePointerLeave);
    window.removeEventListener('blur', this.handlePointerLeave);

    this.reducedMotionQuery?.removeEventListener('change', this.handlePreferenceChange);
    this.coarsePointerQuery?.removeEventListener('change', this.handlePreferenceChange);
    this.hoverNoneQuery?.removeEventListener('change', this.handlePreferenceChange);
  }

  private setup(): void {
    const canvas = this.canvasRef.nativeElement;
    const prefersReducedMotion = this.reducedMotionQuery?.matches ?? false;
    const shouldDisableForTouch = (this.coarsePointerQuery?.matches ?? false) || (this.hoverNoneQuery?.matches ?? false) || window.innerWidth <= 768;

    this.isEnabled = !prefersReducedMotion && !shouldDisableForTouch;

    if (!this.isEnabled) {
      canvas.classList.remove('is-enabled');
      return;
    }

    canvas.classList.add('is-enabled');
    this.resizeCanvas();

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('pointermove', this.handlePointerMove);
      window.addEventListener('pointerleave', this.handlePointerLeave);
      window.addEventListener('blur', this.handlePointerLeave);
      this.reducedMotionQuery?.addEventListener('change', this.handlePreferenceChange);
      this.coarsePointerQuery?.addEventListener('change', this.handlePreferenceChange);
      this.hoverNoneQuery?.addEventListener('change', this.handlePreferenceChange);
      this.lastFrameTime = performance.now();
      this.animate(performance.now());
    });
  }

  private readonly handleResize = (): void => {
    this.resizeCanvas();
  };

  private readonly handlePreferenceChange = (): void => {
    const prefersReducedMotion = this.reducedMotionQuery?.matches ?? false;
    const shouldDisableForTouch = (this.coarsePointerQuery?.matches ?? false) || (this.hoverNoneQuery?.matches ?? false) || window.innerWidth <= 768;

    if (prefersReducedMotion || shouldDisableForTouch) {
      this.isEnabled = false;
      this.canvasRef.nativeElement.classList.remove('is-enabled');
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
      }
      return;
    }

    this.isEnabled = true;
    this.canvasRef.nativeElement.classList.add('is-enabled');
    this.resizeCanvas();
    this.lastFrameTime = performance.now();
    this.animate(performance.now());
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    if (!this.isEnabled) {
      return;
    }

    this.mouseActive = true;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;
    const speed = Math.hypot(deltaX, deltaY);
    const spawnCount = Math.min(5, Math.max(1, Math.round(speed / 10)));

    for (let index = 0; index < spawnCount; index += 1) {
      this.spawnParticle(event.clientX, event.clientY, speed, deltaX, deltaY);
    }

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  };

  private readonly handlePointerLeave = (): void => {
    this.mouseActive = false;
  };

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parentWidth = window.innerWidth;
    const parentHeight = window.innerHeight;

    this.dpr = window.devicePixelRatio || 1;
    this.width = parentWidth;
    this.height = parentHeight;

    canvas.width = Math.round(parentWidth * this.dpr);
    canvas.height = Math.round(parentHeight * this.dpr);
    canvas.style.width = `${parentWidth}px`;
    canvas.style.height = `${parentHeight}px`;

    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private animate(now: number): void {
    if (!this.isEnabled || !this.ctx) {
      return;
    }

    const delta = Math.min(0.032, (now - this.lastFrameTime) / 1000 || 0.016);
    this.lastFrameTime = now;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.save();
    this.ctx.globalCompositeOperation = 'screen';

    for (let index = this.particlePool.length - 1; index >= 0; index -= 1) {
      const particle = this.particlePool[index];
      particle.life -= delta;

      if (particle.life <= 0) {
        this.particlePool.splice(index, 1);
        continue;
      }

      particle.vx *= 0.94;
      particle.vy *= 0.94;
      particle.vy += 0.003;
      particle.x += particle.vx * 60 * delta;
      particle.y += particle.vy * 60 * delta;
      particle.rotation += particle.spin;

      const opacity = Math.max(0, particle.life / particle.maxLife);
      this.drawParticle(particle, opacity);
    }

    this.ctx.restore();

    if (this.mouseActive) {
      this.ctx.save();
      this.ctx.globalAlpha = 0.18;
      this.ctx.beginPath();
      this.ctx.arc(this.mouseX, this.mouseY, 10, 0, Math.PI * 2);
      this.ctx.fillStyle = '#f5e8ff';
      this.ctx.fill();
      this.ctx.restore();
    }

    this.rafId = requestAnimationFrame((next) => this.animate(next));
  }

  private drawParticle(particle: TrailParticle, opacity: number): void {
    if (!this.ctx) {
      return;
    }

    this.ctx.save();
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);
    this.ctx.globalAlpha = opacity * 0.95;
    this.ctx.shadowBlur = particle.size * 3.2;
    this.ctx.shadowColor = particle.color;
    this.ctx.fillStyle = particle.color;

    if (particle.shape === 'dot') {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (particle.shape === 'diamond') {
      this.ctx.beginPath();
      this.ctx.moveTo(0, -particle.size * 1.3);
      this.ctx.lineTo(particle.size * 1.3, 0);
      this.ctx.lineTo(0, particle.size * 1.3);
      this.ctx.lineTo(-particle.size * 1.3, 0);
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      this.drawStar(particle.size * 1.2);
    }

    this.ctx.restore();
  }

  private drawStar(size: number): void {
    if (!this.ctx) {
      return;
    }

    const outerRadius = size;
    const innerRadius = size * 0.45;
    const points = 5;

    this.ctx.beginPath();
    for (let index = 0; index < points * 2; index += 1) {
      const radius = index % 2 === 0 ? outerRadius : innerRadius;
      const angle = (index * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  private spawnParticle(clientX: number, clientY: number, speed: number, deltaX: number, deltaY: number): void {
    if (this.particlePool.length >= this.maxParticles) {
      this.particlePool.shift();
    }

    const direction = Math.atan2(deltaY, deltaX);
    const spread = Math.random() * 0.8 + 0.2;
    const offsetX = Math.cos(direction + Math.PI) * 5 * spread;
    const offsetY = Math.sin(direction + Math.PI) * 5 * spread;
    const velocityScale = Math.min(2.4, speed * 0.022 + Math.random() * 0.3);
    const shape: TrailParticle['shape'] = Math.random() > 0.72 ? 'star' : Math.random() > 0.48 ? 'diamond' : 'dot';
    const size = Math.random() * 2.2 + (shape === 'dot' ? 1.1 : 0.8);
    const life = 0.42 + Math.random() * 0.58;

    this.particlePool.push({
      x: clientX + offsetX,
      y: clientY + offsetY,
      vx: Math.cos(direction) * velocityScale * 0.25 + (Math.random() - 0.5) * 0.15,
      vy: Math.sin(direction) * velocityScale * 0.25 + (Math.random() - 0.5) * 0.12,
      life,
      maxLife: life,
      size,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.04,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      shape
    });
  }
}
