'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle, File } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface UploadedFile {
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export function FlightUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      status: 'uploading' as const,
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload
    newFiles.forEach(uploadedFile => {
      simulateUpload(uploadedFile.file);
    });
  }, []);

  const simulateUpload = async (file: File) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev =>
        prev.map(f =>
          f.file === file ? { ...f, progress } : f
        )
      );
    }

    // Mark as complete
    setFiles(prev =>
      prev.map(f =>
        f.file === file ? { ...f, status: 'success', progress: 100 } : f
      )
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.rkt'],
      'text/plain': ['.rkt'],
    },
    maxSize: 10485760, // 10MB
  });

  const removeFile = (file: File) => {
    setFiles(prev => prev.filter(f => f.file !== file));
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <Card>
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${isDragActive
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/20 hover:border-white/40 hover:bg-white/5'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-lg text-white">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg text-white mb-2">
                  Drag & drop telemetry files here
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  or click to select files
                </p>
                <Button type="button" variant="outline">
                  Browse Files
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Uploading Files ({files.length})
            </h3>
            <div className="space-y-3">
              {files.map((uploadedFile, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg"
                >
                  <File className="w-8 h-8 text-blue-400 flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white truncate">
                        {uploadedFile.file.name}
                      </p>
                      <span className="text-xs text-gray-400 ml-2">
                        {(uploadedFile.file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>

                    {uploadedFile.status === 'uploading' && (
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadedFile.progress}%` }}
                        />
                      </div>
                    )}

                    {uploadedFile.status === 'success' && (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Upload complete</span>
                      </div>
                    )}

                    {uploadedFile.status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{uploadedFile.error || 'Upload failed'}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeFile(uploadedFile.file)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
