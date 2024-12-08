import React from "react";
import { Heart, HeartOff } from "lucide-react";

interface FavoriteSwitchProps {
  id?: string;
  checked: boolean | undefined;
  onChange: (checked: React.ChangeEvent<HTMLInputElement>) => void;
}

const FavoriteSwitch: React.FC<FavoriteSwitchProps> = ({
  id,
  checked,
  onChange,
}) => {
  return (
    <label className="inline-flex items-center hover:cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="form-checkbox hidden  h-6 w-6 text-red-500"
        checked={checked}
        onChange={onChange}
      />
      {checked ? (
        <Heart className="h-6 w-6 fill-current text-red-500" />
      ) : (
        <HeartOff className="h-6 w-6 fill-current text-gray-500" />
      )}
    </label>
  );
};

export default FavoriteSwitch;
