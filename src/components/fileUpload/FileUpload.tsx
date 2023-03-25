import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface FileModalHandleProps {
  files: File[];
  modal: RefObject<HTMLDialogElement>;
}

const defaultPreventer = (event: React.DragEvent<HTMLElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export const FileUploadModal = forwardRef<FileModalHandleProps>(
  function FileUploadModal(props, ref) {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(
      ref,
      () => ({
        files,
        modal: modalRef,
      }),
      [fileInputRef]
    );

    const handleDrop = (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const droppedFiles = Array.from(event.dataTransfer.files);

      setFiles((prevFiles) => [
        ...prevFiles,
        ...droppedFiles.filter(
          (file) =>
            !prevFiles.some((existingFile) => existingFile.name === file.name)
        ),
      ]);
    };

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files as FileList);

      setFiles((prevFiles) => [
        ...prevFiles,
        ...selectedFiles.filter(
          (file) =>
            !prevFiles.some((existingFile) => existingFile.name === file.name)
        ),
      ]);
    };

    const handleDeleteFile = (index: number) =>
      setFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));

    return (
      <dialog
        className="modal"
        ref={modalRef}
        onDragEnter={defaultPreventer}
        onDragLeave={defaultPreventer}
        onDragOver={defaultPreventer}
        onDrop={handleDrop}
      >
        <div className="modal-content">
          <h2>Upload Files</h2>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            multiple
            style={{ display: "none" }}
          />
          <button onClick={() => fileInputRef.current?.click()}>
            Select Files
          </button>
          <div className="dropped-files">
            {files.map((file, index) => (
              <div className="file-info" key={file.name}>
                <div className="file-name">{file.name}</div>
                <div className="file-size">{`${
                  Math.round((file.size / 1024) * 100) / 100
                } KB`}</div>
                <button
                  className="delete-file"
                  onClick={() => handleDeleteFile(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <form method="dialog">
            <button type="submit">Close</button>
          </form>
        </div>
      </dialog>
    );
  }
);
