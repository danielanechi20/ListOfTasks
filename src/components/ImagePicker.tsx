import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

interface ImagePickerProps {
  onFilePick: (file: File) => void;

  label?: string;
  name?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  name,
  onFilePick,
}) => {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const pickerRef = useRef<HTMLInputElement>(null);

  function handlePickImage() {
    if (pickerRef.current) {
      pickerRef.current.click();
    }
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) {
    if (event) {
      const file = event.target.files![0];
      if (!file) {
        setPickedImage(null);
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPickedImage(fileReader.result);
        onFilePick(file);
      };
      fileReader.readAsDataURL(file);
    }
    return;
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <div className=" mb-2 flex items-center justify-center min-h-40 min-w-40 border-sky-100 border ">
          {!pickedImage && <p>No Image Picked</p>}
          {pickedImage && <img src={pickedImage as string} />}
        </div>
        <input
          className="hidden"
          type="file"
          id={name}
          accept="image/*"
          name={name}
          ref={pickerRef}
          onChange={handleImageChange}
        />
        <Button type="button" onClick={handlePickImage}>
          Pick an image
        </Button>
      </div>
    </div>
  );
};

export default ImagePicker;
