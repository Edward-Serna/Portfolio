'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    // #37393d
    scene.fog = new THREE.FogExp2(0x37393d, 0);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    camera.position.y = -50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lighting 
   // #ffffff;
    const ambientLight = new THREE.AmbientLight(0xffffff, 20);
    scene.add(ambientLight);
    // #000000, #ff0088, #000000
    const pointLight1 = new THREE.PointLight(0x000000, 20, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0088, 20, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x000000, 1.5, 100);
    pointLight3.position.set(0, 20, -20);
    scene.add(pointLight3);

    // Create floating tiles grid
    const tiles = [];
    const gridSize = 0;
    const spacing = 5;
    const tileGeometry = new THREE.BoxGeometry(3, 3, 0.5);
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const material = new THREE.MeshPhysicalMaterial({
          // #0d0d0d #1f1f1f
          color: 0x1f1f1f,
          metalness: 0.9,
          roughness: 0.1,
          envMapIntensity: 1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          emissive: new THREE.Color(0x000000),
          emissiveIntensity: 10
        });

        const tile = new THREE.Mesh(tileGeometry, material);
        
        // Position in grid
        tile.position.x = (i - gridSize / 2) * spacing;
        tile.position.y = (j - gridSize / 2) * spacing;
        tile.position.z = -30;
        
        // Store initial position and random properties
        tile.userData = {
          initialY: tile.position.y,
          initialX: tile.position.x,
          speed: 0.5 + Math.random() * 0.25,
          rotationSpeed: 0.001 + Math.random() * 0.002,
          amplitude: 2 + Math.random() * 3,
          phase: Math.random() * Math.PI * 2
        };

        tiles.push(tile);
        scene.add(tile);
      }
    }

    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      // #ffffff 
      color: 0xffffff ,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Animate tiles with wave effect
      tiles.forEach((tile, index) => {
        const userData = tile.userData;
        
        // Wave motion
        tile.position.y = userData.initialY + 
          Math.sin(time * userData.speed + userData.phase) * userData.amplitude;
        
        tile.position.z = -30 + 
          Math.cos(time * userData.speed + userData.phase) * 2;

        // Rotation
        tile.rotation.x += userData.rotationSpeed;
        tile.rotation.y += userData.rotationSpeed * 0.5;

        // Mouse interaction
        const distanceX = tile.position.x - mouse.x * 30;
        const distanceY = tile.position.y - mouse.y * 30;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 0) {
          const force = (20 - distance) / 20;
          tile.position.x += (mouse.x * 30 - tile.position.x) * force * 0.1;
          tile.position.y += (mouse.y * 30 - tile.position.y) * force * 0.1;
          
          // Change color on hover
          tile.material.emissiveIntensity = 0.3 * force;
        } else {
          // Return to original position
          tile.position.x += (userData.initialX - tile.position.x) * 0.05;
        }
      });

      // Rotate particles
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.5) * 30;
      pointLight1.position.z = Math.cos(time * 0.5) * 30;
      
      pointLight2.position.x = Math.cos(time * 0.7) * 30;
      pointLight2.position.y = Math.sin(time * 0.7) * 30;

      // Camera gentle movement
      camera.position.x = mouse.x * 5;
      camera.position.y = 10 + mouse.y * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      tiles.forEach(tile => {
        tile.geometry.dispose();
        tile.material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
}