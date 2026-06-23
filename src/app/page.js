'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const ThreeHero = dynamic(() => import('@/components/ThreeHero'), {
  loading: () => <></>,
});

const projects = [
  {
    id: 'neural-network-msp430',
    title: 'Deep Neural Network on MSP430',
    description: '784-32-10 neural network implemented from scratch in C for handwritten digit recognition on a resource-constrained embedded microcontroller.',
    tags: ['C', 'Embedded ML', 'MSP430', 'MNIST'],
    color: '#FF6B6B',
    github: 'https://github.com/Edward-Serna',
    star: {
      situation: 'Needed to demonstrate feasibility of running neural network inference on a microcontroller with only 8 KB of RAM and no FPU — hardware that would typically be considered far too constrained for any ML workload.',
      task: 'Design, implement, and validate a full forward-pass neural network in bare-metal C targeting the MSP430FR5994, fitting weights in flash and activations in SRAM with no external libraries.',
      action: 'Built custom fixed-point matrix multiplication routines, implemented a Q15 sigmoid approximation, structured weight storage in flash using linker sections, and validated inference output via UART against a Python reference implementation.',
      result: 'Achieved 93% accuracy on a held-out MNIST test set with sub-100ms inference time at 16 MHz, proving embedded ML feasibility on severely constrained hardware.',
    },
  },
  {
    id: 'planterbox',
    title: 'PlanterBox',
    description: 'Full-stack IoT hydroponic system with ESP32, Next.js, and MongoDB for real-time plant monitoring and automated nutrient dosing.',
    tags: ['ESP32', 'Next.js', 'MongoDB', 'IoT'],
    color: '#4ECDC4',
    github: 'https://github.com/Edward-Serna/PlanterBox',
    demo: 'https://planterbox.edwardserna.dev',
    star: {
      situation: 'Hydroponic systems require precise control of pH, nutrient concentration, and lighting — manual monitoring is error-prone and time-consuming, leading to plant loss.',
      task: 'Build an end-to-end automated monitoring and control system that could run 24/7 unattended, surfacing live sensor data through a web dashboard and triggering dosing pumps automatically.',
      action: 'Wrote ESP32 firmware in C++ to poll DHT, pH, PPM, and ultrasonic sensors over a state-machine-driven control loop. Built a Next.js dashboard with MongoDB time-series storage, REST API, and Google OAuth. Deployed on Vercel with automated HTTPS.',
      result: 'System ran continuously for 6+ weeks with automated nutrient dosing maintaining target pH within ±0.2, accessible remotely from any device.',
    },
  },
  {
    id: 'modifly',
    title: 'ModiFly Drone Platform',
    description: 'Modular C++ drone control software using MAVLink protocols with real-time OpenGL visualization and autonomous flight planning.',
    tags: ['C++', 'MAVLink', 'OpenGL', 'ArduPilot'],
    color: '#FFE66D',
    github: 'https://github.com/Edward-Serna/ModiFly',
    star: {
      situation: 'The UTSA Unmanned Systems Lab needed a flexible, extensible ground control platform for drone research that wasn\'t locked to a single autopilot or UI paradigm.',
      task: 'Architect and build a production-grade C++ application capable of managing MAVLink telemetry, launching SITL simulations, and visualizing drone state in real time — extensible by future researchers.',
      action: 'Designed a service-container architecture with dynamic node registration, integrated MAVLink v2 for bidirectional communication with ArduPilot, built an ImGui node editor for visual connection management, and wrote an OpenGL 3D viewer with orbit camera controls using GLM.',
      result: 'Delivered a platform used as the primary research tool in the lab for 3+ years, with SITL integration enabling safe autonomous flight testing without physical hardware.',
    },
  },
  {
    id: 'cup-car',
    title: 'Autonomous Cup Car',
    description: 'PID-controlled autonomous vehicle with line camera vision system — fastest track time in class competition.',
    tags: ['C', 'PID Control', 'FRDM-KL25Z', 'Computer Vision'],
    color: '#A8DADC',
    star: {
      situation: 'Class competition required an autonomous vehicle to navigate a track at maximum speed using only a line camera — no GPS, no IMU, just raw image data and a microcontroller.',
      task: 'Implement a real-time control system that could process camera data, compute steering corrections via PID, and modulate motor speed — all within the interrupt budget of an ARM Cortex-M0+ running at 48 MHz.',
      action: 'Wrote interrupt-driven camera line detection with a centroid-tracking algorithm, tuned PID constants empirically using UART logging, implemented PWM motor control with deadband compensation, and added a state machine for race-start detection.',
      result: 'Achieved the fastest lap time in the Microcomputer Systems II class — 1st place finish.',
    },
  },
  {
    id: 'music-glove',
    title: 'Music Glove Controller',
    description: 'Gesture-based MIDI interface using flex sensors and accelerometers on MSP430 — 3rd place in class showcase.',
    tags: ['C', 'MSP430', 'Sensors', 'ADC'],
    color: '#F4A261',
    star: {
      situation: 'Microcomputer Systems I final project required building a creative embedded application demonstrating ADC, interrupts, and UART on the MSP430 platform.',
      task: 'Design a wearable that translates hand gestures into musical output with low enough latency to be usable as a live performance instrument.',
      action: 'Integrated flex sensors and an accelerometer through the MSP430 ADC, applied a moving-average filter to reduce noise, mapped gesture thresholds to MIDI note values, and output MIDI bytes over UART to a synthesizer.',
      result: 'Awarded 3rd place in the Microcomputer Systems I class project showcase out of 30+ submissions.',
    },
  },
  {
    id: 'web-portfolio',
    title: 'This Portfolio',
    description: 'Built with Next.js 15, Three.js, and deployed on Vercel with custom animations and dynamic project routing.',
    tags: ['React', 'Next.js', 'Three.js', 'CSS'],
    color: '#E76F51',
    github: 'https://github.com/Edward-Serna/Portfolio',
    demo: 'https://edwardserna.dev',
    star: {
      situation: 'Needed a portfolio that could stand out to embedded and systems engineering recruiters while also demonstrating frontend capability — avoiding the generic template look.',
      task: 'Design and build a performant, visually distinctive portfolio from scratch using modern web tools, with a custom 3D background and dynamic project pages.',
      action: 'Built on Next.js 15 App Router with Three.js for a PCB-netlist-inspired WebGL background, implemented light/dark theming via CSS custom properties and React context, and created a STAR-method project modal system.',
      result: 'Deployed to edwardserna.dev with Vercel analytics, Lighthouse performance score above 90, and a design that reflects both technical depth and visual craft.',
    },
  },
];

const galleryItems = [
  // { type: 'video', src: '', caption: '', label: 'video' },
  { type: 'video', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/Tilt_Table.mp4', caption: 'Tilt Table', label: 'video' },
  { type: 'video', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/Drone_Flight_Outdoor.mp4', caption: 'Outdoor Test Flight', label: 'video' },
  { type: 'video', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/Music_Glove.mp4', caption: 'Music Glove', label: 'video' },
  { type: 'video', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/Drone_Flight_Indoor.mp4', caption: 'Indoor Test Flight', label: 'video' }, 
  { type: 'video', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/Cup_Car_Race.mp4', caption: 'Cup Car Race', label: 'video' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/senior_design_show.jpg', caption: 'Senior Design Showcase', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/senior_design_planterbox.jpg', caption: 'Automatic Plantcare System - Hydroponic Plants', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/planterbox_circuit.jpg', caption: 'Senior Design - Planterbox Circuit Test', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/planterbox_3d_print.jpg', caption: 'Senior Design - 3D Printed Planterbox', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/senior_design_drone.jpg', caption: 'Modifly Design Team', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/lab_circuit_2.jpg', caption: 'Circuit Design', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/lab_circuit_1.jpg', caption: 'Signal Analysis', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/high_low_pass_filter.jpg', caption: 'High & Low Pass Filter', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/embedded_system.jpg', caption: 'Embedded Systems', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/microcomputers_ii.jpg', caption: 'Microcomputers II', label: 'jpg' },

  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/microcomputers_i.jpg', caption: 'Microcomputers I', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/nsin_accelerator.jpg', caption: 'The National Security Innovation Network (NSIN) Accelerator Program', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_test_2.jpg?', caption: 'Flight Test 2', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_test_1.jpg', caption: 'Flight Test 1', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_laptop.jpg', caption: 'Laptop - Cockpit (Drone Pilot)', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_gateway.jpg', caption: 'Drone Gateway', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_3d_print.jpg', caption: 'Drone 3D Print Version 2', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/bse_2.jpg', caption: 'UTSA Main Campus', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_cage.jpg', caption: 'Outdoor Drone Cage - UTSA', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_flight_controller.jpg', caption: 'Version 1.0 Flight Controller', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/drone_1.jpg', caption: 'Drone Prototype Version 1.0', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/bes_1.jpg', caption: 'Biotechnology Science and Engineering Building - UTSA', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/custom_pc.jpg', caption: 'Custom Gaming PC Build', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/Micro1_Award.jpg', caption: 'Microcomputer Systems I Award - 3rd Place', label: 'jpg' },
  { type: 'jpeg', src: 'https://mrdlq3zu4lbpp4p1.public.blob.vercel-storage.com/Micro2_Award.jpg', caption: 'Microcomputer Systems II Award - 1st Place', label: 'jpg' }
];

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const starLabels = {
    situation: 'Situation',
    task: 'Task',
    action: 'Action',
    result: 'Result',
  };

  return (
    <div className={styles.modalBackdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={project.title}>

        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', flex: 1 }}>
            <div className={styles.modalAccent} style={{ background: project.color }} />
            <div className={styles.modalMeta}>
              <span className={styles.modalEyebrow}>Project Overview</span>
              <h2 className={styles.modalTitle}>{project.title}</h2>
            </div>
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalTags}>
            {project.tags.map((t) => (
              <span key={t} className={styles.modalTag}>{t}</span>
            ))}
          </div>

          <div className={styles.starSection}>
            {Object.entries(project.star).map(([key, value]) => (
              <div key={key} className={styles.starItem}>
                <span className={styles.starLabel}>{starLabels[key]}</span>
                <p className={styles.starText}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Link href={`/projects/${project.id}`} className={styles.modalBtn}>
            Full Case Study →
          </Link>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}>
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);

  const pillars = [
    { icon: '◈', title: 'Embedded Systems', body: 'Register-level firmware, real-time control loops, and bare-metal C/C++ across MSP430, ESP32, ARM Cortex-M, and custom PCBs.' },
    { icon: '◇', title: 'Machine Learning', body: 'On-device inference from scratch — fixed-point arithmetic, STFT feature extraction, and neural networks on microcontrollers with kilobytes of RAM.' },
    { icon: '◉', title: 'Full-Stack & Systems', body: 'End-to-end applications from ESP32 firmware to Next.js dashboards, with real-time data pipelines, REST APIs, and cloud deployment.' },
  ];

  const stats = [
    { value: '3.5 yrs', label: 'Research Experience' },
    { value: '6+', label: 'Projects Shipped' },
  ];

  const experience = [
    {
      role: 'Undergraduate Research Assistant',
      org: 'UTSA Unmanned Systems Lab',
      period: 'Jun 2022 — Dec 2025',
      points: [
        'Led development of the ModiFly autonomous drone platform using C++, MAVLink, and ArduPilot over 3.5 years',
        'Built modular node-based architecture with ImGui visualization and real-time SITL simulation support',
        'Integrated OpenGL 3D viewer with orbit camera controls and live telemetry rendering',
      ],
    },
    {
      role: 'B.S. Computer Engineering',
      org: 'University of Texas at San Antonio',
      period: 'Dec 2025',
      points: [
        'VLSI design flow — Cadence Innovus, static timing analysis, CMOS transistor sizing',
        'Embedded systems coursework — MSP430 register-level GPIO, UART, interrupts, and IEEE 754 arithmetic',
        'Completed capstone-level projects in embedded ML, autonomous vehicles, and IoT systems',
      ],
    },
  ];

  return (
    <div className={styles.page}>
      <Navbar />

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <section className={styles.hero}>
        <ThreeHero />
        <div className={styles.heroInner}>
          <div className={styles.heroPhoto}>
            <div className={styles.photoFrame}>
              <img src="/Personal-Headshot.png" alt="Edward Serna" className={styles.photo} />
              <div className={styles.photoAccentV} />
              <div className={styles.photoAccentH} />
            </div>
          </div>
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>Computer Engineering · UTSA · Class of 2025</p>
            <h1 className={styles.heroName}>Edward Serna</h1>
            <p className={styles.heroSub}>
              Embedded systems engineer with a research background in autonomous drones,
              on-device machine learning, and full-stack IoT development.
            </p>
            <div className={styles.heroStats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statPill}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.heroCtas}>
              <Link href="#projects" className={styles.primaryBtn}>View Projects</Link>
              <a href="/Edward_Serna_Resume.pdf" download className={styles.secondaryBtn}>Download Resume</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div className={styles.pillarsGrid}>
            {pillars.map((p) => (
              <div key={p.title} className={styles.pillarCard}>
                <span className={styles.pillarIcon}>{p.icon}</span>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.container}>
          <p className={styles.sectionEyebrow}>About</p>
          <h2 className={styles.sectionTitle}>Background</h2>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLeft}>
              <p className={styles.aboutText}>
                I'm a Computer Engineering graduate from UTSA where I spent 3.5 years as a research
                assistant in the Unmanned Systems Lab building the ModiFly drone platform.
                My work lives at the intersection of hardware and software, writing firmware that
                talks to real sensors, designing systems that make decisions in real time, and
                building the tooling that makes complex systems observable and controllable.
              </p>
              <p className={styles.aboutText}>
                Outside of embedded work I enjoy building full-stack applications that close the loop
                between hardware data and human interfaces. I'm currently seeking full-time roles in
                embedded firmware, hardware-software integration, or systems engineering.
              </p>
            </div>
            <div className={styles.aboutRight}>
              <div className={styles.skillsBlock}>
                {[
                  { label: 'Languages', items: ['C/C++', 'Python', 'JavaScript', 'HTML', 'CSS' ,'Verilog HDL', 'LUA'] },
                  { label: 'Embedded', items: ['MSP430', 'ESP32', 'ARM Cortex-M', 'MAVLink', 'ArduPilot', 'STM32', 'Arduino'] },
                  { label: 'Web & Cloud', items: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Vercel'] },
                  { label: 'Tools', items: [ 'VS Code / VS Community','Git', 'CMake', 'CLion', 'Linux', 'Cadence Innovus'] },
                ].map((cat) => (
                  <div key={cat.label} className={styles.skillRow}>
                    <span className={styles.skillLabel}>{cat.label}</span>
                    <div className={styles.skillItems}>
                      {cat.items.map((item) => (
                        <span key={item} className={styles.skillChip}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.experience} id="experience">
        <div className={styles.container}>
          <p className={styles.sectionEyebrow}>Experience</p>
          <h2 className={styles.sectionTitle}>Professional Foundations</h2>
          <div className={styles.timeline}>
            {experience.map((e, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <div>
                      <h3 className={styles.timelineRole}>{e.role}</h3>
                      <p className={styles.timelineOrg}>{e.org}</p>
                    </div>
                    <span className={styles.timelinePeriod}>{e.period}</span>
                  </div>
                  <ul className={styles.timelinePoints}>
                    {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.container}>
          <p className={styles.sectionEyebrow}>Work</p>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={styles.projectCard}
                style={{ '--project-color': project.color, '--delay': `${index * 0.08}s` }}
                onClick={() => setActiveProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProject(project); }}
              >
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.projectArrow}>→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery} id="gallery">
        <div className={styles.container}>
          <p className={styles.sectionEyebrow}>Gallery</p>
          <h2 className={styles.sectionTitle}>Photos & Videoxs</h2>
          <div className={styles.galleryGrid}>
            {galleryItems.map((item, i) => (
              <div key={i} className={styles.galleryItem}>
                {item.src ? (
                  item.type === 'video' ? (
                    <video src={item.src} alt={item.caption} />
                  ) : (
                    <img src={item.src} alt={item.caption} />
                  )
                ) : (
                  <div className={styles.galleryPlaceholder}>
                    <span>{item.type === 'video' ? '▶' : '◻'}</span>
                    <span>{item.label}</span>
                  </div>
                )}
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryCaption}>{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className={styles.container}>
          {/* <p className={styles.sectionEyebrow}>Contact</p> */}
          <h2 className={styles.contactTitle}>Contact</h2>
          <p className={styles.contactText}>
            Open to full-time roles in embedded firmware, hardware-software integration, and systems engineering.
          </p>
          <a href="mailto:sernaedward1@gmail.com" className={styles.contactBtn}>
            sernaedward1@gmail.com
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="https://github.com/Edward-Serna" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/edward-serna-5b9347253/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://edwardserna.dev" target="_blank" rel="noopener noreferrer">edwardserna.dev</a>
          <a href="/Edward_Serna_Resume.pdf" download>Resume</a>
        </div>
        <p className={styles.copyright}>© 2025–2026 Edward Serna. All rights reserved.</p>
      </footer>
    </div>
  );
}
