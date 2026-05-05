import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Clipboard, FileUp } from 'lucide-react';

const ImageUpload = ({ value, onChange, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleFile = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onPaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleFile(file);
        break;
      }
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const clearImage = () => {
    setPreview(null);
    onClear();
  };

  return (
    <div 
      className={`relative group border-2 border-dashed rounded-2xl transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center p-4 text-center
        ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'}
        ${preview ? 'border-solid' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onPaste={onPaste}
      tabIndex="0"
    >
      {preview ? (
        <div className="relative w-full h-full min-h-[160px]">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full max-h-[300px] object-contain rounded-xl"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl pointer-events-none">
            <p className="text-white text-sm font-medium flex items-center gap-2">
              <Upload size={16} /> Pegar o arrastrar para cambiar
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-400 group-hover:text-primary transition-colors">
            <ImageIcon size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Arrastra una imagen o <label className="text-primary hover:underline cursor-pointer">selecciona un archivo<input type="file" className="hidden" accept="image/*" onChange={handleInputChange} /></label>
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <Clipboard size={12} /> También puedes pegar un screenshot (Ctrl+V)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
