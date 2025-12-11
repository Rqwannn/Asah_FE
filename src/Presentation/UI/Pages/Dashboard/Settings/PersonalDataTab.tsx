import React, { useState } from "react";
import SettingsCard from "./SettingsCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const PersonalDataTab = () => {
  const [livingAbroad, setLivingAbroad] = useState(false);
  const [birthAbroad, setBirthAbroad] = useState(false);

  return (
    <SettingsCard>
      <div className="flex flex-col gap-8 p-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-[#111827]">Personal Data</h2>
          <div className="h-px w-full bg-[#D1D5DB]"></div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2 text-[#111827]">
          <label className="text-[13px] font-semibold">Phone Number</label>
          <div className="flex items-center gap-2">
            <div className="flex h-[36px] items-center rounded-[4px] border border-[#D1D5DB] bg-[#F8F8F8] px-3 text-[13px] text-gray-700">
              ID +62
            </div>
            <input
              type="text"
              className="h-[36px] flex-1 rounded-[4px] border border-[#D1D5DB] px-3 text-[13px] font-normal focus:outline-none"
              defaultValue="85776143775"
            />
          </div>
          <label className="flex items-center gap-2 text-[12px] text-gray-700">
            <Checkbox className="size-4" />
            <span>I want to receive information via this phone number.</span>
          </label>
        </div>

        {/* Current City/Region */}
        <div className="flex flex-col gap-2 text-[#111827]">
          <div className="flex items-center gap-1 text-[13px] font-semibold">
            <span>Current City/Region</span>
            <span className="text-red-500">*</span>
          </div>
          <label className="flex items-center gap-2 text-[12px] text-gray-700">
            <Checkbox
              className="size-4"
              checked={livingAbroad}
              onCheckedChange={(val) => setLivingAbroad(Boolean(val))}
            />
            <span>I live outside the country</span>
          </label>
          {livingAbroad ? (
            <input
              type="text"
              className="h-[36px] rounded-[4px] border border-[#D1D5DB] px-3 text-[13px] font-normal focus:outline-none"
              placeholder="Type your current city/country"
            />
          ) : (
            <select className="h-[36px] rounded-[4px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-normal focus:outline-none">
              <option>Depok</option>
              <option>Jakarta</option>
              <option>Bandung</option>
            </select>
          )}
          <p className="text-[12px] text-gray-500">
            Fill in the city/region where you currently live.
          </p>
        </div>

        {/* Place of Birth */}
        <div className="flex flex-col gap-2 text-[#111827]">
          <label className="text-[13px] font-semibold">Place of Birth</label>
          <label className="flex items-center gap-2 text-[12px] text-gray-700">
            <Checkbox
              className="size-4"
              checked={birthAbroad}
              onCheckedChange={(val) => setBirthAbroad(Boolean(val))}
            />
            <span>I was born outside the country</span>
          </label>
          {birthAbroad ? (
            <input
              type="text"
              className="h-[36px] rounded-[4px] border border-[#D1D5DB] px-3 text-[13px] font-normal focus:outline-none"
              placeholder="Type your birth city/country"
            />
          ) : (
            <select className="h-[36px] rounded-[4px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-normal focus:outline-none">
              <option>South Jakarta</option>
              <option>Depok</option>
              <option>Bandung</option>
            </select>
          )}
          <p className="text-[12px] text-gray-500">
            Fill in the city/region where you were born.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2 text-[13px] font-semibold">
            <span>Date of Birth</span>
            <input
              type="date"
              defaultValue="2004-06-12"
              className="h-[36px] w-full rounded-[4px] border border-[#D1D5DB] px-3 text-[13px] font-normal focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 text-[13px] font-semibold">
            <span>Gender</span>
            <div className="flex flex-col gap-2 text-[13px] font-normal text-[#111827]">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="accent-[#285F3E]"
                  defaultChecked
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="accent-[#285F3E]"
                />
                <span>Female</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="accent-[#285F3E]"
                />
                <span>Prefer not to say</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[13px] font-semibold">
          <span>Highest Education</span>
          <select className="h-[36px] rounded-[4px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-normal focus:outline-none">
            <option>High School</option>
            <option>Diploma</option>
            <option>Bachelor</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 text-[13px] font-semibold">
          <span>Current Occupation</span>
          <select className="h-[36px] rounded-[4px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-normal focus:outline-none">
            <option>Student</option>
            <option>Professional</option>
            <option>Entrepreneur</option>
          </select>
          <p className="text-[12px] font-normal text-gray-500">
            Choose Student if you are still in school or college.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-[13px] font-semibold">
          <span>Current Company/Institution</span>
          <input
            type="text"
            defaultValue="Universitas Gunadarma"
            className="h-[36px] rounded-[4px] border border-[#D1D5DB] px-3 text-[13px] font-normal focus:outline-none"
          />
          <p className="text-[12px] font-normal text-gray-500">
            You can write your company or campus name here.
          </p>
        </div>

        <div className="pt-2">
          <Button className="h-10 cursor-pointer bg-[#C34F21] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#a4421c]">
            Save Changes
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default PersonalDataTab;
