import React from "react";
import { Heart, HeartOff } from "lucide-react";

const FavoriteSwitch = ({ id, checked, onChange }) => {
  return (
    <label className="inline-flex items-center hover:cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="form-checkbox hidden h-6 w-6 text-red-500"
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
