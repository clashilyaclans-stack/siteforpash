"use client";

import { Play, X } from "lucide-react";
import { useState } from "react";

export function VideoModal({ label, title, url }: { label: string; title: string; url: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="ghost-play" onClick={() => setOpen(true)} type="button">
        <Play size={18} />
        {label}
      </button>
      {open ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
          <div className="video-modal">
            <button className="modal-close" onClick={() => setOpen(false)} type="button" aria-label="Закрыть">
              <X size={22} />
            </button>
            {url ? (
              <video controls playsInline preload="metadata">
                <source src={url} type="video/mp4" />
              </video>
            ) : (
              <div className="video-placeholder">
                <Play size={44} />
                <span>Видео можно загрузить позже через Supabase</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
