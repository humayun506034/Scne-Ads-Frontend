import { useState, useEffect } from "react";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenId: string;
  onSubmit: (data: any) => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  screenId,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    screenIds: [screenId],
    startDate: "",
    endDate: "",
    type: "custom",
    image: null as File | null,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, screenIds: [screenId] }));
  }, [screenId]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg p-6 text-white transform transition-transform duration-300 scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-2">
          <h2 className="text-2xl font-bold tracking-wide">Create Campaign</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Campaign Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter campaign name"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Screen ID */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Screen ID</label>
            <input
              type="text"
              value={formData.screenIds[0]}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Campaign Image */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Campaign Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-slate-300 file:bg-gradient-to-r file:from-indigo-500 file:to-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none hover:file:from-indigo-600 hover:file:to-purple-700 transition"
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-xl border border-slate-600 shadow-md"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg transition"
            >
              Save Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
