import PropTypes from "prop-types";
import { Mail, Lock, User, MapPin } from "lucide-react";

const icons = {
  mail: Mail,
  lock: Lock,
  user: User,
};

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon = "user",
  showToggle,
  toggleValue,
  onToggle,
}) => {
  const Icon = icons[icon] || User;

  return (
    <div className="mb-4">
      <label className="text-white text-sm">{label}</label>
      <div className="relative">
        {label === "City" ? (
          <span className="absolute left-2 top-2 text-white/70 pt-2">
            <MapPin size={18} />
          </span>
        ) : (
          <span className="absolute left-2 top-2 text-white/70 pt-2">
            <Icon size={18} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-8 py-2 mt-1 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-love-DEFAULT transition-colors pr-10"
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-2 top-2 text-white/70 hover:text-white"
          >
            {toggleValue}
          </button>
        )}
      </div>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.oneOf(["mail", "lock", "user"]),
  showToggle: PropTypes.bool,
  toggleValue: PropTypes.node,
  onToggle: PropTypes.func,
};

InputField.defaultProps = {
  type: "text",
  placeholder: "",
  icon: "user",
  showToggle: false,
  toggleValue: null,
  onToggle: () => {},
};

export default InputField;
