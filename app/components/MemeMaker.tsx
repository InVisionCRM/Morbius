/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import type { Meme } from "@/types/memes";

type TextLayer = {
  id: string;
  content: string;
  color: string;
  size: number;
  x: number;
  y: number;
};

type EmojiLayer = {
  id: string;
  emoji: string;
  size: number;
  x: number;
  y: number;
};

const DEFAULT_WIDTH = 640;
const HANDLE_SIZE = 18;

export default function MemeMaker() {
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_WIDTH,
  });
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number }>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_WIDTH,
  });
  const [texts, setTexts] = useState<TextLayer[]>([]);
  const [emojis, setEmojis] = useState<EmojiLayer[]>([]);
  const [activeText, setActiveText] = useState<string | null>(null);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [generatedDataUrl, setGeneratedDataUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lastUploadedMeme, setLastUploadedMeme] = useState<Meme | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingId = useRef<string | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const resetDragState = () => {
    draggingId.current = null;
    setDragType(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setBaseImage(result);
        setGeneratedDataUrl(null);
        setTexts([]);
        setEmojis([]);
      }
    };
    reader.readAsDataURL(file);
  };

  const [dragType, setDragType] = useState<"text" | "emoji" | null>(null);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (event.buttons === 0) {
        resetDragState();
        return;
      }
      if (!draggingId.current) return;
      event.preventDefault();
      const { clientX, clientY } = event;
      if (dragType === "text") {
        setTexts((prev) =>
          prev.map((layer) =>
            layer.id === draggingId.current
              ? {
                  ...layer,
                  x: clientX - dragOffset.current.x,
                  y: clientY - dragOffset.current.y,
                }
              : layer
          )
        );
      } else if (dragType === "emoji") {
        setEmojis((prev) =>
          prev.map((layer) =>
            layer.id === draggingId.current
              ? {
                  ...layer,
                  x: clientX - dragOffset.current.x,
                  y: clientY - dragOffset.current.y,
                }
              : layer
          )
        );
      }
    }

    function handlePointerUp() {
      resetDragState();
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragType]);

  const addTextLayer = () => {
    const id = crypto.randomUUID();
    setTexts((prev) => [
      ...prev,
      {
        id,
        content: "New text",
        color: "#ffffff",
        size: 32,
        x: 40,
        y: 40 + prev.length * 40,
      },
    ]);
    setActiveText(id);
  };

  const updateTextLayer = useCallback((id: string, updates: Partial<TextLayer>) => {
    setTexts((prev) => prev.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)));
  }, []);

  const removeTextLayer = (id: string) => {
    setTexts((prev) => prev.filter((layer) => layer.id !== id));
    if (activeText === id) {
      setActiveText(null);
    }
  };

  const addEmojiLayer = (emoji: string) => {
    const id = crypto.randomUUID();
    setEmojis((prev) => [
      ...prev,
      {
        id,
        emoji,
        size: 48,
        x: 40,
        y: 40 + prev.length * 60,
      },
    ]);
    setActiveEmoji(id);
    setShowEmojiPicker(false);
  };

  const updateEmojiLayer = (id: string, updates: Partial<EmojiLayer>) => {
    setEmojis((prev) => prev.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)));
  };

  const removeEmojiLayer = (id: string) => {
    setEmojis((prev) => prev.filter((layer) => layer.id !== id));
    if (activeEmoji === id) {
      setActiveEmoji(null);
    }
  };

  const handleTextPointerDown = (event: React.PointerEvent<HTMLDivElement>, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    const layer = texts.find((t) => t.id === id);
    if (!layer) return;
    setActiveText(id);
    setDragType("text");
    draggingId.current = id;
    dragOffset.current = {
      x: event.clientX - layer.x,
      y: event.clientY - layer.y,
    };
  };

  const handleEmojiPointerDown = (event: React.PointerEvent<HTMLDivElement>, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    const layer = emojis.find((e) => e.id === id);
    if (!layer) return;
    setActiveEmoji(id);
    setDragType("emoji");
    draggingId.current = id;
    dragOffset.current = {
      x: event.clientX - layer.x,
      y: event.clientY - layer.y,
    };
  };

  const setImageMetrics = () => {
    const img = imgRef.current;
    if (!img) return;
    // Get container width (parent of the image)
    const container = img.closest('.relative');
    const containerWidth = container ? container.clientWidth : 900;
    const maxWidth = Math.min(900, containerWidth || 900);
    const ratio = img.naturalWidth > maxWidth ? maxWidth / img.naturalWidth : 1;
    setImageDimensions({
      width: Math.round(img.naturalWidth * ratio),
      height: Math.round(img.naturalHeight * ratio),
    });
    setNaturalDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  const renderMeme = useCallback(async () => {
    if (!baseImage || !imgRef.current) {
      throw new Error("Please upload an image first.");
    }

    const canvas = document.createElement("canvas");
    const naturalWidth = naturalDimensions.width || imageDimensions.width;
    const naturalHeight = naturalDimensions.height || imageDimensions.height;
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to prepare canvas");
    }

    const scaleFactor = naturalWidth / imageDimensions.width;
    const imageElement = new Image();
    imageElement.src = baseImage;
    await new Promise((resolve) => {
      imageElement.onload = resolve;
    });
    ctx.drawImage(imageElement, 0, 0, naturalWidth, naturalHeight);

    texts.forEach((layer) => {
      ctx.font = `${layer.size * scaleFactor}px Impact, Helvetica, Arial, sans-serif`;
      ctx.fillStyle = layer.color;
      ctx.textBaseline = "top";
      ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(4, (layer.size * scaleFactor) / 8);
      ctx.strokeStyle = "rgba(0,0,0,0.8)";
      const x = layer.x * scaleFactor;
      const y = layer.y * scaleFactor;
      ctx.strokeText(layer.content, x, y);
      ctx.fillText(layer.content, x, y);
    });

    // Render emojis
    emojis.forEach((layer) => {
      ctx.font = `${layer.size * scaleFactor}px Arial`;
      const x = layer.x * scaleFactor;
      const y = layer.y * scaleFactor;
      ctx.fillText(layer.emoji, x, y);
    });

    return canvas.toDataURL("image/png");
  }, [baseImage, imageDimensions.width, imageDimensions.height, naturalDimensions.width, naturalDimensions.height, texts, emojis]);

  const handleDownload = async () => {
    try {
      const dataUrl = await renderMeme();
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `meme-${Date.now()}.png`;
      link.click();
      setGeneratedDataUrl(dataUrl);
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      setUploadError(null);
      setLastUploadedMeme(null);
      const dataUrl = generatedDataUrl || (await renderMeme());
      setGeneratedDataUrl(dataUrl);

      const response = await fetch("/api/memes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: dataUrl,
          title: title.trim() || undefined,
          creatorName: creatorName.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to upload meme");
      }

      const data = (await response.json()) as { meme: Meme };
      setLastUploadedMeme(data.meme);
    } catch (error) {
      console.error(error);
      setUploadError((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const canGenerate = Boolean(baseImage && (texts.length > 0 || emojis.length > 0));
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(["image", "text-layers"]));

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const Accordion = ({
    id,
    title,
    children,
    defaultOpen = false,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const isOpen = openAccordions.has(id);

    return (
      <div className={`rounded-xl border border-white/10 bg-black/40 ${isOpen ? "overflow-visible" : "overflow-hidden"}`}>
        <button
          type="button"
          onClick={() => toggleAccordion(id)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
        >
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={`transition-all duration-200 ease-out ${
            isOpen ? "max-h-[2000px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pb-4 space-y-3">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Background with logo and overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/MobiusLogoClean.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 space-y-6">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-widest text-purple-400">Meme Studio</p>
          <h1 className="text-4xl md:text-5xl font-black">Morbius Meme Generator</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Upload an image, drop as many captions as you like, move them around, and share your creation to the Wall
            of Memes.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {/* Left Panel - Live Preview */}
          <div className="flex flex-col">
            <div className="sticky top-4">
              <div ref={containerRef} className="relative bg-black/60 backdrop-blur-sm overflow-hidden w-full">
                {baseImage ? (
                  <div className="relative w-full">
                    <div
                      className="relative"
                      style={{
                        width: "100%",
                        aspectRatio: imageDimensions.width > 0 && imageDimensions.height > 0 ? `${imageDimensions.width} / ${imageDimensions.height}` : "1",
                      }}
                    >
                      <img
                        ref={imgRef}
                        src={baseImage}
                        alt="Base meme"
                        onLoad={setImageMetrics}
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                      />
                      <div className="absolute inset-0">
                        {texts.map((layer) => {
                          const scaleX = imageDimensions.width > 0 ? 100 / imageDimensions.width : 0;
                          const scaleY = imageDimensions.height > 0 ? 100 / imageDimensions.height : 0;
                          
                          return (
                            <div
                              key={layer.id}
                              className={`absolute select-none group`}
                              style={{ 
                                left: `${layer.x * scaleX}%`, 
                                top: `${layer.y * scaleY}%`,
                              }}
                            >
                              <div
                                className={`cursor-move inline-block ${
                                  activeText === layer.id ? "ring-2 ring-purple-500" : ""
                                }`}
                                style={{
                                  color: layer.color,
                                  fontSize: `${(layer.size / imageDimensions.width) * 100}vw`,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  textShadow: "2px 2px 0 #000",
                                }}
                                onPointerDown={(event) => handleTextPointerDown(event, layer.id)}
                              >
                                {layer.content}
                              </div>
                            </div>
                          );
                        })}
                        {emojis.map((layer) => {
                          const scaleX = imageDimensions.width > 0 ? 100 / imageDimensions.width : 0;
                          const scaleY = imageDimensions.height > 0 ? 100 / imageDimensions.height : 0;
                          
                          return (
                            <div
                              key={layer.id}
                              className={`absolute select-none group`}
                              style={{ 
                                left: `${layer.x * scaleX}%`, 
                                top: `${layer.y * scaleY}%`,
                              }}
                            >
                              <div
                                className={`cursor-move inline-block ${
                                  activeEmoji === layer.id ? "ring-2 ring-purple-500" : ""
                                }`}
                                style={{
                                  fontSize: `${(layer.size / imageDimensions.width) * 100}vw`,
                                }}
                                onPointerDown={(event) => handleEmojiPointerDown(event, layer.id)}
                              >
                                {layer.emoji}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-gray-500 text-sm">
                    Upload an image to start
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Controls with Accordions */}
          <div className="space-y-3">
            <Accordion id="image" title="Image Upload">
              <label className="block">
                <span className="text-xs text-gray-300 mb-2 block">Base image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full rounded border border-white/10 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </label>
            </Accordion>

            <Accordion id="text-layers" title={`Text Layers (${texts.length})`}>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={addTextLayer}
                  className="w-full px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-sm"
                  disabled={!baseImage}
                >
                  Add Text Layer
                </button>
                {texts.length === 0 && <p className="text-xs text-gray-500 text-center py-2">No layers yet. Add some captions!</p>}
                {texts.map((layer) => (
                    <div
                      key={layer.id}
                      className={`rounded-lg border p-3 space-y-2 ${
                        activeText === layer.id ? "border-purple-500 bg-purple-500/10" : "border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-200">Layer {layer.content.slice(0, 12) || "text"}</p>
                        <button
                          type="button"
                          onClick={() => removeTextLayer(layer.id)}
                          className="text-xs text-red-400 hover:text-red-200"
                        >
                          Remove
                        </button>
                      </div>
                      <label className="text-xs text-gray-400 block">
                        Text
                        <input
                          type="text"
                          value={layer.content}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateTextLayer(layer.id, { content: e.target.value });
                          }}
                          onFocus={(e) => {
                            e.stopPropagation();
                            setActiveText(layer.id);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            resetDragState();
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="mt-1 w-full rounded bg-black/50 border border-white/10 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          autoComplete="off"
                        />
                      </label>
                    <div className="flex gap-2">
                      <label className="text-xs text-gray-400 flex-1">
                        Color
                        <input
                          type="color"
                          value={layer.color}
                          onChange={(event) => updateTextLayer(layer.id, { color: event.target.value })}
                          onPointerDown={(event) => {
                            event.stopPropagation();
                            resetDragState();
                          }}
                          className="mt-1 h-8 w-full rounded border border-white/10 bg-black/50"
                        />
                      </label>
                      <label className="text-xs text-gray-400 flex-1">
                        Size
                        <input
                          type="range"
                          min={16}
                          max={96}
                          value={layer.size}
                          onChange={(event) => updateTextLayer(layer.id, { size: Number(event.target.value) })}
                          onPointerDown={(event) => {
                            event.stopPropagation();
                            resetDragState();
                          }}
                          className="mt-2 w-full"
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveText(layer.id)}
                      className="text-xs text-purple-300 hover:text-purple-100 w-full text-left"
                    >
                      {activeText === layer.id ? "✓ Active layer" : "Select layer"}
                    </button>
                    </div>
                ))}
              </div>
            </Accordion>

            <Accordion id="emojis" title={`Emojis (${emojis.length})`}>
              <div className="space-y-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="w-full px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-sm"
                    disabled={!baseImage}
                  >
                    {showEmojiPicker ? "Close Emoji Picker" : "Add Emoji"}
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute z-50 mt-2 left-0" style={{ width: "300px" }}>
                      <div className="bg-black/95 border border-white/20 rounded-lg overflow-hidden shadow-2xl">
                        <EmojiPicker
                          onEmojiClick={(emojiData: EmojiClickData) => {
                            addEmojiLayer(emojiData.emoji);
                          }}
                          width={300}
                          height={400}
                          previewConfig={{ showPreview: false }}
                          skinTonesDisabled
                        />
                      </div>
                    </div>
                  )}
                </div>
                {emojis.length === 0 && <p className="text-xs text-gray-500 text-center py-2">No emojis yet. Add some!</p>}
                {emojis.map((layer) => (
                  <div
                    key={layer.id}
                    className={`rounded-lg border p-3 space-y-2 ${
                      activeEmoji === layer.id ? "border-purple-500 bg-purple-500/10" : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-200 flex items-center gap-2">
                        <span className="text-lg">{layer.emoji}</span>
                        Emoji
                      </p>
                      <button
                        type="button"
                        onClick={() => removeEmojiLayer(layer.id)}
                        className="text-xs text-red-400 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>
                    <label className="text-xs text-gray-400 flex-1">
                      Size
                      <input
                        type="range"
                        min={16}
                        max={200}
                        value={layer.size}
                        onChange={(event) => updateEmojiLayer(layer.id, { size: Number(event.target.value) })}
                        className="mt-2 w-full"
                      />
                      <span className="text-xs text-gray-500 ml-2">{layer.size}px</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveEmoji(layer.id)}
                      className="text-xs text-purple-300 hover:text-purple-100 w-full text-left"
                    >
                      {activeEmoji === layer.id ? "✓ Active emoji" : "Select emoji"}
                    </button>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion id="meta" title="Meta Information">
              <div className="space-y-3">
                <label className="text-xs text-gray-400 block">
                  Meme title
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Optional title"
                    onPointerDown={(event) => {
                      event.stopPropagation();
                      resetDragState();
                    }}
                    className="mt-1 w-full rounded bg-black/50 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </label>
                <label className="text-xs text-gray-400 block">
                  Your name (optional)
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(event) => setCreatorName(event.target.value)}
                    placeholder="Anon"
                    onPointerDown={(event) => {
                      event.stopPropagation();
                      resetDragState();
                    }}
                    className="mt-1 w-full rounded bg-black/50 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </label>
                <p className="text-xs text-gray-500">
                  Uploaded memes appear on the{" "}
                  <a href="/wall-of-memes" className="text-purple-300 underline">
                    Wall of Memes
                  </a>{" "}
                  instantly.
                </p>
              </div>
            </Accordion>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!canGenerate}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-400 transition text-sm"
              >
                Download
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!canGenerate || uploading}
                className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-400 transition text-sm"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {uploadError && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">{uploadError}</p>}
            {lastUploadedMeme && (
              <p className="text-xs text-green-400 bg-green-500/10 border border-green-500/30 rounded px-3 py-2">
                Uploaded!{" "}
                <a href="/wall-of-memes" className="underline">
                  View on the Wall of Memes
                </a>
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
