"use client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="text-[14px] flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-dark-500 bg-gray-950 py-5"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="flex flex-col justify-center gap-2 text-center text-dark-600">
            <p className="text-[14px]">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p> SVG, JPG, PNG or Gif (max 800x 400)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
