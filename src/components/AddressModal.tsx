import React, { useState } from 'react';
import { X, MapPin, Check, Plus, Home, Briefcase, Building } from 'lucide-react';
import { Address } from '../types';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  currentAddress: Address;
  onSelectAddress: (address: Address) => void;
  onSaveNewAddress: (newAddr: Address) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addresses,
  currentAddress,
  onSelectAddress,
  onSaveNewAddress,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [street, setStreet] = useState('');
  const [cityStateZip, setCityStateZip] = useState('Springfield, OR 97477');
  const [label, setLabel] = useState<'Home' | 'Work' | 'Apartment' | 'Other'>('Home');
  const [dropoffOption, setDropoffOption] = useState<'hand_to_me' | 'leave_at_door'>('leave_at_door');
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim()) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label,
      street: street.trim(),
      cityStateZip: cityStateZip.trim(),
      dropoffOption,
      instructions: instructions.trim(),
      isDefault: true,
    };

    onSaveNewAddress(newAddr);
    setIsAddingNew(false);
    setStreet('');
    setInstructions('');
  };

  const getLabelIcon = (l: string) => {
    switch (l) {
      case 'Home':
        return <Home className="w-4 h-4 text-neutral-600" />;
      case 'Work':
        return <Briefcase className="w-4 h-4 text-neutral-600" />;
      case 'Apartment':
        return <Building className="w-4 h-4 text-neutral-600" />;
      default:
        return <MapPin className="w-4 h-4 text-neutral-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-neutral-900">
            Delivery Details
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {!isAddingNew ? (
            <>
              {/* Address List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Saved Addresses
                </span>
                {addresses.map((addr) => {
                  const isSelected = addr.id === currentAddress.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => {
                        onSelectAddress(addr);
                        onClose();
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#EB1700] bg-[#EB1700]/5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-neutral-100 shrink-0">
                          {getLabelIcon(addr.label)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900">
                              {addr.label}
                            </span>
                            {addr.dropoffOption === 'leave_at_door' && (
                              <span className="text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                                Leave at door
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-800 font-medium mt-0.5">
                            {addr.street}
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            {addr.cityStateZip}
                          </p>
                          {addr.instructions && (
                            <p className="text-[11px] text-neutral-500 italic mt-1">
                              "{addr.instructions}"
                            </p>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-[#EB1700] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-3 border border-dashed border-neutral-300 hover:border-neutral-400 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#EB1700]" />
                <span>Add New Address</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleAddNewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. 100 Main St, Apt 4"
                  className="w-full p-2.5 text-xs sm:text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-[#EB1700]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  City, State & Zip
                </label>
                <input
                  type="text"
                  required
                  value={cityStateZip}
                  onChange={(e) => setCityStateZip(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-[#EB1700]"
                />
              </div>

              {/* Label selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Label
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Home', 'Work', 'Apartment', 'Other'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLabel(l)}
                      className={`py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                        label === l
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropoff Option */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Drop-off Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDropoffOption('leave_at_door')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-left transition-colors ${
                      dropoffOption === 'leave_at_door'
                        ? 'border-[#EB1700] bg-[#EB1700]/5 text-neutral-900'
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    Leave at door
                  </button>
                  <button
                    type="button"
                    onClick={() => setDropoffOption('hand_to_me')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-left transition-colors ${
                      dropoffOption === 'hand_to_me'
                        ? 'border-[#EB1700] bg-[#EB1700]/5 text-neutral-900'
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    Hand it to me
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Ring buzzer 102, gate code 4545"
                  className="w-full p-2.5 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-[#EB1700]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
