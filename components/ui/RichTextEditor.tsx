'use client';

import React, { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = 'Enter text...',
  required = false,
  rows = 6,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);

  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const checkFormat = () => {
    if (!editorRef.current) return;
    const formats = ['bold', 'italic', 'underline'];
    formats.forEach(format => {
      if (document.queryCommandState(format)) {
        setActiveFormat(format);
      }
    });
  };

  const applyFormat = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      updateValue();
      checkFormat();
    }
  };

  const updateValue = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    updateValue();
    checkFormat();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    updateValue();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      applyFormat('createLink', url);
    }
  };

  return (
    <div className="w-full group">
      <label className="block text-sm font-semibold text-[#121212] mb-2 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Enhanced Toolbar - CKEditor Style */}
      <div className={`
        flex items-center gap-0.5 p-1.5 border border-[#E5E5E5] rounded-t-lg
        bg-white transition-all duration-200
        ${isFocused ? 'border-[#121212] shadow-sm' : ''}
      `}>
        {/* Formatting Group */}
        <div className="flex items-center gap-0.5 border-r border-[#E5E5E5] pr-1.5 mr-1.5">
          <button
            type="button"
            onClick={() => applyFormat('bold')}
            className={`
              p-2 rounded hover:bg-gray-100 transition-all duration-150
              ${activeFormat === 'bold' ? 'bg-gray-100' : ''}
            `}
            title="Bold (Ctrl+B)"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => applyFormat('italic')}
            className={`
              p-2 rounded hover:bg-gray-100 transition-all duration-150
              ${activeFormat === 'italic' ? 'bg-gray-100' : ''}
            `}
            title="Italic (Ctrl+I)"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => applyFormat('underline')}
            className={`
              p-2 rounded hover:bg-gray-100 transition-all duration-150
              ${activeFormat === 'underline' ? 'bg-gray-100' : ''}
            `}
            title="Underline (Ctrl+U)"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* List Group */}
        <div className="flex items-center gap-0.5 border-r border-[#E5E5E5] pr-1.5 mr-1.5">
          <button
            type="button"
            onClick={() => applyFormat('insertUnorderedList')}
            className="p-2 rounded hover:bg-gray-100 transition-all duration-150"
            title="Bullet List"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => applyFormat('insertOrderedList')}
            className="p-2 rounded hover:bg-gray-100 transition-all duration-150"
            title="Numbered List"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </button>
        </div>

        {/* Link */}
        <div className="flex items-center gap-0.5 border-r border-[#E5E5E5] pr-1.5 mr-1.5">
          <button
            type="button"
            onClick={insertLink}
            className="p-2 rounded hover:bg-gray-100 transition-all duration-150"
            title="Insert Link"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        </div>

        {/* History Group */}
        <div className="flex items-center gap-0.5 border-r border-[#E5E5E5] pr-1.5 mr-1.5">
          <button
            type="button"
            onClick={() => applyFormat('undo')}
            className="p-2 rounded hover:bg-gray-100 transition-all duration-150"
            title="Undo (Ctrl+Z)"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => applyFormat('redo')}
            className="p-2 rounded hover:bg-gray-100 transition-all duration-150"
            title="Redo (Ctrl+Y)"
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Insert Button */}
        <button
          type="button"
          className="px-3 py-1.5 text-xs font-semibold text-[#121212] border border-[#E5E5E5] rounded-md hover:bg-gray-50 hover:border-[#121212] transition-all duration-150"
          onMouseDown={(e) => e.preventDefault()}
        >
          + Insert
        </button>
      </div>

      {/* Enhanced Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full px-4 py-3 border border-[#E5E5E5] border-t-0 rounded-b-lg text-sm
          min-h-[120px] transition-all duration-200 bg-white
          ${isFocused ? 'ring-2 ring-[#121212] border-[#121212] shadow-sm' : ''}
        `}
        style={{ 
          minHeight: `${rows * 28}px`,
          lineHeight: '1.6',
          outline: 'none'
        }}
        suppressContentEditableWarning
        data-placeholder={placeholder}
      />
      
      <style jsx global>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
          position: absolute;
        }
        [contenteditable] {
          outline: none;
        }
        [contenteditable] p {
          margin: 0.5em 0;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
        }
        [contenteditable] a {
          color: #121212;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
