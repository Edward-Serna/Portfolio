'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import { mediaItems } from './resources/Media';
import { projects } from './resources/Projects.js';
import { useState, useEffect } from 'react';

const ThreeHero = dynamic(() => import('@/components/ThreeHero'), {
  loading: () => <></>,
});

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
  const [activeMediaItem, setActiveMediaItem] = useState(null);
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
          <h2 className={styles.sectionTitle}>Photos & Videos</h2>
          <Gallery items={mediaItems} index={activeMediaItem} onClose={() => setActiveMediaItem(null)} onNav={(newIndex) => setActiveMediaItem(newIndex)} />
          <div className={styles.galleryGrid}>
            {mediaItems.map((item, i) => (
              <div
                key={i}
                className={styles.galleryItem}
                role="button"
                tabIndex={0}
                onClick={() => setActiveMediaItem(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveMediaItem(i);
                }}
              >
                {item.src ? (
                  item.type === 'video' ? (
                    <video src={item.src} muted playsInline />
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
