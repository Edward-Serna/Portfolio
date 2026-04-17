'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // --- Grid of nodes ---
    const COLS = 18, ROWS = 10;
    const SPACING = 3.2;
    const nodePositions = [];
    const nodeMeshes = [];
    const nodeGroup = new THREE.Group();

    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x009dff, transparent: true, opacity: 0.55 });

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * SPACING + (Math.random() - 0.5) * 0.8;
        const y = (r - ROWS / 2) * SPACING + (Math.random() - 0.5) * 0.8;
        const z = (Math.random() - 0.5) * 6;
        nodePositions.push(new THREE.Vector3(x, y, z));

        const geo = new THREE.CircleGeometry(0.06 + Math.random() * 0.06, 6);
        const mesh = new THREE.Mesh(geo, nodeMat.clone());
        mesh.position.set(x, y, z);
        mesh.userData.baseOpacity = 0.2 + Math.random() * 0.5;
        mesh.userData.pulseOffset = Math.random() * Math.PI * 2;
        mesh.material.opacity = mesh.userData.baseOpacity;
        nodeGroup.add(mesh);
        nodeMeshes.push(mesh);
      }
    }
    scene.add(nodeGroup);

    // --- Connect nearby nodes with lines ---
    //  #263b8f
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x263b8f, transparent: true, opacity: 0.18 });
    const edgeGroup = new THREE.Group();
    const MAX_DIST = 4.5;

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < MAX_DIST) {
          const geo = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]);
          const mat = edgeMat.clone();
          mat.opacity = 0.18 * (1 - dist / MAX_DIST);
          const line = new THREE.Line(geo, mat);
          edgeGroup.add(line);
        }
      }
    }
    scene.add(edgeGroup);

    // --- Traveling pulse dots along some edges ---
    const pulses = [];
    // #587299
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x587299, transparent: true, opacity: 0.9 });
    const pulseGeo = new THREE.CircleGeometry(0.1, 8);

    const edgeChildren = edgeGroup.children;
    const selectedEdges = edgeChildren.filter((_, i) => i % 7 === 0).slice(0, 30);
    for (const edge of selectedEdges) {
      const positions = edge.geometry.attributes.position;
      const a = new THREE.Vector3(positions.getX(0), positions.getY(0), positions.getZ(0));
      const b = new THREE.Vector3(positions.getX(1), positions.getY(1), positions.getZ(1));
      const dot = new THREE.Mesh(pulseGeo.clone(), pulseMat.clone());
      dot.userData = { a, b, t: Math.random(), speed: 0.003 + Math.random() * 0.00005, dir: Math.random() > 0.5 ? 1 : -1 };
      scene.add(dot);
      pulses.push(dot);
    }

    // --- Mouse parallax ---
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5);
      mouse.y = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Gentle parallax drift
      nodeGroup.rotation.y = mouse.x * 0.08;
      nodeGroup.rotation.x = -mouse.y * 0.05;
      edgeGroup.rotation.y = mouse.x * 0.08;
      edgeGroup.rotation.x = -mouse.y * 0.05;

      // Pulse node brightness
      for (const mesh of nodeMeshes) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.2 + mesh.userData.pulseOffset);
        mesh.material.opacity = mesh.userData.baseOpacity * (0.6 + 0.4 * pulse);
      }

      // Move pulse dots
      for (const dot of pulses) {
        dot.userData.t += dot.userData.speed * dot.userData.dir;
        if (dot.userData.t > 1) { dot.userData.t = 0; }
        if (dot.userData.t < 0) { dot.userData.t = 1; }
        dot.position.lerpVectors(dot.userData.a, dot.userData.b, dot.userData.t);
        dot.material.opacity = 0.3 + 0.4 * Math.sin(time * 3 + dot.userData.t * Math.PI);
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1
    }} />
  );
}
