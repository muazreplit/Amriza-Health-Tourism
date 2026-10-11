import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 28);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 9.5;

    // Convert lat/long to 3D Cartesian coords
    const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 1. Globe Base Points (Dot-matrix digital sphere)
    const particleCount = 2200;
    const spherePositions = new Float32Array(particleCount * 3);
    const sphereColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color('#1dbcb5');
    const colorNavy = new THREE.Color('#034d61');

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution for uniform surface distribution
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const phi = i * 3.883222; // golden angle increment

      const x = Math.cos(phi) * radiusAtY;
      const z = Math.sin(phi) * radiusAtY;

      spherePositions[i * 3] = x * RADIUS;
      spherePositions[i * 3 + 1] = y * RADIUS;
      spherePositions[i * 3 + 2] = z * RADIUS;

      // Subtle cyan to deep blue color gradient
      const mixedColor = colorCyan.clone().lerp(colorNavy, Math.random() * 0.7);
      sphereColors[i * 3] = mixedColor.r;
      sphereColors[i * 3 + 1] = mixedColor.g;
      sphereColors[i * 3 + 2] = mixedColor.b;
    }

    const sphereGeometry = new THREE.BufferGeometry();
    sphereGeometry.setAttribute('position', new THREE.BufferAttribute(spherePositions, 3));
    sphereGeometry.setAttribute('color', new THREE.BufferAttribute(sphereColors, 3));

    const sphereMaterial = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const spherePoints = new THREE.Points(sphereGeometry, sphereMaterial);
    globeGroup.add(spherePoints);

    // 2. Inner Atmosphere Glow Sphere
    const innerAtmosphereGeo = new THREE.SphereGeometry(RADIUS * 0.98, 36, 36);
    const innerAtmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x02172d,
      transparent: true,
      opacity: 0.85,
    });
    const innerGlobe = new THREE.Mesh(innerAtmosphereGeo, innerAtmosphereMat);
    globeGroup.add(innerGlobe);

    // 3. Subtle Latitude Rings
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x1dbcb5,
      transparent: true,
      opacity: 0.15,
    });
    [-4, -2, 0, 2, 4].forEach((latOffset) => {
      const ringRadius = Math.sqrt(Math.max(0, RADIUS * RADIUS - latOffset * latOffset));
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * ringRadius, latOffset, Math.sin(theta) * ringRadius));
      }
      ringGeo.setFromPoints(points);
      const ringLine = new THREE.Line(ringGeo, ringMat);
      globeGroup.add(ringLine);
    });

    // 4. Chennai Hub Location (13.0827° N, 80.2707° E)
    const chennaiPos = latLongToVector3(13.0827, 80.2707, RADIUS);

    // Chennai glowing beacon marker
    const chennaiMarkerGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const chennaiMarkerMat = new THREE.MeshBasicMaterial({
      color: 0x1dbcb5,
    });
    const chennaiMarker = new THREE.Mesh(chennaiMarkerGeo, chennaiMarkerMat);
    chennaiMarker.position.copy(chennaiPos);
    globeGroup.add(chennaiMarker);

    // Pulse Ring around Chennai
    const pulseRingGeo = new THREE.RingGeometry(0.4, 0.65, 32);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0x1dbcb5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    pulseRing.position.copy(chennaiPos);
    pulseRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(pulseRing);

    // 5. Patient Trajectory Connection Arcs to Chennai
    // Patient originating hubs around the globe
    const internationalHubs = [
      { name: 'Middle East', lat: 25.2048, lon: 55.2708 },
      { name: 'East Africa', lat: -1.2921, lon: 36.8219 },
      { name: 'Southeast Asia', lat: 3.1390, lon: 101.6869 },
      { name: 'Central Asia', lat: 41.2995, lon: 69.2401 },
      { name: 'South Asia Global', lat: 7.8731, lon: 80.7718 },
      { name: 'West Africa', lat: 6.5244, lon: 3.3792 },
      { name: 'Europe Gateway', lat: 51.5074, lon: -0.1278 },
      { name: 'Pacific Hub', lat: 1.3521, lon: 103.8198 },
    ];

    interface FlightArc {
      curve: THREE.CubicBezierCurve3;
      mesh: THREE.Line;
      particles: THREE.Points;
      particlePositions: Float32Array;
      particleOffsets: number[];
    }

    const flightArcs: FlightArc[] = [];

    internationalHubs.forEach((hub) => {
      const start = latLongToVector3(hub.lat, hub.lon, RADIUS);
      const end = chennaiPos.clone();

      // Middle control points elevated above globe surface for beautiful 3D arched flight paths
      const distance = start.distanceTo(end);
      const mid = start.clone().lerp(end, 0.5);
      const altitude = RADIUS + Math.min(distance * 0.45, 4.5);
      const control1 = start.clone().lerp(mid, 0.6).normalize().multiplyScalar(altitude);
      const control2 = end.clone().lerp(mid, 0.6).normalize().multiplyScalar(altitude);

      const curve = new THREE.CubicBezierCurve3(start, control1, control2, end);
      const curvePoints = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x1dbcb5,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
      });
      const arcMesh = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcMesh);

      // Traveling healthcare data particles along each arc
      const arcParticleCount = 4;
      const partPositions = new Float32Array(arcParticleCount * 3);
      const partOffsets = Array.from({ length: arcParticleCount }, (_, idx) => idx / arcParticleCount);

      const partGeo = new THREE.BufferGeometry();
      partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
      const partMat = new THREE.PointsMaterial({
        color: 0x1dbcb5,
        size: 0.35,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      const arcParticles = new THREE.Points(partGeo, partMat);
      globeGroup.add(arcParticles);

      flightArcs.push({
        curve,
        mesh: arcMesh,
        particles: arcParticles,
        particlePositions: partPositions,
        particleOffsets: partOffsets,
      });
    });

    // 6. Floating Healthcare Data Ambient Cloud
    const ambientCount = 200;
    const ambientPositions = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = RADIUS + 1.2 + Math.random() * 4.5;
      ambientPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      ambientPositions[i * 3 + 1] = r * Math.cos(phi);
      ambientPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const ambientGeo = new THREE.BufferGeometry();
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: 0x0EA5E9,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const ambientParticles = new THREE.Points(ambientGeo, ambientMat);
    globeGroup.add(ambientParticles);

    // Initial orientation: Rotate globe to face Chennai towards viewer slightly angled
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.25;

    // Mouse Parallax Interaction
    let targetRotationX = 0.25;
    let targetRotationY = -1.2;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Slow majestic rotation
        globeGroup.rotation.y += delta * 0.12;

        // Smooth subtle mouse reaction
        targetRotationY += (mouseX * 0.4 - targetRotationY * 0.1) * delta;
        targetRotationX = 0.25 + mouseY * 0.25;
        globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;

        // Animate pulse ring at Chennai
        const pulseScale = 1 + (Math.sin(elapsedTime * 3) + 1) * 0.45;
        pulseRing.scale.set(pulseScale, pulseScale, pulseScale);
        pulseRingMat.opacity = Math.max(0, 0.85 - (pulseScale - 1) * 0.9);

        // Animate traveling healthcare data particles along connection arcs
        flightArcs.forEach((arc) => {
          for (let p = 0; p < arc.particleOffsets.length; p++) {
            arc.particleOffsets[p] = (arc.particleOffsets[p] + delta * 0.18) % 1;
            const pt = arc.curve.getPoint(arc.particleOffsets[p]);
            arc.particlePositions[p * 3] = pt.x;
            arc.particlePositions[p * 3 + 1] = pt.y;
            arc.particlePositions[p * 3 + 2] = pt.z;
          }
          arc.particles.geometry.attributes.position.needsUpdate = true;
        });

        // Ambient particles gentle drift
        ambientParticles.rotation.y += delta * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      innerAtmosphereGeo.dispose();
      innerAtmosphereMat.dispose();
      chennaiMarkerGeo.dispose();
      chennaiMarkerMat.dispose();
      pulseRingGeo.dispose();
      pulseRingMat.dispose();
      ambientGeo.dispose();
      ambientMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#1dbcb5]/12 via-transparent to-transparent pointer-events-none blur-3xl" />
      {/* Real-time coordinates HUD badge */}
      <div className="absolute bottom-6 left-6 md:left-8 px-4 py-2 rounded-xl bg-slate-950/70 border border-[#1dbcb5]/25 backdrop-blur-md text-[11px] font-mono tracking-wider text-[#1dbcb5] flex items-center gap-3 z-10 pointer-events-none font-display">
        <span className="w-2 h-2 rounded-full bg-[#1dbcb5] animate-pulse shadow-[0_0_8px_#1dbcb5]" />
        <span>CHENNAI CLINICAL GATEWAY [MAA] • 13.0827° N, 80.2707° E</span>
      </div>
    </div>
  );
};
