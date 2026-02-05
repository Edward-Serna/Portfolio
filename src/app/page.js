'use client';

import dynamic from 'next/dynamic';
import styles from "./page.module.css";
import Link from 'next/link';

// Dynamic import for Three.js component to avoid SSR issues
const ThreeHero = dynamic(() => import('@/components/ThreeHero'), { 
  ssr: false,
  loading: () => <></>
});

export default function Home() {
  const projects = [
    {
      id: 'neural-network-msp430',
      title: 'Deep Neural Network on MSP430',
      description: '784-32-10 neural network implemented from scratch in C for handwritten digit recognition on embedded microcontroller',
      tags: ['C', 'Embedded ML', 'MSP430', 'MNIST'],
      color: '#FF6B6B'
    },
    {
      id: 'planterbox',
      title: 'PlanterBox: Automated Hydroponic System',
      description: 'Full-stack IoT system with ESP32, Next.js, and MongoDB for real-time plant monitoring and automated control',
      tags: ['ESP32', 'Next.js', 'MongoDB', 'IoT'],
      color: '#4ECDC4'
    },
    {
      id: 'modifly',
      title: 'ModiFly Drone Control Platform',
      description: 'Modular C++ drone control software using MAVLink protocols with real-time visualization and autonomous flight',
      tags: ['C++', 'MAVLink', 'OpenGL', 'ArduPilot'],
      color: '#FFE66D'
    },
    {
      id: 'cup-car',
      title: 'Autonomous Cup Car',
      description: 'PID-controlled autonomous vehicle with line camera vision system achieving fastest track time in class',
      tags: ['C', 'PID Control', 'FRDM-KL25Z', 'Computer Vision'],
      color: '#A8DADC'
    },
    {
      id: 'music-glove',
      title: 'Music Glove Controller',
      description: '3rd place winning embedded systems project for gesture-based music control interface',
      tags: ['C', 'MSP430', 'Sensors', 'Embedded Systems'],
      color: '#F4A261'
    },
    {
      id: 'web-portfolio',
      title: 'Interactive Web Portfolio',
      description: 'This portfolio! Built with Next.js, Three.js for 3D graphics, and deployed on Vercel',
      tags: ['React', 'Next.js', 'Three.js', 'CSS'],
      color: '#E76F51'
    }
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ThreeHero />
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.name}>Edward Serna</h1>
            <p className={styles.tagline}>
              Computer Engineering Graduate • Embedded Systems • Full-Stack Developer
            </p>
            <div className={styles.heroCtas}>
              <Link href="#projects" className={styles.primaryBtn}>
                View Projects
              </Link>
              <a 
                href="/Edward_Serna_Resume.pdf" 
                className={styles.secondaryBtn}
                download="Edward_Serna_Resume.pdf"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              Computer Engineering graduate from UTSA with hands-on experience in machine learning, 
              embedded systems development, and full-stack web applications. Passionate about applying 
              deep learning techniques to automated decision support systems and developing intelligent 
              solutions that integrate software and hardware. Previously worked as a Research Assistant 
              in the Unmanned Systems Lab on our Modifly drone systems.
            </p>
            <div className={styles.skills}>
              <div className={styles.skillCategory}>
                <h3>Programming Languages</h3>
                <div className={styles.skillTags}>
                  <span>Python</span>
                  <span>C/C++</span>
                  <span>JavaScript</span>
                  <span>Verilog HDL</span>
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3>Web Development</h3>
                <div className={styles.skillTags}>
                  <span>React.js</span>
                  <span>Next.js</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>HTML/CSS</span>
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3>Embedded Systems</h3>
                <div className={styles.skillTags}>
                  <span>ESP32</span>
                  <span>MSP430</span>
                  <span>FRDM-KL25Z</span>
                  <span>PIC16F1829</span>
                  <span>MAVLink</span>
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3>Development Tools</h3>
                <div className={styles.skillTags}>
                  <span>Git</span>
                  <span>Linux/WSL</span>
                  <span>VS Code</span>
                  <span>CLion</span>
                  <span>MPLAB X</span>
                  <span>SolidWorks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <Link 
                href={`/projects/${project.id}`} 
                key={project.id}
                className={styles.projectCard}
                style={{
                  '--project-color': project.color,
                  '--delay': `${index * 0.1}s`
                }}
              >
                <div className={styles.projectNumber}>0{index + 1}</div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.projectArrow}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.contactText}>
            I'm always open to discussing new projects, research opportunities, or collaborations.
          </p>
          <a 
            href="mailto:sernaedward1@gmail.com" 
            className={styles.contactBtn}
          >
            sernaedward1@gmail.com
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a
            href="https://github.com/Edward-Serna"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/edward-serna-5b9347253/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            href="/Edward_Serna_Resume.pdf" 
            download="Edward_Serna_Resume.pdf"
          >
            Resume
          </a>
        </div>
        <p className={styles.copyright}>© 2026 Edward Serna. Built with Next.js & Three.js</p>
      </footer>
    </div>
  );
}