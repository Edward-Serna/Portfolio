'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ResetZoomIcon() {
  return (
    <svg  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

const ZOOM_STEP = 0.4;
const ZOOM_MIN = 1;
const ZOOM_MAX = 5;

export default function Gallery({ items, index, onClose, onNav }) {
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const isOpen = index !== null && index !== undefined;
  const item = isOpen ? items[index] : null;
  const isVideo = item?.type === 'video';

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKey = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNav((index - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNav((index + 1) % items.length);
    },
    [isOpen, index, items.length, onClose, onNav]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
  const zoomOut = () => {
    setZoom((z) => {
      const next = Math.max(z - ZOOM_STEP, ZOOM_MIN);
      if (next === ZOOM_MIN) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    if (isVideo) return;
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  const onMouseDown = (e) => {
    if (zoom <= 1) return;
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy });
  };

  const onMouseUp = () => {
    dragRef.current.dragging = false;
  };

  const onTouchStart = (e) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    const t = e.touches[0];
    dragRef.current = {
      dragging: true,
      startX: t.clientX,
      startY: t.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };

  const onTouchMove = (e) => {
    if (!dragRef.current.dragging || e.touches.length !== 1) return;
    const t = e.touches[0];
    const dx = t.clientX - dragRef.current.startX;
    const dy = t.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy });
  };

  const onTouchEnd = () => {
    dragRef.current.dragging = false;
  };

  if (!isOpen) return null;

  const hasPrev = items.length > 1;
  const hasNext = items.length > 1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1050px',
          maxHeight: 'calc(100vh - 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          background: '#090b10',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.35)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 1.25rem',
            color: '#f7fafc',
            background: 'rgba(12, 16, 25, 0.95)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            <span style={{ fontSize: '0.9rem', opacity: 0.75 }}>
              {index + 1} / {items.length}
            </span>
            <strong style={{ fontSize: '1rem' }}>{item.caption}</strong>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', padding: '0.5rem', lineHeight: 0 }}
          >
            <CloseIcon />
          </button>
        </div>

        <div
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: '#080a10',
            cursor: zoom > 1 ? 'grab' : 'default',
          }}
          onWheel={handleWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {hasPrev && (
            <button
              onClick={() => onNav((index - 1 + items.length) % items.length)}
              aria-label="Previous"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <ChevronLeft />
            </button>
          )}

          {isVideo ? (
            <video
              ref={videoRef}
              key={item.src}
              src={item.src}
              style={{ height: '100%', maxWidth: '100%', maxHeight: '100%' }}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              ref={imgRef}
              key={item.src}
              src={item.src}
              alt={item.caption}
              draggable={false}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: dragRef.current.dragging ? 'none' : 'transform 0.15s ease',
                userSelect: 'none',
                pointerEvents: zoom > 1 ? 'all' : 'auto',
              }}
            />
          )}

          {hasNext && (
            <button
              onClick={() => onNav((index + 1) % items.length)}
              aria-label="Next"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <ChevronRight />
            </button>
          )}
        </div>

        {!isVideo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(12, 16, 25, 0.95)',
            }}
          >
            <button
              onClick={zoomOut}
              aria-label="Zoom out"
              disabled={zoom <= ZOOM_MIN}
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#fff',
                borderRadius: '999px',
                padding: '0.6rem',
                cursor: zoom <= ZOOM_MIN ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(5px)',
              }}
            >
              <ZoomOutIcon />
            </button>
            <button
              onClick={zoomIn}
              aria-label="Zoom in"
              disabled={zoom >= ZOOM_MAX}
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#fff',
                borderRadius: '999px',
                padding: '0.6rem',
                cursor: zoom >= ZOOM_MAX ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(5px)',
              }}
            >
              <ZoomInIcon />
            </button>
            <button
              onClick={resetZoom}
              aria-label="Reset zoom"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#fff',
                borderRadius: '999px',
                padding: '0.6rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(5px)',
              }}
            >
              <ResetZoomIcon />
            </button>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>{Math.round(zoom * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
