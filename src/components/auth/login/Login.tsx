"use client";
import React, { useState } from "react";
import {
  InputElement,
  SelectElement,
  TextareaElement,
} from "@/components/common/form-element";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    role: "",
  });

  const roleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: `user${i + 1}`,
    label: `Lorem ipsum dolor, sit amet.`,
  }));

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Input Example */}
      <InputElement
        title="Username"
        name="username"
        value={formData.username}
        placeholder="Enter your username"
        error={null}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        onBlur={() => console.log("Username blurred")}
        isRequired
      />

      <TextareaElement
        title="Description"
        name="description"
        value={formData.description}
        placeholder="Write something..."
        error={null}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        onBlur={() => console.log("Description blurred")}
      />

      <SelectElement
        title="Role"
        name="role"
        value={formData.role || ""}
        options={roleOptions}
        error={null}
        placeholder="Select role"
        onChange={(selected) =>
          setFormData({
            ...formData,
            role: selected || "",
          })
        }
        onBlur={() => console.log("Role blurred")}
        isRequired
      />
    </div>
  );
}
