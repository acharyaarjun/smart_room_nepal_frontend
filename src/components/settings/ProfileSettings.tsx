"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUserOnly } from "@/redux/features/auth/authSlice";
import { updateProfile } from "@/services/authService";
import { setItemSecurely } from "@/utils/storageUtil";
import { toast } from "react-hot-toast";
import { FaUser, FaPhone, FaCalendar, FaUpload, FaImage } from "react-icons/fa";
import { MdWork, MdFamilyRestroom } from "react-icons/md";
import Image from "next/image";

// Helper function to format date for input
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    gender: "",
    dob: "",
    occupationStatus: "",
    maritalStatus: "",
    avatar: null as File | null,
    document: null as File | null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.userProfile?.phone || "",
        gender: user.userProfile?.gender || "",
        dob: user.userProfile?.dob || "",
        occupationStatus: (user.userProfile as any)?.occupationStatus || "",
        maritalStatus: (user.userProfile as any)?.maritalStatus || "",
        avatar: null,
        document: null,
      });

      if (user.userProfile?.avatar?.url) {
        setAvatarPreview(user.userProfile.avatar.url);
      }

      if ((user.userProfile as any)?.document?.url) {
        setDocumentPreview((user.userProfile as any).document.url);
      }
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "document"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }));

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "avatar") {
          setAvatarPreview(reader.result as string);
        } else {
          setDocumentPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate age if DOB is provided
      if (formData.dob) {
        const birthDate = new Date(formData.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        if (age < 18) {
          toast.error("You must be at least 18 years old");
          setIsSubmitting(false);
          return;
        }

        if (age > 120) {
          toast.error("Please enter a valid date of birth");
          setIsSubmitting(false);
          return;
        }
      }

      const submitData: any = {
        fullName: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        occupationStatus: formData.occupationStatus,
        maritalStatus: formData.maritalStatus,
      };

      if (formData.avatar) {
        submitData.avatar = formData.avatar;
      }

      if (formData.document) {
        submitData.document = formData.document;
      }

      const response = await updateProfile(submitData);

      dispatch(
        setUserOnly({
          user: response.user,
        })
      );

      setItemSecurely("user", JSON.stringify(response.user));

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
      console.error("Update profile error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Age must be between 18 and 120
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const minDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate()
  );

  return (
    <div className="bg-white dark:bg-dropdown rounded-lg shadow-custom p-6">
      <h2 className="text-xl font-bold text-primary mb-6">Profile Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaUser className="text-4xl text-gray-400" />
                </div>
              )}
            </div>
            <label className="cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <FaUpload />
              <span>Upload Avatar</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "avatar")}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Document Upload (for verification) */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            Verification Document (Optional)
          </label>
          <div className="flex items-center gap-4">
            {documentPreview && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={documentPreview}
                  alt="Document"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <label className="cursor-pointer px-4 py-2 bg-gray-200 dark:bg-gray-700 text-normal rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
              <FaImage />
              <span>Upload Document</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "document")}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload ID or verification document
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            <FaUser className="inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            <FaPhone className="inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            <FaCalendar className="inline mr-2" />
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
            min={formatDateForInput(minDate)}
            max={formatDateForInput(maxDate)}
          />
        </div>

        {/* Occupation Status */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            <MdWork className="inline mr-2" />
            Occupation Status
          </label>
          <select
            name="occupationStatus"
            value={formData.occupationStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Occupation</option>
            <option value="student">Student</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium text-normal mb-2">
            <MdFamilyRestroom className="inline mr-2" />
            Marital Status
          </label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
