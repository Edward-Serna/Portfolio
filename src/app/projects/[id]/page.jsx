'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './project.module.css';
import { useEffect, useRef } from 'react';

const projectData = {
  'neural-network-msp430': {
    title: 'Deep Neural Network on MSP430FR5994',
    subtitle: 'Embedded Machine Learning Implementation',
    description: 'A complete 784-32-10 deep neural network implemented from scratch in C for handwritten digit recognition on the resource-constrained MSP430FR5994 microcontroller. This project demonstrates the feasibility of running machine learning inference on embedded systems with limited computational resources.',
    color: '#FF6B6B',
    tags: ['C', 'Embedded ML', 'MSP430FR5994', 'MNIST', 'Neural Networks'],
    challenge: 'Implementing a functional neural network on a microcontroller with only 8KB of RAM and 256KB of flash memory, while maintaining acceptable accuracy and inference speed.',
    solution: 'Developed custom matrix multiplication algorithms optimized for embedded systems, implemented efficient sigmoid activation functions, and carefully managed memory usage through strategic data structure design.',
    features: [
      '93% accuracy on MNIST handwritten digit recognition',
      'Complete forward propagation implementation in C',
      'Optimized matrix operations for embedded constraints',
      'Custom sigmoid activation function implementation',
      'Memory-efficient neural network architecture',
      'Real-time inference on 16MHz microcontroller'
    ],
    techDetails: [
      'Hand-crafted C implementation with no external ML libraries',
      'Fixed-point arithmetic for efficient computation',
      'Optimized memory layout to fit network weights in flash',
      'Custom activation functions tuned for embedded performance',
      'Achieved inference times suitable for real-time applications',
      'Comprehensive testing and validation on MNIST dataset'
    ],
    github: 'https://github.com/Edward-Serna',
    date: 'September 2024',
    images: []
  },
  
  'planterbox': {
    title: 'PlanterBox: Automated Hydroponic Monitoring System',
    subtitle: 'Full-Stack IoT Plant Care Platform',
    description: 'A comprehensive automated plant care system that integrates ESP32 microcontrollers with a modern Next.js web application and MongoDB NoSQL database. The system provides real-time monitoring of critical plant health metrics and automated control of dosing pumps for optimal growth conditions.',
    color: '#4ECDC4',
    tags: ['ESP32', 'Next.js', 'MongoDB', 'IoT', 'React', 'Vercel'],
    challenge: 'Creating a reliable, cloud-connected IoT system that can monitor multiple environmental parameters in real-time while providing automated control and a user-friendly interface accessible from anywhere.',
    solution: 'Built a three-tier architecture with ESP32 sensors for data collection, cloud-based MongoDB for data storage, and a responsive Next.js web application deployed on Vercel for monitoring and control.',
    features: [
      'Real-time sensor monitoring (pH, PPM, temperature, humidity)',
      'Automated dosing pump control for nutrient delivery',
      'Cloud-connected web interface for remote access',
      'Historical data visualization and trend analysis',
      'MongoDB NoSQL database for flexible data storage',
      'Responsive design for desktop and mobile devices'
    ],
    techDetails: [
      'ESP32 firmware with WiFi connectivity and MQTT protocol',
      'Next.js frontend with server-side rendering',
      'MongoDB database with time-series optimization',
      'Real-time data updates using WebSockets',
      'RESTful API for sensor data and pump control',
      'Deployed on Vercel with automatic HTTPS and CDN',
      'Recharts for data visualization and analytics'
    ],
    github: 'https://github.com/Edward-Serna/PlanterBox',
    demo: 'https://planterbox.edwardserna.dev',
    date: 'May 2024 - Present',
    images: []
  },

  'modifly': {
    title: 'ModiFly Drone Control Platform',
    subtitle: 'Modular Autonomous Flight System',
    description: 'A sophisticated modular C++ drone control software platform utilizing MAVLink protocols for autonomous flight research. The system integrates real-time visualization, controller node management, and seamless communication with ArduPilot flight controllers for advanced UAV applications.',
    color: '#FFE66D',
    tags: ['C++', 'MAVLink', 'ArduPilot', 'OpenGL', 'ImGui', 'SDL', 'CMake'],
    challenge: 'Developing a flexible, modular architecture that can handle complex drone control systems while maintaining real-time performance and providing intuitive visualization and control interfaces.',
    solution: 'Implemented a service-oriented architecture with MAVLink communication, integrated ImGui for UI, SDL for window management, and OpenGL for 3D visualization, all orchestrated through a sophisticated CMake build system.',
    features: [
      'Modular C++ architecture for flexible drone control',
      'MAVLink protocol integration for UAV communication',
      'Real-time 3D visualization using OpenGL',
      'Controller node management system',
      'Integration with ArduPilot autopilot',
      'Autonomous flight planning and execution',
      'Live telemetry display and logging'
    ],
    techDetails: [
      'Advanced C++ with STL and modern language features',
      'MAVLink v2.0 protocol implementation',
      'ImGui immediate-mode GUI for control interface',
      'SDL2 for cross-platform window and input management',
      'OpenGL shaders for 3D drone visualization',
      'Complex CMake build system with dependency management',
      'Service container architecture for modularity',
      'ArduPilot SITL integration for testing'
    ],
    github: 'https://github.com/Edward-Serna/ModiFly',
    date: 'June 2022 - Present',
    images: []
  },

  'cup-car': {
    title: 'Autonomous Cup Car with Vision Control',
    subtitle: 'Embedded Control Systems Competition Winner',
    description: 'A PID-controlled autonomous vehicle using the FRDM-KL25Z development board and line camera vision system. The project achieved the fastest track time in the Microcomputer Systems II class competition through optimized control algorithms and real-time path tracking.',
    color: '#A8DADC',
    tags: ['C', 'PID Control', 'FRDM-KL25Z', 'Computer Vision', 'Real-Time Systems'],
    challenge: 'Designing a control system that could reliably follow a track line at maximum speed while handling sharp turns and varying lighting conditions, all within the constraints of a resource-limited embedded platform.',
    solution: 'Implemented a tuned PID controller with adaptive parameters, integrated a line camera for path detection, and developed efficient real-time algorithms for autonomous navigation with sub-millisecond response times.',
    features: [
      '1st place finish - fastest track time in class',
      'PID controller with tuned parameters',
      'Line camera vision system for path tracking',
      'Real-time autonomous navigation algorithms',
      'Motor control with PWM for precise speed regulation',
      'Adaptive algorithm for handling different track conditions'
    ],
    techDetails: [
      'C programming on ARM Cortex-M0+ processor',
      'Custom PID implementation with anti-windup',
      'Linear camera array processing and filtering',
      'Real-time path detection algorithms',
      'PWM motor control with deadband compensation',
      'Interrupt-driven sensor reading for low latency',
      'Calibration routines for sensor normalization',
      'State machine for race start and stop detection'
    ],
    date: 'May 2025',
    award: '1st Place - Microcomputer Systems II Project',
    images: []
  },

  'music-glove': {
    title: 'Music Glove Controller',
    subtitle: 'Gesture-Based Music Interface',
    description: 'An innovative embedded systems project that won 3rd place in the Microcomputer Systems I competition. The music glove uses sensors to detect hand gestures and finger movements, translating them into musical notes and effects for an interactive performance interface.',
    color: '#F4A261',
    tags: ['C', 'MSP430', 'Sensors', 'Embedded Systems', 'ADC'],
    challenge: 'Creating a responsive and accurate gesture recognition system that could translate natural hand movements into musical output with minimal latency, all within the constraints of an embedded microcontroller.',
    solution: 'Integrated multiple sensors including accelerometers and flex sensors, implemented efficient ADC sampling routines, and developed gesture recognition algorithms optimized for real-time performance on the MSP430 platform.',
    features: [
      '3rd place award in class competition',
      'Multi-sensor integration (accelerometer, flex sensors)',
      'Real-time gesture recognition',
      'MIDI-compatible musical output',
      'Multiple gesture mappings for different sounds',
      'Low-latency response for performance use'
    ],
    techDetails: [
      'MSP430 microcontroller programming in C',
      'Analog-to-Digital Converter (ADC) for sensor reading',
      'Digital filtering for noise reduction',
      'Gesture classification algorithms',
      'UART communication for MIDI output',
      'Interrupt-driven sensor sampling',
      'Calibration and normalization routines',
      'Power management for battery operation'
    ],
    date: 'May 2023',
    award: '3rd Place - Microcomputer Systems I Project',
    images: []
  },

  'web-portfolio': {
    title: 'Interactive Web Portfolio',
    subtitle: 'Modern Full-Stack Portfolio with 3D Graphics',
    description: 'This portfolio website itself! A modern, interactive portfolio built with Next.js 15 and Three.js, featuring stunning 3D animations, responsive design, and dynamic project pages. Deployed on Vercel with automatic CI/CD and optimized for performance.',
    color: '#E76F51',
    tags: ['React', 'Next.js', 'Three.js', 'CSS', 'Vercel', 'JavaScript'],
    challenge: 'Creating a visually striking portfolio that stands out while maintaining fast load times, responsive design, and showcasing technical projects in an engaging way.',
    solution: 'Leveraged Next.js for optimal performance with server-side rendering, Three.js for eye-catching 3D animations, and modern CSS for a cyberpunk-inspired aesthetic that reflects technical expertise.',
    features: [
      'Interactive 3D tile animation with mouse interaction',
      'Dynamic project pages with routing',
      'Responsive design for all devices',
      'Cyberpunk-inspired visual design',
      'Smooth animations and transitions',
      'Deployed on Vercel with automatic deployment',
      'SEO optimized with Next.js metadata'
    ],
    techDetails: [
      'Next.js 15 with App Router',
      'Three.js for WebGL 3D graphics',
      'React 19 with hooks and functional components',
      'CSS Modules for scoped styling',
      'Custom fonts (Orbitron, Space Mono)',
      'Dynamic imports for code splitting',
      'Vercel deployment with edge network',
      'Performance optimization with Lighthouse scores'
    ],
    github: 'https://github.com/Edward-Serna/Portfolio',
    demo: 'https://edwardserna.dev',
    date: 'January 2026',
    images: []
  }
};

export default function ProjectPage() {
  const params = useParams();
  const canvasRef = useRef(null);
  const project = projectData[params.id];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = 400;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = project?.color || '#00ff88';
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = project?.color || '#00ff88';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [project]);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project Not Found</h1>
        <Link href="/">Return Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.projectPage} style={{ '--project-color': project.color }}>
      <canvas ref={canvasRef} className={styles.backgroundCanvas} />
      
      <nav className={styles.nav}>
        <Link href="/" className={styles.backButton}>
          ← Back to Portfolio
        </Link>
      </nav>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>
          {project.date && (
            <p className={styles.date}>{project.date}</p>
          )}
          {project.award && (
            <p className={styles.award}>🏆 {project.award}</p>
          )}
          <div className={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Overview</h2>
          <p className={styles.description}>{project.description}</p>
        </section>

        <section className={styles.section}>
          <h2>The Challenge</h2>
          <p>{project.challenge}</p>
        </section>

        <section className={styles.section}>
          <h2>The Solution</h2>
          <p>{project.solution}</p>
        </section>

        <section className={styles.section}>
          <h2>Key Features</h2>
          <ul className={styles.featureList}>
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Technical Details</h2>
          <ul className={styles.techList}>
            {project.techDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </section>

        <section className={styles.linksSection}>
          {project.github && (
            <a 
              href={project.github} 
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo →
            </a>
          )}
        </section>
      </main>
    </div>
  );
}