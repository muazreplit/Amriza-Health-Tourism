import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJourneyOrbProps {
  activeStage: number; // 0, 1, 2, 3
  onSelectStage?: (stage: number) => void;
}

export const ThreeJourneyOrb: React.FC<ThreeJourneyOrbProps> = ({ activeStage, onSelectStage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(activeStage);
  activeStageRef.current = activeStage;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Transparent Core / Medical Sphere
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x1dbcb5,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner glow core
    const innerGeo = new THREE.SphereGeometry(3.6, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xccfbf1,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Four Cardinal Journey Nodes (Consult, Arrive, Treat, Recover)
    const stageNodesData = [
      { id: 0, title: 'CONSULT', pos: new THREE.Vector3(-4.8, 2.8, 1.8), color: '#1dbcb5' },
      { id: 1, title: 'ARRIVE', pos: new THREE.Vector3(4.8, 2.6, 1.2), color: '#26d1ca' },
      { id: 2, title: 'TREAT', pos: new THREE.Vector3(3.8, -3.2, 2.2), color: '#15a8a1' },
      { id: 3, title: 'RECOVER', pos: new THREE.Vector3(-4.2, -3.0, 1.6), color: '#1dbcb5' },
    ];

    interface NodeMesh {
      id: number;
      mesh: THREE.Mesh;
      ring: THREE.Mesh;
      light: THREE.PointLight;
    }

    const nodeMeshes: NodeMesh[] = [];

    stageNodesData.forEach((item) => {
      // Node sphere
      const sphereGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(item.color),
      });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeMesh.position.copy(item.pos);
      mainGroup.add(nodeMesh);

      // Node ring
      const ringGeo = new THREE.RingGeometry(0.7, 0.95, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x1dbcb5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(item.pos);
      ringMesh.lookAt(camera.position);
      mainGroup.add(ringMesh);

      // Point Light
      const pLight = new THREE.PointLight(0x1dbcb5, 1.5, 6);
      pLight.position.copy(item.pos);
      mainGroup.add(pLight);

      nodeMeshes.push({
        id: item.id,
        mesh: nodeMesh,
        ring: ringMesh,
        light: pLight,
      });
    });

    // 3. Connect Nodes in a Continuous Closed Orbital Circuit
    const nodePoints = stageNodesData.map((d) => d.pos);
    const curve = new THREE.CatmullRomCurve3([...nodePoints, nodePoints[0]], true);
    const curvePoints = curve.getPoints(80);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMat = new THREE.LineBasicMaterial({
      color: 0x1dbcb5,
      transparent: true,
      opacity: 0.45,
    });
    const circuitLine = new THREE.Line(curveGeo, curveMat);
    mainGroup.add(circuitLine);

    // 4. Circuit Traveling Particles
    const flowCount = 12;
    const flowPositions = new Float32Array(flowCount * 3);
    const flowOffsets = Array.from({ length: flowCount }, (_, i) => i / flowCount);
    const flowGeo = new THREE.BufferGeometry();
    flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
    const flowMat = new THREE.PointsMaterial({
      color: 0x1dbcb5,
      size: 0.35,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const flowParticles = new THREE.Points(flowGeo, flowMat);
    mainGroup.add(flowParticles);

    // Target Camera/Orb Euler Angles based on Stage
    const stageTargetRotations = [
      { x: 0.1, y: 0.2 },   // Stage 0: Consult
      { x: -0.1, y: -0.5 }, // Stage 1: Arrive
      { x: 0.2, y: -0.8 },  // Stage 2: Treat
      { x: -0.15, y: 0.7 }, // Stage 3: Recover
    ];

    let targetRotX = 0;
    let targetRotY = 0;

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const currentStage = activeStageRef.current;
      const target = stageTargetRotations[currentStage] || { x: 0, y: 0 };
      targetRotX = target.x;
      targetRotY = target.y;

      if (!prefersReducedMotion) {
        // Slow gentle base spin + smooth slerp to active stage
        mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.04 + delta * 0.05;
        mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.04;

        // Wireframe subtle pulsing
        coreMesh.rotation.y += delta * 0.08;
        coreMesh.rotation.z += delta * 0.03;

        // Node highlights
        nodeMeshes.forEach((node) => {
          const isActive = node.id === currentStage;
          const isDone = node.id < currentStage;

          if (isActive) {
            const scale = 1.35 + Math.sin(elapsed * 5) * 0.15;
            node.mesh.scale.set(scale, scale, scale);
            node.ring.scale.set(scale * 1.3, scale * 1.3, scale * 1.3);
            node.ring.lookAt(camera.position);
            (node.ring.material as THREE.MeshBasicMaterial).opacity = 0.85;
            node.light.intensity = 3.5;
          } else if (isDone) {
            node.mesh.scale.set(0.9, 0.9, 0.9);
            node.ring.scale.set(1.1, 1.1, 1.1);
            node.ring.lookAt(camera.position);
            (node.ring.material as THREE.MeshBasicMaterial).opacity = 0.45;
            node.light.intensity = 1.0;
          } else {
            node.mesh.scale.set(0.7, 0.7, 0.7);
            node.ring.scale.set(0.9, 0.9, 0.9);
            node.ring.lookAt(camera.position);
            (node.ring.material as THREE.MeshBasicMaterial).opacity = 0.2;
            node.light.intensity = 0.4;
          }
        });

        // Flow particles moving around the journey circuit
        for (let i = 0; i < flowCount; i++) {
          flowOffsets[i] = (flowOffsets[i] + delta * 0.12) % 1;
          const pt = curve.getPoint(flowOffsets[i]);
          flowPositions[i * 3] = pt.x;
          flowPositions[i * 3 + 1] = pt.y;
          flowPositions[i * 3 + 2] = pt.z;
        }
        flowParticles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      circuitLine.geometry.dispose();
      flowGeo.dispose();
      flowMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] md:h-[450px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full relative cursor-pointer" />
      {/* Interactive Phase Badges below canvas for direct interaction */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-white/95 border border-[#1dbcb5]/35 backdrop-blur-md z-10 shadow-md">
        {[
          { label: '01 Consult', id: 0 },
          { label: '02 Arrive', id: 1 },
          { label: '03 Treat', id: 2 },
          { label: '04 Recover', id: 3 },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectStage?.(item.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium font-body transition-all duration-300 ${
              activeStage === item.id
                ? 'bg-[#1dbcb5] text-slate-950 font-bold shadow-[0_2px_10px_#1dbcb5]'
                : 'text-slate-600 hover:text-[#0d7e79] hover:bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
