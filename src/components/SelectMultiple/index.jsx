import { useState, useEffect, useRef } from "react";

export function SelectMultiple({
  options = [],
  value = [],
  onChange = () => {},
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const normalizedValue = Array.isArray(value) ? value : [];

  function toggleValue(v) {
    if (normalizedValue.includes(v)) {
      onChange(normalizedValue.filter(item => item !== v));
    } else {
      onChange([...normalizedValue, v]);
    }
  }

  const selectedLabels = options
    .filter(o => normalizedValue.includes(o.value))
    .map(o => o.label)
    .join(", ");

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={ref}>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={`
          w-full text-left border border-neutral-600 rounded-lg px-3 py-2
          bg-[#364153] text-neutral-200 flex items-center gap-3 shadow-sm
          hover:bg-neutral-700 transition-all min-h-[44px]
          focus:outline-none focus:ring-2 focus:ring-neutral-600
        `}
      >

        <div className="flex items-center gap-2 min-w-0">
          {normalizedValue.length > 0 ? (
            options
              .filter(o => normalizedValue.includes(o.value))
              .slice(0, 3)
              .map(o => (
                o.avatar ? (
                  <img
                    key={o.value}
                    src={o.avatar}
                    alt={o.label}
                    className="w-6 h-6 rounded-full object-cover border border-neutral-700 flex-shrink-0"
                  />
                ) : (
                  <div
                    key={o.value}
                    className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-xs text-neutral-200"
                  >
                    {o.label?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                )
              ))
          ) : null}
        </div>

        <div className="flex-1 min-w-0">
          <span
            className={`block truncate ${
              selectedLabels ? "text-neutral-200" : "text-neutral-400"
            }`}
          >
            {selectedLabels || "Selecione..."}
          </span>
        </div>

        <div className="ml-2 text-sm text-neutral-400">
          {normalizedValue.length > 0 ? `${normalizedValue.length}` : null}
        </div>
      </button>

      {open && (
        <div
          role="listbox"
          className="
            absolute top-full left-0 w-full mt-2 rounded-lg
            border border-neutral-700 bg-neutral-900 shadow-xl z-50
            max-h-56 overflow-auto
          "
        >
          {options.map(opt => {
            const selected = normalizedValue.includes(opt.value);
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={selected}
                onClick={() => toggleValue(opt.value)}
                className={`
                  px-3 py-2 flex items-center gap-3 cursor-pointer transition
                  ${selected ? "bg-neutral-800" : "hover:bg-neutral-800"}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
                  className="w-4 h-4 accent-neutral-400 flex-shrink-0"
                />

                {opt.avatar ? (
                  <img
                    src={opt.avatar}
                    alt={opt.label}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-700 flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-sm text-neutral-200 flex-shrink-0">
                    {opt.label?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="text-neutral-200 truncate">{opt.label}</div>
                  {opt.subtitle && (
                    <div className="text-xs text-neutral-400 truncate">
                      {opt.subtitle}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
